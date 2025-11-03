"use client";
import ShinyText from "@/components/ShinyText";
import BlurText from "@/components/BlurText";
import GradientText from "@/components/GradientText";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import gsap from "gsap";
import router from "next/router";
import Link from "next/link";
import ScrollVelocity from "@/components/ScrollVelocity";
// NEED TO ADDD LENIS IN THE PROJECT SCROLL
function Projects() {
  gsap.registerPlugin(ScrollTrigger);
  const sectionRef = useRef(null);
  const texthead = useRef(null);

  useGSAP(() => {
    // left in from x (little overshoot)
    gsap.to(texthead.current, {
      opacity: 0,
      scale: 0.5,
      duration: 2,
      ease: "power4.out", // subtle overshoot then settle
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 14%",
        end: "top -55%",
        scrub: 1.3,
      },
    });
  });
  // const projects = [
  //   {
  //     id: 1,
  //     name: "Schoolage",
  //     image: "/projects/project2.png",
  //     description:
  //       "A complete academic management system for colleges and universities, covering attendance, exams, results, and invoicing.",
  //   },
  //   {
  //     id: 2,
  //     name: "Study Buddy",
  //     image: "/projects/project1.png",
  //     description:
  //       "A complete LMS for students from students having advance features like meeting tracker, today schedule and CGPA calculator",
  //   },
  //   {
  //     id: 3,
  //     name: "My To Do's",
  //     image: "/projects/project4.png",
  //     description:
  //       "A To Do List having advanced features like user management and multi device support.",
  //   },
  //   {
  //     id: 4,
  //     name: "Student LMS",
  //     image: "/projects/project3.png",
  //     description:
  //       "A complete student LMS helping students keep track of their quizzes, assignments and schedules",
  //   },
  // ];
const projects = [
  {
    id: 1,
    name: "Schoolage",
    image: "/projects/project2.png",
    video: "/demos/campusflow.mp4",
    description:
      "A complete college and university management system — from attendance tracking to exam management, results, and invoicing, all in one integrated platform.",
    tech: ["Angular", "Node.js", "MySQL", "Firebase"],
    category: "Full Stack",
    liveUrl: "http://admin-dev.schoolage.net/dashboard",
    githubUrl: "https://github.com/QaribIqbal/Portfolio",
  },
  {
    id: 2,
    name: "StuddyBuddy",
    image: "/projects/project1.png",
    video: "/demos/lms.mp4",
    description:
      "A To Do List having advanced features like user management and multi device support.",
    tech: ["Flutter", "Firebase", "OpenAI API"],
    category: "Mobile App",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    name: "Student LMS",
    image: "/projects/project3.png",
    video: "/demos/pbay.mp4",
    description:
      "An OLX-inspired social marketplace with bidding, real-time chat, and a clean modern UI — built to make buying and selling fun and trustworthy.",
    tech: ["Vue.js", "Express.js", "MongoDB", "Firebase Auth"],
    category: "Web App",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    name: "Taskify Pro",
    image: "/projects/project4.png",
    video: "/demos/taskify.mp4",
    description:
      "A task and project management tool with analytics, timelines, and real-time team collaboration — designed to boost productivity across organizations.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis"],
    category: "Web App",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    name: "Shoe Ecommerce Store",
    image: "/projects/project5.png",
    video: "/demos/Shoes.mp4",
    description:
      "A very simple ecommerce store frontend built using pure HTML, CSS and JavaScript.",
    tech: ["HTML5", "CSS", "JavaScript"],
    category: "Full Stack",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    name: "Discount Valley App",
    image: "/projects/project6.png",
    video: "/demos/discount.mp4",
    description:
      "An app that help you find offers around in your cards based on your location and preferences.",
    tech: ["Flutter", "ExpressJS", "MongoDB"],
    category: "Mobile App",
    liveUrl: "#",
    githubUrl: "#",
  },
];
  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center justify-center align-center w-full min-h-[100vh] overflow-none pa-0 lg hide-scrollbar"
    >
      <div ref={texthead} className=" text-center m-auto mb-0 mt-10">
        <BlurText
          text="My Projects"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        />
        <div className="w-20 h-[3px] bg-indigo-500 mx-auto mt-3 rounded-full"></div>
      </div>
      <div className="flex flex-col items-center w-full max-h-[80vh] overflow-none mt-0">
        <ScrollStack
          className="min-w-[100vw]"
          itemDistance={150}
          itemScale={0.05}
          itemStackDistance={35}
          stackPosition="10%"
          scaleEndPosition="15%"
          baseScale={0.8}
        >
          {projects.map((project) => (
            <ScrollStackItem
              key={project.id}
              itemClassName="bg-blue-900/20 backdrop-blur-md border border-gray-200 overflow-hidden"
            >
              <div className="w-full h-full flex flex-col lg:flex-row">
                {/* Image Section - 60% */}
                <div className="lg:w-3/5 w-full h-full flex items-center justify-center p-0 lg:p-0">
                  <div className="relative w-full h-full lg:h-80 flex items-center justify-center">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="max-w-full max-h-full object-contain "
                      style={{
                        width: "auto",
                        height: "auto",
                        maxWidth: "95%",
                        maxHeight: "100%",
                      }}
                    />
                  </div>
                </div>

                {/* Content Section - 40% */}
                <div className=" md:flex lg:w-2/5 w-full p-0 lg:p-8 flex flex-col justify-center">
                  <div className="mx-auto">
                    <GradientText
                      // colors={["#116b42ff", "#123075ff", "#4bfbacff", "#02143dff", "#016035ff"]}
                      colors={[
                        "#40ffaa",
                        "#4079ff",
                        "#40ffaa",
                        "#4079ff",
                        "#40ffaa",
                      ]}
                      animationSpeed={8}
                      showBorder={false}
                      className="text-3xl font-bold mb-4 p-1"
                    >
                      {project.name}
                    </GradientText>
                  </div>
                  <p className="hidden md:flex text-lg mb-6">
                    {project.description}
                  </p>
                  <div className="hidden md:flex flex flex-col justify-center sm:flex-row gap-4">
                    <Link href={`/Portfolio`} prefetch={true}>
                      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium cursor-pointer">
                        More Details
                      </button>
                    </Link>
          
                    {project.githubUrl !=='#' && <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                    <button className="hidden md:block px-6 py-3 border border-gray-300 bg-gray-300/30 text-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition font-medium cursor-pointer transition">
                      Source Code
                    </button>
                      </a> }
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
        <div className="flex justify-center items-center mt-2">
          <button
            onClick={() => (window.location.href = "/Portfolio")}
            className="relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-blue-900 to-green-700 text-white font-semibold text-lg tracking-wide shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,0,0,0.6)] hover:scale-[1.05] active:scale-[0.98] transition-all duration-300 overflow-hidden group cursor-pointer"
          >
            <span className="relative z-10">
              <ShinyText
                text="Explore My Work →"
                disabled={false}
                speed={2.5}
                className="font-semibold text-lg text-silver-900"
              />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </div>
      </div>

     
    </div>
  );
}

export default Projects;
