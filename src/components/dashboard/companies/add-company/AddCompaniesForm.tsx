import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDropzone, Accept } from "react-dropzone";
import Image from "next/image";
import { addNewCompany } from "../../../../../actions/companies/add-new-company";
import { toast } from "sonner";
import LabelInputContainer from "@/components/global/LabelInputContainer";
import BottomGradient from "@/components/global/BottomGardient";

export function AddCompaniesForm() {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const handleDelete = () => {
    setFiles([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const companyName = (
      form.elements.namedItem("companyName") as HTMLInputElement
    ).value;

    // add company
    try {
      const response = await addNewCompany({
        companyName,
        companyImage: files[0],
      });

      const data = await response?.json();
      if (response?.ok) {
        form.reset();
        setFiles([]);
        toast.success(data?.message, {
          position: "top-center",
        });
      } else {
        toast.error(data?.error, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const dropzoneOptions = {
    onDrop: handleDrop,
    multiple: false,
    accept: {
      "image/*": [],
    } as Accept,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  return (
    <div className="w-full mx-auto rounded-none md:rounded-2xl shadow-input bg-white dark:bg-transparent">
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="company_name">
              Company Name
            </Label>
            <Input
              id="company_name"
              name="companyName"
              placeholder="Enter Company Name"
              type="text"
              required
            />
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="company_logo">
              Company Logo
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
                      height={300}
                      width={600}
                      src={URL.createObjectURL(files[0])}
                      alt="Preview"
                      className="w-32 h-20 object-contain aspect-video rounded-md"
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
