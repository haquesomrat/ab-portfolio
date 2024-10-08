"use client";

import { useEffect, useState } from "react";
import Splide from "@splidejs/splide";
import FeedbackCarouselArrows from "./feedback-carousel-arrows";
import FeedbackCarouselCard from "./feedback-carousel-card";
import { Feedbacks } from "@/types/types";
import { getAllFeedbacks } from "../../../../../actions/feedback/get-all-feedbacks";

const FeedbackCarousel: React.FC = () => {
  // Explicitly define the state type as an array of Companies
  const [feedbacks, setFeedbacks] = useState<Feedbacks[]>([]); //dummyFeedbacks

  // Fetch all companies on component mount
  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        const response = await getAllFeedbacks();
        if (response?.ok) {
          const data: Feedbacks[] = await response.json(); // Explicitly define the type of fetched data
          setFeedbacks(data);
        } else {
          console.error("Failed to fetch feedbacks");
        }
      } catch (error) {
        console.error("An error occurred while fetching feedbacks:", error);
      }
    };
    getFeedbacks();
  }, []);

  // feedback carousel options
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
  }, [feedbacks]);

  return (
    <div className="feedback__splide splide col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-9">
      <div className="splide__track">
        <ul className="splide__list">
          {feedbacks.map((feedbackItem) => {
            return (
              <li key={feedbackItem._id} className="splide__slide">
                <FeedbackCarouselCard {...feedbackItem} />
              </li>
            );
          })}
        </ul>
      </div>

      {/* arrows */}
      <FeedbackCarouselArrows />
    </div>
  );
};

export default FeedbackCarousel;
