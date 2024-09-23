"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDropzone, Accept } from "react-dropzone";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

export function AddFeedbackForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedColor, setSelectedColor] = useState("#A8C0D2");

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const handleDelete = () => {
    setFiles([]); // Clear the files array
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const company = (form.elements.namedItem("company") as HTMLInputElement)
      .value;
    const feedback = (form.elements.namedItem("feedback") as HTMLInputElement)
      .value;
    const color = (
      form.elements.namedItem("feedback_color") as HTMLInputElement
    ).value;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("company", company);
    formData.append("feedback", feedback);
    formData.append("color", color);
    if (files.length > 0) {
      formData.append("image", files[0]);
    }

    console.log({ name, company, feedback, color, files });

    try {
      const res = await fetch(`/dashboard/feedback/api/add-feedback`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        console.log("Upload successful:", await res.json());
      } else {
        console.error("Upload failed:", await res.json());
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const dropzoneOptions = {
    onDrop: handleDrop,
    multiple: false, // Set to true if you want to allow multiple files
    accept: {
      "image/*": [], // Restrict file types to images
    } as Accept,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  return (
    <div className="w-full mx-auto rounded-none md:rounded-2xl shadow-input bg-white dark:bg-transparent">
      <form className="my-8" onSubmit={handleSubmit}>
        {/* Feedback given by */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter Feedback Name"
              type="text"
              required
            />
          </LabelInputContainer>
        </div>
        {/* Image */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="image">
              Image
            </Label>
            <div className=" rounded-md ">
              <div
                {...getRootProps({ className: "dropzone" })}
                className="border-2 border-dashed border-gray-400 h-20 rounded-md flex justify-center items-center "
              >
                <input {...getInputProps()} />
                <p className="text-center">
                  Drag n drop an image here, or click to select one
                </p>
              </div>
              <div>
                {files.length > 0 && (
                  <div className="mt-4 relative w-fit">
                    <Image
                      height={600}
                      width={600}
                      src={URL.createObjectURL(files[0])}
                      alt="Preview"
                      className="w-32 h-32 object-cover aspect-square rounded-md"
                    />
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="mt-2 p-1 bg-black/50 hover:bg-black duration-300 text-xs rounded-md absolute -top-3 -right-3"
                    >
                      &#x274c;
                    </button>
                  </div>
                )}
              </div>
            </div>
          </LabelInputContainer>
        </div>
        {/* Company Name */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="company">
              Company
            </Label>
            <Input
              id="company"
              name="company"
              placeholder="Enter Company Name"
              type="text"
              required
            />
          </LabelInputContainer>
        </div>
        {/* Feedback */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="feedback">
              Feedback
            </Label>
            <Textarea
              id="feedback"
              name="feedback"
              placeholder="Enter Feedback"
              // type="text"
              required
            />
          </LabelInputContainer>
        </div>
        {/* Feedback Background */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="feedback_color">
              Feedback Background Color
            </Label>
            <input
              type="color"
              id="feedback_color"
              name="feedback_color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="rounded-md h-20 w-20"
            />
            <p>{selectedColor}</p>
          </LabelInputContainer>
        </div>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Submit &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

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
