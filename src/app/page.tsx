import LightRays from "@/components/LightRays";
import Hero from "@/screens/hero";
import Projects from "@/screens/projects";
import Services from "@/screens/services";
import Socials from "@/screens/socials";
import Tech from "@/screens/tech";
import Tools from "@/screens/tools";
import AboutMe from "@/screens/aboutme";
export default function Home() {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#0216c3"
          raysSpeed={0.5}
          lightSpread={0.5}
          rayLength={5}
          followMouse={true}
          mouseInfluence={0.3}
          noiseAmount={0}
          distortion={0}
          fadeDistance={50}
          saturation={0.01}
          pulsating={false}
          className="z-0"
        />
        <div  className="absolute top-0 left-0 w-full">
          <Hero />
        </div>
      </div>
        <AboutMe />
        <Services />
        <Tech />
        <Tools />
        <Projects />
        <Socials />
    </div>
  );
}
