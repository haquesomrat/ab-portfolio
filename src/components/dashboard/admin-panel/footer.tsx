import { LinkPreview } from "@/components/ui/link-preview";

export function Footer() {
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center">
        <div className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
          © 2024 -{" "}
          <LinkPreview
            url="https://injamulhaque.me/"
            className="font-medium hover:dark:text-primary hover:trans"
          >
            www.aminbabu.com
          </LinkPreview>{" "}
          All Rights Reserved.
        </div>
      </div>
    </div>
  );
}
