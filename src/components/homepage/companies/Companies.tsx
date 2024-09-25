import React from "react";
import LogoSlider from "../../ui/logo-slider";
import HyperText from "@/components/magicui/hyper-text";

const Companies = () => {
  return (
    <section className="pb-[96px] xl:pb-[140px]">
      <h6 className="text-lg lg:text-xl font-medium leading-relaxed mb-6 lg:mb-12 text-center text-[#ABADB280]">
        {/* <HyperText
          className="text-center"
          text="Companies I've contributed"
        ></HyperText> */}
        Companies I&apos;ve contributed
      </h6>
      <LogoSlider />
    </section>
  );
};

export default Companies;
