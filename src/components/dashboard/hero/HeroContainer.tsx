import React from "react";
import { HeroTable } from "./HeroTable";

const HeroContainer = () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Hero</h2>
      </div>
      <HeroTable />
    </div>
  );
};

export default HeroContainer;
