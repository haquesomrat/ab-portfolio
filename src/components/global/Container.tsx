import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={cn("max-w-[1240px] mx-auto", className)}>{children}</div>
  );
};

export default Container;
