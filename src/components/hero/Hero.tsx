import React from "react";
import GridBackground from "./GridBackground";
import { Button } from "@/components/ui/button";
import { RedSpotlight, Spotlight } from "./Spotlight";
import { Icons } from "../global/icons";
import HeroBubbledIcon from "./HeroBubbledIcon";

const Hero = () => {
  return (
    <section className="p-5 lg:p-24 relative">
      {/* grid background */}
      <GridBackground />

      <Spotlight
        className="-top-20 left-0 md:-left-44 md:-top-44"
        fill="#243560"
      />

      <RedSpotlight className="-top-60 right-0 md:-right-32" fill="#EC6272" />

      <HeroBubbledIcon className="h-8 w-8 lg:w-[4.5rem] lg:h-[4.5rem] z-4 top-[37%] lg:top-[40%]">
        <Icons.figmaIcon />
      </HeroBubbledIcon>
      <HeroBubbledIcon className="h-8 w-8 lg:w-12 lg:h-12 z-10 top-[15%] lg:top-[15%] left-[55%]">
        <Icons.nodejsIcon />
      </HeroBubbledIcon>
      <HeroBubbledIcon className="h-8 w-8 lg:w-[2.5rem] lg:h-[2.5rem] z-4 top-[39%] lg:top-[35%] right-[7%] md:right-[15%] lg:right-[7%]">
        <Icons.githubIcon />
      </HeroBubbledIcon>
      <HeroBubbledIcon className="h-8 w-8 lg:w-14 lg:h-14 z-10 top-[63%] lg:top-[78%] right-[5%] lg:right-1/4">
        <Icons.javascriptIcon />
      </HeroBubbledIcon>

      <div className="relative my-24 py-2 z-30 text-center left-[50%] translate-x-[-50%]">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-3xl mx-auto space-y-6 lg:space-y-8 ">
          <div className="border border-[#FFFFFF1A] inline-flex items-center justify-center py-0.5 px-3 rounded-full shadow-bubble">
            <p className="text-center md:tracking-wider text-[11px] lg:text-sm text-t-900 uppercase">
              <span className="text-primary">Modern Thinking</span> Developer
              With Impressive Ideas
            </p>
          </div>
          <div className="space-y-4 lg:space-y-6">
            <h2 className="uppercase tracking-[-0.0375em] text-2xl lg:text-[54px] leading-[1.2] text-center text-blue-100">
              Turning{" "}
              <span className="font-semibold border-l-[3px] border-[#FFEBA8] bg-gradient-to-r from-[#E5B30A] to-[#E5B30A00]">
                Ideas
              </span>{" "}
              into Reality with{" "}
              <span className="font-semibold border-l-[3px] border-[#FF96A2] bg-gradient-to-r from-[#F06373] to-[#F0637300]">
                Code
              </span>
            </h2>
            <p className="text-t-900/90 md:w-[80%] mx-auto">
              Hi, I&apos;m Amin, a passionate Full-Stack Developer dedicated to
              crafting efficient, scalable, and user-friendly web applications.
              Feel free to reach me if you want to build modern web appearance.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button>View my work</Button>
            <Button className="bg-white/.5 text-primary bg-[linear-gradient(110deg,#FFFFFF0D,45%,#1e2631,55%,#FFFFFF0D)]">
              Contact
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
