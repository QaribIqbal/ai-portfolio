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

  // useGSAP(() => {
  //   // Animate heading
  //   gsap.from(techCard1.current, {
  //     opacity: 0,
  //     x: -100,
  //     rotationX:-180,
  //     duration: 2,
  //     scrollTrigger: {
  //       trigger: sectionRef.current,
  //       start: "top 30%",
  //       end: "top -5%",
  //   //       scrub: 1.3,
  //     },
  //   });
  //   gsap.from(techCard2.current, {
  //     opacity: 0,
  //     y: -100,
  //     rotationY:-180,
  //     duration: 2,
  //     scrollTrigger: {
  //       trigger: sectionRef.current,
  //       start: "top 30%",
  //       end: "top -5%",
  //   //       scrub: 1.3,
  //     },
  //   });
  //   gsap.from(techCard3.current, {
  //     opacity: 0,
  //     y: 100,
  //     rotationY:180,
  //     duration: 2,
  //     scrollTrigger: {
  //       trigger: sectionRef.current,
  //       start: "top 30%",
  //       end: "top -5%",
  //   //       scrub: 1.3,
  //     },
  //   });
  //    gsap.from(techCard4.current, {
  //     opacity: 0,
  //     x: 100,
  //     rotateX:180,
  //     duration: 2,
  //     scrollTrigger: {
  //       trigger: sectionRef.current,
  //       start: "top 30%",
  //       end: "top -5%",
  //   //       scrub: 1.3,
  //     },
  //   });
  // });
  useGSAP(() => {
  // left in from x (little overshoot)
  gsap.from(techCard1.current, {
    opacity: 0,
    x: -100,
    rotationX: -180,
    duration: 5,
ease: "power4.out",      // subtle overshoot then settle
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 30%",
      end: "top -5%",
      scrub: 1.3,
    },
  });

  // up from y (smooth)
  gsap.from(techCard2.current, {
    opacity: 0,
    y: -100,
    rotationY: -180,
    duration: 5,
    ease: "power4.out",         // smooth, snappy finish
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 30%",
      end: "top -5%",
      scrub: 1.3,
    },
  });

  // down from y (smooth)
  gsap.from(techCard3.current, {
    opacity: 0,
    y: 100,
    rotationY: 180,
    duration: 5,
    ease: "power4.out",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 30%",
      end: "top -5%",
      scrub: 1.3,
    },
  });

  // right in from x (little overshoot)
  gsap.from(techCard4.current, {
    opacity: 0,
    x: 100,
    rotateX: 180,
    duration: 5,
ease: "power4.out",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 30%",
      end: "top -5%",
      scrub: 0.5,
    },
  });
});

  return (
    <div ref={sectionRef} className="flex flex-col items-center  w-full min-h-[80vh] overflow-x-hidden mt-0 lg">
      <div className=" text-center m-auto mb-10 mt-20">
        <BlurText
          text="Technologies I Use"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-4xl font-bold"
        />
      </div>
      <div className="flex flex-wrap justify-center items-start gap-6 mt-10 px-4">
        <div ref={techCard1}>
          <SpotlightCard
            className="custom-spotlight-tech-card"
            spotlightColor="rgba(6, 96, 206, 0.25)"
          >
            <h3 className=" mb-1">Frontend</h3>
            <div className="flex flex-row flex-wrap items-center justify-center gap-3 overflow-hidden">
              <span>
                <img
                  src="/icons/angular.png"
                  alt="Web Development"
                  className="w-12.5 h-12.5 mb-1"
                />
              </span>
            
              <span>
                <img
                  src="/icons/react.png"
                  alt="Web Development"
                  className="w-12.5 h-12.5 mb-1"
                />
              </span>
              <span>
                <img
                  src="/icons/vuesm.png"
                  alt="Web Development"
                  className="w-12.5 h-12.5 mb-1"
                />
              </span>
                <span>
                <img
                  src="/icons/next.png"
                  alt="Web Development"
                  className="w-12.5 h-12.5 mb-1"
                />
              </span>
               <span>
                <img
                  src="/icons/Nuxt JS.png"
                  alt="Web Development"
                  className="w-12.5 h-12.5 mb-1"
                />
              </span>
            </div>
          </SpotlightCard>
        </div>
        <div ref={techCard2}>
          <SpotlightCard
            className="custom-spotlight-tech-card"
            spotlightColor="rgba(6, 96, 206, 0.25)"
          >
            <h3 className="text-lg font-semibold mb-1">Backend</h3>
            <div className="flex flex-row flex-wrap items-center justify-center gap-3 overflow-hidden">
              <span>
                <img
                  src="/icons/MongoDB.png"
                  alt="Web Development"
                  className="w-12.5 h-12.5 mb-1"
                />
              </span>
              <span>
                <img
                  src="/icons/sql.png"
                  alt="Web Development"
                  className="w-12.5 h-12.5 mb-1"
                />
              </span>
              <span>
                <img
                  src="/icons/node2.svg"
                  alt="Web Development"
                  className="w-12.5 h-12.5 mb-1"
                />
              </span>
                <span>
                <img
                  src="/icons/express.png"
                  alt="Web Development"
                  className="w-12.5 h-12.5 mb-1"
                />
              </span>
            </div>
          </SpotlightCard>
        </div>
        {/* <div ref={techCard3}>
          <SpotlightCard
            className="custom-spotlight-tech-card"
            spotlightColor="rgba(6, 96, 206, 0.25)"
          >
            <img
              src="/icon-design.svg"
              alt="UI/UX Design"
              className="w-12.5 h-12.5 mb-1"
            />
            <h3 className="text-lg font-semibold mb-1">UI/UX Design</h3>
            <p className="text-sm text-gray-300">
              Design intuitive interfaces and enhance user experience.
            </p>
          </SpotlightCard>
        </div> */}
          <div ref={techCard3}>
          <SpotlightCard
            className="custom-spotlight-tech-card"
            spotlightColor="rgba(6, 96, 206, 0.25)"
          >
            <h3 className="text-lg font-semibold mb-1">Cross-Platform App</h3>
            <div className="flex flex-row flex-wrap items-center justify-center gap-2 overflow-hidden">
              <span>
                <img
                  src="/icons/flutter.png"
                  alt="Web Development"
                  className="w-12.5 h-12.5 mb-1"
                />
              </span>             
            </div>
          </SpotlightCard>
        </div>
         <div ref={techCard4}>
          <SpotlightCard
            className="custom-spotlight-tech-card"
            spotlightColor="rgba(6, 96, 206, 0.25)"
          >
            <h3 className="text-lg font-normal mb-1">AI Automation</h3>
            <div className="flex flex-row flex-wrap items-center justify-center gap-2 overflow-hidden">
              <span>
                <img
                  src="/icons/n8n.png"
                  alt="Web Development"
                  className="w-12.5 h-12.5 mb-1"
                />
              </span>       
               <span>
                <img
                  src="/icons/Python.png"
                  alt="Web Development"
                  className="w-12.5 h-12.5 mb-1"
                />
              </span>             
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}

export default tech;
