"use client";
import BlurText from "@/components/BlurText";
import SpotlightCard from "@/components/SpotlightCard";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import gsap from "gsap";

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
      y: 50,
      duration: 1.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top -80",
        markers: true,
        scrub : 1
      },
    });
    gsap.from(card2.current, {
      opacity: 0,
      y: -50,
      duration: 1.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top -80",
        markers: true,
        scrub : 1
      },
    });
    gsap.from(card3.current, {
      opacity: 0,
      x: 50,
      duration: 1.5,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top -80",
        markers: true,
        scrub: 1,
      },
    });
  });

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center  w-full min-h-[700px] overflow-x-hidden mt-0 lg"
    >
      {/* Heading Section */}
      <div className=" text-center m-auto mb-10 mt-20">
        <BlurText
          text="Services I'm Providing"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-4xl font-bold"
        />
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center items-start gap-6 mt-10 px-4">
        <div ref={card1}>
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(6, 96, 206, 0.25)"
          >
            <img
              src="/icon-dev.svg"
              alt="Web Development"
              className="w-12 h-12 mb-3"
            />
            <h3 className="text-lg font-semibold mb-1">Web Development</h3>
            <p className="text-sm text-gray-300">
              Build responsive and modern websites with latest technologies.
            </p>
          </SpotlightCard>
        </div>
        <div ref={card2}>
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(6, 96, 206, 0.25)"
          >
            <img
              src="/icon-app.svg"
              alt="App Development"
              className="w-12 h-12 mb-3"
            />
            <h3 className="text-lg font-semibold mb-1">App Development</h3>
            <p className="text-sm text-gray-300">
              Create cross-platform apps with Flutter and React Native.
            </p>
          </SpotlightCard>
        </div>
        <div ref={card3}>
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(6, 96, 206, 0.25)"
          >
            <img
              src="/icon-design.svg"
              alt="UI/UX Design"
              className="w-12 h-12 mb-3"
            />
            <h3 className="text-lg font-semibold mb-1">UI/UX Design</h3>
            <p className="text-sm text-gray-300">
              Design intuitive interfaces and enhance user experience.
            </p>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
};

export default services;
