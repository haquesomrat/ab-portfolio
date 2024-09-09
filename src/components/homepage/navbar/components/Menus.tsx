"use client";

import { navItems } from "@/lib/data";
import Link from "next/link";
import React, { useState } from "react";

const Menus = () => {
  const [activeNavItem, setActiveNavItem] = useState(navItems[0].link);

  const handleNavItemClick = (link: string) => {
    setActiveNavItem(link);
  };
  return (
    <ul className="hidden md:flex items-center gap-6">
      {navItems.map((item, index) => (
        <li
          key={index}
          onClick={() => handleNavItemClick(item.link)}
          className={` px-3 py-1 rounded-full hover:text-[#FFFFFFE5] ${
            activeNavItem === item.link
              ? "text-[#FFFFFFE5] bg-[#FFFFFF26]"
              : "text-[#8F9AB2E5]"
          }`}
        >
          <Link href={item.link}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Menus;
