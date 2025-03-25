import React from "react";
import { BannerCarousel } from "components/BannerCarousel";
import { CategoryCard } from "components/CategoryCard";
import { ProductCard } from "components/ProductCard";
import { SectionTitle } from "components/SectionTitle";
import { Navbar } from "components/Navbar";
import { bannerImages, categories, bestSellers, newArrivals } from "utils/mock-data";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />
      {/* Banner Carousel */}
      <BannerCarousel images={bannerImages} />
      
      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionTitle 
          title="Explore Categories" 
          subtitle="Discover our exquisite collection of traditional and contemporary sarees"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              image={category.image}
              url={category.url}
            />
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
        <SectionTitle 
          title="Best Sellers" 
          subtitle="Our most popular sarees loved by customers"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionTitle 
          title="New Arrivals" 
          subtitle="The latest additions to our exclusive collection"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter & Offers Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-100">
        <div className="bg-white p-8 md:p-12 rounded-md shadow-sm text-center">
          <h2 className="text-2xl md:text-3xl font-serif mb-3">Subscribe for Exclusive Offers</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">Be the first to know about new collections, exclusive offers, and styling tips</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 border border-gray-300 focus:border-gray-400 focus:outline-none"
            />
            <button className="bg-black text-white px-6 py-3 font-medium hover:bg-gray-900 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-serif mb-4">Drape Elegance</h3>
            <p className="text-gray-400 text-sm">Celebrating the art of traditional Indian sarees with a modern twist.</p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">All Sarees</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Silk Sarees</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cotton Sarees</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bridal Collection</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">About</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Artisans</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Customer Care</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Drape Elegance. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
