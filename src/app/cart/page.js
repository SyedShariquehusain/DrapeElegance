"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateQuantity, removeFromCart } from "../redux/slices/cartSlice"
import Link from "next/link"
import Navbar from "../Components/navbar"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, CreditCard, Gift, Truck, Clock, ShieldCheck } from "lucide-react"
import Image from "next/image"

export default function Cart() {
  const dispatch = useDispatch()
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart)
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [deliveryOption, setDeliveryOption] = useState("standard")
  const [estimatedDelivery, setEstimatedDelivery] = useState("5-7 business days")

  // Define theme colors
  const colors = {
    primary: "#8a5a44", // Warm brown for primary accents
    secondary: "#f4e9e1", // Light beige for subtle highlights
    accent: "#c78f6d", // Lighter brown for hover states
    dark: "#2d2626", // Almost black for text
    light: "#ffffff", // White for backgrounds
  }

  // Update estimated delivery based on delivery option
  useEffect(() => {
    switch (deliveryOption) {
      case "express":
        setEstimatedDelivery("1-2 business days")
        break
      case "standard":
        setEstimatedDelivery("5-7 business days")
        break
      case "economy":
        setEstimatedDelivery("7-10 business days")
        break
      default:
        setEstimatedDelivery("5-7 business days")
    }
  }, [deliveryOption])

  const handleQuantityChange = (id, change) => {
    const item = items.find((item) => item.id === id)
    if (!item) return

    const newQuantity = Math.max(1, item.quantity + change)
    dispatch(updateQuantity({ id, quantity: newQuantity }))
  }

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "NEW10") {
      const discountAmount = totalAmount * 0.1
      setDiscount(discountAmount)
      setCouponApplied(true)
    }
  }

  const finalAmount = totalAmount - discount
  const shippingCost = finalAmount >= 999 ? 0 : 99
  const taxAmount = finalAmount * 0.18
  const orderTotal = finalAmount + shippingCost + taxAmount

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Cart Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-serif">
            Your Shopping Bag {totalQuantity > 0 && `(${totalQuantity})`}
          </h1>
          <Link href="/" className="flex items-center text-gray-600 hover:text-amber-500 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Continue Shopping
          </Link>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <div className="p-4 md:p-6 grid grid-cols-[100px,1fr] sm:grid-cols-[120px,1fr] gap-4 md:gap-6">
                    <div className="aspect-square bg-gray-50 rounded-md overflow-hidden relative">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.selectedSize && <span className="mr-2">Size: {item.selectedSize}</span>}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="mt-auto pt-4 flex flex-wrap items-end justify-between gap-4">
                        <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                          <button
                            className="px-3 py-1 hover:bg-gray-50 transition-colors"
                            onClick={() => handleQuantityChange(item.id, -1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-4 py-1 font-medium">{item.quantity}</span>
                          <button
                            className="px-3 py-1 hover:bg-gray-50 transition-colors"
                            onClick={() => handleQuantityChange(item.id, 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">₹{item.price.toLocaleString("en-IN")} each</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Delivery Options */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">Delivery Options</h2>

                <div className="space-y-3">
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="delivery"
                      value="standard"
                      checked={deliveryOption === "standard"}
                      onChange={() => setDeliveryOption("standard")}
                      className="h-4 w-4 text-amber-500 focus:ring-amber-500"
                    />
                    <div className="ml-3 flex-1">
                      <p className="font-medium">Standard Delivery</p>
                      <p className="text-sm text-gray-500">5-7 business days</p>
                    </div>
                    <span className="font-medium text-gray-900">Free</span>
                  </label>

                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="delivery"
                      value="express"
                      checked={deliveryOption === "express"}
                      onChange={() => setDeliveryOption("express")}
                      className="h-4 w-4 text-amber-500 focus:ring-amber-500"
                    />
                    <div className="ml-3 flex-1">
                      <p className="font-medium">Express Delivery</p>
                      <p className="text-sm text-gray-500">1-2 business days</p>
                    </div>
                    <span className="font-medium text-gray-900">₹199</span>
                  </label>

                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="delivery"
                      value="economy"
                      checked={deliveryOption === "economy"}
                      onChange={() => setDeliveryOption("economy")}
                      className="h-4 w-4 text-amber-500 focus:ring-amber-500"
                    />
                    <div className="ml-3 flex-1">
                      <p className="font-medium">Economy Delivery</p>
                      <p className="text-sm text-gray-500">7-10 business days</p>
                    </div>
                    <span className="font-medium text-gray-900">Free</span>
                  </label>
                </div>
              </div>

              {/* Gift Options */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Gift Options</h2>
                  <Gift className="h-5 w-5 text-amber-500" />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="gift-wrap"
                    className="h-4 w-4 text-amber-500 focus:ring-amber-500 rounded"
                  />
                  <label htmlFor="gift-wrap" className="ml-2 block text-sm">
                    Add gift wrap for ₹99
                  </label>
                </div>

                <div className="mt-4">
                  <label htmlFor="gift-message" className="block text-sm font-medium text-gray-700 mb-1">
                    Gift Message (Optional)
                  </label>
                  <textarea
                    id="gift-message"
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Add your personal message here..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({totalQuantity} items)</span>
                    <span className="font-medium">₹{totalAmount.toLocaleString("en-IN")}</span>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600 flex items-center">
                        Discount (NEW10)
                        <button
                          className="ml-1 text-xs underline"
                          onClick={() => {
                            setCouponApplied(false)
                            setDiscount(0)
                          }}
                        >
                          Remove
                        </button>
                      </span>
                      <span className="text-green-600 font-medium">-₹{discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className={shippingCost === 0 ? "text-green-600 font-medium" : "font-medium"}>
                      {shippingCost === 0 ? "FREE" : `₹${shippingCost.toLocaleString("en-IN")}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Estimated Tax (18%)</span>
                    <span className="font-medium">
                      ₹{taxAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Estimated Delivery</span>
                    <span className="font-medium">{estimatedDelivery}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Order Total</span>
                    <span>₹{orderTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
                </div>

                {/* Coupon Code */}
                {!couponApplied && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Apply Coupon Code</h3>
                      <span className="text-xs text-amber-500">Try code "NEW10" for 10% off</span>
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-grow border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                      <button
                        className="px-4 py-2 bg-amber-500 text-white font-medium rounded-r-md hover:bg-amber-600 transition-colors disabled:bg-gray-400"
                        onClick={handleApplyCoupon}
                        disabled={!couponCode}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}

                {/* Checkout Button */}
                <button className="w-full py-3.5 rounded-full bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors shadow-md flex items-center justify-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  PROCEED TO CHECKOUT
                </button>

                {/* Continue Shopping */}
                <Link
                  href="/"
                  className="w-full block text-center py-3 mt-3 text-amber-500 font-medium hover:text-amber-600 transition-colors"
                >
                  CONTINUE SHOPPING
                </Link>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <ShieldCheck className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-500">Secure Payment</span>
                    </div>
                    <div className="flex items-center">
                      <Truck className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-500">Fast Shipping</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-500">24/7 Support</span>
                    </div>
                    <div className="flex items-center">
                      <ShoppingBag className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-500">Quality Products</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 flex items-center justify-center space-x-2">
                  <img src="/visa.svg" alt="Visa" className="h-6" />
                  <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
                  <img src="/amex.svg" alt="American Express" className="h-6" />
                  <img src="/paypal.svg" alt="PayPal" className="h-6" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="inline-block p-6 rounded-full bg-amber-50 mb-6">
              <ShoppingBag className="h-12 w-12 text-amber-500" />
            </div>
            <h2 className="text-2xl font-serif mb-2">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Explore our collection and find something you'll
              love.
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-amber-500 text-white font-medium rounded-full hover:bg-amber-600 transition-colors shadow-md"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

