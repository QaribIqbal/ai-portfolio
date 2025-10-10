"use client";
import BlurText from "@/components/BlurText";
import LogoLoop from "@/components/LogoLoop";

const imageLogos = [
  {
    src: "/icons/Android Studio.png",
    alt: "Company 1",
    href: "https://company1.com",
  },
  { src: "/icons/Postman.png", alt: "Company 2", href: "https://company3.com" },
  {
    src: "/icons/Azure Devops.png",
    alt: "Company 3",
    href: "https://company1.com",
  },
  {
    src: "/icons/Tailwind CSS.png",
    alt: "Company 4",
    href: "https://company3.com",
  },
  { src: "/icons/Slack.png", alt: "Company 5", href: "https://company2.com" },
  {
    src: "/icons/Bootstrap.png",
    alt: "Company 6",
    href: "https://company2.com",
  },
  {
    src: "/icons/C++ (CPlusPlus).png",
    alt: "Company 7",
    href: "https://company3.com",
  },
  { src: "/icons/Python.png", alt: "Company 8", href: "https://company3.com" },
  { src: "/icons/CSS3.png", alt: "Company 9", href: "https://company2.com" },
  { src: "/icons/Git.png", alt: "Company 10", href: "https://company2.com" },
  { src: "/icons/GitHub.png", alt: "Company 11", href: "https://company3.com" },
  { src: "/icons/HTML5.png", alt: "Company 12", href: "https://company3.com" },
  {
    src: "/icons/Jupyter.png",
    alt: "Company 13",
    href: "https://company2.com",
  },
  { src: "/icons/Sass.png", alt: "Company 14", href: "https://company2.com" },
  { src: "/icons/sql.png", alt: "Company 15", href: "https://company3.com" },
  {
    src: "/icons/Swagger.png",
    alt: "Company 16",
    href: "https://company3.com",
  },
  {
    src: "/icons/TypeScript.png",
    alt: "Company 17",
    href: "https://company2.com",
  },
  {
    src: "/icons/Visual Studio Code (VS Code).png",
    alt: "Company 18",
    href: "https://company2.com",
  },
  {
    src: "/icons/Vite.js.png",
    alt: "Company 19",
    href: "https://company3.com",
  },
  {
    src: "/icons/JavaScript.png",
    alt: "Company 20",
    href: "https://company3.com",
  },
  {
    src: "/icons/GitHub Actions.png",
    alt: "Company 20",
    href: "https://company3.com",
  },
  {
    src: "/icons/docker-mark-blue.png",
    alt: "Company 21",
    href: "https://company3.com",
  },
];



function tools() {



  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh]  overflow-x-hidden mt-0 lg ">
      {" "}
      <div className="justify-center text-center mx-auto mb-10 mt-20">
        <BlurText
          text="Tools I Use"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-4xl font-bold"
        />
      </div>
      <LogoLoop
        logos={imageLogos}
        speed={90}
        direction="right"
        logoHeight={60}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#0557ca7d"
        ariaLabel="Technology partners"
        className="mt-20"
      />
    </div>
  );
}

export default tools;
