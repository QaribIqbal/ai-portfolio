import LightRays from "@/components/LightRays";
import Hero from "@/screens/hero";
import Services from "@/screens/services";
import Socials from "@/screens/socials";
import Tech from "@/screens/tech";
import Tools from "@/screens/tools";
export default function Home() {
  return (
    <div style={{ width: "100%", height: "500vh", position: "relative" }}>
      <LightRays
        raysOrigin="top-center"
        raysColor="#4191ff"
        raysSpeed={0.5}
        lightSpread={0.025}
        rayLength={2}
        followMouse={true}
        mouseInfluence={0.3}
        noiseAmount={0}
        distortion={0}
        fadeDistance={50}
        saturation={9}
        pulsating={false}  
        className=""
      />
      <div className="absolute top-0 left-0 w-full">
        <Hero />
        <Services />
        <Tech />
        <Tools/>
        <Socials />
      </div>
    </div>
  );
}
