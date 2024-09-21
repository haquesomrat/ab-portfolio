"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import LabelInputContainer from "@/components/global/LabelInputContainer";
import BottomGradient from "@/components/global/BottomGardient";

export function AddServicesForm() {
  const [file, setFile] = useState<File[]>([]);

  const handleFileUpload = (acceptedFiles: File[]) => {
    setFile(acceptedFiles);
  };

  const removeFile = () => {
    setFile([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const name = (form.elements.namedItem("serviceName") as HTMLInputElement)
      .value;
    const details = (
      form.elements.namedItem("serviceDetails") as HTMLInputElement
    ).value;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("details", details);
    if (file.length > 0) {
      formData.append("logo", file[0]);
    }

    try {
      const res = await fetch("/dashboard/services/api/add-service", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        console.log("Upload successful:", await res.json());
      } else {
        console.error("Upload failed:", await res.json());
      }
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  return (
    <div className="w-full mx-auto rounded-none md:rounded-2xl shadow-input bg-white dark:bg-transparent">
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="serviceIcon">
              Service Icon
            </Label>
            <DropzoneComponent
              file={file[0]}
              onDrop={handleFileUpload}
              onRemove={removeFile}
            />
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="services_name">
              Service Name
            </Label>
            <Input
              id="services_name"
              name="serviceName"
              placeholder="Enter service name"
              type="text"
              required
            />
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="services_details">
              Service Details
            </Label>
            <Input
              id="services_details"
              name="serviceDetails"
              placeholder="Enter service details"
              type="text"
              required
            />
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

const DropzoneComponent = ({
  file,
  onDrop,
  onRemove,
}: {
  file: File | null;
  onDrop: (acceptedFiles: File[]) => void;
  onRemove: () => void;
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles.slice(0, 1));
    },
    accept: {
      "image/*": [],
      "image/svg+xml": [],
    },
    multiple: false,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps({
          className:
            "border border-dashed border-gray-400 p-4 rounded-md cursor-pointer focus:outline-none",
        })}
      >
        <input {...getInputProps()} />
        <p>Drag & drop or click to upload an image (JPEG, PNG, SVG, etc.)</p>
      </div>

      {file && (
        <div className="relative inline-flex group">
          <Image
            width={300}
            height={300}
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="w-24 h-24 object-cover rounded-md"
          />
          <button
            type="button"
            onClick={onRemove}
            className="mt-2 p-1 bg-black/50 hover:bg-black duration-300 text-xs rounded-md absolute -top-3 -right-3"
          >
            &#x274c;
          </button>
        </div>
      )}
    </div>
  );
};
