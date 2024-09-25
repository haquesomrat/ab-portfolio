import React from "react";
import FeedbackCarousel from "./compoents/feedback-carousel";
import Container from "../../global/Container";
import { Meteors } from "@/components/ui/meteors";

const Feedbacks = () => {
  return (
    <section
      id="about"
      className="bg-[#0D1020] w-full py-10 lg:py-[100px] rounded-lg"
    >
      <Container className="overflow-hidden p-6 xl:p-0">
        <h2 className="text-2xl lg:text-4xl font-light text-center uppercase mb-8 lg:mb-14 max-w-[400px] text-white mx-auto">
          What others <span className="font-semibold">Says about me</span>
        </h2>
        <FeedbackCarousel />
      </Container>
    </section>
  );
};

export default Feedbacks;
