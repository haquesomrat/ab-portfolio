"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDropzone, Accept } from "react-dropzone";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Hero } from "@/types/types";
import Loading from "@/components/global/Loading";

export function HeroTable() {
  const [files, setFiles] = useState<File[]>([]);
  const [hero, setHero] = useState<Hero[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const handleDelete = () => {
    setFiles([]); // Clear the files array
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const motto = (form.elements.namedItem("motto") as HTMLInputElement).value;
    const headline = (form.elements.namedItem("headline") as HTMLInputElement)
      .value;
    const intro = (form.elements.namedItem("intro") as HTMLInputElement).value;

    const formData = new FormData();
    formData.append("motto", motto);
    formData.append("headline", headline);
    formData.append("intro", intro);
    if (files.length > 0) {
      formData.append("logo", files[0]);
    }

    console.log({ motto, headline, intro, files: files[0] });

    try {
      const res = await fetch(`/dashboard/hero/api`, {
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
      "image/svg+xml": [], //accept svg files
    } as Accept,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  // get all services
  useEffect(() => {
    const getHero = async () => {
      try {
        const res = await fetch("/dashboard/hero/api");
        if (res.ok) {
          const data: Hero[] = await res.json();
          setHero(data);
        } else {
          console.error("Failed to fetch services");
        }
      } catch (error) {
        console.error("An error occurred while fetching services:", error);
      }
    };
    getHero();
  }, [setHero]);

  return (
    <div className="w-full mx-auto rounded-none md:rounded-2xl shadow-input bg-white dark:bg-transparent">
      <form className="my-8" onSubmit={handleSubmit}>
        {/* Website logo  */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="website_logo">
              Website Logo
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
              {files.length > 0 ? (
                <div className="mt-4 relative w-fit">
                  <Image
                    height={300}
                    width={300}
                    src={URL.createObjectURL(files[0])}
                    alt="Preview"
                    className="w-24 h-24 object-contain aspect-square rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="mt-2 p-1 bg-black/50 hover:bg-black duration-300 text-xs rounded-md absolute -top-3 -right-3"
                  >
                    &#x274c;
                  </button>
                </div>
              ) : (
                hero[0]?.logo && (
                  <div className="relative group mt-4 w-fit">
                    {hero[0].logo.startsWith("<svg") ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: hero[0]?.logo }}
                      />
                    ) : (
                      <Image
                        width={300}
                        height={300}
                        src={hero[0]?.logo}
                        alt="Existing logo"
                        className="w-24 h-24 object-contain rounded-md"
                      />
                    )}
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="mt-2 p-1 bg-black/50 hover:bg-black duration-300 text-xs rounded-md absolute -top-3 -right-3"
                    >
                      &#x274c;
                    </button>
                  </div>
                )
              )}
            </div>
          </LabelInputContainer>
        </div>
        {/* motto */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="motto">
              Motto
            </Label>
            <Input
              id="motto"
              name="motto"
              defaultValue={hero[0]?.motto}
              placeholder="Enter Your Motto"
              type="text"
              required
            />
          </LabelInputContainer>
        </div>
        {/* headline */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="headline">
              Headline
            </Label>
            <Input
              id="headline"
              name="headline"
              defaultValue={hero[0]?.headline}
              placeholder="Enter Website Headline"
              type="text"
              required
            />
          </LabelInputContainer>
        </div>
        {/* intro */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mb-2" htmlFor="intro">
              Introduction
            </Label>
            <Textarea
              className="h-32"
              id="intro"
              name="intro"
              defaultValue={hero[0]?.intro}
              placeholder="Give A Short Introduction"
              //   type="text"
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
