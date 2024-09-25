"use client";
import React, { useCallback, useEffect, useState } from "react"; // Correctly import useCallback from React
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDropzone, Accept } from "react-dropzone"; // Ensure this is correctly imported
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Projects } from "@/types/types";
import Loading from "@/components/global/Loading";
import BottomGradient from "@/components/global/BottomGardient";
import LabelInputContainer from "@/components/global/LabelInputContainer";

interface CompanyUpdateFormProps {
  id: string;
}

export function UpdateProjectForm({ id }: CompanyUpdateFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [singleProject, setSingleProject] = useState<Projects | null>(null);
  const [selectedColor, setSelectedColor] = useState("#8da4de");

  // Fetch single project data
  useEffect(() => {
    const getSingleProject = async () => {
      const res = await fetch(`/dashboard/projects/api/${id}`);
      const data = await res.json();
      setSingleProject(data);
    };
    getSingleProject();
  }, [id]);

  // Handling file upload with Dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles([...acceptedFiles]);
  }, []);

  // Remove file
  const removeFile = (file: File) => {
    setFiles(files.filter((f) => f !== file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    multiple: false, // Set to true if you want to allow multiple files
    accept: {
      "image/*": [], // Restrict file types to images
    } as Accept,
  });

  // Fallback loading
  if (!singleProject) return <Loading />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const description = (
      form.elements.namedItem("description") as HTMLInputElement
    ).value;
    const link = (form.elements.namedItem("live_link") as HTMLInputElement)
      .value;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("live_link", link);
    formData.append("color", selectedColor);
    if (files.length > 0) {
      formData.append("preview_image", files[0]);
    }

    console.log({ title, description, link, files, selectedColor });

    // call update project api
    try {
      const res = await fetch(`/dashboard/projects/api/update-project/${id}`, {
        method: "PATCH",
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
              defaultValue={singleProject?.title}
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
              defaultValue={singleProject?.description}
              placeholder="Enter Project Description"
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
              defaultValue={singleProject?.live_link}
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
              defaultValue={singleProject?.color}
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="rounded-md h-20 w-20"
            />
            <p>{selectedColor}</p>
          </LabelInputContainer>
        </div>
        {/* Project Image */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="company_logo">
              Project Image
            </Label>
            <div className="rounded-md">
              <div
                {...getRootProps({ className: "dropzone" })}
                className="border-2 border-dashed border-gray-400 p-4 h-20 rounded-md flex justify-center items-center "
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
                      className="w-32 h-16 object-contain aspect-video"
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
                      src={singleProject?.preview_image}
                      // src={"https://i.ibb.co.com/dGXwX8w/3f480cac7dfc.png"}
                      alt="Preview"
                      className="w-32 h-16 object-contain aspect-video"
                    />
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