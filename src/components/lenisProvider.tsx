"use client";

import React, { useEffect } from "react";
import { ReactLenis } from "lenis/react";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useEffect(() => {
  //   // Force smooth scrolling by disabling native scroll
  //   document.documentElement.style.scrollBehavior = "smooth";
  //   document.body.style.overflowX = "hidden";
  // }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.03,
        wheelMultiplier:1.5,
        smoothWheel: true,
        syncTouch: true, // Slightly increase for smoother motion
      }}
    >
      {children}
    </ReactLenis>
  );
}
