import React from "react";
import FooterContent from "./components/FooterContent";
import GridBackground from "../hero/GridBackground";
import { Copyright } from "./components/Copyright";

const Footer = () => {
  return (
    <footer className="pt-[140px] pb-6 relative w-full px-6">
      <GridBackground />
      <div className="max-w-[1240px] w-full mx-auto">
        <FooterContent />
        <br />
        <Copyright />
      </div>
    </footer>
  );
};

export default Footer;
