import React from "react";
import { ContactForm } from "./ContactForm";

const FooterContent = () => {
  return (
    <div className="relative z-30 left-[50%] translate-x-[-50%]">
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-2xl lg:text-4xl font-light uppercase mb-6 text-[#F6F7FB]">
            Have a project in mind?
            <br /> Get in <span className="font-semibold">touch</span>
          </h2>
          <p className="text-[#8F9AB2] text-base lg:text-lg leading-relaxed">
            Let&apos;s do something great!
          </p>
          <p className="text-[#8F9AB2] text-base lg:text-lg leading-relaxed">
            Don&apos;t like forms? Send me an email.{" "}
            <span className="inline-block text-xl animate-wave">👋</span>
          </p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default FooterContent;
