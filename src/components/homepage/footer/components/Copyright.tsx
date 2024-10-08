"use client";

import React, { useEffect, useId, useMemo, useState } from "react";
import { LinkPreview } from "@/components/ui/link-preview";
import moment from "moment";
import Link from "next/link";
import { Platform, SingleSocial, SocialMediaState } from "@/types/types";
import { getAllSocials } from "../../../../../actions/footer/get-all-footers";
import { Skeleton } from "@/components/ui/skeleton";

export function Copyright() {
  const [socials, setSocials] = useState<SocialMediaState>({
    facebook: { logo: null, link: "" },
    github: { logo: null, link: "" },
    linkedin: { logo: null, link: "" },
    medium: { logo: null, link: "" },
    twitter: { logo: null, link: "" },
    dailydev: { logo: null, link: "" },
  });
  const [loadingLogos, setLoadingLogos] = useState(true);

  const platforms = useMemo<Platform[]>(
    () => ["facebook", "github", "linkedin", "medium", "twitter", "dailydev"],
    []
  );

  // get all socials
  useEffect(() => {
    const getSocials = async () => {
      setLoadingLogos(true);
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
      } finally {
        setLoadingLogos(false); // End loading state
      }
    };
    getSocials();
  }, []);

  return (
    <div className="relative top-0 left-0 text-white flex flex-col-reverse md:flex-row justify-between items-center gap-6 mt-32 lg:mt-60">
      <div>
        <div className="text-sm leading-relaxed text-center uppercase">
          {/* <LinkPreview
            className="underline hover:no-underline z-20"
            url="https://aminbabu-inj.netlify.app"
          >
            www.aminbabu.com{" "}
          </LinkPreview> */}
          <Link
            className="text-primary"
            href={"https://aminbabu-inj.netlify.app"}
          >
            www.aminbabu.com{" "}
          </Link>
          &copy; {moment().format("YYYY")} - All Rights Reserved.
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {Object.entries(socials).map(([platform, { logo, link }]) => (
          <div className={logo ? "ml-5" : ""} key={platform}>
            {loadingLogos ? (
              <Skeleton className="h-10 w-10 rounded-full ml-5"></Skeleton>
            ) : logo && typeof logo === "string" && logo !== "" ? (
              <a
                href={link}
                className="relative group/btn flex space-x-2 items-center justify-center p-2 h-10 w-10 text-black rounded-full font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              >
                <div
                  className="flex items-center justify-center w-full"
                  dangerouslySetInnerHTML={{ __html: logo }}
                />
              </a>
            ) : (
              // Show nothing if logo is empty after loading
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
