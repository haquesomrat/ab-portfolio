import React from "react";
import { AddFeedbackForm } from "./AddFeedbackForm";

const AddFeedbackContainer = () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Add Feedback</h2>
      </div>
      <AddFeedbackForm />
    </div>
  );
};

export default AddFeedbackContainer;
