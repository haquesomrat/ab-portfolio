import React from "react";
import GridBackground from "./compoents/GridBackground";
import { RedSpotlight, Spotlight } from "./compoents/Spotlight";
import { Highlight } from "../../ui/hero-highlight";
import { TextGenerateEffect } from "../../ui/text-generate-effect";
import HeroTextContainer from "./compoents/HeroTextContainer";
import BubbledIconContainer from "./compoents/BubbledIconContainer";

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
      <BubbledIconContainer />

      {/* text container  */}
      <HeroTextContainer />
    </section>
  );
};

export default Hero;
