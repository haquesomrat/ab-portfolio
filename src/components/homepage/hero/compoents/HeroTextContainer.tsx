"use client";
import { ButtonPrimary } from "@/components/global/ButtonPrimary";
import { Highlight } from "@/components/ui/hero-highlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Hero } from "@/types/types";
import React, { useEffect, useState } from "react";
import { getHeroData } from "../../../../../actions/hero/get-hero-data";
import { Skeleton } from "@/components/ui/skeleton";

const HeroTextContainer = () => {
  const [hero, setHero] = useState<Hero[]>([]);
  // get hero data
  useEffect(() => {
    const getHero = async () => {
      try {
        const response = await getHeroData();
        if (response?.ok) {
          const data: Hero[] = await response.json();
          setHero(data);
        } else {
          console.error("Failed to fetch hero data");
        }
      } catch (error) {
        console.error("An error occurred :", error);
      }
    };
    getHero();
  }, [setHero]);

  return (
    <div className="relative my-24 py-2 z-30 text-center left-[50%] translate-x-[-50%]">
      <div className="max-w-[89vw] md:max-w-2xl lg:max-w-3xl mx-auto space-y-6 lg:space-y-8 ">
        {hero[0]?.motto ? (
          <div className="border border-[#FFFFFF1A] inline-flex items-center justify-center py-0.5 px-3 rounded-full shadow-bubble">
            <p className="text-center md:tracking-wider text-[11px] lg:text-sm text-t-900 uppercase">
              <>
                <span className="text-primary">
                  {hero[0].headline.split(" ").slice(0, 2).join(" ")}
                </span>{" "}
                {hero[0].headline.split(" ").slice(2).join(" ")}
              </>
            </p>
          </div>
        ) : (
          <Skeleton className="h-6 w-[300px] mx-auto rounded-full" />
        )}
        <div className="space-y-4 lg:space-y-6">
          <h2 className="uppercase tracking-[-0.0375em] text-2xl lg:text-[54px] leading-[1.2] text-center text-blue-100">
            Turning{" "}
            <Highlight className="font-semibold border-l-[3px] border-[#FFEBA8] bg-gradient-to-r dark:from-[#E5B30A] dark:to-[#E5B30A00]">
              Ideas
            </Highlight>{" "}
            into Reality with{" "}
            <Highlight className="font-semibold border-l-[3px] border-[#FF96A2] bg-gradient-to-r dark:from-[#F06373] dark:to-[#F0637300]">
              Code
            </Highlight>
          </h2>
          {hero[0]?.intro ? (
            <TextGenerateEffect
              className="text-base lg:text-lg font-normal dark:text-t-900/90 md:w-[90%] mx-auto"
              words={hero[0]?.intro}
            ></TextGenerateEffect>
          ) : (
            <div className="space-y-2">
              <Skeleton className="h-6 w-[90%] mx-auto" />
              <Skeleton className="h-6 w-[90%] mx-auto" />
              <Skeleton className="h-6 w-[90%] mx-auto" />
            </div>
          )}
        </div>
        <div className="flex gap-4 justify-center">
          <ButtonPrimary>View my work</ButtonPrimary>
          <ButtonPrimary className="bg-white/.5 text-primary bg-[linear-gradient(110deg,#FFFFFF0D,45%,#1e2631,55%,#FFFFFF0D)]">
            Contact
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default HeroTextContainer;
