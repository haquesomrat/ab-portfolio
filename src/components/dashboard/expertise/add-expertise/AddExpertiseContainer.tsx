import React from "react";
import { AddExpertiseForm } from "./AddExpertiseForm";

const AddExpertiseContainer = () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Add Expertise</h2>
      </div>
      <AddExpertiseForm />
    </div>
  );
};

export default AddExpertiseContainer;
