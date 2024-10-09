import React from "react";
import FooterContent from "./components/FooterContent";
import GridBackground from "../hero/compoents/GridBackground";
import { Copyright } from "./components/Copyright";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const Footer = () => {
  return (
    <footer className="relative w-full">
      <GridBackground />
      <BackgroundBeamsWithCollision className="pt-[140px] pb-6 px-6">
        <div className="max-w-[1240px] w-full mx-auto">
          <FooterContent />
          <br />
          <Copyright />
        </div>
      </BackgroundBeamsWithCollision>
    </footer>
  );
};

export default Footer;
