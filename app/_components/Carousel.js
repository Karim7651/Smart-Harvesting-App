"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Array of images
const images = [
  { src: `${process.env.NEXT_PUBLIC_GALLERY}car-3.jpg`, alt: "Image 2" },
  { src: `${process.env.NEXT_PUBLIC_GALLERY}car-2.jpg`, alt: "Image 2" }
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState(500);
  const intervalRef = useRef(null);
  const startYRef = useRef(0);

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!isSwiping) intervalRef.current = setInterval(nextSlide, 3500);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
    setTransitionDuration(500);
    resetInterval();
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTransitionDuration(500);
    resetInterval();
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, [isSwiping]);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    startYRef.current = e.touches[0].clientY;
    setCurrentX(e.touches[0].clientX);
    setIsSwiping(true);
    setTransitionDuration(0);
    resetInterval();
  };

  const handleTouchMove = (e) => {
    if (!isSwiping) return;

    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;

    const dx = touchX - startX;
    const dy = touchY - startYRef.current;

    if (Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault();
      setCurrentX(touchX);
    }
  };

  const handleTouchEnd = () => {
    const distance = currentX - startX;

    if (distance < -50 && activeIndex < images.length - 1) nextSlide();
    else if (distance > 50 && activeIndex > 0) prevSlide();

    setIsSwiping(false);
    setCurrentX(0);
    setTransitionDuration(500);
  };

  const translateX =
    activeIndex * -100 +
    (isSwiping ? ((currentX - startX) / window.innerWidth) * 100 : 0);

  const finalTranslateX = Math.max(
    Math.min(translateX, 0),
    (images.length - 1) * -100
  );

  return (
    <header
      className="relative mt-20 overflow-hidden mx-10"
      style={{ touchAction: "pan-y" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative flex"
        style={{
          transform: `translateX(${finalTranslateX}%)`,
          transition: `transform ${transitionDuration}ms ease-in-out`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full flex items-center justify-center"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={1200}
              height={400}
              priority
              style={{
                borderRadius: "93% 7% 93% 7% / 8% 95% 5% 92%",
              }}
            />
          </div>
        ))}
      </div>

      {activeIndex > 0 && (
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-8 active:scale-75 -translate-y-1/2 bg-white/50 p-2 rounded-full focus:outline-none hover:bg-gray-200 transform transition-transform duration-300 ease-out hidden lg:block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6 text-gray-800"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {activeIndex < images.length - 1 && (
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-8 active:scale-75 -translate-y-1/2 bg-white/50 p-2 rounded-full focus:outline-none hover:bg-gray-200 transform transition-transform duration-300 ease-out hidden lg:block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6 text-gray-800"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => {
              setActiveIndex(index);
              resetInterval();
            }}
            className={`w-4 h-1.5 rounded-full cursor-pointer ${
              index === activeIndex ? "bg-gray-300" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </header>
  );
};

export default Carousel;
