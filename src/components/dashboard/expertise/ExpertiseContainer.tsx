import React from "react";
import { ExpertiseTable } from "./ExpertiseTable";

const ExpertiseContainer = () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">My Expertise</h2>
      </div>
      <ExpertiseTable />
    </div>
  );
};

export default ExpertiseContainer;
