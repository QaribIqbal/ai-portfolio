import LightRays from "../components/LightRays";
import CardNav from "../components/CardNav";
import TextType from "../components/TextType";
const hero = () => {
     const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        {
          label: "Company",
          href: "/about/company",
          ariaLabel: "About Company",
        },
        {
          label: "Careers",
          href: "/about/careers",
          ariaLabel: "About Careers",
        },
      ],
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        {
          label: "Featured",
          href: "/projects/featured",
          ariaLabel: "Featured Projects",
        },
        {
          label: "Case Studies",
          href: "/projects/case-studies",
          ariaLabel: "Project Case Studies",
        },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        {
          label: "Email",
          href: "mailto:info@company.com",
          ariaLabel: "Email us",
        },
        {
          label: "Twitter",
          href: "https://twitter.com/company",
          ariaLabel: "Twitter",
        },
        {
          label: "LinkedIn",
          href: "https://linkedin.com/company",
          ariaLabel: "LinkedIn",
        },
      ],
    },
  ];
  return (
 <div className="flex justify-center items-center w-screen h-screen mb-0">
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#4191ff"
          raysSpeed={1.6}
          lightSpread={0.5}
          rayLength={8.9}
          followMouse={true}
          mouseInfluence={0.3}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
        />
        <CardNav
          logoAlt="Company Logo"
          items={items}
          baseColor="#98a1bdff"
          menuColor="#132159ff"
          buttonBgColor="#132159ff"
          buttonTextColor="#fff"
          ease="power3.out"
        />
        <h1 className="center ">
          <TextType
            text={[
              "Hi, I'm Qarib. A Full Stack Web And Mobile Developer.",
              "Let's Automate Your Business.",
              "I Design. I Build. I Scale.",
              "Crafting Digital Experiences For Over 2+ Years.",
              "Empowering Brands Through Latest Technologies.",
              "Turning Ideas into Impact.",
            ]}
            className="text-4xl md:text-5xl lg:text-5xl font-bold text-white"
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />
        </h1>
      </div>
    </div>
  )
}

export default hero