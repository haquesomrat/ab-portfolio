import React from "react";
import { UpdateServicesForm } from "./UpdateServiceForm";

interface CompanyUpdateContainerProps {
  id: string;
}
const UpdateServiceContainer = ({ id }: CompanyUpdateContainerProps) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Update Services</h2>
      </div>
      <UpdateServicesForm id={id} />
    </div>
  );
};

export default UpdateServiceContainer;
