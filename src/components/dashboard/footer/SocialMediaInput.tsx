import { Button } from "@/components/ui/button";
import { Platform, SocialMedia } from "@/types/types";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

const SocialMediaInput = ({
  platform,
  data,
  onFileUpload,
  onInputChange,
  onSubmit,
  onDelete, // Add delete handler as a prop
}: {
  platform: Platform;
  data: SocialMedia;
  onFileUpload: (acceptedFiles: File[], platform: Platform) => void;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    platform: Platform
  ) => void;
  onSubmit: (platform: Platform) => void;
  onDelete: (platform: Platform) => void; // Define delete handler type
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => onFileUpload(acceptedFiles, platform),
    accept: { "image/*": [], "image/svg+xml": [] },
    multiple: false,
  });

  // Check if the logo is a file or a URL
  const logoSrc =
    typeof data?.logo === "string"
      ? data?.logo
      : data?.logo instanceof File
      ? URL.createObjectURL(data?.logo)
      : null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(platform);
      }}
    >
      <div
        {...getRootProps({
          className: "border-dashed border-2 p-4 rounded-md cursor-pointer",
        })}
      >
        <input {...getInputProps()} />
        <p>Drag & drop or click to upload {platform} logo</p>
      </div>

      {logoSrc && typeof data?.logo === "string" && (
        <div className="mt-4 inline-flex items-center relative h-28 w-28 justify-center border border-dotted rounded-xl bg-background">
          {data?.logo.startsWith("<svg") ? (
            <div
              dangerouslySetInnerHTML={{ __html: logoSrc }}
              className="object-cover rounded-md"
            />
          ) : (
            <Image
              src={logoSrc}
              alt={`${platform} logo`}
              className="object-cover rounded-md"
              width={100}
              height={100}
            />
          )}
          <button
            type="button"
            onClick={() => onDelete(platform)}
            className="mt-2 p-1 bg-black/50 hover:bg-black duration-300 text-xs rounded-md absolute -top-3 -right-3"
          >
            &#x274c;
          </button>
        </div>
      )}

      {logoSrc && data?.logo instanceof File && (
        <div className="mt-4 inline-flex items-center relative h-28 w-28 justify-center border border-dotted rounded-xl bg-background">
          <Image
            src={logoSrc}
            alt={`${platform} logo`}
            className="object-cover rounded-md"
            width={100}
            height={100}
          />
          <button
            type="button"
            onClick={() => onDelete(platform)}
            className="mt-2 p-1 bg-black/50 hover:bg-black duration-300 text-xs rounded-md absolute -top-3 -right-3"
          >
            &#x274c;
          </button>
        </div>
      )}

      <div className="mt-4">
        <input
          type="url"
          placeholder={`Enter ${platform} link`}
          value={data?.link}
          onChange={(e) => onInputChange(e, platform)}
          className="w-full border p-2 rounded-md"
        />
      </div>

      <Button
        type="submit"
        className="mt-4 bg-primary text-white px-4 py-2 rounded-md"
      >
        Submit {platform}
      </Button>
    </form>
  );
};

export default SocialMediaInput;
