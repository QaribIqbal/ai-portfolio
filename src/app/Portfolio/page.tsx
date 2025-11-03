"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Play, ExternalLink, Github, X } from "lucide-react";
import GooeyNav from "@/components/GooeyNav";

gsap.registerPlugin(ScrollTrigger);

 const items = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/Portfolio" },
    { label: "Contact", href: "/#connect" },
  ];
const projects = [
  {
    id: 1,
    title: "Schoolage",
    image: "/projects/project2.png",
    video: "/demos/Schoolage.mp4",
    description:
      "A complete college and university management system — from attendance tracking to exam management, results, and invoicing, all in one integrated platform.",
    tech: ["Angular", "Node.js", "MySQL", "Duende"],
    category: "Full Stack",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "StuddyBuddy",
    image: "/projects/project1.png",
    video: "/demos/lms.mp4",
    description:
      "A To Do List having advanced features like user management and multi device support.",
    tech: ["Flutter", "Firebase", "OpenAI API"],
    category: "Mobile App",
    liveUrl: "https://studybuddysample.netlify.app/",
    githubUrl: "https://github.com/QaribIqbal/LMS-REACT",
  },
  {
    id: 3,
    title: "Student LMS",
    image: "/projects/project3.png",
    video: "/demos/pbay.mp4",
    description:
      "An OLX-inspired social marketplace with bidding, real-time chat, and a clean modern UI — built to make buying and selling fun and trustworthy.",
    tech: ["Vue.js", "Express.js", "MongoDB", "Firebase Auth"],
    category: "Web App",
    liveUrl: "#",
    githubUrl: "https://github.com/QaribIqbal/LMS-REACT",
  },
  {
    id: 4,
    title: "Taskify Pro",
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
    title: "Shoe Ecommerce Store",
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
    title: "Discount Valley App",
    image: "/projects/project6.png",
    video: "/demos/discount.mp4",
    description:
      "An app that help you find offers around in your cards based on your location and preferences.",
    tech: ["Flutter", "ExpressJS", "MongoDB"],
    category: "Mobile App",
    liveUrl: "#",
    githubUrl: "#",
  },
  // {
  //   id: 6,
  //   title: "BlockWave",
  //   image: "/projects/project6.png",
  //   video: "/demos/blockwave.mp4",
  //   description:
  //     "A web blocker extension that helps users stay focused by dynamically blocking distracting websites using regex-based matching and smart scheduling.",
  //   tech: ["Chrome API", "JavaScript", "Local Storage"],
  //   category: "Browser Extension",
  //   liveUrl: "#",
  //   githubUrl: "#",
  // },
];

interface Project {
  id: number;
  title: string;
  image: string;
  video: string;
  description: string;
  tech: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
}

type CardProps = {
  project: Project;
  index: number;
  onVideoClick: (id: number) => void;
};

