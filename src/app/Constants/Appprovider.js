"use client"

import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../Firebase/config"
import AppContext from "./AppContext"
import { Provider } from "react-redux"
import { store } from "../redux/store"
import { ToastProvider } from "../Components/ui/toast-context"

const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    isLoggedIn: false,
    loading: true,
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setState({
          user,
          isLoggedIn: true,
          loading: false,
        })
      } else {
        setState({
          user: null,
          isLoggedIn: false,
          loading: false,
        })
      }
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  return (
    <Provider store={store}>
      <AppContext.Provider value={{ state }}>
        <ToastProvider>{children}</ToastProvider>
      </AppContext.Provider>
    </Provider>
  )
}

export default AppProvider

