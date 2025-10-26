"use client";
// import LightRays from "../components/LightRays";
import CardNav from "../components/CardNav";
import TextType from "../components/TextType";
import React, { useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useGSAP } from "@gsap/react";
 import gsap from "gsap";
 import { ScrollTrigger } from "gsap/ScrollTrigger";

const hero = () => {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        {
          label: "Company",
          href: "/about/company",
          ariaLabel: "About Company",
        },
        {
          label: "Careers",
          href: "/about/careers",
          ariaLabel: "About Careers",
        },
      ],
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        {
          label: "Featured",
          href: "/projects/featured",
          ariaLabel: "Featured Projects",
        },
        {
          label: "Case Studies",
          href: "/projects/case-studies",
          ariaLabel: "Project Case Studies",
        },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        {
          label: "Email",
          href: "mailto:info@company.com",
          ariaLabel: "Email us",
        },
        {
          label: "Twitter",
          href: "https://twitter.com/company",
          ariaLabel: "Twitter",
        },
        {
          label: "LinkedIn",
          href: "https://linkedin.com/company",
          ariaLabel: "LinkedIn",
        },
      ],
    },
  ];

   gsap.registerPlugin(ScrollTrigger);
  const sectionRef = useRef(null);
  const texthead = useRef(null);
  useGSAP(() => {
    // left in from x (little overshoot)
    gsap.from(texthead.current, {
      opacity: -1,
      scale: 0.5,
      duration: 5,
      ease: "power4.out", // subtle overshoot then settle
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 14%",
        end: "top -55%",
      },
    });
  });
  return (
    <div ref={sectionRef} className=" flex flex-col justify-center items-center w-full min-h-[100vh]">
       <div className="flex flex-col md:flex-row justify-between items-center min-h-screen md:px-50 mt-0">
     <div>
      <CardNav
        logoAlt="Company Logo"
        items={items}
        baseColor="linear-gradient(90deg, rgba(13,30,99,0.45), rgba(30,40,70,0.25))"
        menuColor="#e6eef8"
        buttonBgColor="#0d1e63cc"
        buttonTextColor="#fff"
        ease="power3.out"
        className="text-black mb-0" // override internals if CardNav accepts className
      />
      </div>
        <div className="min-w-[100vw] md:min-w-[55vw] mx-auto">
          <TextType
            text={[
              "Hi, I'm Qarib. A Full Stack Web And Mobile Developer.",
              "Let's Automate Your Business.",
              "I Design. I Build. I Scale.",
              "Crafting Digital Experiences For Over 2+ Years.",
              "Empowering Brands Through Latest Technologies.",
              "Turning Ideas into Impact.",
            ]}
            className="text-4xl md:text-5xl lg:text-7xl font-black text-white"
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />
        </div>

        <div ref={texthead} className="min-w-[100vw] md:min-w-[25vw]">
          <DotLottieReact
            src="https://lottie.host/32bbce24-c07f-4e2d-9e65-49d9a5b4f5f0/pTWgQm2auo.lottie"
            loop
            autoplay
            width="95%"
            height="95%"
            // style={{ width: "100%", height: "auto", display: "block" }}
            layout={{ fit: "contain", align: [0.5, 0.5] }}
            renderConfig={{ autoResize: true, devicePixelRatio: 1.5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default hero;
