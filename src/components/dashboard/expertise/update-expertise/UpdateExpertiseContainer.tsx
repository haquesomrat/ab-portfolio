import React from "react";
import { UpdateExpertiseForm } from "./UpdateExpertiseForm";

interface CompanyUpdateContainerProps {
  id: string;
}

const UpdateExpertiseContainer = ({ id }: CompanyUpdateContainerProps) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Update Expertise</h2>
      </div>
      <UpdateExpertiseForm id={id} />
    </div>
  );
};

export default UpdateExpertiseContainer;
