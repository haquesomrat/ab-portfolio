"use client";
import Image from "next/image";
import React from "react";
import { motion, Variants } from "framer-motion";

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

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
    <motion.div
      className="flex flex-col md:flex-row gap-6 items-center "
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.div className="md:w-1/3" variants={cardVariants}>
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
            className="group-hover:translate-x-6 transition-transform duration-300"
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
      </motion.div>
      <motion.div
        variants={cardVariants}
        style={{ backgroundColor: color }}
        className="flex-1 px-5 md:w-2/3 h-auto flex items-center justify-center overflow-hidden rounded-3xl"
      >
        <Image
          className="-mb-6 pt-8 md:pt-14"
          src={src}
          alt={title}
          width={595}
          height={426}
          priority={true} // Optional: Use loading="lazy" if not priority.
        />
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
