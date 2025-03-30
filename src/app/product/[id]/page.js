"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../redux/slices/cartSlice"
import { setSelectedProduct } from "../../redux/slices/productSlice"
import Navbar from "../../Components/navbar"
import { Heart, Share2, Minus, Plus, Star, ShoppingBag, Truck, RefreshCw, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProductDetail() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const allProducts = useSelector((state) => state.products.products)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState("M")
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [showZoom, setShowZoom] = useState(false)
  const [activeTab, setActiveTab] = useState("description")
  const imageRef = useRef(null)

  // Define theme colors
  const colors = {
    primary: "#8a5a44", // Warm brown for primary accents
    secondary: "#f4e9e1", // Light beige for subtle highlights
    accent: "#c78f6d", // Lighter brown for hover states
    dark: "#2d2626", // Almost black for text
    light: "#ffffff", // White for backgrounds
  }

  // Fetch product data
  useEffect(() => {
    if (id) {
      // First try to parse as number, but also handle string IDs
      const numericId = Number.parseInt(id, 10)

      // Find product by either numeric ID or string ID
      const foundProduct = allProducts.find((p) => (Number.isInteger(numericId) && p.id === numericId) || p.id === id)

      if (foundProduct) {
        // Create additional images for the product detail view
        const productWithImages = {
          ...foundProduct,
          images: [
            foundProduct.image,
            // Add additional images (in a real app, these would come from the API)
            foundProduct.image,
            foundProduct.image,
            foundProduct.image,
          ],
          sizes: ["XS", "S", "M", "L", "XL"],
          description:
            "This beautiful piece is crafted with meticulous attention to detail, featuring traditional designs with a modern twist. Perfect for both casual and formal occasions.",
          details: {
            material: "100% Pure Cotton",
            care: "Dry clean only",
            fit: "Regular fit",
            origin: "Handcrafted in India",
          },
          reviews: {
            average: 4.8,
            count: 124,
            breakdown: {
              5: 85,
              4: 28,
              3: 7,
              2: 3,
              1: 1,
            },
          },
          specifications: [
            { name: "Fabric", value: "Pure Cotton" },
            { name: "Pattern", value: "Floral" },
            { name: "Occasion", value: "Casual, Festive" },
            { name: "Wash Care", value: "Dry Clean Only" },
            { name: "Weight", value: "500g" },
            { name: "Package Contents", value: "1 Saree with Blouse Piece" },
          ],
        }

        setProduct(productWithImages)
        dispatch(setSelectedProduct(productWithImages))
      } else {
        console.error("Product not found with ID:", id)
      }

      setLoading(false)
    }
  }, [id, allProducts, dispatch])

  // Handle image zoom functionality
  const handleMouseMove = (e) => {
    if (!imageRef.current) return

    const { left, top, width, height } = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setZoomPosition({ x, y })
  }

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change)
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    if (!product) return

    const hasDiscount = product.discountPercentage && product.discountPercentage > 0
    const discountedPrice = hasDiscount
      ? product.price - (product.price * product.discountPercentage) / 100
      : product.price

    dispatch(
      addToCart({
        product: {
          ...product,
          price: discountedPrice,
          selectedSize,
        },
        quantity,
      }),
    )
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push("/cart")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <div
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
            style={{ borderColor: colors.primary }}
          ></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-serif mb-4">Product Not Found</h1>
          <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/" className="inline-block px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  const hasDiscount = product.discountPercentage && product.discountPercentage > 0
  const discountedPrice = hasDiscount
    ? product.price - (product.price * product.discountPercentage) / 100
    : product.price

  // Calculate rating stars
  const renderRatingStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)
      } else if (i - 0.5 <= rating) {
        stars.push(<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />)
      }
    }
    return stars
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/collections" className="text-gray-500 hover:text-gray-700">
              Collections
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image with Zoom */}
            <div
              className="relative overflow-hidden bg-gray-50 rounded-lg aspect-square"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              ref={imageRef}
            >
              {hasDiscount && (
                <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {product.discountPercentage}% OFF
                </div>
              )}

              <div className="absolute top-4 right-4 z-10 flex space-x-2">
                <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
                <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="h-full w-full relative">
                <Image
                  src={product.images[activeImage] || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Zoom overlay */}
              {showZoom && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `url(${product.images[activeImage]})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundSize: "200%",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.9,
                  }}
                />
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-24 h-24 rounded-md overflow-hidden transition-all ${
                    activeImage === index
                      ? "ring-2 ring-offset-2 ring-amber-400"
                      : "ring-1 ring-gray-200 hover:ring-gray-300"
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.title} - View ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Title and Rating */}
            <div>
              <h1 className="text-2xl md:text-3xl font-serif mb-3">{product.title}</h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {renderRatingStars(product.reviews.average)}
                  <span className="ml-2 text-amber-500 font-medium">{product.reviews.average}</span>
                </div>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-gray-500">{product.reviews.count} reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-3 mb-2">
                <span className="text-3xl font-medium" style={{ color: colors.primary }}>
                  ₹{discountedPrice.toLocaleString("en-IN")}
                </span>
                {hasDiscount && (
                  <span className="text-gray-500 line-through">₹{product.price.toLocaleString("en-IN")}</span>
                )}
                {hasDiscount && (
                  <span className="text-red-600 text-sm font-medium bg-red-50 px-2 py-0.5 rounded-full">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">Inclusive of all taxes</p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100"></div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Select Size</h3>
                <button className="text-sm font-medium underline" style={{ color: colors.primary }}>
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`h-11 w-11 flex items-center justify-center rounded-full transition-all ${
                      selectedSize === size
                        ? "bg-amber-400 text-white shadow-md"
                        : "border border-gray-300 hover:border-amber-400 hover:text-amber-500"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="inline-flex items-center border border-gray-300 rounded-full overflow-hidden">
                <button
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-6 py-2 font-medium">{quantity}</span>
                <button
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart and Buy Now buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="flex-1 py-3.5 px-6 rounded-full border-2 border-amber-400 text-amber-500 font-medium hover:bg-amber-50 transition-colors flex items-center justify-center"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              <button
                className="flex-1 py-3.5 px-6 rounded-full bg-amber-400 text-white font-medium hover:bg-amber-500 transition-colors shadow-md"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center">
                <Truck className="h-5 w-5 mr-3 text-amber-500" />
                <div>
                  <p className="text-sm font-medium">Free Delivery</p>
                  <p className="text-xs text-gray-500">On orders above ₹999</p>
                </div>
              </div>
              <div className="flex items-center">
                <RefreshCw className="h-5 w-5 mr-3 text-amber-500" />
                <div>
                  <p className="text-sm font-medium">Easy Returns & Exchanges</p>
                  <p className="text-xs text-gray-500">15-day return policy</p>
                </div>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-3 text-amber-500" />
                <div>
                  <p className="text-sm font-medium">Quality Assurance</p>
                  <p className="text-xs text-gray-500">100% authentic products</p>
                </div>
              </div>
            </div>

            {/* Product Tabs */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex border-b border-gray-200">
                <button
                  className={`pb-3 px-4 text-sm font-medium ${activeTab === "description" ? "border-b-2 border-amber-400 text-amber-500" : "text-gray-500 hover:text-gray-700"}`}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>
                <button
                  className={`pb-3 px-4 text-sm font-medium ${activeTab === "specifications" ? "border-b-2 border-amber-400 text-amber-500" : "text-gray-500 hover:text-gray-700"}`}
                  onClick={() => setActiveTab("specifications")}
                >
                  Specifications
                </button>
                <button
                  className={`pb-3 px-4 text-sm font-medium ${activeTab === "reviews" ? "border-b-2 border-amber-400 text-amber-500" : "text-gray-500 hover:text-gray-700"}`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews ({product.reviews.count})
                </button>
              </div>

              <div className="py-4">
                {activeTab === "description" && (
                  <div className="prose prose-sm max-w-none text-gray-600">
                    <p>{product.description}</p>
                    <p className="mt-2">
                      Our sarees are handcrafted by skilled artisans using traditional techniques passed down through
                      generations. Each piece is unique and showcases the rich heritage of Indian craftsmanship.
                    </p>
                  </div>
                )}

                {activeTab === "specifications" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="flex">
                        <span className="w-32 font-medium text-gray-900">{spec.name}:</span>
                        <span className="text-gray-600">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <div className="flex items-baseline">
                          <span className="text-3xl font-medium">{product.reviews.average}</span>
                          <span className="text-sm text-gray-500 ml-1">out of 5</span>
                        </div>
                        <div className="flex mt-1">{renderRatingStars(product.reviews.average)}</div>
                        <p className="text-sm text-gray-500 mt-1">{product.reviews.count} reviews</p>
                      </div>

                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const percentage = (product.reviews.breakdown[rating] / product.reviews.count) * 100
                          return (
                            <div key={rating} className="flex items-center text-sm mb-1">
                              <span className="w-3">{rating}</span>
                              <Star className="w-3 h-3 text-amber-400 ml-1" />
                              <div className="w-full bg-gray-200 rounded-full h-2 ml-2">
                                <div
                                  className="bg-amber-400 h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="ml-2 text-gray-500 text-xs">{product.reviews.breakdown[rating]}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <button className="w-full py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                      Write a Review
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

