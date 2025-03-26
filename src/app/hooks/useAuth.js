"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppContext } from "../Constants/AppContext"

export function useAuth() {
  const { state } = useAppContext()
  const router = useRouter()

  useEffect(() => {
    if (!state.loading && !state.isLoggedIn) {
      router.push("/login")
    }
  }, [state.isLoggedIn, state.loading, router])

  return { user: state.user, loading: state.loading }
}

