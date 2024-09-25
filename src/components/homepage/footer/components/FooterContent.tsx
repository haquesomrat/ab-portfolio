"use client";
import React, { useState } from "react";
import { ContactForm } from "./ContactForm";
import { ClipboardCheck, ClipboardPlus } from "lucide-react";
import MagicButton from "@/components/global/MagicButton";
import confetti from "canvas-confetti";

const FooterContent = () => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText("amin.babu.bd@gmail.com");
    setCopied(true);
    if (!copied) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const interval = window.setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);
    }
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };
  return (
    <div className="relative z-30 left-[50%] translate-x-[-50%]">
      <div className="grid grid-cols-2 gap-16 md:gap-6">
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
          <br />
          <p className="text-[#8F9AB2] text-base lg:text-lg leading-relaxed">
            Email :{" "}
            <a href="mailto:amin.babu.bd@gmail.com">amin.babu.bd@gmail.com</a>
          </p>
          <p className="text-[#8F9AB2] text-base lg:text-lg leading-relaxed">
            Contact : <a href="tel:+880 1621-990178">+880 1621-990178</a>
          </p>
          <MagicButton
            title={copied ? "Email copied" : "Copy my email"}
            icon={
              copied ? (
                <ClipboardCheck size={16} />
              ) : (
                <ClipboardPlus size={16} />
              )
            }
            position="left"
            otherClasses="!bg-[#161a31]"
            handleClick={handleCopy}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default FooterContent;
