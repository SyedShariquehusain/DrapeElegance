"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAppContext } from "../Constants/AppContext"
import { signInWithGoogle, signInWithFacebook, signInWithGithub, registerWithEmailAndPassword } from "../Firebase/auth"
import Image from "next/image"

export default function Register() {
  const router = useRouter()
  const { state } = useAppContext()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Define theme colors to match the elegant design
  const colors = {
    primary: "#8a5a44", // Warm brown for primary accents
    secondary: "#f4e9e1", // Light beige
    accent: "#c78f6d", // Lighter brown for hover states
    dark: "#2d2626", // Almost black for text
    light: "#ffffff", // White for backgrounds
  }

  // Redirect to home if already logged in
  React.useEffect(() => {
    if (state.isLoggedIn && !state.loading) {
      router.push("/")
    }
  }, [state.isLoggedIn, state.loading, router])

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required")
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setLoading(false)
      return
    }

    const { user, error: registerError } = await registerWithEmailAndPassword(email, password, name)

    if (registerError) {
      setError(registerError)
      setLoading(false)
      return
    }

    // Successful registration will trigger the useEffect above to redirect
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError("")
    const { error: loginError } = await signInWithGoogle()

    if (loginError) {
      setError(loginError)
      setLoading(false)
    }
    // Successful login will trigger the useEffect above to redirect
  }

  const handleFacebookLogin = async () => {
    setLoading(true)
    setError("")
    const { error: loginError } = await signInWithFacebook()

    if (loginError) {
      setError(loginError)
      setLoading(false)
    }
    // Successful login will trigger the useEffect above to redirect
  }

  const handleGithubLogin = async () => {
    setLoading(true)
    setError("")
    const { error: loginError } = await signInWithGithub()

    if (loginError) {
      setError(loginError)
      setLoading(false)
    }
    // Successful login will trigger the useEffect above to redirect
  }

  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
          style={{ borderColor: colors.primary }}
        ></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Decorative pattern - elegant saree-inspired border */}
      <div
        className="h-2"
        style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent}, ${colors.primary})` }}
      ></div>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Left side - elegant image */}
        <div className="hidden md:block md:w-1/2 relative bg-cover bg-center">
          <Image
            src="https://images.unsplash.com/photo-1610189844577-60bc4d9c771c?q=80&w=1887&auto=format&fit=crop"
            alt="Register background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 w-full h-full bg-black bg-opacity-20 flex items-center justify-center">
            <div className="text-white text-center p-12">
              <h2 className="font-serif text-4xl font-light mb-6">Discover Timeless Elegance</h2>
              <p className="font-light text-lg opacity-90">
                Join us to explore our exclusive collection of handcrafted sarees
              </p>
            </div>
          </div>
        </div>

        {/* Right side - register form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16">
          <div className="w-full max-w-md">
            <h1 className="font-serif text-3xl text-center mb-2" style={{ color: colors.dark }}>
              Create Your Account
            </h1>
            <p className="text-center text-gray-500 mb-8">Join our community of saree enthusiasts</p>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm">{error}</div>
            )}

            {/* Registration form */}
            <div className="bg-white rounded-lg p-8 mb-6 shadow-sm border border-gray-100">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{ focusRing: colors.primary }}
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{ focusRing: colors.primary }}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{ focusRing: colors.primary }}
                    placeholder="At least 6 characters"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{ focusRing: colors.primary }}
                    placeholder="Confirm your password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 rounded font-medium text-white transition-colors"
                  style={{ backgroundColor: colors.primary }}
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>
            </div>

            {/* Social login options */}
            <div className="space-y-4">
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-white text-sm text-gray-500">Or sign up with</span>
                </div>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded font-medium transition-colors hover:bg-gray-50"
                disabled={loading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign up with Google
              </button>

              <button
                onClick={handleFacebookLogin}
                className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded font-medium transition-colors hover:bg-gray-50"
                disabled={loading}
              >
                <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Sign up with Facebook
              </button>

              <button
                onClick={handleGithubLogin}
                className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded font-medium transition-colors hover:bg-gray-50"
                disabled={loading}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Sign up with GitHub
              </button>
            </div>

            {/* Decorative divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm text-gray-500">Already have an account?</span>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/login"
                className="inline-block font-medium transition-colors"
                style={{ color: colors.primary }}
              >
                Sign in here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

