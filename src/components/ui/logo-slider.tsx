"use client";

import { useEffect } from "react";
import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import Image from "next/image";
import { getAllCompanies } from "@/lib/company-logos";

const LogoSlider: React.FC = () => {
  useEffect(() => {
    const companiesSplide = new Splide(".companies__splide.splide", {
      type: "loop",
      arrows: false,
      drag: "free",
      focus: "center",
      perPage: 6,
      pagination: false,
      breakpoints: {
        640: {
          perPage: 2,
        },
        768: {
          perPage: 4,
        },
        1024: {
          perPage: 5,
        },
        1280: {
          perPage: 6,
        },
      },
      autoScroll: {
        speed: 0.5,
      },
    });

    companiesSplide.mount({ AutoScroll });

    return () => {
      companiesSplide.destroy();
    };
  }, []);

  const companies = getAllCompanies();
  console.log(companies);

  return (
    <div>
      <div className="companies__splide splide">
        <div className="splide__track">
          <ul className="splide__list">
            {companies.map((company) => (
              <li
                key={company?.id}
                className="splide__slide flex justify-center items-center"
              >
                <Image
                  src={company?.src}
                  height={32}
                  width={127}
                  alt={company?.name}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LogoSlider;
