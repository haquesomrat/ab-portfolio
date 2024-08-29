"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/lib/data";
import Link from "next/link";
import { IconAlignRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const SheetMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(navItems[0].link);

  const handleNavItemClick = (link: string) => {
    setActiveNavItem(link);
  };

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <SheetTrigger asChild>
        <IconAlignRight stroke={2} className="size-8 cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="grid md:hidden text-white border-none bg-black/10 backdrop-blur-md">
        <ul className="grid space-y-3 text-center py-8 h-fit">
          {navItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleNavItemClick(item.link)}
              className={` px-3 py-1 rounded-full ${
                activeNavItem === item.link
                  ? "text-[#FFFFFFE5]"
                  : "text-[#8F9AB2E5]"
              }`}
            >
              <Link href={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <div className="text-center mt-auto">
          <Button>Contact</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetMenu;
