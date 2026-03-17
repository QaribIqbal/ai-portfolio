"use client";
import BlurText from "@/components/BlurText";
import SpotlightCard from "@/components/SpotlightCard";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import gsap from "gsap";
import { ServerCog, Workflow, Users } from "lucide-react";

const services = () => {
  gsap.registerPlugin(ScrollTrigger);
  const sectionRef = useRef(null);
  const card1 = useRef(null);
  const card2 = useRef(null);
  const card3 = useRef(null);

  useGSAP(() => {
    // Animate heading
    gsap.from(card1.current, {
      opacity: 0,
      y: 100,
      duration: 2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 30%",
        end: "top -5%",

        scrub: 1,
      },
    });
    gsap.from(card2.current, {
      opacity: 0,
      y: -100,
      duration: 2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 30%",
        end: "top -5%",

        scrub: 1,
      },
    });
    gsap.from(card3.current, {
      opacity: 0,
      x: 100,
      duration: 2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 30%",
        end: "top -5%",

        scrub: 1,
      },
    });
  });

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center w-full min-h-[100vh]  overflow-x-hidden mt-0 lg "
    >
      <div className="text-center w-full max-w-3xl mx-auto px-4 mt-12 md:mt-24 mb-8 md:mb-12">
        <BlurText
          text="Services I Provide"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-4xl md:text-5xl font-black tracking-tight text-textMain justify-center"
        />
        <div className="w-20 h-[3px] bg-teal mx-auto mt-6 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-4 w-full max-w-6xl mx-auto">
        <div ref={card1} className="w-full">
          <SpotlightCard
            className="w-full h-full bg-elevated border-white/5 border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-teal/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] flex flex-col justify-between"
            spotlightColor="rgba(34, 197, 94, 0.15)"
          >
            <div>
              <ServerCog className="w-12 h-12 mb-4 text-teal" />
              <h3 className="text-xl font-bold text-textMain mb-1">Deployment & Server Care</h3>
              <p className="text-sm text-textMuted mb-4">($300–$600 setup + $250–$500/mo)</p>
              <p className="text-sm text-textSubtle mb-4">
                VPS/IIS setup and hardening, CI/CD pipelines, Docker, monitoring basics, and weekly check‑ins.
              </p>
              <p className="text-sm font-medium text-teal mb-2">
                Outcome: Less risky deployments, fewer incidents, and predictable releases.
              </p>
              <p className="text-xs text-textSubtle mb-6 flex-grow">
                Best for: Growing agencies shipping client software frequently.
              </p>
            </div>
            <a href="/#connect" className="bg-teal text-main px-6 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all mt-auto text-center w-full inline-block">
              Talk about this service &rarr;
            </a>
          </SpotlightCard>
        </div>
        
        <div ref={card2} className="w-full">
          <SpotlightCard
            className="w-full h-full bg-elevated border-white/5 border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-teal/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] flex flex-col justify-between"
            spotlightColor="rgba(34, 197, 94, 0.15)"
          >
            <div>
              <Workflow className="w-12 h-12 mb-4 text-teal" />
              <h3 className="text-xl font-bold text-textMain mb-1">Automation Sprint (n8n)</h3>
              <p className="text-sm text-textMuted mb-4">($250–$450/sprint)</p>
              <p className="text-sm text-textSubtle mb-4">
                1–3 n8n workflows to kill repetitive manual tasks like reporting, lead routing, onboarding, and ops.
              </p>
              <p className="text-sm font-medium text-teal mb-2">
                Outcome: Reclaimed hours and near-zero reporting or data-entry errors.
              </p>
              <p className="text-xs text-textSubtle mb-6 flex-grow">
                Best for: Teams drowning in manual admin and copying data.
              </p>
            </div>
            <a href="/#connect" className="bg-teal text-main px-6 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all mt-auto text-center w-full inline-block">
              Talk about this service &rarr;
            </a>
          </SpotlightCard>
        </div>

        <div ref={card3} className="w-full">
          <SpotlightCard
            className="w-full h-full bg-elevated border-white/5 border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-teal/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] flex flex-col justify-between"
            spotlightColor="rgba(34, 197, 94, 0.15)"
          >
            <div>
              <Users className="w-12 h-12 mb-4 text-teal" />
              <h3 className="text-xl font-bold text-textMain mb-1">White-Label Tech Ops</h3>
              <p className="text-sm text-textMuted mb-4">($500–$1,000/mo)</p>
              <p className="text-sm text-textSubtle mb-4">
                Backend/automation partner for agencies: small automations, bug triage, deployment help, and release support.
              </p>
              <p className="text-sm font-medium text-teal mb-2">
                Outcome: Say yes to more technical projects without hiring full-time devs.
              </p>
              <p className="text-xs text-textSubtle mb-6 flex-grow">
                Best for: Marketing agencies expanding their technical offerings.
              </p>
            </div>
            <a href="/#connect" className="bg-teal text-main px-6 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all mt-auto text-center w-full inline-block">
              Talk about this service &rarr;
            </a>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
};

export default services;
