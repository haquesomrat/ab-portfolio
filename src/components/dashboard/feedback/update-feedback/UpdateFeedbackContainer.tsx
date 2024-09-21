import React from "react";
import { UpdateFeedbackForm } from "./UpdateFeedbackForm";

const UpdateFeedbackContainer = () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Update Feedback</h2>
      </div>
      <UpdateFeedbackForm />
    </div>
  );
};

export default UpdateFeedbackContainer;
