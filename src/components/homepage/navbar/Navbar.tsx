"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import SheetMenu from "./components/SheetMenu";
import Menus from "./components/Menus";
import Link from "next/link";
import { ButtonPrimary } from "../../global/ButtonPrimary";

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
      className={`fixed top-0 left-0 right-0 bg-transparent backdrop-blur-md text-white py-4 md:py-5 px-6 transition-transform duration-300 z-50 ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-[1240px] flex items-center justify-between">
        <Link href="/">
          <Image
            className="aspect-[50/42]"
            src="/images/logo.png"
            width={50}
            height={50}
            alt="logo"
          />
        </Link>
        <Menus />
        <div className="hidden md:block">
          <ButtonPrimary>Contact</ButtonPrimary>
        </div>
        <div className="md:hidden">
          <SheetMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
