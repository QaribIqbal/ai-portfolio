"use client";

import GlassIcons from "@/components/GlassIcons";
import GradientText from "@/components/GradientText";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import gsap from "gsap";
const items = [
  {
    icon: <img src="/icons/linkedin.png" alt="Linkedin" className="w-6 h-6" />,
    color: "blue",
    label: "Linkedin",
    href: "https://linkedin.com",
  },
  {
    icon: <img src="/icons/fiverr.png" alt="Fiverr" className="w-6 h-6" />,
    color: "green",
    label: "Fiverr",
    href: "https://linkedin.com",
  },
  {
    icon: <img src="/icons/upwork.png" alt="Upwork" className="w-6 h-6" />,
    color: "white",
    label: "Upwork",
    href: "https://linkedin.com",
  },
  {
    icon: <img src="/icons/whatsapp.png" alt="Whatsapp" className="w-6 h-6" />,
    color: "darkgreen",
    label: "Whatsapp",
    href: "https://linkedin.com",
  },

  //   { icon: <FiCloud />, color: 'indigo', label: 'Weather' },
  //   { icon: <FiEdit />, color: 'orange', label: 'Notes' },
  //   { icon: <FiBarChart2 />, color: 'green', label: 'Stats' },
];

function socials() {
  gsap.registerPlugin(ScrollTrigger);
  const sectionRef = useRef(null);
  const glassicon = useRef(null);
  const textmain = useRef(null);

  useGSAP(() => {
    // left in from x (little overshoot)
    gsap.from(glassicon.current, {
      opacity: 0,
      scale: 0,
      duration: 1,
      ease: "elastic.out(1,0.5)",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 30%",
        end: "top -5%",
        scrub: 2,
      },
    });
    gsap.from(textmain.current, {
      opacity: 0,
      scale: 0,
      duration: 1,
      ease: "elastic.out(1,0.5)",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 30%",
        end: "top -5%",
        scrub: 2,
      },
    });
  });
  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center justify-center w-full h-[100vh]  overflow-x-hidden mt-0 pt-40 lg "
    >
      <div ref={textmain}>
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class text-4xl font-black mb-10"
        >
          Let's Get In Touch!
        </GradientText>
      </div>
      <div ref={glassicon}>
        <GlassIcons items={items} className="custom-class" />
      </div>
    </div>
  );
}

export default socials;
