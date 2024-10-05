"use client";

import OrbitingCircles from "@/components/magicui/orbiting-circles";
import { useEffect, useState } from "react";
import { fakeOrbitalIconsData } from "@/lib/data";

export function IconsOribital() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", updateScreenSize);
    updateScreenSize();

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return (
    <div className="relative top-8 md:top-4 flex h-[500px] md:h-[1100px] w-full flex-col items-center justify-center rounded-lg bg-background">
      {fakeOrbitalIconsData.map((data, index) => (
        <OrbitingCircles
          key={index}
          className="border-none bg-transparent shadow-bubble h-8 w-8 lg:w-20 lg:h-20"
          duration={Number(data?.duration)}
          delay={Number(data?.delay)}
          radius={Number(isSmallScreen ? data?.radiusSmall : data?.radiusLarge)}
        >
          {data?.icon}
          {/* <div
            dangerouslySetInnerHTML={{ __html: icon.svg }} // Inject SVG HTML from the database
            className={`h-${isSmallScreen ? "6" : "8"} w-${isSmallScreen ? "6" : "8"}`}
          /> */}
        </OrbitingCircles>
      ))}
    </div>
  );
}
