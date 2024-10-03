"use client";
import React, { useEffect, useMemo, useState } from "react";
import SocialMediaInput from "./SocialMediaInput";
import { Platform, SingleSocial, SocialMediaState } from "@/types/types";
import { toast } from "sonner";
import { addUpdateSocial } from "../../../../actions/footer/add-update-social";
import { getAllSocials } from "../../../../actions/footer/get-all-footers";
import { deleteSocial } from "../../../../actions/footer/delete-social";

export function SocialMediaForm() {
  const [socials, setSocials] = useState<SocialMediaState>({
    facebook: { logo: null, link: "" },
    github: { logo: null, link: "" },
    linkedin: { logo: null, link: "" },
    medium: { logo: null, link: "" },
    twitter: { logo: null, link: "" },
    dailydev: { logo: null, link: "" },
  });
  const [refetch, setRefetch] = React.useState<boolean>(false);

  // Memoize platforms array to avoid recreating it on every render
  const platforms = useMemo<Platform[]>(
    () => ["facebook", "github", "linkedin", "medium", "twitter", "dailydev"],
    []
  );

  // Correctly type platform as Platform
  const handleFileUpload = (acceptedFiles: File[], platform: Platform) => {
    setSocials((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        logo: acceptedFiles[0] || null,
      },
    }));
  };

  // Correctly type platform as Platform
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    platform: Platform
  ) => {
    const { value } = e.target;
    setSocials((prev) => ({
      ...prev,
      [platform]: { ...prev[platform], link: value },
    }));
  };

  // Correctly type platform as Platform
  const handleSubmit = async (platform: Platform) => {
    if (socials[platform].link !== "" || socials[platform].logo !== null) {
      // post or update socials
      try {
        const res = await addUpdateSocial({
          name: platform,
          link: socials[platform]?.link,
          logo: socials[platform]?.logo ? socials[platform]?.logo : "",
        });
        const data = await res?.json();
        if (res?.ok) {
          toast.success(data?.message, {
            position: "top-center",
          });
          setRefetch(!refetch);
        } else {
          toast.error(data?.error, {
            position: "top-center",
          });
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

  // Handle delete logo with API call
  const handleDelete = async (platform: Platform) => {
    try {
      const response = await deleteSocial(platform);
      const data = await response?.json();
      console.log(data);

      if (response?.ok) {
        toast.success(data?.message, {
          position: "top-center",
        });

        // Remove the logo locally
        setSocials((prev) => ({
          ...prev,
          [platform]: {
            ...prev[platform],
            logo: null, // Remove the logo from the state after successful deletion
          },
        }));
      } else {
        toast.error(data?.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error(
        `An error occurred while deleting logo for ${platform}:`,
        error
      );
    }
  };

  // get all socials
  useEffect(() => {
    const getSocials = async () => {
      try {
        const res = await getAllSocials();
        if (res?.ok) {
          const data: SingleSocial[] = await res.json();

          // Update socials state based on fetched data
          const updatedSocials = { ...socials };
          await Promise.all(
            data.map(async (item) => {
              const platform = item.name as Platform;
              if (platforms.includes(platform)) {
                updatedSocials[platform] = {
                  logo: item?.logo || null,
                  link: item?.link || "",
                };
              }
            })
          );

          setSocials(updatedSocials);
        } else {
          console.error("Failed to fetch socials");
        }
      } catch (error) {
        console.error("An error occurred while fetching socials:", error);
      }
    };
    getSocials();
  }, [setSocials, refetch]); // do not use platforms and socials as dependenncies

  return (
    <div className="space-y-6 pt-6">
      {platforms.map((platform) => (
        <div key={platform} className="mb-6 p-4 border rounded-md shadow-sm">
          <h3 className="text-lg capitalize mb-4">{platform}</h3>
          <SocialMediaInput
            platform={platform}
            data={socials[platform]}
            onFileUpload={handleFileUpload}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  );
}
