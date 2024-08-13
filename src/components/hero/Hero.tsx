import React from "react";
import GridBackground from "./GridBackground";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <>
      {/* grid background */}
      <GridBackground />

      <div className="relative my-24 py-2 z-10 text-center left-[50%] translate-x-[-50%]">
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
            <p className="text-t-900/90">
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
    </>
  );
};

export default Hero;
