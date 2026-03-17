"use client";
import BlurText from "@/components/BlurText";
import SpotlightCard from "@/components/SpotlightCard";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import gsap from "gsap";
function tech() {
  gsap.registerPlugin(ScrollTrigger);
  const sectionRef = useRef(null);
  const techCard1 = useRef(null);
  const techCard2 = useRef(null);
  const techCard3 = useRef(null);
  const techCard4 = useRef(null);

  useGSAP(() => {
  // left in from x (little overshoot)
  gsap.from(techCard1.current, {
    opacity: 0,
    x: -100,
    rotationX: -180,
    duration: 2,
ease: "power4.out",      // subtle overshoot then settle
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 45%",
      end: "top -55%",
      scrub: 1.3,
    },
  });

  // up from y (smooth)
  gsap.from(techCard2.current, {
    opacity: 0,
    y: -100,
    rotationY: -180,
    duration: 2,
    ease: "power4.out",         // smooth, snappy finish
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 45%",
      end: "top -55%",
      scrub: 1.3,
      // markers: true
    },
  });

  // down from y (smooth)
  gsap.from(techCard3.current, {
    opacity: 0,
    y: 100,
    rotationY: 180,
    duration: 2,
    ease: "power4.out",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 45%",
      end: "top -55%",
      scrub: 1.3,
    },
  });

  // right in from x (little overshoot)
  gsap.from(techCard4.current, {
    opacity: 0,
    x: 100,
    rotateX: 180,
    duration: 2,
ease: "power4.out",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 45%",
      end: "top -55%",
      scrub: 0.5,
    },
  });
});

  return (
    <div ref={sectionRef} className="flex flex-col items-center w-full min-h-screen overflow-hidden mt-0 lg pt-24 pb-20">
      <div className="text-center w-full max-w-3xl mx-auto px-4 mt-12 md:mt-24 mb-8 md:mb-12">
        <BlurText
          text="The Tech Ops Stack"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-4xl md:text-5xl font-black tracking-tight text-textMain justify-center"
        />
        <div className="w-20 h-[3px] bg-teal mx-auto mt-6 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
        <p className="text-textSubtle mt-6 md:text-lg mx-auto">
          These are the tools I use to keep your deployments boring and your workflows automated. No fluff, just the right tool for the job.
        </p>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto px-4 mt-6">
        
        {/* Panel 1 */}
        <div ref={techCard1} className="bg-elevated border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center hover:border-teal/30 hover:bg-[#131b2f] transition-all">
          <div className="md:w-1/3">
            <h3 className="text-lg font-bold text-textMain mb-2 uppercase tracking-widest text-teal">CI/CD & DevOps</h3>
            <p className="text-sm text-textSubtle">Lets me ship safer, smaller changes on autopilot instead of scary big-bang deploys.</p>
          </div>
          <div className="md:w-2/3 flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full border border-teal/50 bg-teal/5 text-textMain text-sm inline-flex items-center gap-2 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
              <img src="/icons/GitHub Actions.png" className="w-5 h-5" alt="" aria-hidden="true"/> GitHub Actions
            </span>
            <span className="px-4 py-2 rounded-full border border-teal/50 bg-teal/5 text-textMain text-sm inline-flex items-center gap-2 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
              <img src="/icons/Azure Devops.png" className="w-5 h-5" alt="" aria-hidden="true"/> Azure DevOps
            </span>
            <span className="px-4 py-2 rounded-full border border-teal/50 bg-teal/5 text-textMain text-sm inline-flex items-center gap-2 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
              <img src="/icons/docker-mark-blue.png" className="w-5 h-5" alt="" aria-hidden="true"/> Docker
            </span>
            <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-textMuted text-sm inline-flex items-center gap-2">
              <img src="/icons/windows.svg" className="w-5 h-5" alt="" aria-hidden="true"/> Windows / IIS
            </span>
            <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-textMuted text-sm inline-flex items-center gap-2">
              <img src="/icons/aws.svg" className="w-5 h-5" alt="" aria-hidden="true"/> AWS
            </span>
          </div>
        </div>

        {/* Panel 2 */}
        <div ref={techCard2} className="bg-elevated border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center hover:border-teal/30 hover:bg-[#131b2f] transition-all">
          <div className="md:w-1/3">
            <h3 className="text-lg font-bold text-textMain mb-2 uppercase tracking-widest text-blue">Automation</h3>
            <p className="text-sm text-textSubtle">The glue that connects your disconnected tools and kills manual data entry.</p>
          </div>
          <div className="md:w-2/3 flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full border border-teal/50 bg-teal/5 text-textMain text-sm inline-flex items-center gap-2 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
              <img src="/icons/n8n.png" className="w-5 h-5" alt="" aria-hidden="true"/> n8n
            </span>
            <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-textMuted text-sm inline-flex items-center gap-2">
              <img src="/icons/Python.png" className="w-5 h-5" alt="" aria-hidden="true"/> Python
            </span>
          </div>
        </div>

        {/* Panel 3 */}
        <div ref={techCard3} className="bg-elevated border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center hover:border-teal/30 hover:bg-[#131b2f] transition-all">
          <div className="md:w-1/3">
            <h3 className="text-lg font-bold text-textMain mb-2 uppercase tracking-widest text-blue">Backend & Infra</h3>
            <p className="text-sm text-textSubtle">Robust foundations for APIs and custom middle-tier integrations.</p>
          </div>
          <div className="md:w-2/3 flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-textMuted text-sm inline-flex items-center gap-2">
              <img src="/icons/node2.svg" className="w-5 h-5" alt="" aria-hidden="true"/> Node.js
            </span>
            <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-textMuted text-sm inline-flex items-center gap-2">
              <img src="/icons/express.png" className="w-5 h-5" alt="" aria-hidden="true"/> Express
            </span>
            <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-textMuted text-sm inline-flex items-center gap-2">
              <img src="/icons/MongoDB.png" className="w-5 h-5" alt="" aria-hidden="true"/> MongoDB
            </span>
            <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-textMuted text-sm inline-flex items-center gap-2">
              <img src="/icons/sql.png" className="w-5 h-5" alt="" aria-hidden="true"/> SQL Database
            </span>
            <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-textMuted text-sm inline-flex items-center gap-2">
              <img src="/icons/TypeScript.png" className="w-5 h-5" alt="" aria-hidden="true"/> TypeScript
            </span>
          </div>
        </div>

        {/* Panel 4 */}
        <div ref={techCard4} className="bg-elevated border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center hover:border-teal/30 hover:bg-[#131b2f] transition-all">
          <div className="md:w-1/3">
            <h3 className="text-lg font-bold text-textMain mb-2 uppercase tracking-widest text-blue">Project & API Tools</h3>
            <p className="text-sm text-textSubtle">Communication and testing tools to ensure everything runs smoothly.</p>
          </div>
          <div className="md:w-2/3 flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-textMuted text-sm inline-flex items-center gap-2">
              <img src="/icons/Postman.png" className="w-5 h-5" alt="" aria-hidden="true"/> Postman
            </span>
            <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-textMuted text-sm inline-flex items-center gap-2">
              <img src="/icons/Swagger.png" className="w-5 h-5" alt="" aria-hidden="true"/> Swagger
            </span>
            <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-textMuted text-sm inline-flex items-center gap-2">
              <img src="/icons/Slack.png" className="w-5 h-5" alt="" aria-hidden="true"/> Slack
            </span>
            <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-textMuted text-sm inline-flex items-center gap-2">
              <img src="/icons/Git.png" className="w-5 h-5" alt="" aria-hidden="true"/> Git
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default tech;
