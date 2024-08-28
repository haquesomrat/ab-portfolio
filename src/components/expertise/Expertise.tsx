import React from "react";
import { IconsOribital } from "./IconsOribital";

const Expertise = () => {
  return (
    <section id="work" className="p-6 lg:mb-24 xl:p-0 text-white relative">
      <h2 className="text-2xl lg:text-4xl font-light text-center uppercase mb-6">
        My <span className="font-semibold">Expertise</span>
      </h2>
      <p className="text-sm max-w-[515px] mx-auto text-center text-[#8F9AB2] mb-16">
        Proin blandit molestie neque orci pellentesque curabitur. Consectetur
        malesuada massa in vel tincidunt nec egestas.
      </p>
      <div className="overflow-hidden h-[446px]">
        <IconsOribital />
      </div>
    </section>
  );
};

export default Expertise;
