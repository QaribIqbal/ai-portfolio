import LightRays from "@/components/LightRays";
import Hero from "@/screens/hero";
import Projects from "@/screens/projects";
import Services from "@/screens/services";
import Socials from "@/screens/socials";
import Tech from "@/screens/tech";
import Tools from "@/screens/tools";
import AboutMe from "@/screens/aboutme";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-main">
       <div className="relative w-full min-h-100 pt-0 pb-12 flex flex-col justify-center">
        <LightRays
          raysOrigin="top-center"
          raysColor="#22C55E" 
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
      {/* Sticky Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-10 bg-main/80 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse"></span>
            Qarib Iqbal
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="/#about" className="text-sm font-medium text-textMuted hover:text-white transition-colors">About</a>
          <a href="/#services" className="text-sm font-medium text-textMuted hover:text-white transition-colors">Services</a>
          <a href="/Portfolio" className="text-sm font-medium text-textMuted hover:text-white transition-colors">Work</a>
        </div>
        <div>
          <a href="/#connect" className="bg-teal text-main px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-bold hover:scale-105 transition-transform shadow-[0_0_15px_rgba(34,197,94,0.3)] text-xs sm:text-sm">
            Fix My Deployments
          </a>
        </div>
      </nav>

      {/* Hero with rays */}
      {/* <div className="relative w-full min-h-100 pt-24 pb-12 flex flex-col justify-center">
        <LightRays
          raysOrigin="top-center"
          raysColor="#22C55E" 
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
        /> */}
        <div className="absolute top-0 z-10 w-full">
          <Hero />
        </div>
      </div>

      <div id="about"><AboutMe /></div>
      <div id="services"><Services /></div>
      <Tech />
      <Tools />
      <Projects />
      <Socials />
    </div>
  );
}
