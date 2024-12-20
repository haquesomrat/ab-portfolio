import React from "react";
import ServiceCarousel from "./compoents/service-carousel";
import Container from "../../global/Container";

const Services = () => {
  return (
    <section className="bg-[#D33043] w-full py-10 lg:py-[100px] rounded-lg h-auto mb-32">
      <Container className="overflow-hidden p-6 xl:p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-12 gap-6 relative">
          <div className="border border-[#FFFFFF33] rounded p-6 text-3xl font-light text-white min-h-[342px] col-span-1 xl:col-span-3 uppercase">
            My <br /> offered <span className="font-black block">services</span>
          </div>
          <ServiceCarousel />
        </div>
      </Container>
    </section>
  );
};

export default Services;
