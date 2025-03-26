"use client"

import { createContext, useContext } from "react"

// Create App Context with default values
const AppContext = createContext({
  state: {
    user: null,
    isLoggedIn: false,
    loading: true,
  },
})

// Custom Hook to Access Context
export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

export default AppContext

