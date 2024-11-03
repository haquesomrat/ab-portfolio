import { Meteors } from "@/components/ui/meteors";
import { Feedbacks } from "@/types/types";
import Image from "next/image";
import React from "react";

const FeedbackCarouselCard = ({
  name,
  company,
  color,
  image,
  feedback,
}: Feedbacks) => {
  // Function to make color lighter (e.g., for company text)
  const lightenColor = (hex: string, percent: number) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return `rgb(${R < 255 ? (R < 1 ? 0 : R) : 255}, ${
      G < 255 ? (G < 1 ? 0 : G) : 255
    }, ${B < 255 ? (B < 1 ? 0 : B) : 255})`;
  };
  return (
    <div className="w-full relative h-full">
      <div
        style={{ background: lightenColor(color, 50) }}
        className="relative shadow-xl border border-gray-800 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start"
      >
        {/* actual card */}
        <div className="flex flex-col lg:flex-row items-center p-6 lg:py-10 lg:px-14 rounded-2xl gap-4 lg:gap-8 relative z-50">
          <div className="lg:w-[40.4%]">
            <Image
              className="w-full h-full rounded-full aspect-[187/240] max-w-[100px] lg:max-w-[187px] object-cover"
              src={image}
              width={187}
              height={240}
              alt="feedback image"
            />
          </div>
          <div className="lg:w-[59.6%]">
            {/* feedback */}
            <p className="text-sm leading-relaxed text-[#00000099]">
              {feedback}{" "}
            </p>
            {/* name */}
            <h5
              style={{ color: color }}
              className="text-xl font-bold mt-4 mb-1 leading-snug"
            >
              {name}
            </h5>
            {/* company name */}
            <p
              style={{ color: lightenColor(color, 10) }}
              className="text-sm leading-relaxed"
            >
              {company}
            </p>
          </div>
        </div>

        {/* Meaty part - Meteor effect */}
        <Meteors number={10} />
      </div>
    </div>
  );
};

export default FeedbackCarouselCard;
