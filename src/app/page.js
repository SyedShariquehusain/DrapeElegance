"use client"
import { useState, useEffect } from "react"
import BannerCarousel from "./Components/bannercarasouel"
import CategoryCard from "./Components/categoryCard"
import ProductCard from "./Components/productCard"
import SectionTitle from "./Components/sectionTitle"
import Navbar from "./Components/navbar"
import { bannerImages, categories, bestSellers, newArrivals } from "./Mockdata/utils"
import { ArrowRight, TrendingUp, Star, Gift } from "lucide-react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { addToWishlist } from "./redux/slices/wishlistSlice"
import { useToast } from "./Components/ui/toast-context"

export default function App() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const dispatch = useDispatch()
  const { addToast } = useToast()
  const wishlistItems = useSelector((state) => state.wishlist.items)

  // Combine and shuffle products for featured section
  useEffect(() => {
    const allProducts = [...bestSellers, ...newArrivals]
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random())
    setFeaturedProducts(shuffled.slice(0, 4))
  }, [])

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product))

    addToast({
      message: `${product.title} added to your wishlist!`,
      type: "success",
      productImage: product.image,
      productTitle: product.title,
    })
  }

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Banner Carousel */}
      <BannerCarousel images={bannerImages} />

      {/* Featured Products Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <SectionTitle title="Featured Collection" subtitle="Handpicked designs for the modern woman" />
          <Link
            href="/collections/featured"
            className="hidden md:flex items-center text-rose-600 hover:text-rose-700 transition-colors font-medium"
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToWishlist={() => handleAddToWishlist(product)}
              isInWishlist={isInWishlist(product.id)}
            />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/collections/featured"
            className="inline-block px-6 py-2 border border-rose-600 text-rose-600 rounded-md hover:bg-rose-50 transition-colors font-medium"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Categories Section with Modern Design */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionTitle
          title="Shop By Category"
          subtitle="Explore our exquisite collection of traditional and contemporary sarees"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} title={category.title} image={category.image} url={category.url} />
          ))}
        </div>
      </section>

      {/* USP Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-rose-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2">100% Authentic</h3>
              <p className="text-gray-600 text-sm">Handcrafted by skilled artisans</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-rose-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2">Secure Payments</h3>
              <p className="text-gray-600 text-sm">Multiple payment options</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-rose-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2">Free Shipping</h3>
              <p className="text-gray-600 text-sm">On orders above ₹999</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-rose-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2">Easy Returns</h3>
              <p className="text-gray-600 text-sm">15-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <TrendingUp className="h-6 w-6 text-rose-600 mr-2" />
            <SectionTitle title="Best Sellers" subtitle="Our most popular sarees loved by customers" />
          </div>
          <Link
            href="/collections/best-sellers"
            className="hidden md:flex items-center text-rose-600 hover:text-rose-700 transition-colors font-medium"
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToWishlist={() => handleAddToWishlist(product)}
              isInWishlist={isInWishlist(product.id)}
            />
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/collections/best-sellers"
            className="inline-block px-6 py-2 border border-rose-600 text-rose-600 rounded-md hover:bg-rose-50 transition-colors font-medium"
          >
            View All Best Sellers
          </Link>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
        <div className="flex items-center justify-between mb-8">
          <SectionTitle title="New Arrivals" subtitle="The latest additions to our exclusive collection" />
          <Link
            href="/collections/new-arrivals"
            className="hidden md:flex items-center text-rose-600 hover:text-rose-700 transition-colors font-medium"
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToWishlist={() => handleAddToWishlist(product)}
              isInWishlist={isInWishlist(product.id)}
            />
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/collections/new-arrivals"
            className="inline-block px-6 py-2 border border-rose-600 text-rose-600 rounded-md hover:bg-rose-50 transition-colors font-medium"
          >
            View All New Arrivals
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionTitle title="Customer Love" subtitle="What our customers say about us" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                  <img
                    src={`https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5kaWFuJTIwd29tYW58ZW58MHx8MHx8fDA%3D`}
                    alt="Customer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Priya Sharma</h4>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-3 w-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm italic">
                "I absolutely love my new saree! The quality is exceptional and the colors are even more vibrant in
                person. The delivery was prompt and the packaging was beautiful. Will definitely be ordering again!"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter & Offers Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-rose-50">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif mb-3">Join Our Community</h2>
            <p className="text-gray-600 mb-6 max-w-xl">
              Subscribe to receive updates on new collections, exclusive offers, and styling tips. Plus, get 10% off
              your first order!
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              />
              <button className="bg-rose-600 text-white px-6 py-3 font-medium rounded-md hover:bg-rose-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-rose-100 max-w-md">
              <div className="flex items-center mb-4">
                <Gift className="h-8 w-8 text-rose-600 mr-3" />
                <h3 className="text-xl font-medium">First Purchase Offer</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Use code <span className="font-bold text-rose-600">NEW10</span> at checkout to get 10% off your first
                order!
              </p>
              <Link
                href="/collections"
                className="block w-full text-center bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 transition-colors font-medium"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-serif mb-4">Drape Elegance</h3>
            <p className="text-gray-400 text-sm">
              Celebrating the art of traditional Indian sarees with a modern twist.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  All Sarees
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Silk Sarees
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cotton Sarees
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Bridal Collection
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">About</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Artisans
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Customer Care</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Drape Elegance. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

