"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Stock from "./Stock";
import PriceAndDiscount from "./PriceAndDiscount";
import Rating from "./Rating";
import Loading from "./Loading";
function ProductCard({ product }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const { _id, name, imageCover, images } = product;
  const allImages = [imageCover, ...images];
  const { addToCart, loadingCart } = useCart();

  const truncateName = (name) => {
    return name.length > 20 ? name.slice(0, 20) + "..." : name;
  };

  const handlePrev = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
      );
      setIsFading(false);
    }, 300);
  };

  const handleNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
      );
      setIsFading(false);
    }, 300);
  };

  return (
    <div className="card bg-base-200 md:w-[15rem] shadow-lg xs:w-[20rem]" id="card">
      <figure className="md:h-[10rem] xs:h-[15rem] relative">
        <Link href={`/products/${_id}`}>
          <Image
            src={allImages[currentIndex]}
            alt="title"
            fill
            style={{ objectFit: "contain" }}
            className={`transition-opacity duration-500 ease-in-out rounded-sm ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsFading(false)}
          />
        </Link>
      </figure>
      <div className="card-body p-5 pt-3">
        {allImages.length > 1 && (
          <div className="flex flex-col items-center ">
            <div className="flex items-center space-x-2 mb-2">
              <button
                className="p-2 bg-gray-300 rounded-full transform transition-transform duration-200 hover:scale-110 active:scale-90 hover:bg-gray-400"
                onClick={handlePrev}
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-2 h-2 text-gray-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div className="flex space-x-1">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentIndex ? "bg-gray-300" : "bg-gray-500"
                    }`}
                    onClick={() => {
                      setIsFading(true);
                      setTimeout(() => {
                        setCurrentIndex(index);
                        setIsFading(false);
                      }, 300);
                    }}
                    aria-label={`Show image ${index + 1}`}
                  />
                ))}
              </div>
              <button
                className="p-2 bg-gray-300 rounded-full transform transition-transform duration-200 hover:scale-110 active:scale-90 hover:bg-gray-400"
                onClick={handleNext}
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-2 h-2 text-gray-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
        <div className="relative group">
          <Link href={`/products/${_id}`}>
            <h2
              className="font-bold text-md primary-content"
              aria-hidden="true"
            >
              {truncateName(name)}
            </h2>
          </Link>
          <span
            className="absolute font-bold bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-neutral-600 bg-opacity-70 backdrop-blur-xs  text-white text-xs rounded px-2 py-1 z-10 whitespace-nowrap"
            aria-hidden="false"
          >
            {name}
          </span>
        </div>

        <PriceAndDiscount product={product} />
        <Stock product={product} className="font-light text-xs" />
        <Rating
          product={product}
          size={"1.2rem"}
          className="items-center justify-center text-lg "
        />

        <div className="card-actions justify-center">
          <button
            className=" text-white font-semibold flex w-full  items-center justify-center px-4 py-2 bg-green-500 shadow-lg  rounded-sm hover:bg-green-600 hover:scale-105 hover:shadow-xl transition-all duration-300 active:scale-95 disabled:bg-slate-500 disabled:hover:scale-100 disabled:active:scale-100"
            onClick={() =>
              addToCart(
                product._id,
                product.name,
                product.imageCover,
                product.finalPrice
              )
            }
            disabled={loadingCart}
          >
            {!loadingCart && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-plus mr-2 w-6 h-6"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                <path d="M12.5 17h-6.5v-14h-2" />
                <path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" />
                <path d="M16 19h6" />
                <path d="M19 16v6" />
              </svg>
            )}
            {loadingCart ? <Loading /> : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
