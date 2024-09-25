"use client";

import { useEffect } from "react";
import Splide from "@splidejs/splide";
import Image from "next/image";
import FeedbackCarouselArrows from "./feedback-carousel-arrows";
import { Meteors } from "@/components/ui/meteors";
import FeedbackCarouselCard from "./feedback-carousel-card";

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
                  className="w-full h-full rounded-full aspect-[187/240] max-w-[100px] lg:max-w-[187px] object-cover"
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
                  className="w-full h-full rounded-full aspect-[187/240] max-w-[100px] lg:max-w-[187px] object-cover"
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
          {/* <li className="splide__slide">
            <FeedbackCarouselCard />
          </li>
          <li className="splide__slide">
            <FeedbackCarouselCard />
          </li> */}
        </ul>
      </div>

      {/* arrows */}
      <FeedbackCarouselArrows />
    </div>
  );
};

export default FeedbackCarousel;
