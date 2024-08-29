import React from "react";

const GridBackground = () => {
  return (
    <div className="h-full w-full dark:bg-background bg-white dark:bg-grid-white/[0.05]  md:dark:bg-grid-white/[0.02] bg-grid-black/[0.2] flex items-center justify-center absolute left-0 top-0">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-background bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    </div>
  );
};

export default GridBackground;
