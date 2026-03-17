"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Play, ExternalLink, Github, X } from "lucide-react";
import GooeyNav from "@/components/GooeyNav";
import Link from "next/link";
import BlurText from "@/components/BlurText";
import LightRays from "@/components/LightRays";

gsap.registerPlugin(ScrollTrigger);

 const items = [
    { label: "About Me", href: "/" },
    { label: "Work", href: "/Portfolio" },
    { label: "Contact", href: "/#connect" },
  ];
const projects = [
  {
    id: 1,
    title: "Marketing Agency Automation",
    image: "/projects/project2.png",
    video: "/demos/campusflow.mp4",
    description:
      "Problem: A marketing agency spent hours pulling manual campaign data. \nSolution: Built n8n workflows for automated pipelines, CRM syncs, and email summaries. \nOutcome: Reclaimed hours per week and stopped reporting errors.",
    tech: ["n8n", "CRMs", "APIs"],
    category: "Automation",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "SaaS CI/CD Setup",
    image: "/projects/project1.png",
    video: "/demos/lms.mp4",
    description:
      "Problem: Early-stage SaaS team had fragile, manual deployment processes. \nSolution: Configured a CI/CD pipeline via GitHub Actions, VPS environment separation, and zero-downtime updates. \nOutcome: Predictable releases and no more surprise downtime.",
    tech: ["GitHub Actions", "Docker", "VPS", "Windows / IIS"],
    category: "DevOps",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "SaaS Backend & Infrastructure",
    image: "/projects/project4.png",
    video: "/demos/taskify.mp4",
    description:
      "Problem: A project management tool needed robust backend glue and continuous deployment. \nSolution: Hardened backend setup with Node.js and Azure DevOps pipelines. \nOutcome: Scalable APIs and a secure, monitored deployment pipeline.",
    tech: ["Node.js", "Azure DevOps", "Docker", "PostgreSQL"],
    category: "Backend & Infra",
    liveUrl: "#",
    githubUrl: "#",
  }
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
            <div className="absolute top-4 lg:top-6 left-4 lg:left-6 z-20 pointer-events-none">
              <span className="px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-bold rounded-full bg-teal text-main shadow-2xl border border-white/20">
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
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl lg:text-6xl font-black text-white/10 font-mono">
                {project.id.toString().padStart(2, "0")}
              </div>
              <div className="h-px flex-1 bg-teal/30" />
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
                  <span className="px-2 py-1 text-xs font-bold rounded-full bg-teal text-main">
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
            <h2 className="text-3xl lg:text-5xl xl:text-6xl font-black text-textMain mb-4 lg:mb-6 leading-tight">
              {project.title}
            </h2>
            <p className="text-base lg:text-lg xl:text-xl text-textMuted mb-6 lg:mb-8 leading-relaxed bg-main/40 backdrop-blur-lg p-5 lg:p-7 rounded-2xl border border-white/10">
              {project.description}
            </p>
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 lg:gap-3 mb-6 lg:mb-8">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm font-medium rounded-full bg-teal/10 text-teal border border-teal/30 hover:bg-teal/20 transition-all duration-300 hover:scale-105"
                >
                  {tech}
                </span>
              ))}
            </div>
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 lg:gap-4">
               {project.video !=='#' && <button
                onClick={() => onVideoClick(project.id)}
                className="flex items-center gap-2 lg:gap-3 px-6 py-3 lg:px-8 lg:py-4 bg-teal text-main font-bold rounded-xl lg:rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] text-sm lg:text-base cursor-pointer"
              >
                <Play className="w-4 h-4 lg:w-5 lg:h-5 fill-current" />
                Watch Demo
              </button>
              }

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
      className="min-h-screen w-full bg-main text-white relative overflow-x-clip isolate"
    >
      {/* Sticky Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-main/80 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse"></span>
            Qarib Iqbal
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#about" className="text-sm font-medium text-textMuted hover:text-white transition-colors">About</Link>
          <Link href="/#services" className="text-sm font-medium text-textMuted hover:text-white transition-colors">Services</Link>
          <Link href="/Portfolio" className="text-sm font-medium text-white transition-colors">Work</Link>
        </div>
        <div>
          <Link href="/#connect" className="bg-teal text-main px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-bold hover:scale-105 transition-transform shadow-[0_0_15px_rgba(34,197,94,0.3)] text-xs sm:text-sm">
            Fix My Deployments
          </Link>
        </div>
      </nav>

      {/* Floating GooeyNav (Keep but move to corner or hide on mobile if redundant) */}
      <div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-[400px] px-4 py-0 pointer-events-auto md:hidden"
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 h-[80vh]">
         <LightRays
          raysOrigin="top-center"
          raysColor="#22C55E" 
          raysSpeed={0.5}
          lightSpread={0.5}
          rayLength={5}
          followMouse={true}
          mouseInfluence={0.3}
          noiseAmount={0}
          distortion={0}
          fadeDistance={50}
          saturation={0.01}
          pulsating={false}
          className="z-0"
        />
      </div>
      {/* Header Section */}
      <div className="relative z-10 text-center pt-32 lg:pt-48 pb-12 lg:pb-20 px-4">
        <div className="main-title">
          <BlurText
            text="PROJECTS"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-6xl lg:text-8xl xl:text-9xl font-black text-textMain tracking-tight justify-center"
          />
          <div className="w-24 lg:w-32 h-1.5 bg-teal mx-auto mb-10 mt-8 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
          <p className="text-lg lg:text-xl xl:text-2xl text-textMuted max-w-3xl lg:max-w-4xl mx-auto leading-relaxed font-light px-4">
            A look at how I’ve helped teams automate workflows, secure deployments, and replace fragile ops with rock-solid infrastructure.
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
