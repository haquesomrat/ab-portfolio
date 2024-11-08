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
import { getSingleService } from "../../../../../actions/services/get-single-service";
import { toast } from "sonner";
import { updateService } from "../../../../../actions/services/update-service";
import { useRouter } from "next/navigation";

interface serviceUpdateProps {
  id: string;
}

export function UpdateServicesForm({ id }: serviceUpdateProps) {
  const [file, setFile] = useState<File[]>([]);
  const [singleService, setSingleService] = useState<Services | null>(null);
  const [refetch, setRefetch] = React.useState<boolean>(false);
  const router = useRouter();

  // get single service data
  useEffect(() => {
    const getService = async () => {
      try {
        const response = await getSingleService(id);
        if (response?.ok) {
          const data = await response.json();
          setSingleService(data);
        } else {
          console.error("Failed to fetch service");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    getService();
  }, [id, refetch]);

  // handling file upload with Dropzone
  const handleFileUpload = (acceptedFiles: File[]) => {
    setFile(acceptedFiles);
  };
  // remove file
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

    const newName = (form.elements.namedItem("serviceName") as HTMLInputElement)
      .value;
    const newDetails = (
      form.elements.namedItem("serviceDetails") as HTMLInputElement
    ).value;

    // check the new input
    if (name != newName || details != newDetails || file.length > 0) {
      // update the service data
      try {
        const response = await updateService(id, {
          name: newName,
          details: newDetails,
          logo:
            file.length > 0 ? file[0] : typeof logo === "string" ? logo : "",
        });
        const updateMessage = await response?.data?.message;
        if (response?.status === 200) {
          toast.success(updateMessage, {
            position: "top-center",
          });
          setRefetch(!refetch);
          router.push("/dashboard/services");
        } else {
          toast.error(updateMessage, {
            position: "top-center",
          });
        }
      } catch (error) {
        console.error("An error occurred", error);
      }
    } else {
      toast.error("No file changes", {
        position: "top-center",
      });
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
              existingLogo={typeof logo === "string" ? logo : undefined} // pass the existing logo
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
              </div>
            )}
      </div>
    </div>
  );
};
