"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ButtonPrimary } from "@/components/global/ButtonPrimary";

export function ContactForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const subject = (form.elements.namedItem("subject") as HTMLInputElement)
      .value;
    const message = (form.elements.namedItem("message") as HTMLInputElement)
      .value;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);

    console.log({ name, email, subject, message });

    try {
      const res = await fetch("/dashboard/newsletter/api/add-newsletter", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        console.log("Upload successful:", await res.json());
        // Reset the form after successful submission
        form.reset();
      } else {
        console.error("Upload failed:", await res.json());
      }
    } catch (error) {
      console.error("An error occured", error);
    }
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
            id="subject"
            placeholder="Subject"
            type="text"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-6">
          <Textarea
            className="h-32 resize-none flex-wrap dark:bg-[#0D1020] dark:shadow-none px-3 py-3 leading-relaxed focus-visible:ring-0 focus-visible:ring-transparent"
            id="message"
            placeholder="Message"
            name="message"
          />
        </LabelInputContainer>

        <ButtonPrimary type="submit">Send</ButtonPrimary>
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
