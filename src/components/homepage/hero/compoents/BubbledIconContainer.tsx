"use client";
import React from "react";
import HeroBubbledIcon from "./HeroBubbledIcon";
import { Icons } from "@/components/global/icons";
import { motion } from "framer-motion";

const BubbledIconContainer = () => {
  return (
    <>
      <motion.div
        className="h-8 w-8 lg:w-[4.5rem] lg:h-[4.5rem] z-4 top-[37%] lg:top-[40%] absolute"
        animate={{ rotate: 360 }}
        transition={{
          type: "spring",
          duration: 5,
          bounce: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <HeroBubbledIcon>
          <Icons.figmaIcon />
        </HeroBubbledIcon>
      </motion.div>
      <HeroBubbledIcon className="h-8 w-8 lg:w-12 lg:h-12 z-10 top-[15%] lg:top-[15%] left-[55%] lg:left-[25%] animate-pulse">
        <Icons.nodejsIcon />
      </HeroBubbledIcon>
      <HeroBubbledIcon className="h-8 w-8 lg:w-[2.5rem] lg:h-[2.5rem] z-4 top-[39%] lg:top-[35%] right-[7%] md:right-[15%] lg:right-[7%] animate-bounce">
        <Icons.githubIcon />
      </HeroBubbledIcon>
      <motion.div
        className="h-8 w-8 lg:w-14 lg:h-14 z-10 top-[63%] lg:top-[78%] right-[5%] lg:right-1/4 absolute"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: {
            ease: "linear",
            duration: 20, // Controls rotation speed
            repeat: Infinity,
          },
          scale: {
            duration: 1.5, // Controls pulsing speed
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          },
        }}
      >
        <HeroBubbledIcon>
          <Icons.javascriptIcon className="text-yellow-500" />{" "}
          {/* Customize icon color */}
        </HeroBubbledIcon>
      </motion.div>
    </>
  );
};

export default BubbledIconContainer;
