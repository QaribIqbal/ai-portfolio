"use client";
import BlurText from "@/components/BlurText";
import DecryptedText from "@/components/DecryptedText";
import ProfileCard from "@/components/ProfileCard";
import SplitText from "@/components/SplitText";
import { useGSAP } from '@gsap/react';
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

useGSAP
export default function AboutMe() {
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
      // scale:0.9,
      duration: 1.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 10%",
        end: "top -5%",
        scrub : 1.2
      },
    });
   
  });
  return (
    <section  ref={sectionRef} className="flex flex-col items-center justify-center w-full min-h-screen px-6 py-20 lg:px-20 lg text-white">
      {/* Heading */}
      <div className="text-center mb-26">
        <SplitText
          text="ABOUT ME"
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
        />
        <div className="w-20 h-[3px] bg-indigo-500 mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Content Layout */}
      <div  ref={card1} className="flex flex-col-reverse lg:flex-row items-center justify-between w-full gap-12">
        {/* Text Section */}
        <div className="w-full lg:w-2/3 text-center lg:text-left">
          <DecryptedText
            text={`Hi, I’m Qarib Iqbal — a Full-Stack Developer and tech enthusiast from Lahore, Pakistan.
I’m passionate about turning ideas into functional, high-performing digital products that actually solve real-world problems.

I started my coding journey during my first semester of Computer Science, and since then, I’ve worked across multiple technologies — including Angular, React, Flutter, Node.js, Express, MongoDB, and MySQL.
I specialize in building modern web apps, cross-platform mobile solutions, and efficient backend systems that are both scalable and user-focused.

I’ve also co-developed projects like PBay, a Pakistan-based marketplace designed to rival OLX, where I handled business development, marketing, and backend strategy. Alongside freelancing and startup building, I’m continuously learning AI and machine learning to bring intelligent automation into my future projects.

What sets me apart is my mindset — I don’t just code; I create solutions that help businesses grow.
Whether you need a pixel-perfect frontend, a robust backend, or a complete product strategy, I can help you build it from the ground up.

Let’s turn your idea into something remarkable.`}
animateOn="view"          
className="text-base md:text-lg font-medium leading-relaxed text-gray-300 max-w-3xl mx-auto lg:mx-0"
          />
        </div>

        {/* Profile Card */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <ProfileCard
            name="Qarib Iqbal"
            title="Full-Stack Developer"
            handle="qaribiqbal"
            status="Available for Work"
            contactText="Contact Me"
            avatarUrl="/me.png"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => console.log("Contact clicked")}
          />
        </div>
      </div>
    </section>
  );
}
