"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";

import Link from "next/link";

import React, { useState } from "react";
import { Button } from "./button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MyNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { id: 1, name: "Home", url: "/", active: pathname === "/" },
    {
      id: 2,
      name: "About",
      url: "/about",
      active: pathname?.includes("/about"),
    },
    { id: 3, name: "Work", url: "/work", active: pathname?.includes("/work") },
    { id: 4, name: "Blog", url: "/blog", active: pathname?.includes("/blog") },
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll={true}
      isBlurred={false}
      maxWidth="xl"
      height="5rem"
      className={`absolute ${isMenuOpen ? "bg-[#000314]" : "bg-transparent"}`}
    >
      <NavbarContent>
        <NavbarBrand>
          <Link href="/">
            <Image
              className="aspect-[50/42] w-10 md:w-full"
              src={"/images/logo.png"}
              width={50}
              height={42}
              alt="Logo"
            ></Image>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop menu content  */}
      <NavbarContent
        className="hidden sm:flex gap-[28px] text-white"
        justify="center"
      >
        {menuItems.map((item) => (
          <NavbarMenuItem
            className={cn(
              "px-3 py-1 text-sm  tracking-normal leading-relaxed font-bold text-[#8F9AB2E5] hover:text-white duration-300",
              item.active && "bg-[#FFFFFF26] rounded-full text-[#FFFFFFE5]"
            )}
            key={item.id}
          >
            <Link className="w-full" href={item.url}>
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button className="hidden lg:block min-w-[7.5rem]">Contact</Button>
        </NavbarItem>
        {/*dropdown menu toggle button */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-white"
        />
      </NavbarContent>

      {/* mobile menu content  */}
      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem
            className={cn(
              "px-3 py-1 text-sm  tracking-normal leading-relaxed font-bold",
              item.active && "bg-[#FFFFFF26] rounded-full"
            )}
            key={item.id}
          >
            <Link className="w-full text-white" href={item.url}>
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default MyNavbar;
