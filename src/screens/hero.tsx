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
 <div className=" flex flex-col justify-center items-center w-full h-[100vh] mb-0 bg-[#0D0716]">
        <CardNav
          logoAlt="Company Logo"
          items={items}
          baseColor="#c6d3f1ff"
          menuColor="#132159ff"
          buttonBgColor="#132159ff"
          buttonTextColor="#fff"
          ease="power3.out"
        />
        <h1 className="mx-auto lg:w-[41%] flex-wrap">
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
    // </div>
  )
}

export default hero