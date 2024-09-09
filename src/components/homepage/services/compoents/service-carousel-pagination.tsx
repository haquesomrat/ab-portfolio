import React from "react";

const ServiceCarouselPagination = () => {
  return (
    <div>
      <ul className="splide__pagination splide__pagination--ltr" role="tablist">
        <li role="presentation">
          <button
            className="splide__pagination__page is-active "
            type="button"
            role="tab"
            aria-controls="splide01-slide01"
            aria-label="Go to slide 1"
            aria-selected="true"
          ></button>
        </li>
        <li role="presentation">
          <button
            className="splide__pagination__page "
            type="button"
            role="tab"
            aria-controls="splide01-slide02"
            aria-label="Go to slide 2"
          ></button>
        </li>
      </ul>
    </div>
  );
};

export default ServiceCarouselPagination;
