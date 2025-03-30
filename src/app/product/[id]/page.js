"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../redux/slices/cartSlice"
import { setSelectedProduct } from "../../redux/slices/productSlice"
import Navbar from "../../Components/navbar"
import { Heart, Share2, Minus, Plus, Check } from "lucide-react"
import Link from "next/link"

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image with Zoom */}
            <div
              className="relative overflow-hidden bg-gray-100 aspect-square"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              ref={imageRef}
            >
              <img
                src={product.images[activeImage] || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover"
              />

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
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 border-2 ${activeImage === index ? "border-gray-800" : "border-transparent"}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.title} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-2xl md:text-3xl font-serif mb-2">{product.title}</h1>
              <div className="flex items-baseline space-x-3 mb-4">
                <span className="text-2xl font-medium">₹{discountedPrice.toLocaleString("en-IN")}</span>
                {hasDiscount && (
                  <span className="text-gray-500 line-through">₹{product.price.toLocaleString("en-IN")}</span>
                )}
                {hasDiscount && (
                  <span className="text-red-600 text-sm font-medium">{product.discountPercentage}% OFF</span>
                )}
              </div>
              <p className="text-sm text-gray-500">Inclusive of all taxes</p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-medium mb-3">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`h-10 w-10 flex items-center justify-center border ${
                      selectedSize === size
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button className="mt-2 text-sm font-medium underline" style={{ color: colors.primary }}>
                Size Guide
              </button>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center border border-gray-300 inline-flex">
                <button
                  className="px-3 py-2 border-r border-gray-300"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-6 py-2">{quantity}</span>
                <button className="px-3 py-2 border-l border-gray-300" onClick={() => handleQuantityChange(1)}>
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart and Buy Now buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="flex-1 py-3 px-6 bg-white border border-gray-900 text-gray-900 font-medium hover:bg-gray-50 transition-colors"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button
                className="flex-1 py-3 px-6 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>

            {/* Wishlist and Share */}
            <div className="flex space-x-6 pt-2">
              <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                <Heart className="h-5 w-5 mr-2" />
                Add to Wishlist
              </button>
              <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </button>
            </div>

            {/* Delivery Info */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-3 text-green-600" />
                <span className="text-sm">Free delivery on all orders above ₹999</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-3 text-green-600" />
                <span className="text-sm">Easy 15-day returns and exchanges</span>
              </div>
            </div>

            {/* Product Description */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium mb-3">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium mb-3">Product Details</h3>
              <ul className="space-y-2 text-gray-600">
                {Object.entries(product.details).map(([key, value]) => (
                  <li key={key} className="flex">
                    <span className="w-24 font-medium text-gray-900 capitalize">{key}:</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

