"use client";

import { useEffect } from "react";
import Splide from "@splidejs/splide";
import ServiceCarouselPagination from "./service-carousel-pagination";
import { fakeServices } from "@/lib/data";

const ServiceCarousel: React.FC = () => {
  useEffect(() => {
    const serviceCarousel = new Splide(".service__splide.splide", {
      type: "loop",
      perMove: 1,
      gap: 24,
      autoplay: true,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      flickPower: 600,
      waitForTransition: true,
      arrows: false,
      trimSpace: false,
      interval: 1500,
      pauseOnHover: true,
      padding: ".125rem",
      pauseOnFocus: true,
      keyboard: true,
      width: "100%",
      height: "100%",
      mediaQuery: "min",
      breakpoints: {
        1024: { perPage: 2 },
        1280: { perPage: 3 },
      },
    });

    serviceCarousel.mount();

    return () => {
      serviceCarousel.destroy();
    };
  }, []);

  return (
    <div className="service__splide splide col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-9">
      <div className="splide__track">
        <ul className="splide__list">
          {fakeServices.map((item, id) => (
            <li key={id} className="splide__slide">
              <div className="border border-[#FFFFFF33] rounded p-6 text-3xl font-light text-white min-h-[342px]">
                {item?.logo}
                <h5 className="text-xl font-bold mt-8 mb-3 leading-snug">
                  {item?.name}
                </h5>
                <p className="text-sm leading-relaxed">{item?.details}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* pagination */}
      <ServiceCarouselPagination />
    </div>
  );
};

export default ServiceCarousel;
