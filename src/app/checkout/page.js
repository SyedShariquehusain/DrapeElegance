"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import Navbar from "../Components/navbar"
import { useRouter } from "next/navigation"
import { useAppContext } from "../Constants/AppContext"
import Link from "next/link"
import { ShoppingBag, MapPin, CreditCard, ChevronRight, ArrowLeft } from "lucide-react"

export default function Checkout() {
  const router = useRouter()
  const { state } = useAppContext()
  const { items, totalAmount } = useSelector((state) => state.cart)
  const [activeStep, setActiveStep] = useState("address")

  // Redirect to login if not logged in
  if (!state.isLoggedIn && !state.loading) {
    router.push("/Login")
    return null
  }

  // Calculate order summary
  const discount = 0
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
            <div className="flex items-center text-gray-400">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-500 mr-2">
                <ShoppingBag className="w-3 h-3" />
              </div>
              BAG
            </div>
            <div className="w-24 h-px bg-gray-300 mx-2"></div>
            <div className="flex items-center text-rose-600 font-medium">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-600 text-white mr-2">
                <MapPin className="w-3 h-3" />
              </div>
              ADDRESS
            </div>
            <div className="w-24 h-px bg-gray-300 mx-2"></div>
            <div className="flex items-center text-gray-400">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-500 mr-2">
                <CreditCard className="w-3 h-3" />
              </div>
              PAYMENT
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/cart" className="flex items-center text-gray-600 hover:text-rose-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Address Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-medium mb-6">Shipping Address</h2>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    defaultValue={state.user?.displayName || ""}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    defaultValue={state.user?.email || ""}
                    readOnly
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    placeholder="Street address, apartment, suite, etc."
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  />
                </div>

                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    id="country"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    defaultValue="India"
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>

                <div className="md:col-span-2 mt-4">
                  <button
                    type="button"
                    className="w-full py-3 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 transition-colors flex items-center justify-center"
                    onClick={() => setActiveStep("payment")}
                  >
                    Continue to Payment <ChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-medium mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-sm font-medium line-clamp-1">{item.title}</h3>
                      <p className="text-xs text-gray-500">
                        {item.selectedSize && <span>Size: {item.selectedSize} • </span>}
                        <span>Qty: {item.quantity}</span>
                      </p>
                      <p className="text-sm font-medium text-rose-600 mt-1">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className={shippingCost === 0 ? "text-green-600 font-medium" : "font-medium"}>
                    {shippingCost === 0 ? "FREE" : `₹${shippingCost.toLocaleString("en-IN")}`}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (18% GST)</span>
                  <span className="font-medium">
                    ₹{taxAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>₹{orderTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

