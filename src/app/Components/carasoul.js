"use client"

import React, { useState, useEffect } from "react";

// interface CarouselProps {
//   children: React.ReactNode[];
//   autoPlay?: boolean;
//   interval?: number;
// }

export default function Carousel({ children, autoPlay = true, interval = 5000 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = React.Children.count(children);

  const next = () => {
    setActiveIndex((current) => (current + 1) % count);
  };

  const prev = () => {
    setActiveIndex((current) => (current - 1 + count) % count);
  };

  const goToIndex = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      next();
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoPlay, interval]);

  return (
    <div className="relative overflow-hidden">
      <div className="relative w-full h-full">
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className={`absolute w-full transition-all duration-500 transform ${index === activeIndex ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"}`}
          >
            {child}
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full z-10"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full z-10"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${index === activeIndex ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
