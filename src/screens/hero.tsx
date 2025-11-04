"use client";
// import LightRays from "../components/LightRays";
import CardNav from "../components/CardNav";
import TextType from "../components/TextType";
import React, { useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GooeyNav from "@/components/GooeyNav";


const hero = () => {

 const items = [
  { label: "About Me", href: "/#about" },     // absolute fragment -> always targets home
  { label: "Work", href: "/Portfolio" }, // use lowercase / correct route path
  { label: "Contact", href: "/#connect" } // absolute contact fragment
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
    <div 
      ref={sectionRef}
      className=" flex flex-col justify-center items-center w-full min-h-screen"
    >
      <div className="flex flex-col md:flex-row justify-between items-center min-h-screen md:px-50 mt-0">
    
        <div
          className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50 w-100 px-4 py-0 pointer-events-auto"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GooeyNav
            items={items}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
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
