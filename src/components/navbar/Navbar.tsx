"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import SheetMenu from "./SheetMenu";

const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Wore",
    link: "/contact",
  },
];

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 bg-transparent backdrop-blur-md text-white py-4 px-6 transition-transform duration-300 z-50 ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-[1240px] flex items-center justify-between">
        <div>
          <Image src="/images/logo.png" width={60} height={60} alt="logo" />
        </div>
        <ul className="hidden md:flex items-center gap-6 ">
          <li>A</li>
          <li>B</li>
          <li>C</li>
          <li>D</li>
        </ul>
        <div className="hidden md:block">
          <Button>Contact</Button>
        </div>
        <div className="md:hidden">
          <SheetMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
