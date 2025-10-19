"use client";
import { useRef, useEffect, useState } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";

export type RaysOrigin =
  | "top-center"
  | "top-left"
  | "top-right"
  | "right"
  | "left"
  | "bottom-center"
  | "bottom-right"
  | "bottom-left";

interface LightRaysProps {
  raysOrigin?: RaysOrigin;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
}

const DEFAULT_COLOR = "#ffffff";

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
};

const getAnchorAndDir = (
  origin: RaysOrigin,
  w: number,
  h: number
): { anchor: [number, number]; dir: [number, number] } => {
  const outside = 0.2;
  switch (origin) {
    case "top-left":
      return { anchor: [0, -outside * h], dir: [0, 1] };
    case "top-right":
      return { anchor: [w, -outside * h], dir: [0, 1] };
    case "left":
      return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
    case "right":
      return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
    case "bottom-left":
      return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
    case "bottom-center":
      return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
    case "bottom-right":
      return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
    default: // "top-center"
      return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
  }
};

const LightRays: React.FC<LightRaysProps> = ({
  raysOrigin = "top-center",
  raysColor = DEFAULT_COLOR,
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1.0,
  saturation = 1.0,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0.0,
  distortion = 0.0,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const uniformsRef = useRef<any>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationIdRef = useRef<number | null>(null);
  const meshRef = useRef<any>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isInViewport, setIsInViewport] = useState(true); // assume visible until observer runs

  // Keep a mounted flag for safe cleanup
  const mountedRef = useRef(true);

  // Intersection observer toggles rendering visibility,
  // but we DO NOT unmount the canvas — we fade it and pause rendering.
  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const v = entry.isIntersecting;
        setIsInViewport(v);

        // fade via opacity to avoid canvas clearing visual glitches
        const el = containerRef.current;
        if (el) {
          // GPU-friendly opacity change (composited)
          el.style.transition = "opacity 520ms cubic-bezier(.2,.9,.3,1)";
          el.style.willChange = "opacity, transform";
          el.style.opacity = v ? "1" : "0";
          // pointer events off so it never blocks interactions
          el.style.pointerEvents = "none";
        }
      },
      { threshold: 0.05 }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  // Initialize WebGL once on mount — DO NOT unmount canvas when visibility toggles.
  useEffect(() => {
    mountedRef.current = true;
    if (!containerRef.current) return;

    const initializeWebGL = async () => {
      if (!containerRef.current) return;

      // Tiny defer to ensure layout settled (keeps behavior similar to your original)
      await new Promise((resolve) => setTimeout(resolve, 10));
      if (!containerRef.current || !mountedRef.current) return;

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 2),
        alpha: true,
        // preserveDrawingBuffer keeps the last frame in the buffer when we stop animating.
        // This helps avoid flashing to white when animation pauses.
        preserveDrawingBuffer: true as any
      });

      rendererRef.current = renderer;

      const gl = renderer.gl;

      // Ensure transparent clear color
      try {
        gl.clearColor(0, 0, 0, 0);
      } catch (e) {
        // ignore if not supported
      }

      // make canvas full size of the parent container
      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";
      gl.canvas.style.display = "block";
      gl.canvas.style.background = "transparent";
      gl.canvas.style.pointerEvents = "none";

      // append the canvas but don't remove it later except on unmount
      while (containerRef.current!.firstChild) {
        containerRef.current!.removeChild(containerRef.current!.firstChild);
      }
      containerRef.current!.appendChild(gl.canvas);

      const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

      const frag = `precision highp float;

uniform float iTime;
uniform vec2  iResolution;

uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
  
  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  
  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,
                           1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,
                           1.1 * raysSpeed);

  fragColor = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor  = color;
}`;

      const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },

        rayPos: { value: [0, 0] },
        rayDir: { value: [0, 1] },

        raysColor: { value: hexToRgb(raysColor) },
        raysSpeed: { value: raysSpeed },
        lightSpread: { value: lightSpread },
        rayLength: { value: rayLength },
        pulsating: { value: pulsating ? 1.0 : 0.0 },
        fadeDistance: { value: fadeDistance },
        saturation: { value: saturation },
        mousePos: { value: [0.5, 0.5] },
        mouseInfluence: { value: mouseInfluence },
        noiseAmount: { value: noiseAmount },
        distortion: { value: distortion }
      };
      uniformsRef.current = uniforms;

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms
      });
      const mesh = new Mesh(gl, { geometry, program });
      meshRef.current = mesh;

      const updatePlacement = () => {
        if (!containerRef.current || !renderer) return;

        renderer.dpr = Math.min(window.devicePixelRatio, 2);

        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
        renderer.setSize(wCSS, hCSS);

        const dpr = renderer.dpr;
        const w = wCSS * dpr;
        const h = hCSS * dpr;

        uniforms.iResolution.value = [w, h];

        const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h);
        uniforms.rayPos.value = anchor;
        uniforms.rayDir.value = dir;
      };

      // The loop runs only while the section is visible. When not visible, we
      // cancel the RAF but KEEP the canvas and last frame (preserveDrawingBuffer).
      let lastTime = 0;
      const loop = (t: number) => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current || !mountedRef.current) {
          return;
        }
        const u = uniformsRef.current;
        u.iTime.value = t * 0.001;

        if (followMouse && mouseInfluence > 0.0) {
          const smoothing = 0.92;
          smoothMouseRef.current.x = smoothMouseRef.current.x * smoothing + mouseRef.current.x * (1 - smoothing);
          smoothMouseRef.current.y = smoothMouseRef.current.y * smoothing + mouseRef.current.y * (1 - smoothing);
          u.mousePos.value = [smoothMouseRef.current.x, smoothMouseRef.current.y];
        }

        try {
          renderer.render({ scene: mesh });
        } catch (error) {
          console.warn("WebGL rendering error:", error);
          return;
        }

        lastTime = t;
        animationIdRef.current = requestAnimationFrame(loop);
      };

      // Start rendering if currently in viewport
      const startRendering = () => {
        // prevent double RAFs
        if (animationIdRef.current != null) return;
        animationIdRef.current = requestAnimationFrame(loop);
      };

      const stopRendering = () => {
        if (animationIdRef.current != null) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }
        // render one final frame so buffer keeps last visual
        try {
          if (rendererRef.current && meshRef.current) {
            rendererRef.current.render({ scene: meshRef.current });
          }
        } catch (e) {
          // ignore render errors
        }
      };

      // react to initial visibility state
      if (isInViewport) startRendering();
      else stopRendering();

      // listen for visibility changes and start/stop RAF accordingly
      const visObserver = new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          if (!e) return;
          if (e.isIntersecting) {
            startRendering();
          } else {
            stopRendering();
          }
        },
        { threshold: 0.05 }
      );

      // observe same container — we keep a separate observer to decide playback,
      // the top-level useEffect's observer handles the opacity fade.
      visObserver.observe(containerRef.current);

      window.addEventListener("resize", updatePlacement);
      updatePlacement();

      // store final cleanup
      const cleanup = () => {
        stopRendering();
        try {
          window.removeEventListener("resize", updatePlacement);
        } catch {}
        try {
          visObserver.disconnect();
        } catch {}
        // Do a graceful context loss then remove canvas on unmount
        try {
          if (rendererRef.current) {
            const canvas = rendererRef.current.gl.canvas;
            const loseContextExt = rendererRef.current.gl.getExtension("WEBGL_lose_context");
            if (loseContextExt) {
              // Try to lose context to free GPU resources
              loseContextExt.loseContext();
            }
            if (canvas && canvas.parentNode) {
              canvas.parentNode.removeChild(canvas);
            }
          }
        } catch (err) {
          console.warn("Error during WebGL cleanup:", err);
        }
        rendererRef.current = null;
        uniformsRef.current = null;
        meshRef.current = null;
      };

      // attach cleanup for component unmount
      (cleanup as any)._internal = true;
      // store on ref so outer effect can call it on unmount
      (cleanupFunctionRef as any) = cleanup;
    };

    // We use a small indirection ref to hold the cleanup function pointer
    // (so other effects can call it if needed). We'll declare it outside and
    // fill it here to avoid TypeScript complaining about re-declarations.
    let cleanupFunctionRef: (() => void) | null = null;

    initializeWebGL().catch((err) => {
      console.warn("Failed to initialize LightRays:", err);
    });

    // On unmount: fully cleanup
    return () => {
      mountedRef.current = false;
      try {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }
      } catch {}
      try {
        if (cleanupFunctionRef) {
          cleanupFunctionRef();
          cleanupFunctionRef = null;
        }
      } catch {}
      // final safety: if renderer still exists, try to remove its canvas
      try {
        if (rendererRef.current) {
          const canvas = rendererRef.current.gl.canvas;
          const loseContextExt = rendererRef.current.gl.getExtension("WEBGL_lose_context");
          if (loseContextExt) {
            loseContextExt.loseContext();
          }
          if (canvas && canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
          }
        }
      } catch (e) {
        // ignore
      }
    };
    // note: intentionally empty deps here so init runs once (component mount)
    // props-driven uniform updates happen in the following effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update uniforms when props change (safe: uniformsRef may be null until init complete)
  useEffect(() => {
    if (!uniformsRef.current || !containerRef.current || !rendererRef.current) return;

    const u = uniformsRef.current;
    const renderer = rendererRef.current;

    u.raysColor.value = hexToRgb(raysColor);
    u.raysSpeed.value = raysSpeed;
    u.lightSpread.value = lightSpread;
    u.rayLength.value = rayLength;
    u.pulsating.value = pulsating ? 1.0 : 0.0;
    u.fadeDistance.value = fadeDistance;
    u.saturation.value = saturation;
    u.mouseInfluence.value = mouseInfluence;
    u.noiseAmount.value = noiseAmount;
    u.distortion.value = distortion;

    const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
    const dpr = renderer.dpr;
    const { anchor, dir } = getAnchorAndDir(raysOrigin, wCSS * dpr, hCSS * dpr);
    u.rayPos.value = anchor;
    u.rayDir.value = dir;
  }, [
    raysColor,
    raysSpeed,
    lightSpread,
    raysOrigin,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    mouseInfluence,
    noiseAmount,
    distortion
  ]);

  // mouse follow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !rendererRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseRef.current = { x, y };
    };

    if (followMouse) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [followMouse]);

  // render container element (canvas is appended to this div)
  return (
    <div
      ref={containerRef}
      className={`w-full h-full pointer-events-none z-[3] overflow-hidden relative ${className}`}
      // start invisible until observer toggles opacity to avoid initial white flash
      style={{ opacity: 0, background: "transparent", transition: "opacity 520ms cubic-bezier(.2,.9,.3,1)" }}
    />
  );
};

export default LightRays;
