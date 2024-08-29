import React from "react";

const FeedbackCarouselArrows = () => {
  return (
    <div className="splide__arrows splide__arrows--ltr relative w-[132px] p-0 mt-10 mx-auto flex gap-3">
      <button
        className="splide__arrow--prev px-5 py-2.5 rounded-full border bg-transparent hover:bg-primary/90 group border-[#FFFFFF1A] rotate-180 duration-200"
        type="button"
        aria-label="Previous slide"
        aria-controls="splide01-track"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="stroke-[#F06373] group-hover:stroke-white"
            d="M17.5 10H2.5M2.5 10L8.75 3.75M2.5 10L8.75 16.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        className="splide__arrow--next px-5 py-2.5 rounded-full border bg-transparent hover:bg-primary/90 group border-[#FFFFFF1A] duration-200"
        type="button"
        aria-label="Next slide"
        aria-controls="splide01-track"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="stroke-[#F06373] group-hover:stroke-white"
            d="M2.5 10H17.5M17.5 10L11.25 3.75M17.5 10L11.25 16.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default FeedbackCarouselArrows;
