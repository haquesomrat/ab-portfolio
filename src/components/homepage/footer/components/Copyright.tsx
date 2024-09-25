import React from "react";
import { LinkPreview } from "@/components/ui/link-preview";
import moment from "moment";
import Link from "next/link";

export function Copyright() {
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
      <div className="flex gap-5">
        <a
          href="#"
          className="relative group/btn flex space-x-2 items-center justify-start p-2 h-10 w-10 text-black rounded-full  font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.995 12.0286C21.9936 6.50864 17.5125 2.02977 11.9925 2.03117C6.47249 2.03256 1.99362 6.51369 1.99502 12.0337C1.99624 16.8737 5.43726 20.9028 9.99749 21.8317L9.99577 15.0317L7.99577 15.0322L7.99502 12.0322L9.99502 12.0317L9.99439 9.53167C9.9939 7.60167 11.5635 6.03127 13.4935 6.03079L15.9935 6.03016L15.9943 9.03016L13.9943 9.03066C13.4443 9.0308 12.9944 9.48091 12.9945 10.0309L12.995 12.0309L15.995 12.0302L15.9958 15.0302L12.9958 15.0309L12.9975 21.9809C18.0474 21.4796 21.9963 17.2186 21.995 12.0286Z"
              fill="white"
            />
          </svg>
        </a>
        <a
          href="#"
          className="relative group/btn flex space-x-2 items-center justify-start p-2.5 h-10 w-10 text-black rounded-full font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9925 2.01798C10.6793 2.01831 9.37898 2.2773 8.16585 2.78015C6.95272 3.28301 5.85052 4.01988 4.92216 4.9487C3.04727 6.82454 1.99435 9.36834 1.99502 12.0205C1.99613 16.4405 4.86708 20.1898 8.83742 21.5188C9.33744 21.5987 9.49736 21.2886 9.49729 21.0186L9.49686 19.3286C6.72701 19.9293 6.13652 17.9895 6.13652 17.9895C5.67623 16.8296 5.02615 16.5197 5.02615 16.5197C4.116 15.9 5.096 15.9197 5.096 15.9197C6.09602 15.9895 6.62626 16.9493 6.62626 16.9493C7.49665 18.4691 8.96653 18.0187 9.53647 17.7786C9.62631 17.1286 9.8862 16.6885 10.1661 16.4384C7.94607 16.189 5.61585 15.3296 5.61489 11.5196C5.61461 10.4096 5.99439 9.5195 6.64421 8.80933C6.54414 8.55936 6.19388 7.51945 6.74354 6.16931C6.74354 6.16931 7.58347 5.8991 9.4938 7.18861C10.2837 6.96841 11.1437 6.8582 11.9937 6.85798C12.8437 6.85777 13.7037 6.96755 14.4938 7.18735C16.4035 5.89687 17.2435 6.16666 17.2435 6.16666C17.7939 7.51652 17.4441 8.55661 17.3442 8.80663C17.9944 9.51647 18.3746 10.4064 18.3749 11.5164C18.3759 15.3364 16.0361 16.177 13.8061 16.4275C14.1662 16.7374 14.4964 17.3474 14.4966 18.2774L14.4973 21.0174C14.4974 21.2874 14.6574 21.6073 15.1674 21.5172C19.1371 20.1762 21.9961 16.4355 21.995 12.0155C21.9947 10.7022 21.7357 9.40194 21.2328 8.18881C20.73 6.97569 19.9931 5.87348 19.0643 4.94513C18.1355 4.01678 17.0329 3.28046 15.8195 2.77822C14.6061 2.27598 13.3057 2.01765 11.9925 2.01798Z"
              fill="white"
            />
          </svg>
        </a>
        <a
          href="#"
          className="relative group/btn flex space-x-2 items-center justify-start p-2.5 h-10 w-10 text-black rounded-full font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9925 2.0048C6.46958 2.00619 1.99362 6.48441 1.99502 12.0073C1.99641 17.5302 6.47463 22.0062 11.9975 22.0048C17.5205 22.0034 21.9964 17.5252 21.995 12.0023C21.9936 6.47936 17.5154 2.0034 11.9925 2.0048ZM9.54815 16.1502L7.52315 16.1507L7.5215 9.63405L9.5465 9.63354L9.54815 16.1502ZM8.5213 8.8338C7.88172 8.83396 7.46806 8.38094 7.46792 7.82052C7.46777 7.24865 7.8937 6.80896 8.54683 6.80879C9.19995 6.80863 9.60007 7.24811 9.61271 7.81998C9.61285 8.3804 9.20047 8.83363 8.5213 8.8338ZM16.944 16.1483L14.919 16.1489L14.9181 12.5374C14.9179 11.6968 14.624 11.126 13.8917 11.1262C13.3323 11.1263 13.0001 11.5129 12.8533 11.8848C12.7992 12.0171 12.7857 12.2046 12.7857 12.3911L12.7867 16.1483L10.7606 16.1489L10.7595 11.7114C10.7593 10.8978 10.7331 10.2176 10.7059 9.63221L12.4653 9.63176L12.5582 10.5369L12.5988 10.5369C12.8654 10.1119 13.5183 9.48462 14.611 9.48435C15.9433 9.48401 16.9425 10.3765 16.943 12.2952L16.944 16.1483Z"
              fill="white"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