const ProjectCard = ({ project, index, onVideoClick }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (mediaRef.current && cardRef.current) {
        ScrollTrigger.create({
          trigger: cardRef.current,
          start: "top center",
          end: "bottom center",
          onEnter: () =>
            gsap.to(mediaRef.current, {
              scale: 1.05,
              duration: 0.8,
              ease: "power2.out",
            }),
          onLeave: () =>
            gsap.to(mediaRef.current, {
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
            }),
          onEnterBack: () =>
            gsap.to(mediaRef.current, {
              scale: 1.05,
              duration: 0.8,
              ease: "power2.out",
            }),
          onLeaveBack: () =>
            gsap.to(mediaRef.current, {
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
            }),
        });
      }
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, cardRef);
    return () => ctx.revert();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className="project-wrapper group relative isolate min-h-screen flex items-center py-10 lg:py-20"
    >

      {/* Background Glow Effect */}
      <div
        className={`absolute inset-0 -z-10 pointer-events-none transition-opacity duration-1000
          ${
            isEven
              ? "bg-gradient-to-l from-blue-500/5 to-transparent"
              : "bg-gradient-to-r from-blue-500/5 to-transparent"
          }
          group-hover:opacity-100 opacity-0`}
      />

      <div
        className={`flex flex-col lg:flex-row w-full ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        } items-center`}
      >
        {/* Media Column - Sticky */}
        <div className="hidden lg:block w-full lg:w-1/2 p-4 lg:p-8 lg:sticky lg:top-24 h-[60vh] lg:h-[80vh]">
          <div
            ref={mediaRef}
            className="relative z-10 w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden cursor-pointer group/media transition-all duration-700"
            onClick={() => onVideoClick(project.id)}
          >
            {/* Category Badge */}
            <div className="absolute top-4 lg:top-6 left-4 lg:left-6 z-20 pointer-events-none">
              <span className="px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-bold rounded-full bg-gradient-to-r from-blue-500 to-blue-500 text-white shadow-2xl border border-white/20">
                {project.category}
              </span>
            </div>

            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-all duration-700 group-hover/media:scale-110"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={index < 2}
            />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/media:opacity-100 transition-all duration-500 flex items-center justify-center pointer-events-none">
              <div className="w-14 h-14 lg:w-20 lg:h-20 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center transform scale-90 group-hover/media:scale-100 transition-transform duration-300 border border-white/30">
                <Play className="w-5 h-5 lg:w-8 lg:h-8 text-white ml-0.5 lg:ml-1 fill-current" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>
        </div>
        {/* Content Column */}
        <div
          className={`relative z-20 w-full lg:w-1/2 p-4 lg:p-8 xl:p-12 flex flex-col justify-center ${
            isEven ? "lg:pr-8 xl:pr-16" : "lg:pl-8 xl:pl-16"
          }`}
        >
          <div
            ref={contentRef}
            className="project-content max-w-2xl mx-auto lg:mx-0 w-full"
          >
            {/* Project Number */}
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl lg:text-6xl font-black text-white/10">
                {project.id.toString().padStart(2, "0")}
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
            </div>

            {/* Mobile Media - Visible on small screens */}
            <div
              className="lg:hidden mb-6 relative rounded-xl lg:rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => onVideoClick(project.id)}
            >
              <div className="aspect-video relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index < 2}
                />
                <div className="absolute top-3 left-3 pointer-events-none">
                  <span className="px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-blue-500 to-blue-500 text-white">
                    {project.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center">
                    <Play className="w-5 h-5 text-white ml-0.5 fill-current" />
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-3xl lg:text-5xl xl:text-6xl font-black text-white mb-4 lg:mb-6 leading-tight">
              {project.title}
            </h2>
            <p className="text-base lg:text-lg xl:text-xl text-gray-300 mb-6 lg:mb-8 leading-relaxed bg-white/5 backdrop-blur-lg p-4 lg:p-6 rounded-xl lg:rounded-2xl border border-white/10">
              {project.description}
            </p>
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 lg:gap-3 mb-6 lg:mb-8">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-400/30 hover:bg-blue-500/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105"
                >
                  {tech}
                </span>
              ))}
            </div>
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 lg:gap-4">
              <button
                onClick={() => onVideoClick(project.id)}
                className="flex items-center gap-2 lg:gap-3 px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-500 to-blue-900 hover:from-green-600 hover:to-green-900 cursor-pointer text-white font-semibold rounded-xl lg:rounded-2xl transition-all duration-600 hover:scale-105 hover:shadow-2xl shadow-lg text-sm lg:text-base transition-colors duration-700 ease-in-out"
              >
                <Play className="w-4 h-4 lg:w-5 lg:h-5" />
                Watch Demo
              </button>

              {project.liveUrl !== "#" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="flex items-center gap-2 lg:gap-3 px-6 py-3 lg:px-8 lg:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 text-white font-semibold rounded-xl lg:rounded-2xl transition-all duration-300 hover:scale-105 text-sm lg:text-base">
                    <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5" />
                    Live Preview
                  </button>
                </a>
              )}
              {project.githubUrl !== "#" && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="flex items-center gap-2 lg:gap-3 px-6 py-3 lg:px-8 lg:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 text-white font-semibold rounded-xl lg:rounded-2xl transition-all duration-300 hover:scale-105 text-sm lg:text-base">
                    <Github className="w-4 h-4 lg:w-5 lg:h-5" />
                    Code
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type VideoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  project?: Project;
};

const VideoModal = ({ isOpen, onClose, project }: VideoModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center p-4 py-auto animate-in fade-in duration-300">
      <div className="absolute inset-0" onClick={onClose} />
      <div
        ref={modalRef}
        className="relative max-w-4xl lg:max-w-6xl w-full bg-gray-900 rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-white/10"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-blue-400 transition-colors duration-300 z-10 text-lg font-semibold flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full"
        >
          <X className="w-5 h-5" />
          Close
        </button>
        <div className="aspect-video relative">
          <video
            controls
            autoPlay
            className="w-full h-full object-contain bg-black"
            poster={project.image}
          >
            <source src={project.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* <div className="p-4 lg:p-6 bg-gray-800/50 backdrop-blur-sm">
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
            {project.title} - Demo
          </h3>
          <p className="text-gray-300 text-sm lg:text-base">
            {project.description}
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const currentProject = projects.find((p) => p.id === activeVideo);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".main-title",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".main-title",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.to(".floating-bg-1", {
        y: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".floating-bg-2", {
        y: 30,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white relative overflow-x-clip isolate"
    >
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
            initialActiveIndex={1}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="floating-bg-1 absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="floating-bg-2 absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent" />
      </div>
      {/* Header Section */}
      <div className="relative z-10 text-center pt-20 lg:pt-32 pb-12 lg:pb-20 px-4">
        <div className="main-title">
          {/* <h1 className="text-4xl lg:text-6xl xl:text-8xl font-black bg-gradient-to-r from-blue-400 via-blue-400 to-purple-500 bg-clip-text text-transparent leading-tight mb-4 lg:mb-6"> */}
          <h1 className="text-4xl lg:text-6xl xl:text-8xl font-black bg-gradient-to-r from-blue-200 via-blue-600 to-blue-900 bg-clip-text text-transparent leading-tight mb-4 lg:mb-6">

            PROJECTS
          </h1>
          <div className="w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-500 mx-auto mb-6 lg:mb-8 rounded-full" />
          <p className="text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-3xl lg:max-w-4xl mx-auto leading-relaxed font-light px-4">
            Immersive digital experiences that blend cutting-edge technology
            with exceptional design. Each project tells a unique story of
            innovation.
          </p>
        </div>
      </div>
      {/* Projects List */}
      <div className="relative z-10">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="border-b border-white/5 last:border-b-0"
          >
            <ProjectCard
              project={project}
              index={index}
              onVideoClick={setActiveVideo}
            />
          </div>
        ))}
      </div>
      {/* Video Modal */}
      <VideoModal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        project={currentProject}
      />
    </section>
  );
}
