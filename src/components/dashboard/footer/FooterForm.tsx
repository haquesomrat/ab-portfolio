"use client";
import React, { useEffect, useMemo, useState } from "react";
import SocialMediaInput from "./SocialMediaInput";
import { Platform, SingleSocial, SocialMediaState } from "@/types/types";

export function SocialMediaForm() {
  const [socials, setSocials] = useState<SocialMediaState>({
    facebook: { logo: null, link: "" },
    github: { logo: null, link: "" },
    linkedin: { logo: null, link: "" },
    medium: { logo: null, link: "" },
    twitter: { logo: null, link: "" },
    dailydev: { logo: null, link: "" },
  });

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
    console.log({
      name: platform,
      link: socials[platform].link,
      logo: socials[platform].logo,
    });

    const formData = new FormData();
    formData.append("name", platform);
    formData.append("link", socials[platform].link);
    if (socials[platform].logo) {
      formData.append("logo", socials[platform].logo);
    }

    try {
      const res = await fetch(`/dashboard/footer/api`, {
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

  // get all socials
  useEffect(() => {
    const getSocial = async () => {
      try {
        const res = await fetch("/dashboard/footer/api");
        if (res.ok) {
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
    getSocial();
  }, [setSocials]);

  console.log(socials);

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
          />
        </div>
      ))}
    </div>
  );
}
