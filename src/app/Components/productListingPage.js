"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { addToCart } from "../redux/slices/cartSlice"
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlistSlice"
import { useToast } from "./ui/toast-context"
import Navbar from "./navbar"
import { Heart, ChevronDown, ChevronUp, Filter, X, Check, ArrowUpDown } from "lucide-react"

const ProductListingPage = ({ title, description, products, bannerImage = null, categoryTabs = [] }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { addToast } = useToast()

  // States for filters and sorting
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [priceRange, setPriceRange] = useState([200, 6000])
  const [activeFilters, setActiveFilters] = useState({})
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
  const [sortOption, setSortOption] = useState("recommended")
  const [activeTab, setActiveTab] = useState(categoryTabs.length > 0 ? categoryTabs[0].id : null)

  // Filter options
  const filterOptions = {
    category: ["Saree Blouses", "Designer Blouses", "Ready to Wear", "Padded Blouses"],
    size: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    colour: ["Red", "Pink", "Yellow", "Green", "Blue", "Purple", "Black", "White", "Gold", "Silver"],
    discount: ["10% and above", "20% and above", "30% and above", "40% and above", "50% and above"],
    fabric: ["Cotton", "Silk", "Georgette", "Crepe", "Satin", "Velvet", "Linen"],
    fit: ["Regular", "Slim", "Relaxed"],
    pattern: ["Solid", "Printed", "Embroidered", "Sequined", "Embellished"],
    collections: ["Summer Tales", "Festive Collection", "Wedding Collection", "Everyday Essentials"],
    occasion: ["Casual", "Festive", "Wedding", "Party", "Work", "Everyday"],
    sleeve: ["Sleeveless", "Short Sleeve", "3/4 Sleeve", "Full Sleeve"],
  }

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products]

    // Apply price filter
    result = result.filter((product) => {
      const price =
        product.discountPercentage && product.discountPercentage > 0
          ? product.price - (product.price * product.discountPercentage) / 100
          : product.price
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Apply category tab filter
    if (activeTab) {
      const tab = categoryTabs.find((tab) => tab.id === activeTab)
      if (tab && tab.filter) {
        result = result.filter(tab.filter)
      }
    }

    // Apply other active filters
    Object.entries(activeFilters).forEach(([filterType, selectedOptions]) => {
      if (selectedOptions && selectedOptions.length > 0) {
        result = result.filter((product) => {
          // This is a simplified filter logic - in a real app, you'd have more specific filtering
          return selectedOptions.some((option) => {
            switch (filterType) {
              case "category":
                return product.category === option
              case "size":
                return product.sizes && product.sizes.includes(option)
              case "colour":
                return product.color === option
              case "fabric":
                return product.fabric === option
              case "fit":
                return product.fit === option
              case "pattern":
                return product.pattern === option
              case "collections":
                return product.collection === option
              case "occasion":
                return product.occasion === option
              case "sleeve":
                return product.sleeve === option
              case "discount":
                const minDiscount = Number.parseInt(option)
                return product.discountPercentage >= minDiscount
              default:
                return true
            }
          })
        })
      }
    })

    // Apply sorting
    switch (sortOption) {
      case "price-low-to-high":
        result.sort((a, b) => {
          const priceA =
            a.discountPercentage && a.discountPercentage > 0
              ? a.price - (a.price * a.discountPercentage) / 100
              : a.price
          const priceB =
            b.discountPercentage && b.discountPercentage > 0
              ? b.price - (b.price * b.discountPercentage) / 100
              : b.price
          return priceA - priceB
        })
        break
      case "price-high-to-low":
        result.sort((a, b) => {
          const priceA =
            a.discountPercentage && a.discountPercentage > 0
              ? a.price - (a.price * a.discountPercentage) / 100
              : a.price
          const priceB =
            b.discountPercentage && b.discountPercentage > 0
              ? b.price - (b.price * b.discountPercentage) / 100
              : b.price
          return priceB - priceA
        })
        break
      case "newest":
        // Assuming products have a date field
        result.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
        break
      case "discount":
        result.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0))
        break
      case "recommended":
      default:
        // Keep original order or apply a recommendation algorithm
        break
    }

    setFilteredProducts(result)
  }, [products, priceRange, activeFilters, sortOption, activeTab, categoryTabs])

  const toggleFilter = (filterName) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }))
  }

  const handleFilterChange = (filterType, option, isChecked) => {
    setActiveFilters((prev) => {
      const currentOptions = prev[filterType] || []

      if (isChecked) {
        return {
          ...prev,
          [filterType]: [...currentOptions, option],
        }
      } else {
        return {
          ...prev,
          [filterType]: currentOptions.filter((item) => item !== option),
        }
      }
    })
  }

  const clearAllFilters = () => {
    setActiveFilters({})
    setPriceRange([200, 6000])
  }

  const handleAddToCart = (product) => {
    const hasDiscount = product.discountPercentage && product.discountPercentage > 0
    const discountedPrice = hasDiscount
      ? product.price - (product.price * product.discountPercentage) / 100
      : product.price

    dispatch(
      addToCart({
        product: {
          ...product,
          price: discountedPrice,
        },
        quantity: 1,
      }),
    )

    addToast({
      message: `${product.title} added to your cart!`,
      type: "success",
      productImage: product.image,
      productTitle: product.title,
      productPrice: discountedPrice,
    })

    // Navigate to cart page
    router.push("/cart")
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

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId))

    addToast({
      message: "Product removed from your wishlist",
      type: "info",
    })
  }

  // Count active filters
  const activeFilterCount = Object.values(activeFilters).reduce(
    (count, options) => count + (options ? options.length : 0),
    0,
  )

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/collections" className="text-gray-500 hover:text-gray-700">
            Collections
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Filters</h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-rose-600 hover:text-rose-700 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

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
                    <div className="relative h-2 bg-gray-200 rounded-full">
                      <div
                        className="absolute h-2 bg-rose-600 rounded-full"
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
                        className="absolute w-full h-2 opacity-0 cursor-pointer"
                      />
                      <input
                        type="range"
                        min="200"
                        max="6000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                        className="absolute w-full h-2 opacity-0 cursor-pointer"
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
                    {filterOptions.category.map((option) => (
                      <label key={option} className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                          checked={activeFilters.category?.includes(option) || false}
                          onChange={(e) => handleFilterChange("category", option, e.target.checked)}
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
                    {filterOptions.size.map((option) => (
                      <label
                        key={option}
                        className={`flex items-center justify-center h-9 w-9 rounded-full border text-sm cursor-pointer transition-colors ${
                          activeFilters.size?.includes(option)
                            ? "bg-rose-600 text-white border-rose-600"
                            : "border-gray-300 hover:border-rose-600"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={activeFilters.size?.includes(option) || false}
                          onChange={(e) => handleFilterChange("size", option, e.target.checked)}
                        />
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
                    {filterOptions.colour.map((option) => {
                      // Map color names to color codes
                      const colorMap = {
                        Red: "bg-red-500",
                        Pink: "bg-pink-500",
                        Yellow: "bg-yellow-500",
                        Green: "bg-green-500",
                        Blue: "bg-blue-500",
                        Purple: "bg-purple-500",
                        Black: "bg-black",
                        White: "bg-white border border-gray-300",
                        Gold: "bg-amber-500",
                        Silver: "bg-gray-300",
                      }

                      return (
                        <label key={option} className="relative cursor-pointer" title={option}>
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={activeFilters.colour?.includes(option) || false}
                            onChange={(e) => handleFilterChange("colour", option, e.target.checked)}
                          />
                          <span
                            className={`block h-8 w-8 rounded-full ${colorMap[option] || "bg-gray-500"} ${
                              activeFilters.colour?.includes(option) ? "ring-2 ring-offset-2 ring-rose-600" : ""
                            }`}
                          ></span>
                          {activeFilters.colour?.includes(option) && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <Check className={`h-4 w-4 ${option === "White" ? "text-black" : "text-white"}`} />
                            </span>
                          )}
                        </label>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Other filters - simplified for brevity */}
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
                      {filterOptions[filterType]?.map((option) => (
                        <label key={option} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                            checked={activeFilters[filterType]?.includes(option) || false}
                            onChange={(e) => handleFilterChange(filterType, option, e.target.checked)}
                          />
                          <span className="ml-2">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="text-3xl font-serif mb-2">{title}</h1>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Viewing {filteredProducts.length} products</p>
              </div>
            </div>

            {/* Banner Image */}
            {bannerImage && (
              <div className="mb-8 relative rounded-lg overflow-hidden">
                <img
                  src={bannerImage.src || "/placeholder.svg"}
                  alt={bannerImage.alt || title}
                  className="w-full h-auto object-cover"
                />
                {bannerImage.overlay && (
                  <div className="absolute inset-0 flex items-center p-8">
                    <div className="max-w-md">
                      <h2 className="text-white text-3xl font-serif mb-2">{bannerImage.title}</h2>
                      <p className="text-white text-lg mb-4">{bannerImage.subtitle}</p>
                      {bannerImage.cta && (
                        <Link
                          href={bannerImage.cta.url}
                          className="inline-block bg-white text-gray-900 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
                        >
                          {bannerImage.cta.text}
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            {description && (
              <div className="mb-8 text-sm text-gray-600">
                <p>{description}</p>
                {description.length > 150 && (
                  <button className="text-rose-600 hover:text-rose-700 transition-colors mt-1">Show more</button>
                )}
              </div>
            )}

            {/* Category Tabs */}
            {categoryTabs.length > 0 && (
              <div className="mb-8 border-b border-gray-200">
                <div className="flex overflow-x-auto space-x-6 pb-2">
                  {categoryTabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`whitespace-nowrap py-2 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "text-rose-600 border-b-2 border-rose-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sort and Filter Controls */}
            <div className="flex items-center justify-between mb-6">
              <button className="lg:hidden flex items-center text-sm font-medium border border-gray-300 rounded-md px-4 py-2">
                <Filter className="h-4 w-4 mr-2" />
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>

              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                >
                  <option value="recommended">Sort by: Recommended</option>
                  <option value="price-low-to-high">Price: Low to High</option>
                  <option value="price-high-to-low">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="discount">Discount</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ArrowUpDown className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const hasDiscount = product.discountPercentage && product.discountPercentage > 0
                  const discountedPrice = hasDiscount
                    ? product.price - (product.price * product.discountPercentage) / 100
                    : product.price

                  return (
                    <div key={product.id} className="group relative">
                      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-md">
                        <Link href={`/product/${product.id}`}>
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </Link>

                        {/* Wishlist button */}
                        <button
                          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
                          onClick={() => handleAddToWishlist(product)}
                          aria-label="Add to wishlist"
                        >
                          <Heart className="h-5 w-5 text-gray-600" />
                        </button>

                        {/* Quick view button */}
                        <div className="absolute inset-x-0 bottom-0 flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            className="flex-1 bg-white/90 backdrop-blur-sm py-3 text-sm font-medium hover:bg-white transition-colors"
                            onClick={() => router.push(`/product/${product.id}`)}
                          >
                            Quick View
                          </button>
                        </div>

                        {/* Online exclusive tag */}
                        {product.isExclusive && (
                          <div className="absolute top-3 left-3 bg-rose-600 text-white text-xs px-2 py-1 rounded-sm">
                            ONLINE EXCLUSIVE
                          </div>
                        )}
                      </div>

                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-900">
                          <Link href={`/product/${product.id}`}>{product.title}</Link>
                        </h3>
                        <div className="mt-1 flex items-center">
                          <span className="text-sm font-medium text-gray-900">
                            ₹{discountedPrice.toLocaleString("en-IN")}
                          </span>
                          {hasDiscount && (
                            <span className="ml-2 text-xs text-gray-500 line-through">
                              ₹{product.price.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>

                        {/* Size options */}
                        {product.sizes && (
                          <div className="mt-2 flex items-center space-x-1">
                            {product.sizes.slice(0, 4).map((size) => (
                              <span
                                key={size}
                                className="inline-block px-1 text-xs text-gray-500 border border-gray-200 rounded"
                              >
                                {size}
                              </span>
                            ))}
                            {product.sizes.length > 4 && (
                              <span className="text-xs text-gray-500">+{product.sizes.length - 4}</span>
                            )}
                          </div>
                        )}

                        {/* Color options */}
                        {product.colors && (
                          <div className="mt-2 flex items-center space-x-1">
                            {product.colors.map((color) => (
                              <span
                                key={color}
                                className="inline-block h-3 w-3 rounded-full border border-gray-300"
                                style={{ backgroundColor: color }}
                              ></span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-block p-6 rounded-full bg-gray-100 mb-4">
                  <X className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria.</p>
                <button
                  onClick={clearAllFilters}
                  className="inline-block px-6 py-3 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductListingPage

