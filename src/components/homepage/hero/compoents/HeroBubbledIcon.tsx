import { cn } from "@/lib/utils";
import React from "react";

const HeroBubbledIcon = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "absolute shadow-bubble p-1 rounded-full flex justify-center items-center",
        className
      )}
    >
      {children}
    </div>
  );
};

export default HeroBubbledIcon;
