import React from "react";
import ServiceCarousel from "./compoents/service-carousel";
import Container from "../../global/Container";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const Services = () => {
  return (
    <BackgroundBeamsWithCollision className="mb-32">
      <section className="bg-[#D33043] w-full py-10 lg:py-[100px] rounded-lg pb-32 h-auto">
        <Container className="overflow-hidden p-6 xl:p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-12 gap-6 relative">
            <div className="border border-[#FFFFFF33] rounded p-6 text-3xl font-light text-white min-h-[342px] col-span-1 xl:col-span-3">
              My <br /> offered{" "}
              <span className="font-black block">services</span>
            </div>
            <ServiceCarousel />
          </div>
        </Container>
      </section>
    </BackgroundBeamsWithCollision>
  );
};

export default Services;
