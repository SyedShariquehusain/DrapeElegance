"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateQuantity, removeFromCart } from "../redux/slices/cartSlice"
import Link from "next/link"
import Navbar from "../Components/navbar"
import { Minus, Plus, Trash2, ShoppingBag, Gift, ShieldCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAppContext } from "../Constants/AppContext"

export default function Cart() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { state } = useAppContext()
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart)
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [deliveryOption, setDeliveryOption] = useState("standard")
  const [estimatedDelivery, setEstimatedDelivery] = useState("5-7 business days")
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(false)

  // Define theme colors
  const colors = {
    primary: "#e11d48", // Rose-600 for primary accents (changed from brown to rose)
    secondary: "#fff1f2", // Rose-50 for subtle highlights
    accent: "#fb7185", // Rose-400 for hover states
    dark: "#1f2937", // Gray-800 for text
    light: "#ffffff", // White for backgrounds
  }

  // Check if we need to redirect after login
  useEffect(() => {
    const shouldRedirect = localStorage.getItem("redirectToCheckout")

    if (shouldRedirect === "true" && state.isLoggedIn) {
      localStorage.removeItem("redirectToCheckout")
      // User has logged in after being redirected, continue with checkout
      router.push("/checkout")
    }
  }, [state.isLoggedIn, router])

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

  const handleProceedToCheckout = () => {
    if (!state.isLoggedIn) {
      // Save the intent to redirect to checkout after login
      localStorage.setItem("redirectToCheckout", "true")
      // Redirect to login page
      router.push("/Login")
    } else {
      // User is already logged in, proceed to checkout
      router.push("/checkout")
    }
  }

  const finalAmount = totalAmount - discount
  const shippingCost = finalAmount >= 999 ? 0 : 99
  const taxAmount = finalAmount * 0.18
  const orderTotal = finalAmount + shippingCost + taxAmount

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Checkout Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center py-4 text-sm">
            <div className="flex items-center text-rose-600 font-medium">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-600 text-white mr-2">
                <ShoppingBag className="w-3 h-3" />
              </div>
              BAG
            </div>
            <div className="w-24 h-px bg-gray-300 mx-2"></div>
            <div className="flex items-center text-gray-400">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-500 mr-2">
                2
              </div>
              ADDRESS
            </div>
            <div className="w-24 h-px bg-gray-300 mx-2"></div>
            <div className="flex items-center text-gray-400">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-500 mr-2">
                3
              </div>
              PAYMENT
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">Cart</span>
        </div>

        {items.length > 0 ? (
          <>
            <h1 className="text-2xl font-serif mb-8">
              Cart: {totalQuantity} {totalQuantity === 1 ? "Item" : "Items"}
            </h1>

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
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {item.selectedSize && <span className="mr-2">Size: {item.selectedSize}</span>}
                            </p>
                            <div className="mt-1">
                              <span className="font-medium text-rose-600">₹{item.price.toLocaleString("en-IN")}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-gray-400 hover:text-rose-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="mt-auto pt-4 flex flex-wrap items-end justify-between gap-4">
                          <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
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

                          <div className="flex space-x-4">
                            <button className="text-rose-600 text-sm font-medium hover:text-rose-700 transition-colors">
                              MOVE TO WISHLIST
                            </button>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors"
                            >
                              REMOVE
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add from wishlist */}
                <div className="text-center py-4 border-t border-b border-gray-200">
                  <button className="text-rose-600 font-medium text-sm hover:text-rose-700 transition-colors">
                    + ADD FROM WISHLIST
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="text-lg font-medium mb-6">Price Detail</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Order Sub-total</span>
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
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between font-medium text-lg">
                      <span>Grand Total</span>
                      <span>₹{orderTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
                  </div>

                  {/* Coupon Code */}
                  <div className="bg-amber-50 p-4 rounded-md mb-6 border border-amber-100">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                        <Gift className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium">Enjoy 10% off on your first purchase.</p>
                        <p className="text-sm">
                          Use code: <span className="font-bold">NEW10</span>
                        </p>
                      </div>
                    </div>
                    {!state.isLoggedIn && (
                      <p className="text-xs text-amber-700 mt-1">
                        <Link href="/Login" className="underline">
                          Login
                        </Link>{" "}
                        to use this code
                      </p>
                    )}
                  </div>

                  {!couponApplied && (
                    <div className="mb-6">
                      <div className="flex">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter coupon code"
                          className="flex-grow border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                        />
                        <button
                          className="px-4 py-2 bg-rose-600 text-white font-medium rounded-r-md hover:bg-rose-700 transition-colors disabled:bg-gray-400"
                          onClick={handleApplyCoupon}
                          disabled={!couponCode}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Checkout Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleProceedToCheckout}
                      className="w-full py-3 rounded-md bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors shadow-sm"
                    >
                      PROCEED TO CHECKOUT
                    </button>
                    <Link
                      href="/"
                      className="block w-full py-3 rounded-md border border-gray-300 text-center text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      CONTINUE SHOPPING
                    </Link>
                  </div>

                  {/* Secure Checkout */}
                  <div className="flex items-center justify-center mt-6 text-xs text-gray-500">
                    <ShieldCheck className="w-4 h-4 mr-1" />
                    100% SECURE CHECKOUT
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="inline-block p-6 rounded-full bg-rose-50 mb-6">
              <ShoppingBag className="h-12 w-12 text-rose-500" />
            </div>
            <h2 className="text-2xl font-serif mb-2">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Explore our collection and find something you'll
              love.
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 transition-colors shadow-md"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

