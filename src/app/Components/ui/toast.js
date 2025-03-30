"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
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

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-emerald-50 border-emerald-200"
      case "error":
        return "bg-red-50 border-red-200"
      case "info":
        return "bg-blue-50 border-blue-200"
      default:
        return "bg-emerald-50 border-emerald-200"
    }
  }

  const getTextColor = () => {
    switch (type) {
      case "success":
        return "text-emerald-800"
      case "error":
        return "text-red-800"
      case "info":
        return "text-blue-800"
      default:
        return "text-emerald-800"
    }
  }

  const getIconColor = () => {
    switch (type) {
      case "success":
        return "text-emerald-500"
      case "error":
        return "text-red-500"
      case "info":
        return "text-blue-500"
      default:
        return "text-emerald-500"
    }
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-md transform transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className={`flex items-center justify-between p-4 rounded-md shadow-md border ${getBackgroundColor()}`}>
        <div className="flex items-center">
          {type === "success" && (
            <svg
              className={`w-5 h-5 mr-3 ${getIconColor()}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          )}
          {type === "error" && (
            <svg
              className={`w-5 h-5 mr-3 ${getIconColor()}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          )}
          <p className={`text-sm font-medium ${getTextColor()}`}>{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(() => {
              onClose && onClose()
            }, 300)
          }}
          className={`ml-4 ${getIconColor()} hover:text-gray-700 focus:outline-none`}
        >
          <X className="w-4 h-4" />
        </button>
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
        />
      ))}
    </div>
  )
}

