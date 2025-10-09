import LightRays from "@/components/LightRays";
import Hero from "@/screens/hero";
import Services from "@/screens/services";
import Tech from "@/screens/tech";
import Tools from "@/screens/tools";
export default function Home() {
  return (
    <div style={{ width: "100%", height: "400vh", position: "relative" }}>
      <LightRays
        raysOrigin="top-center"
        raysColor="#4191ff"
        raysSpeed={0.5}
        lightSpread={0.1}
        rayLength={9.0}
        followMouse={true}
        mouseInfluence={0.3}
        noiseAmount={0}
        distortion={0}
        className=""
      />
      <div className="absolute top-0 left-0 w-full">
        <Hero />
        <Services />
        <Tech />
        <Tools/>
      </div>
    </div>
  );
}
