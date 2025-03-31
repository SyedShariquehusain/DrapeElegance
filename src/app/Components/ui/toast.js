"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Link from "next/link"

export const Toast = ({
  message,
  type = "success",
  duration = 3000,
  onClose,
  productImage,
  productTitle,
  productPrice,
  productSize,
  productQuantity,
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        onClose && onClose()
      }, 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-md transform transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="bg-white border border-gray-200 shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between bg-green-500 text-white px-4 py-2">
          <span className="text-sm font-medium">{message}</span>
          <button
            onClick={() => {
              setIsVisible(false)
              setTimeout(() => {
                onClose && onClose()
              }, 300)
            }}
            className="text-white hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product details */}
        {productImage && productTitle && (
          <div className="p-4 flex items-center">
            <div className="h-16 w-16 bg-gray-100 overflow-hidden mr-4">
              <img src={productImage || "/placeholder.svg"} alt={productTitle} className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-medium line-clamp-1">{productTitle}</p>
              {productSize && productQuantity && (
                <p className="text-xs text-gray-500">
                  Size: {productSize} / Qty: {productQuantity}
                </p>
              )}
              {productPrice && <p className="text-sm font-medium">₹{productPrice.toLocaleString("en-IN")}</p>}
            </div>
          </div>
        )}

        {/* View cart button */}
        {message.toLowerCase().includes("bag") && (
          <Link
            href="/cart"
            className="block w-full bg-gray-100 text-center py-2 text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            VIEW BAG
          </Link>
        )}
      </div>
    </div>
  )
}

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-4">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
          productImage={toast.productImage}
          productTitle={toast.productTitle}
          productPrice={toast.productPrice}
          productSize={toast.productSize}
          productQuantity={toast.productQuantity}
        />
      ))}
    </div>
  )
}

