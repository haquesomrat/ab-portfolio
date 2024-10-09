import React from "react";
import GridBackground from "./compoents/GridBackground";
import { RedSpotlight, Spotlight } from "./compoents/Spotlight";
import { Icons } from "../../global/icons";
import HeroBubbledIcon from "./compoents/HeroBubbledIcon";
import { Highlight } from "../../ui/hero-highlight";
import { TextGenerateEffect } from "../../ui/text-generate-effect";
import HeroTextContainer from "./compoents/HeroTextContainer";

const Hero = () => {
  return (
    <section className="p-5 xl:py-[84px] relative">
      {/* grid background */}
      <GridBackground />

      {/* blue splotlight */}
      <Spotlight
        className="-top-20 left-0 md:-left-44 md:-top-44"
        fill="#243560"
      />

      {/* red spotlight */}
      <RedSpotlight className="-top-60 right-0 md:-right-32" fill="#EC6272" />

      {/* bubbled icons */}
      <HeroBubbledIcon className="h-8 w-8 lg:w-[4.5rem] lg:h-[4.5rem] z-4 top-[37%] lg:top-[40%] animate-bounce">
        <Icons.figmaIcon />
      </HeroBubbledIcon>
      <HeroBubbledIcon className="h-8 w-8 lg:w-12 lg:h-12 z-10 top-[15%] lg:top-[15%] left-[55%] lg:left-[25%] animate-pulse">
        <Icons.nodejsIcon />
      </HeroBubbledIcon>
      <HeroBubbledIcon className="h-8 w-8 lg:w-[2.5rem] lg:h-[2.5rem] z-4 top-[39%] lg:top-[35%] right-[7%] md:right-[15%] lg:right-[7%] animate-spin-slow">
        <Icons.githubIcon />
      </HeroBubbledIcon>
      <HeroBubbledIcon className="h-8 w-8 lg:w-14 lg:h-14 z-10 top-[63%] lg:top-[78%] right-[5%] lg:right-1/4 animate-flip">
        <Icons.javascriptIcon />
      </HeroBubbledIcon>

      {/* text container  */}
      <HeroTextContainer />
    </section>
  );
};

export default Hero;
