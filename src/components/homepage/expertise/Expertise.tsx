import React from "react";
import { IconsOribital } from "./components/IconsOribital";
import { Cover } from "@/components/ui/cover";

const Expertise = () => {
  return (
    <section id="expertise" className="p-0 xl:p-0 text-white relative">
      <h2 className="text-2xl lg:text-4xl font-light text-center uppercase mb-6">
        My{" "}
        <span className="font-semibold">
          <Cover>Expertise</Cover>
        </span>
      </h2>
      <p className="text-sm max-w-[515px] mx-auto text-center text-[#8F9AB2] mb-8 md:mb-16">
        Proin blandit molestie neque orci pellentesque curabitur. Consectetur
        malesuada massa in vel tincidunt nec egestas.
      </p>
      <div className="overflow-hidden h-[250px] md:h-[446px]">
        <IconsOribital />
      </div>
    </section>
  );
};

export default Expertise;
