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
        end: "top -50%",
        scrub : 1.2,
        // markers: true,
      },
    });
   
  });
  return (
    <section id="about"  ref={sectionRef} className="flex flex-col items-center justify-center w-full min-h-screen px-6 py-20 lg:px-20 lg text-white">
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
       <div className="w-full lg:w-2/3 text-center lg:text-left space-y-5 leading-relaxed text-gray-300">
  <p className="text-lg font-medium">
    Hi, I’m <span className="font-semibold text-white">Qarib Iqbal</span> — a passionate Full-Stack Developer and tech enthusiast from Lahore, Pakistan.
  </p>

  <p>
    I love transforming ideas into high-performing digital products that solve real-world problems — from concept to code.
  </p>

  <p>
    My journey began during my first semester of Computer Science, and since then, I’ve worked across a wide tech stack including 
    <span className="text-white font-medium"> Angular, React, Flutter, Node.js, Express, MongoDB,</span> and 
    <span className="text-white font-medium"> MySQL</span>. I specialize in building modern web apps, cross-platform mobile solutions, and efficient backend systems that are both scalable and user-focused.
  </p>

  <p>
    One of my highlight projects is <span className="text-white font-medium">PBay</span> — a Pakistan-based marketplace built to rival OLX. I co-developed it while leading business development, marketing, and backend strategy.
  </p>

  <p>
    Alongside freelancing and startup building, I’m actively learning <span className="text-white font-medium">AI and Machine Learning</span> to integrate intelligent automation into my future projects.
  </p>

  <p className="text-xl font-semibold text-white mt-6">
    I don’t just code — I craft solutions that help businesses grow.
  </p>

  <p>
    Whether you need a pixel-perfect frontend, a robust backend, or a complete product strategy — let’s build something remarkable together.
  </p>
  <div>
    <a
  href="/QaribIqbal_Resume.pdf"
  download="QaribIqbal_Resume.pdf"
  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
>
  Download CV
</a>

  </div>
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
