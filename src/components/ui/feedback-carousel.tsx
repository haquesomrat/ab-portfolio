"use client";

import { useEffect } from "react";
import Splide from "@splidejs/splide";
import Image from "next/image";

const FeedbackCarousel: React.FC = () => {
  useEffect(() => {
    const feedbackCarousel = new Splide(".feedback__splide.splide", {
      type: "loop",
      perMove: 1,
      perPage: 1,
      gap: 24,
      autoplay: true,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      flickPower: 600,
      waitForTransition: true,
      arrows: true,
      pagination: false,
      trimSpace: false,
      interval: 2000,
      pauseOnHover: true,
      pauseOnFocus: true,
      keyboard: true,
      width: "100%",
      height: "100%",
      mediaQuery: "min",
      breakpoints: {
        768: { perPage: 2 },
      },
    });

    feedbackCarousel.mount();

    return () => {
      feedbackCarousel.destroy();
    };
  }, []);

  return (
    <div className="feedback__splide splide col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-9">
      <div className="splide__track">
        <ul className="splide__list">
          <li className="splide__slide">
            <div className="bg-[#D2BAA8] flex flex-col lg:flex-row items-center p-6 lg:py-10 lg:px-14 rounded-2xl gap-4 lg:gap-8">
              <div className="lg:w-[40.4%]">
                <Image
                  className="w-full h-full rounded-full aspect-[187/240] max-w-[100px] lg:max-w-[187px]"
                  src="/images/feedbacks/feedback-one.png"
                  width={187}
                  height={240}
                  alt="feedback image"
                />
              </div>
              <div className="lg:w-[59.6%]">
                <p className="text-sm leading-relaxed text-[#00000099]">
                  Proin blandit molestie neque orci pellentesque curabitur.
                  Consectetur malesuada massa in vel tincidunt nec egestas. Elit
                  semper non curabitur eu ornare malesuada enim orci.{" "}
                </p>
                <h5 className="text-xl font-bold mt-4 mb-1 leading-snug text-[#663714]">
                  John Doe
                </h5>
                <p className="text-sm leading-relaxed text-[#784218]">
                  Company name
                </p>
              </div>
            </div>
          </li>
          <li className="splide__slide">
            <div className="bg-[#A8C0D2] flex flex-col lg:flex-row items-center p-6 lg:py-10 lg:px-14 rounded-2xl gap-4 lg:gap-8">
              <div className="lg:w-[40.4%]">
                <Image
                  className="w-full h-full rounded-full aspect-[187/240] max-w-[100px] lg:max-w-[187px]"
                  src="/images/feedbacks/feedback-two.png"
                  width={187}
                  height={240}
                  alt="feedback image"
                />
              </div>
              <div className="lg:w-[59.6%]">
                <p className="text-sm leading-relaxed text-[#00000099]">
                  Proin blandit molestie neque orci pellentesque curabitur.
                  Consectetur malesuada massa in vel tincidunt nec egestas. Elit
                  semper non curabitur eu ornare malesuada enim orci.{" "}
                </p>
                <h5 className="text-xl font-bold mt-4 mb-1 leading-snug text-[#144366]">
                  John Doe
                </h5>
                <p className="text-sm leading-relaxed text-[#184F78]">
                  Company name
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/* arrows */}
      <div className="splide__arrows splide__arrows--ltr relative w-[132px] p-0 mt-10 mx-auto flex gap-3">
        <button
          className="splide__arrow--prev px-5 py-2.5 rounded-full border bg-transparent border-[#FFFFFF1A] rotate-180"
          type="button"
          aria-label="Previous slide"
          aria-controls="splide01-track"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 10H2.5M2.5 10L8.75 3.75M2.5 10L8.75 16.25"
              stroke="#F06373"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className="splide__arrow--next px-5 py-2.5 rounded-full border bg-transparent border-[#FFFFFF1A]"
          type="button"
          aria-label="Next slide"
          aria-controls="splide01-track"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 10H17.5M17.5 10L11.25 3.75M17.5 10L11.25 16.25"
              stroke="#F06373"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FeedbackCarousel;
