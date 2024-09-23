import React from "react";
import { FeedbackTable } from "./FeedbackTable";

const FeedbackContainer = () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Client Feedback</h2>
      </div>
      <FeedbackTable />
    </div>
  );
};

export default FeedbackContainer;
