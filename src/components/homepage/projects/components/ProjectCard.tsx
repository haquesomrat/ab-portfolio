import Image from "next/image";
import React from "react";

const ProjectCard = ({
  title,
  description,
  src,
  color,
}: {
  title: string;
  description: string;
  src: string;
  color: string;
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center">
      <div className="md:w-1/3">
        <h1 className="text-xl font-bold leading-relaxed mb-3">{title}</h1>
        <p className="line-clamp-3 text-sm leading-relaxed text-[#8F9AB2]">
          {description}
        </p>
        <a
          href="#"
          className="flex items-center gap-2.5 text-primary text-sm font-medium mt-8 group hover:gap-4 duration-300"
        >
          View Project{" "}
          <svg
            className="group-hover:traslate-x-6"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 8H14M14 8L9 3M14 8L9 13"
              stroke="#F06373"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
      <div
        className={`flex-1 bg-[${color}] px-5 md:w-2/3 h-auto flex items-center justify-center overflow-hidden rounded-3xl`}
      >
        <Image
          className="-mb-6 pt-8 md:pt-14"
          src={src}
          alt={title}
          width={595}
          height={426}
        ></Image>
      </div>
    </div>
  );
};

export default ProjectCard;
