"use client";

import { useEffect, useState } from "react";
import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import Image from "next/image";
import { Companies } from "@/types/types";
import { getAllCompanies } from "../../../actions/companies/get-all-companies";

const LogoSlider: React.FC = () => {
  const [companies, setCompanies] = useState<Companies[]>([]);

  // Fetch all companies on component mount
  useEffect(() => {
    const getCompanies = async () => {
      try {
        const response = await getAllCompanies();
        if (response?.ok) {
          const data: Companies[] = await response.json();
          setCompanies(data);
        } else {
          console.error("Failed to fetch companies");
        }
      } catch (error) {
        console.error("An error occurred while fetching companies:", error);
      }
    };
    getCompanies();
  }, []);

  // logo slider options
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
  }, [companies]);

  return (
    <div>
      <div className="companies__splide splide">
        <div className="splide__track">
          <ul className="splide__list">
            {companies.map((company) => (
              <li
                key={company?._id}
                className="splide__slide flex justify-center items-center"
              >
                <Image
                  src={company?.companyImg}
                  height={32}
                  width={127}
                  alt={company?.companyName}
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
