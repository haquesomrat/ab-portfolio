"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const Button = ({
  children,
  className,
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div className="relative z-40">
      <button
        onClick={onClick}
        className={cn(
          "inline-flex h-10 min-w-36 animate-shimmer items-center justify-center rounded-full border border-primary/10 bg-primary hover:bg-transparent hover:bg-[linear-gradient(110deg,#FFFFFF0D,45%,#1e2631,55%,#FFFFFF0D)] bg-[length:200%_100%] px-6 text-[15px] font-medium text-p-900 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-p-900 duration-300",
          className
        )}
      >
        {children}
      </button>
    </div>
  );
};
