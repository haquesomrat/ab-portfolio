"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon, PanelsTopLeft } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Menu } from "./Menu";

const mobileItems = ["A", "B", "C"];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetTitle></SheetTitle>
        <SheetHeader>
          <Button className="flex justify-center items-center pb-2 pt-1">
            <Link href="/dashboard" className="flex items-center gap-2">
              <PanelsTopLeft className="w-6 h-6 mr-1" />
              <h1 className="font-bold text-lg">Student Club</h1>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
