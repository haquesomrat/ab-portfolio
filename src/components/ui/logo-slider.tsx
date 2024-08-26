"use client";

import { useEffect } from "react";
import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import Image from "next/image";

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

  return (
    <div>
      <div className="companies__splide splide">
        <div className="splide__track">
          <ul className="splide__list">
            <li className="splide__slide flex justify-center items-center">
              <Image
                src={"/images/company-logos/acme.png"}
                height={32}
                width={127}
                alt="company logo"
              />
            </li>
            <li className="splide__slide  flex justify-center items-center">
              <Image
                src={"/images/company-logos/amara.png"}
                height={32}
                width={121}
                alt="company logo"
              />
            </li>
            <li className="splide__slide  flex justify-center items-center">
              <Image
                src={"/images/company-logos/atica.png"}
                height={32}
                width={80}
                alt="company logo"
              />
            </li>
            <li className="splide__slide  flex justify-center items-center">
              <Image
                src={"/images/company-logos/aven.png"}
                height={32}
                width={111}
                alt="company logo"
              />
            </li>
            <li className="splide__slide  flex justify-center items-center">
              <Image
                src={"/images/company-logos/asgardia.png"}
                height={32}
                width={143}
                alt="company logo"
              />
            </li>
            <li className="splide__slide  flex justify-center items-center">
              <Image
                src={"/images/company-logos/hexlab.png"}
                height={32}
                width={136}
                alt="company logo"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LogoSlider;
