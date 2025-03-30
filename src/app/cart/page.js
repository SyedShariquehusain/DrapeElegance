"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateQuantity, removeFromCart } from "../redux/slices/cartSlice"
import Link from "next/link"
import Navbar from "../Components/navbar"
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react"

export default function Cart() {
  const dispatch = useDispatch()
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart)
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [discount, setDiscount] = useState(0)

  // Define theme colors
  const colors = {
    primary: "#8a5a44", // Warm brown for primary accents
    secondary: "#f4e9e1", // Light beige for subtle highlights
    accent: "#c78f6d", // Lighter brown for hover states
    dark: "#2d2626", // Almost black for text
    light: "#ffffff", // White for backgrounds
  }

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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Progress Bar */}
      <div className="bg-gray-50 py-4 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="ml-2 font-medium">BAG</span>
            </div>
            <div className="w-16 h-[1px] bg-gray-300 mx-2"></div>
            <div className="flex items-center opacity-50">
              <div className="h-8 w-8 rounded-full border border-gray-400 flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="ml-2 font-medium">ADDRESS</span>
            </div>
            <div className="w-16 h-[1px] bg-gray-300 mx-2"></div>
            <div className="flex items-center opacity-50">
              <div className="h-8 w-8 rounded-full border border-gray-400 flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="ml-2 font-medium">PAYMENT</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Cart Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-serif">
            Cart: {totalQuantity} {totalQuantity === 1 ? "Item" : "Items"}
          </h1>
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
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
                  className="border border-gray-200 p-4 grid grid-cols-[100px,1fr] sm:grid-cols-[120px,1fr] gap-4"
                >
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.title}</h3>
                      <button onClick={() => handleRemoveItem(item.id)} className="text-gray-400 hover:text-red-500">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    {item.selectedSize && <p className="text-sm text-gray-500 mt-1">Size: {item.selectedSize}</p>}

                    <div className="mt-auto pt-4 flex flex-wrap items-end justify-between gap-4">
                      <div className="flex items-center border border-gray-300">
                        <button
                          className="px-2 py-1"
                          onClick={() => handleQuantityChange(item.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-1">{item.quantity}</span>
                        <button className="px-2 py-1" onClick={() => handleQuantityChange(item.id, 1)}>
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-medium">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-gray-200 p-6">
                <h2 className="text-lg font-medium mb-4">Price Detail</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Order Sub-total</span>
                    <span>₹{totalAmount.toLocaleString("en-IN")}</span>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between font-medium">
                    <span>Grand Total</span>
                    <span>₹{finalAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
                </div>

                {/* Coupon Code */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Apply Coupon Code</h3>
                  <div className="flex">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-grow border border-gray-300 px-3 py-2"
                      disabled={couponApplied}
                    />
                    <button
                      className="px-4 py-2 bg-gray-900 text-white font-medium disabled:bg-gray-400"
                      onClick={handleApplyCoupon}
                      disabled={couponApplied || !couponCode}
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && <p className="text-green-600 text-sm mt-1">Coupon applied successfully!</p>}
                  {!couponApplied && <p className="text-gray-500 text-xs mt-1">Try code "NEW10" for 10% off</p>}
                </div>

                {/* Checkout Button */}
                <button className="w-full py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors">
                  PROCEED TO CHECKOUT
                </button>

                {/* Continue Shopping */}
                <Link
                  href="/"
                  className="w-full block text-center py-3 mt-3 border border-gray-300 font-medium hover:bg-gray-50 transition-colors"
                >
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-block p-6 rounded-full bg-gray-100 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
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
            <h2 className="text-2xl font-serif mb-2">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

