import React from "react";
import LogoSlider from "../../ui/logo-slider";

const Companies = () => {
  return (
    <section className="pb-[96px] xl:pb-[140px]">
      <h6 className="text-lg lg:text-xl font-medium leading-relaxed mb-6 lg:mb-12 text-center text-[#ABADB280]">
        Companies I&apos;ve contributed
      </h6>
      <LogoSlider />
    </section>
  );
};

export default Companies;
