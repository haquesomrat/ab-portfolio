"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDropzone, Accept } from "react-dropzone";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import LabelInputContainer from "@/components/global/LabelInputContainer";
import BottomGradient from "@/components/global/BottomGardient";
import { addProject } from "../../../../../actions/projects/add-project";
import { toast } from "sonner";

export function AddProjectForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedColor, setSelectedColor] = useState("#8da4de");

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const handleDelete = () => {
    setFiles([]); // Clear the files array
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const description = (
      form.elements.namedItem("description") as HTMLInputElement
    ).value;
    const link = (form.elements.namedItem("live_link") as HTMLInputElement)
      .value;

    if (files.length > 0) {
      // add project
      try {
        const response = await addProject({
          title,
          description,
          live_link: link,
          color: selectedColor,
          preview_image: files[0],
        });
        const data = await response?.json();
        if (response?.ok) {
          form.reset();
          setFiles([]);
          setSelectedColor("#8da4de");
          toast.success(data?.message, {
            position: "top-center",
          });
        } else {
          console.error("Upload failed:", await response?.json());
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      toast.error("Please provide all data", {
        position: "top-center",
      });
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
        {/* Project Title */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="title">
              Project Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter Project Title"
              type="text"
              required
            />
          </LabelInputContainer>
        </div>
        {/* Project Description */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="description">
              Project Description
            </Label>
            <Textarea
              className="h-28"
              id="description"
              name="description"
              placeholder="Enter Project Description"
              // type="text"
              required
            />
          </LabelInputContainer>
        </div>
        {/* Project Live Link */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="live_link">
              Project Live Link
            </Label>
            <Input
              id="live_link"
              name="live_link"
              placeholder="Enter Project Live Link"
              type="text"
              required
            />
          </LabelInputContainer>
        </div>
        {/* Project Background */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="project_color">
              Project Background Color
            </Label>
            <input
              type="color"
              id="project_color"
              name="project_color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="rounded-md h-20 w-20"
            />
            <p>{selectedColor}</p>
          </LabelInputContainer>
        </div>
        {/* Project Image  */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="company_logo">
              Project Image
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
                      height={400}
                      width={400}
                      src={URL.createObjectURL(files[0])}
                      alt="Preview"
                      className="w-40 h-24 object-cover aspect-video rounded-md"
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
