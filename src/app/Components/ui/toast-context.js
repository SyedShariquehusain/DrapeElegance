"use client"

import { createContext, useContext, useState, useCallback } from "react"
import { ToastContainer } from "./toast"

const ToastContext = createContext(null)

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(
    ({
      message,
      type = "success",
      duration = 3000,
      productImage,
      productTitle,
      productPrice,
      productSize,
      productQuantity,
    }) => {
      const id = Math.random().toString(36).substring(2, 9)
      setToasts((prevToasts) => [
        ...prevToasts,
        {
          id,
          message,
          type,
          duration,
          productImage,
          productTitle,
          productPrice,
          productSize,
          productQuantity,
        },
      ])
      return id
    },
    [],
  )

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

