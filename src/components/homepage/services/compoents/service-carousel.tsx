"use client";

import { useEffect, useState } from "react";
import Splide from "@splidejs/splide";
import ServiceCarouselPagination from "./service-carousel-pagination";
import { fakeServices } from "@/lib/data";
import { Services } from "@/types/types";
import { getAllServices } from "../../../../../actions/services/get-all-services";
import Image from "next/image";

const ServiceCarousel: React.FC = () => {
  // Fetch all services on component mount
  const [services, setServices] = useState<Services[]>([]);

  // get all services
  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await getAllServices();
        if (response?.ok) {
          const data: Services[] = await response.json();
          setServices(data);
        } else {
          console.error("Failed to fetch services");
        }
      } catch (error) {
        console.error("An error occurred while fetching services:", error);
      }
    };
    getServices();
  }, [setServices]);

  // service carousel options
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
  }, [services]);

  return (
    <div className="service__splide splide col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-9">
      <div className="splide__track">
        <ul className="splide__list">
          {services.map(
            ({
              _id,
              name,
              details,
              logo,
            }: {
              _id: string;
              logo: JSX.Element | string;
              name: string;
              details: string;
            }) => (
              <li key={_id} className="splide__slide">
                <div className="border border-[#FFFFFF33] rounded p-6 text-3xl font-light text-white min-h-[342px]">
                  {typeof logo === "string" && logo.startsWith("<svg") ? (
                    <div dangerouslySetInnerHTML={{ __html: logo }} />
                  ) : typeof logo === "string" ? (
                    <Image
                      height={200}
                      width={200}
                      src={logo}
                      alt="Service Icon"
                      className="w-24 h-24"
                    />
                  ) : null}

                  <h5 className="text-xl font-bold mt-8 mb-3 leading-snug">
                    {name}
                  </h5>
                  <p className="text-sm leading-relaxed">{details}</p>
                </div>
              </li>
            )
          )}
        </ul>
      </div>

      {/* pagination */}
      <ServiceCarouselPagination />
    </div>
  );
};

export default ServiceCarousel;
