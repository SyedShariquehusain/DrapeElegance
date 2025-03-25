import React from "react";
import { Link } from "react-router-dom";



export default function ProductCard({ product }) {
  const { id, title, price, image, discountPercentage } = product;
  const hasDiscount = discountPercentage && discountPercentage > 0;
  const discountedPrice = hasDiscount ? price - (price * discountPercentage) / 100 : price;

  return (
    <div className="group h-full w-full overflow-hidden rounded-sm bg-white transition-all hover:shadow-md">
      {/* <Link to={`/products/${id}`} className="block h-full"> */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50">
          {hasDiscount && (
            <span className="absolute left-0 top-4 z-10 bg-red-500 px-3 py-1 text-xs font-medium text-white">
              {discountPercentage}% OFF
            </span>
          )}
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="mb-1 font-serif text-sm font-medium tracking-wide text-gray-900 line-clamp-2">
            {title}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-gray-900">
              ₹{discountedPrice.toLocaleString("en-IN")}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                ₹{price.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      {/* </Link> */}
      <div className="px-4 pb-4">
        <button className="w-full border border-gray-300 bg-white py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 active:bg-gray-100">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
