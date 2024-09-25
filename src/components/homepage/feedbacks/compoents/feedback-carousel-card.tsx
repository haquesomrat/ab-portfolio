import { Meteors } from "@/components/ui/meteors";
import Image from "next/image";
import React from "react";

const FeedbackCarouselCard = () => {
  return (
    <div className=" w-full relative">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-2xl blur-3xl" />
      <div className="relative shadow-xl bg-[#D2BAA8] border border-gray-800 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
        {/* actual card */}
        <div className="flex flex-col lg:flex-row items-center p-6 lg:py-10 lg:px-14 rounded-2xl gap-4 lg:gap-8 relative z-50">
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

        {/* Meaty part - Meteor effect */}
        <Meteors number={20} />
      </div>
    </div>
  );
};

export default FeedbackCarouselCard;
