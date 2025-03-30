"use client"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function BannerCarousel({ images }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  }

  return (
    <div className="relative w-full h-[70vh] md:h-[70vh] overflow-hidden">
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.id} className="relative h-[70vh] w-full overflow-hidden">
            <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
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
      </Slider>
    </div>
  )
}

