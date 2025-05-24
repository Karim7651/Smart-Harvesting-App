"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";

const categories = [
  {
    id: 1,
    name: "Ripeness detection using AI",
    imgSrc: `${process.env.NEXT_PUBLIC_GALLERY}cat-3.png`,
  },
  {
    id: 4,
    name: "Robotic Arm harvesting",
    imgSrc: `${process.env.NEXT_PUBLIC_GALLERY}cat-4.png`,
  },
  {
    id: 3,
    name: "Disease detection",
    imgSrc: `${process.env.NEXT_PUBLIC_GALLERY}cat-1.png`,
  },
  {
    id: 5,
    name: "Real-time crop analytics",
    imgSrc: `${process.env.NEXT_PUBLIC_GALLERY}cat-5.png`,
  },
  {
    id: 6,
    name: "Soil quality monitoring",
    imgSrc: `${process.env.NEXT_PUBLIC_GALLERY}cat-6.png`,
  },
  {
    id: 2,
    name: "Your Data is secure",
    imgSrc: `${process.env.NEXT_PUBLIC_GALLERY}cat-2.png`,
  }
];

const Categories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 4;

  const handleNext = () => {
    if (currentIndex + visibleItems < categories.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const variants = {
    hidden: { opacity: 0, x: 100, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -100, scale: 0.9 },
  };

  const visibleCategories = categories.slice(
    currentIndex,
    currentIndex + visibleItems
  );

  return (
    <div
      className="relative mb-20 mt-20 w-full overflow-hidden touch-none"
      {...swipeHandlers}
    >
      <div className="relative flex xs:gap-4 sm:gap-8 items-center justify-center">
        {visibleCategories.map((category, index) => {
          const isFirst = index === 0;
          const isLast = index === visibleCategories.length - 1;

          return (
            <motion.div
              className={`flex flex-col font-semibold gap-4 justify-center items-center ${isFirst ? "ml-8" : ""} ${isLast ? "mr-8" : ""}`}
              key={category.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
            >
              <div
                className="flex-shrink-0 relative 2xl:h-48 2xl:w-48 lg:w-40 lg:h-40 md:w-36 md:h-36 sm:h-32 sm:w-32 xs:h-[4rem] xs:w-[4rem] bg-base-200 rounded-full shadow-lg"
                style={{ borderRadius: "70% 30% 81% 19% / 21% 72% 28% 79%" }}
              >
                <Image
                  src={category.imgSrc}
                  alt={`${category.name} image`}
                  fill
                  priority
                  style={{ objectFit: "scale-down" }}
                />
              </div>
              <div>
                <h3 className="xs:text-xs text-center">{category.name}</h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="hidden lg:block absolute top-1/2 left-8 z-50 active:scale-75 -translate-y-1/2 bg-white/50 p-2 rounded-full focus:outline-none hover:bg-gray-200 transform transition-transform duration-300 ease-out hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6 text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {currentIndex + visibleItems < categories.length && (
        <button
          onClick={handleNext}
          className="hidden lg:block absolute top-1/2 right-8 z-50 -translate-y-1/2 active:scale-75 bg-white/50 p-2 rounded-full focus:outline-none hover:bg-gray-200 transform transition-transform duration-300 ease-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6 text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Categories;
