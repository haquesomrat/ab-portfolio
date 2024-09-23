"use client";

import OrbitingCircles from "@/components/magicui/orbiting-circles";
import { useEffect, useState } from "react";
import { orbitalIcons } from "@/lib/data";

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
      {/* first orbit::1 */}

      {/* icons::azure */}
      <OrbitingCircles
        // className="size-[30px] border-none bg-transparent shadow-bubble h-8 w-8 lg:w-20 lg:h-20"
        className="border-none bg-transparent shadow-bubble h-8 w-8 lg:w-20 lg:h-20"
        duration={60} //duration
        delay={50} //delay
        radius={isSmallScreen ? 80 : 200} //orbit size
      >
        <orbitalIcons.azure />
      </OrbitingCircles>

      {/* icon::vuejs */}
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent shadow-bubble h-8 w-8 lg:w-[3.75rem] lg:h-[3.75rem]"
        duration={60}
        delay={30}
        radius={isSmallScreen ? 80 : 200}
      >
        <orbitalIcons.vueJs />
      </OrbitingCircles>

      {/* second orbit::2 */}

      {/* icon::python */}
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent shadow-bubble h-8 w-8 lg:w-20 lg:h-20"
        duration={60}
        delay={60}
        radius={isSmallScreen ? 130 : 300}
      >
        <orbitalIcons.python />
      </OrbitingCircles>

      {/* icon::golang */}
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent shadow-bubble h-8 w-8 lg:w-20 lg:h-20"
        duration={60}
        delay={20}
        radius={isSmallScreen ? 130 : 300}
      >
        <orbitalIcons.goLang />
      </OrbitingCircles>

      {/* third orbit::3 */}

      {/* icon:: figma */}
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent shadow-bubble h-8 w-8 lg:w-20 lg:h-20"
        duration={60}
        delay={30}
        radius={isSmallScreen ? 180 : 400}
      >
        <orbitalIcons.figma />
      </OrbitingCircles>

      {/* icon::flutter */}
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent shadow-bubble h-8 w-8 lg:w-[6.875rem] lg:h-[6.875rem]"
        duration={60}
        delay={40}
        radius={isSmallScreen ? 180 : 400}
      >
        <orbitalIcons.flutter />
      </OrbitingCircles>

      {/* icon::react */}
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent shadow-bubble h-8 w-8 lg:w-[4.5rem] lg:h-[4.5rem]"
        duration={60}
        delay={50}
        radius={isSmallScreen ? 180 : 400}
      >
        <orbitalIcons.react />
      </OrbitingCircles>

      {/* forth orbit::4 */}

      {/* icon::java */}
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent shadow-bubble h-8 w-8 lg:w-[6.875rem] lg:h-[6.875rem]"
        duration={60}
        delay={60}
        radius={isSmallScreen ? 230 : 500}
      >
        <orbitalIcons.java />
      </OrbitingCircles>

      {/* icon::dot net */}
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent shadow-bubble h-8 w-8 lg:w-[6.875rem] lg:h-[6.875rem]"
        duration={60}
        delay={20}
        radius={isSmallScreen ? 230 : 500}
      >
        <orbitalIcons.dotNet />
      </OrbitingCircles>
    </div>
  );
}
