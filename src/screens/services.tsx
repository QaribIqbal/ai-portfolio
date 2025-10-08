import BlurText from "@/components/BlurText"
import SpotlightCard from "@/components/SpotlightCard"
const services = () => {
  return (
  <div className="flex flex-col items-center  w-screen min-h-screen mt-0">
    {/* Heading Section */}
    <div className=" text-center m-auto mb-10 mt-20">
      <BlurText
        text="Services I'm Providing"
        delay={150}
        animateBy="words"
        direction="top"
        className="text-4xl font-semibold"
      />
    </div>

    {/* Cards Section */}
   <div className="flex flex-wrap justify-center items-start gap-6 mt-10 px-4">
  <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(6, 96, 206, 0.25)">
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

  <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(6, 96, 206, 0.25)">
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

  <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(6, 96, 206, 0.25)">
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
);

}

export default services