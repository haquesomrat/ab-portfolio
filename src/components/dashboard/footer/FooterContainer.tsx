import React from "react";
import { SocialMediaForm } from "./FooterForm";

const FooterContainer = () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Footer</h2>
      </div>
      <SocialMediaForm />
    </div>
  );
};

export default FooterContainer;
