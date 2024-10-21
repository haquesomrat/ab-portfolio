import React from "react";
import { ProjectTable } from "./ProjectTable";

const ProjectsContainer = () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
      </div>
      <ProjectTable />
    </div>
  );
};

export default ProjectsContainer;
