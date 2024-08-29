"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="w-full mx-auto rounded-none md:rounded-2xl">
      <form className="" onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-2 mb-3">
          <LabelInputContainer>
            <Input
              className="dark:bg-[#0D1020] dark:shadow-none px-3 py-5 leading-relaxed focus-visible:ring-0 focus-visible:ring-transparent"
              id="name"
              placeholder="Name"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Input
              className="dark:bg-[#0D1020] dark:shadow-none px-3 py-5 leading-relaxed focus-visible:ring-0 focus-visible:ring-transparent"
              id="email"
              placeholder="Email"
              type="email"
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-3">
          <Input
            className="dark:bg-[#0D1020] dark:shadow-none px-3 py-5 leading-relaxed focus-visible:ring-0 focus-visible:ring-transparent"
            id="password"
            placeholder="Subject"
            type="text"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-6">
          <Textarea
            className="h-32 resize-none flex-wrap dark:bg-[#0D1020] dark:shadow-none px-3 py-3 leading-relaxed focus-visible:ring-0 focus-visible:ring-transparent"
            id="message"
            placeholder="Message"
          />
        </LabelInputContainer>

        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
