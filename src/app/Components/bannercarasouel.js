import React from "react";
import  Carousel  from "../Components/carasoul";



export default function BannerCarousel({ images }) {
  return (
    <div className="relative w-full h-[70vh] md:h-[70vh] overflow-hidden">
      <Carousel>
        {images.map((image) => (
          <div key={image.id} className="relative h-full w-full overflow-hidden rounded-md">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-8 md:p-16">
              <h2 className="text-white text-3xl md:text-5xl font-serif mb-2">{image.title}</h2>
              <p className="text-white text-lg md:text-xl font-light mb-8">{image.subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-black px-8 py-3 rounded-sm hover:bg-opacity-90 transition-all font-medium">
                  Shop Now
                </button>
                <button className="bg-transparent border border-white text-white px-8 py-3 rounded-sm hover:bg-white/10 transition-all font-medium">
                  Explore Collection
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
