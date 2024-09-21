"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Loading from "@/components/global/Loading";

interface CompanyUpdateFormProps {
  id: string;
}
interface Company {
  companyName: string;
  companyImg: string;
}

export function CompanyUpdateForm({ id }: CompanyUpdateFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [singleCompany, setSingleCompany] = useState<Company | null>(null);

  // get single company data
  useEffect(() => {
    const getSingleCompany = async () => {
      const res = await fetch(`/dashboard/companies/api/${id}`);
      const data = await res.json();
      setSingleCompany(data);
    };
    getSingleCompany();
  }, [id]);

  // handling file upload with Dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles([...acceptedFiles]);
  }, []);

  // remove file
  const removeFile = (file: File) => {
    setFiles(files.filter((f) => f !== file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [], // Restrict file types to images
    } as Accept,
    multiple: false,
  });

  // fallback loading
  if (!singleCompany) return <Loading />;

  // destructure single company data
  const { companyName, companyImg } = singleCompany;

  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget; // Using currentTarget for form

    const newCompanyName = (
      form.elements.namedItem("companyName") as HTMLInputElement
    ).value;

    const formData = new FormData();
    formData.append("companyName", newCompanyName);
    if (files.length < 1) {
      formData.append("companyImage", singleCompany?.companyImg);
    } else {
      formData.append("companyImage", files[0]);
    }

    // update the company data
    try {
      const res = await fetch(`/dashboard/companies/api/update-company/${id}`, {
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
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="company_name">
              Company Name
            </Label>
            <Input
              id="company_name"
              name="companyName"
              placeholder="Enter Company Name"
              defaultValue={companyName}
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
                      src={companyImg}
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
          Update &rarr;
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
