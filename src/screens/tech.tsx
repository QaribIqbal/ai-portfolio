import BlurText from "@/components/BlurText";
function tech() {
  return (
    <div className="flex flex-col items-center  w-full min-h-[700px] overflow-x-hidden mt-0 lg">
      <div className=" text-center m-auto mb-10 mt-20">
        <BlurText
          text="Technologies I Use"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-4xl font-bold"
        />
      </div>
    </div>
  );
}

export default tech;
