"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Link from "next/link"
import Navbar from "./navbar"
import { addToCart } from "../redux/slices/cartSlice"
import { addToWishlist } from "../redux/slices/wishlistSlice"
import { useToast } from "./ui/toast-context"
import { useRouter, usePathname } from "next/navigation"
import { Heart, ChevronDown, ChevronUp } from "lucide-react"
import {
  getCategoryInfoFromPath,
  getMockProductsForCategory,
  getCategoryDescription,
  getCategoryTabs,
  getCategoryBanner,
} from "../utils/navigation"

export default function CategoryPage() {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useDispatch()
  const { addToast } = useToast()
  const wishlistItems = useSelector((state) => state.wishlist.items)

  // Get category info from URL
  const categoryInfo = getCategoryInfoFromPath(pathname)
  const categoryTitle = categoryInfo.title
  const breadcrumbs = categoryInfo.breadcrumbs

  // States
  const [products, setProducts] = useState([])
  const [expandedFilters, setExpandedFilters] = useState({
    price: true,
    category: false,
    size: false,
    colour: false,
    discount: false,
    fabric: false,
    fit: false,
    pattern: false,
    collections: false,
    occasion: false,
    sleeve: false,
  })
  const [priceRange, setPriceRange] = useState([200, 6000])
  const [activeTab, setActiveTab] = useState("all")
  const [sortOption, setSortOption] = useState("recommended")

  // Get category-specific content
  const description = getCategoryDescription(categoryTitle)
  const tabs = getCategoryTabs(categoryTitle)
  const banner = getCategoryBanner(categoryTitle)

  // Load products for this category
  useEffect(() => {
    const categoryProducts = getMockProductsForCategory(categoryTitle)
    setProducts(categoryProducts)
  }, [categoryTitle])

  const toggleFilter = (filterName) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }))
  }

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product))

    addToast({
      message: `${product.title} added to your wishlist!`,
      type: "success",
      productImage: product.image,
      productTitle: product.title,
    })
  }

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        product: {
          ...product,
        },
        quantity: 1,
      }),
    )

    addToast({
      message: `Added to bag`,
      type: "success",
      productImage: product.image,
      productTitle: product.title,
      productPrice: product.price,
      productSize: "Free Size",
      productQuantity: 1,
    })

    // Navigate to cart page
    router.push("/cart")
  }

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  // Filter products based on active tab
  const filteredProducts = products.filter((product) => {
    if (activeTab === "all") return true
    if (activeTab === "festive") return product.occasion === "Festive"
    if (activeTab === "party") return product.occasion === "Party"
    if (activeTab === "everyday") return product.occasion === "Everyday"
    if (activeTab === "work") return product.occasion === "Work"
    if (activeTab === "casual") return product.occasion === "Casual"
    if (activeTab === "formal") return product.occasion === "Formal"
    if (activeTab === "printed") return product.pattern === "Printed"
    if (activeTab === "embroidered") return product.pattern === "Embroidered"
    if (activeTab === "silk") return product.fabric === "Silk"
    if (activeTab === "cotton") return product.fabric === "Cotton"
    if (activeTab === "solid") return product.pattern === "Solid"
    return true
  })

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="py-4 text-sm">
          <div className="flex items-center">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900">{crumb.name}</span>
                ) : (
                  <Link href={crumb.link} className="text-gray-500 hover:text-gray-700">
                    {crumb.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-medium mb-4">Filters</h2>

            {/* Price Filter */}
            <div className="border-b border-gray-200 py-4">
              <button
                className="flex items-center justify-between w-full text-left font-medium"
                onClick={() => toggleFilter("price")}
              >
                PRICE
                {expandedFilters.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {expandedFilters.price && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">₹{priceRange[0]}</span>
                    <span className="text-sm">₹{priceRange[1]}</span>
                  </div>
                  <div className="relative h-1 bg-gray-200 rounded-full">
                    <div
                      className="absolute h-1 bg-gray-500 rounded-full"
                      style={{
                        left: `${((priceRange[0] - 200) / (6000 - 200)) * 100}%`,
                        right: `${100 - ((priceRange[1] - 200) / (6000 - 200)) * 100}%`,
                      }}
                    ></div>
                    <input
                      type="range"
                      min="200"
                      max="6000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                      className="absolute w-full h-1 opacity-0 cursor-pointer"
                    />
                    <input
                      type="range"
                      min="200"
                      max="6000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                      className="absolute w-full h-1 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="border-b border-gray-200 py-4">
              <button
                className="flex items-center justify-between w-full text-left font-medium"
                onClick={() => toggleFilter("category")}
              >
                CATEGORY
                {expandedFilters.category ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {expandedFilters.category && (
                <div className="mt-4 space-y-2">
                  {["Saree Blouses", "Designer Blouses", "Ready to Wear", "Padded Blouses"].map((option) => (
                    <label key={option} className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Size Filter */}
            <div className="border-b border-gray-200 py-4">
              <button
                className="flex items-center justify-between w-full text-left font-medium"
                onClick={() => toggleFilter("size")}
              >
                SIZE
                {expandedFilters.size ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {expandedFilters.size && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {["XS", "S", "M", "L", "XL", "34", "36", "38", "40"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center justify-center h-8 w-8 rounded-full border border-gray-300 text-sm cursor-pointer hover:border-gray-400"
                    >
                      <input type="checkbox" className="sr-only" />
                      {option}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Color Filter */}
            <div className="border-b border-gray-200 py-4">
              <button
                className="flex items-center justify-between w-full text-left font-medium"
                onClick={() => toggleFilter("colour")}
              >
                COLOUR
                {expandedFilters.colour ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {expandedFilters.colour && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    { name: "Red", color: "bg-red-500" },
                    { name: "Pink", color: "bg-pink-500" },
                    { name: "Yellow", color: "bg-yellow-500" },
                    { name: "Green", color: "bg-green-500" },
                    { name: "Blue", color: "bg-blue-500" },
                    { name: "Purple", color: "bg-purple-500" },
                    { name: "Black", color: "bg-black" },
                    { name: "White", color: "bg-white border border-gray-300" },
                    { name: "Gold", color: "bg-yellow-600" },
                  ].map((option) => (
                    <label key={option.name} className="relative cursor-pointer" title={option.name}>
                      <input type="checkbox" className="sr-only" />
                      <span className={`block h-6 w-6 rounded-full ${option.color}`}></span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Other filters */}
            {["discount", "fabric", "fit", "pattern", "collections", "occasion", "sleeve"].map((filterType) => (
              <div key={filterType} className="border-b border-gray-200 py-4">
                <button
                  className="flex items-center justify-between w-full text-left font-medium"
                  onClick={() => toggleFilter(filterType)}
                >
                  {filterType.toUpperCase()}
                  {expandedFilters[filterType] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                {expandedFilters[filterType] && (
                  <div className="mt-4 space-y-2">
                    {/* Placeholder filter options */}
                    {["Option 1", "Option 2", "Option 3"].map((option) => (
                      <label key={option} className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                        />
                        <span className="ml-2">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-serif mb-2">{categoryTitle}</h1>
            <p className="text-sm text-gray-600 mb-4">Viewing {filteredProducts.length} products</p>

            {/* Banner */}
            <div className="relative mb-8 rounded-md overflow-hidden">
              <img src={banner.src || "/placeholder.svg"} alt={banner.alt} className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent flex items-center">
                <div className="p-8 text-white">
                  <h2 className="text-4xl font-bold mb-2">{banner.title}</h2>
                  <div className="inline-block border border-white px-4 py-1 text-sm">New Collection</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-sm text-gray-600">
                {description}
                <span className="text-rose-600 ml-1 cursor-pointer">Show more</span>
              </p>
            </div>

            {/* Category Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex overflow-x-auto space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`whitespace-nowrap py-2 text-sm font-medium transition-colors ${
                      activeTab === tab.id ? "text-rose-600 border-b-2 border-rose-600" : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort dropdown */}
            <div className="flex justify-end mb-6">
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-sm focus:outline-none"
                >
                  <option value="recommended">Sort by: Recommended</option>
                  <option value="price-low-to-high">Price: Low to High</option>
                  <option value="price-high-to-low">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <Link href={`/product/${product.id}`}>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    {/* Wishlist button */}
                    <button
                      className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-sm hover:bg-gray-100 transition-colors z-10"
                      onClick={() => handleAddToWishlist(product)}
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-rose-600 text-rose-600" : "text-gray-600"}`}
                      />
                    </button>

                    {/* Online exclusive tag */}
                    {product.isExclusive && (
                      <div className="absolute top-3 left-3 bg-rose-600 text-white text-xs px-2 py-1">
                        ONLINE EXCLUSIVE
                      </div>
                    )}

                    {/* Quick shop button */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white/90 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="w-full text-center text-sm font-medium"
                        onClick={() => router.push(`/product/${product.id}`)}
                      >
                        Quick Shop
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      <Link href={`/product/${product.id}`}>{product.title}</Link>
                    </h3>
                    <p className="mt-1 text-sm font-medium">₹{product.price.toLocaleString("en-IN")}</p>

                    {/* Size options */}
                    <div className="mt-2 flex items-center space-x-1">
                      {product.sizes &&
                        product.sizes.map((size) => (
                          <span
                            key={size}
                            className="inline-block px-1 text-xs text-gray-500 border border-gray-200 rounded"
                          >
                            {size}
                          </span>
                        ))}
                      {product.sizes && product.sizes.length > 0 && (
                        <span className="text-xs text-gray-500">+{product.sizes.length}</span>
                      )}
                    </div>

                    {/* Color options */}
                    <div className="mt-2 flex items-center space-x-1">
                      {product.colors &&
                        product.colors.map((color, index) => (
                          <span
                            key={index}
                            className="inline-block h-3 w-3 rounded-full border border-gray-300"
                            style={{ backgroundColor: color }}
                          ></span>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

