"use client";
import { useCart } from "../_contexts/cartContext";
import Image from "next/image";
import { useState, useRef } from "react";
import Truck from "tabler-icons-react/dist/icons/truck";
import Package from "tabler-icons-react/dist/icons/package";
import ShoppingCartPlus from "tabler-icons-react/dist/icons/shopping-cart-plus";
import { toast } from "sonner";
import ProductDescriptionAccordion from "./ProductDescriptionAccordion";
import Breadcrumb from "./Breadcrumb";
import Link from "next/link";
import Stock from "./Stock";
import PriceAndDiscount from "./PriceAndDiscount";
import Rating from "./Rating";
import ReviewContainer from "./ReviewContainer";
import Loading from "./Loading";

function ProductDetails({ product }) {
  // Sample reviews array
  // const reviews = [
  //   {
  //     name: "John Doe",
  //     rating: 5,
  //     title: "Amazing product!",
  //     review: "I absolutely loved this product. It exceeded all my expectations!",
  //   },
  //   {
  //     name: "Jane Smith",
  //     rating: 4,
  //     title: "Good but not great",
  //     review: "The product is decent, but there are a few things that could be improved.",
  //   },
  //   {
  //     name: "Michael Johnson",
  //     rating: 3,
  //     title: "Average",
  //     review: "It's okay. Not too bad but definitely could be better.",
  //   },
  //   {
  //     name: "Alice Brown",
  //     rating: 5,
  //     title: "Highly recommend!",
  //     review: "This product is fantastic! I'll be buying more in the future.",
  //   },
  // ];
  const reviews2 = [];
  if (!product) {
    return <div>No product</div>;
  }
  const { addToCart,loadingCart } = useCart();
  const [currentImage, setCurrentImage] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const thumbnailsRef = useRef(null);

  const images = [product.imageCover, ...product.images];

  const handleImageClick = (index) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentImage(index);
      setIsFading(false);
      if (thumbnailsRef.current) {
        const thumbnail = thumbnailsRef.current.children[index];
        if (thumbnail) {
          const container = thumbnailsRef.current;
          const isHorizontal = container.scrollWidth > container.clientWidth;
          const isVertical = container.scrollHeight > container.clientHeight;
          if (isHorizontal) {
            container.scrollTo({
              left:
                thumbnail.offsetLeft -
                container.clientWidth / 2 +
                thumbnail.clientWidth / 2,
              behavior: "smooth",
            });
          } else if (isVertical) {
            container.scrollTo({
              top:
                thumbnail.offsetTop -
                container.clientHeight / 2 +
                thumbnail.clientHeight / 2,
              behavior: "smooth",
            });
          }
        }
      }
    }, 300);
  };

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity > product.stock) {
      toast.error("You can't add more than the available stock");
      return;
    }
    setQuantity(newQuantity > 0 ? newQuantity : 1);
  };

  const handleBuyNow = () => {
    console.log(`Proceeding to checkout with ${quantity} of ${product.name}`);
  };

  const breadcrumbItems = [
    { label: "Home", url: "/" },
    {
      label: product.mainCategory,
      url: `/search?mainCategory=${product.mainCategory}`,
    },
  ];

  //check if there are any subCategories
  if (product.subCategories && product.subCategories.length > 0) {
    breadcrumbItems.push({
      label: product.subCategories[0],
      url: `/search?subCategories=${product.subCategories[0]}`,
    });
  }

  breadcrumbItems.push({ label: product.name });

  return (
    <div className="mx-auto py-5 px-4 ">
      {/* Breadcrumb Component */}
      <Breadcrumb array={breadcrumbItems} />

      <div className="flex gap-3 items-center flex-col lg:flex-row justify-center  border-[0.05rem] border-neutral-600 rounded-md px-8 py-8 mt-6 shadow-lg">
        {/* Thumbnails and Main Image */}
        <div className="flex flex-row gap-3 justify-center relative lg:flex-col lg:h-70 lg:mr-[2rem] lg:h-[25rem] lg:w-[8rem] xs:w-[25rem] xs:overflow-x-auto lg:overflow-y-visible xs:overflow-y-hidden">
          <div
            className="flex lg:flex-col lg:overflow-x-auto xs:overflow-y-auto scrollbar-hide xs:overflow-x-auto gap-4"
            ref={thumbnailsRef}
          >
            {images.map((image, index) => (
              <div
                className={`relative w-24 h-24 shrink-0 rounded-sm transition-all duration-400 ease-[cubic-bezier(0.25, 0.1, 0.25, 1)] ${
                  currentImage === index ? "" : "opacity-60 grayscale-[60%]"
                }`}
                key={index}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index}`}
                  fill
                  style={{ objectFit: "contain" }}
                  onClick={() => handleImageClick(index)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-96 h-96 overflow-hidden">
          <Image
            src={images[currentImage]}
            alt="Main product image"
            className={`rounded-sm transition-opacity duration-200 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="self-center my-3 lg:my-16 lg:ml-10">
          {/* Product Info */}
          <h2 className="text-2xl font-bold mb-3">{product.name}</h2>
          {/* <p className="font-extralight">{product.mainCategory}</p> */}
          <Link
            href={`/search?mainCategory=${product.mainCategory}`}
            className="font-light"
          >
            {product.mainCategory.charAt(0).toUpperCase() +
              product.mainCategory.slice(1)}
          </Link>
          <div className="divider divider-neutral mt-1"></div>

          {/* Price and Stock */}
          <PriceAndDiscount product={product} className={"mb-4"} />

          <Stock product={product} className={"font-light text-xs mb-1"} />
          <div className="flex items-center justify-start mb-4">
            <Rating
              product={product}
              size={"1.4rem"}
              className="justify-center items-center "
            />
          </div>
          {/* Quantity Selector */}
          <div className="flex flex-row items-center justify-between mb-4">
            <h3 className="text-sm self-center font-semibold">Quantity:</h3>

            <div className="flex items-center shadow-md ">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-l-sm bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-95"
              >
                -
              </button>
              <span className="px-4 py-2 border-t border-b border-gray-300 w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-r-sm bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-95"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mb-4 h-10 justify-center items-center">
            <button
              onClick={() =>
                addToCart(product._id,product.name,product.imageCover,product.finalPrice,quantity)
              }
              className="font-semibold  flex items-center justify-center px-4 py-2 bg-blue-500 shadow-lg text-white rounded-sm hover:bg-blue-600 hover:scale-105 hover:shadow-xl transition-all duration-300 w-[50%] active:scale-95 disabled:bg-slate-500 disabled:hover:scale-100 disabled:active:scale-100"
              disabled={loadingCart} // Disable while loading
            >
              {!loadingCart && <ShoppingCartPlus className="mr-2" size={30} />}{" "}
              {/* Show icon if not loading */}
              {loadingCart ? <Loading /> : "Add to Cart"}
              {/* Show spinner if loading */}
            </button>

            <button
              onClick={handleBuyNow}
              className="font-semibold flex items-center justify-center px-4 py-2 bg-green-500 shadow-lg text-white rounded-sm hover:bg-green-600 hover:scale-105 hover:shadow-xl transition-all duration-300 w-[50%] active:scale-95"
            >
              <Truck className="mr-2" size={30} />
              Buy Now
            </button>
          </div>

          {/* Delivery Info */}
          <div className="flex flex-col space-y-3 text-sm font-medium mt-7">
            <div className="flex items-center">
              <Truck size={30} className="mr-3" />
              <p>
                <span>Doorstep Delivery,</span> Your order will be shipped in
                2-5 days.
              </p>
            </div>
            <div className="flex items-center">
              <Package size={30} className="mr-3" />
              <p>Easy Returns, within 30 days from the delivery date.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-5 shadow-lg">
        <ProductDescriptionAccordion description={product.description} />
      </div>
      <ReviewContainer reviews={product.reviews} />
    </div>
  );
}

export default ProductDetails;
