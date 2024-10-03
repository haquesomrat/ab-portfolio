"use client";
import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDropzone, Accept } from "react-dropzone";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Feedbacks } from "@/types/types";
import Loading from "@/components/global/Loading";
import { getSingleFeedback } from "../../../../../actions/feedback/get-single-feedback";
import { updateFeedback } from "../../../../../actions/feedback/update-feedback";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import BottomGradient from "@/components/global/BottomGardient";
import LabelInputContainer from "@/components/global/LabelInputContainer";

interface CompanyUpdateContainerProps {
  id: string;
}

export function UpdateFeedbackForm({ id }: CompanyUpdateContainerProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [singleFeedback, setSingleFeedback] = useState<Feedbacks | null>(null);
  const [selectedColor, setSelectedColor] = useState(singleFeedback?.color);
  const [refetch, setRefetch] = React.useState<boolean>(false);
  const router = useRouter();

  // Fetch single feedback data
  useEffect(() => {
    const getFeedback = async () => {
      const response = await getSingleFeedback(id);
      const data = await response?.json();
      setSingleFeedback(data);
    };
    getFeedback();
  }, [id]);

  // Handling file upload with Dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles([...acceptedFiles]);
  }, []);

  // Remove file
  const removeFile = (file: File) => {
    setFiles(files.filter((f) => f !== file));
  };

  const dropzoneOptions = {
    onDrop: onDrop,
    multiple: false, // Set to true if you want to allow multiple files
    accept: {
      "image/*": [], // Restrict file types to images
    } as Accept,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  // Fallback loading
  if (!singleFeedback) return <Loading />;

  // destructure single feedback
  const { name, company, feedback, color, image } = singleFeedback;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const newName = (form.elements.namedItem("name") as HTMLInputElement).value;
    const newCompany = (form.elements.namedItem("company") as HTMLInputElement)
      .value;
    const newFeedback = (
      form.elements.namedItem("feedback") as HTMLInputElement
    ).value;
    const newColor = (
      form.elements.namedItem("feedback_color") as HTMLInputElement
    ).value;

    if (
      name != newName ||
      company != newCompany ||
      feedback != newFeedback ||
      selectedColor !== undefined ||
      files.length > 0
    ) {
      // update feedback
      try {
        const response = await updateFeedback(id, {
          name: newName,
          company: newCompany,
          feedback: newFeedback,
          color: selectedColor === undefined ? color : selectedColor,
          image:
            files.length > 0
              ? files[0]
              : typeof image === "string"
              ? image
              : "",
        });
        const updateMessage = await response?.data?.message;
        if (response?.status === 200) {
          toast.success(updateMessage, {
            position: "top-center",
          });
          setRefetch(!refetch);
          router.push("/dashboard/feedback");
        } else {
          toast.error(updateMessage, {
            position: "top-center",
          });
        }
      } catch (error) {
        console.error("An error occurred:", error);
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
        {/* Feedback given by */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              defaultValue={singleFeedback?.name}
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
                {files.length > 0 ? (
                  <div className="mt-4 relative w-fit">
                    <Image
                      height={200}
                      width={500}
                      src={URL.createObjectURL(files[0])}
                      alt="Preview"
                      className="w-32 h-32 object-cover aspect-square rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(files[0])}
                      className="mt-2 p-1 bg-black/50 hover:bg-black duration-300 text-xs rounded-md absolute -top-3 -right-3"
                    >
                      &#x274c;
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 relative w-fit">
                    <Image
                      height={200}
                      width={500}
                      src={singleFeedback?.image}
                      alt="Preview"
                      className="w-32 h-32 object-cover aspect-square rounded-md"
                    />
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
              defaultValue={singleFeedback?.company}
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
              defaultValue={singleFeedback?.feedback}
              placeholder="Enter Feedback"
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
              defaultValue={color}
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
