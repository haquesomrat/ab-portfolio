"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Services } from "@/types/types";
import Loading from "@/components/global/Loading";
import LabelInputContainer from "@/components/global/LabelInputContainer";
import BottomGradient from "@/components/global/BottomGardient";

interface serviceUpdateProps {
  id: string;
}

export function UpdateServicesForm({ id }: serviceUpdateProps) {
  const [file, setFile] = useState<File[]>([]);
  const [singleService, setSingleService] = useState<Services | null>(null);

  // get single service data
  useEffect(() => {
    const getSingleService = async () => {
      const res = await fetch(`/dashboard/services/api/${id}`);
      const data = await res.json();
      setSingleService(data);
    };
    getSingleService();
  }, [id]);

  const handleFileUpload = (acceptedFiles: File[]) => {
    setFile(acceptedFiles);
  };

  const removeFile = (fileName: string) => {
    setFile(file.filter((f) => f.name !== fileName));
  };

  // fallback loading
  if (!singleService) return <Loading />;

  // destructure single service
  const { name, details, logo } = singleService;

  // handle submit
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

    // Handle the logo file upload
    if (file.length > 0) {
      formData.append("logo", file[0]);
    } else {
      formData.append("logo", logo);
      // If no new file, append the old logo
    }

    // update the service data
    try {
      const res = await fetch(`/dashboard/services/api/update-service/${id}`, {
        method: "PATCH",
        body: formData,
      });

      if (res.ok) {
        console.log("Upload successful:", await res.json());
      } else {
        console.error("Upload failed:", await res.json());
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <div className="w-full mx-auto rounded-none md:rounded-2xl shadow-input bg-white dark:bg-transparent">
      <form className="my-8" onSubmit={handleSubmit}>
        {/* Service Icon */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="serviceIcon">
              Service Icon
            </Label>
            <DropzoneComponent
              files={file}
              onDrop={handleFileUpload}
              onRemove={removeFile}
              existingLogo={logo} // pass the existing logo
            />
          </LabelInputContainer>
        </div>
        {/* Service Name */}
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
              defaultValue={name}
            />
          </LabelInputContainer>
        </div>
        {/* Service details */}
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
              defaultValue={details}
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
  files,
  onDrop,
  onRemove,
  existingLogo,
}: {
  files: File[];
  onDrop: (acceptedFiles: File[]) => void;
  onRemove: (fileName: string) => void;
  existingLogo?: string | null;
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "image/svg+xml": [], // Specifically allow SVG files
    },
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
        <p>Drag & drop or click to upload an image</p>
      </div>

      <div className="flex flex-wrap space-x-4">
        {/* Show uploaded files */}
        {files.length > 0
          ? files.map((file) => (
              <div key={file.name} className="relative group">
                <Image
                  width={300}
                  height={300}
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => onRemove(file.name)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                >
                  X
                </button>
              </div>
            ))
          : // Show existing logo if no new file is uploaded
            existingLogo && (
              <div className="relative group">
                {existingLogo.startsWith("<svg") ? (
                  <div dangerouslySetInnerHTML={{ __html: existingLogo }} />
                ) : (
                  <Image
                    width={300}
                    height={300}
                    src={existingLogo}
                    alt="Existing logo"
                    className="w-24 h-24 object-cover rounded-md"
                  />
                )}
                <button
                  type="button"
                  onClick={() => onRemove("existingLogo")}
                  className="mt-2 p-1 bg-black/50 hover:bg-black duration-300 text-xs rounded-md absolute -top-3 -right-3"
                >
                  &#x274c;
                </button>
              </div>
            )}
      </div>
    </div>
  );
};
