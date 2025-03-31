"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppContext } from "../Constants/AppContext"
import { logoutUser } from "../Firebase/auth"
import { useSelector } from "react-redux"
import { Search, User, MapPin, Heart, ShoppingBag, Menu, X, ChevronUp, ChevronDown } from "lucide-react"
import { navigationCategories } from "../utils/navigation"

export default function Navbar() {
  // Define theme colors
  const colors = {
    primary: "#e11d48", // Rose-600 for primary accents
    secondary: "#fff1f2", // Rose-50 for subtle highlights
    accent: "#fb7185", // Rose-400 for hover states
    dark: "#1f2937", // Gray-800 for text
    light: "#ffffff", // White for backgrounds
  }

  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { state } = useAppContext()
  const router = useRouter()
  const navRef = useRef(null)

  // Get cart quantity from Redux store
  const cartQuantity = useSelector((state) => state.cart.totalQuantity)
  const wishlistQuantity = useSelector((state) => state.wishlist.items.length)

  const handleDropdownToggle = (categoryName, e) => {
    if (e) e.preventDefault()
    if (activeDropdown === categoryName) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(categoryName)
    }
  }

  const handleSignOut = async () => {
    await logoutUser()
    router.push("/")
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100" ref={navRef}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Top bar with logo and icons */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl font-bold tracking-wide text-rose-600">
            Drape Elegance
          </Link>

          {/* Search and icons */}
          <div className="flex items-center space-x-6">
            {/* Search icon */}
            <button
              className="text-gray-700 hover:text-black transition-colors transform hover:scale-110 duration-200"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* User account icon */}
            {state.loading ? (
              <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
            ) : state.isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <div className="relative group">
                  <button
                    className="text-gray-700 hover:text-black transition-colors transform hover:scale-110 duration-200 flex items-center space-x-1"
                    aria-label="My Account"
                    onClick={() => router.push("/account")}
                  >
                    <User className="h-5 w-5" />
                    <span className="text-xs font-medium max-w-[80px] truncate">
                      {state.user.displayName || state.user.email?.split("@")[0] || "Account"}
                    </span>
                  </button>

                  <div className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-100 shadow-lg py-2 hidden group-hover:block animate-in fade-in-50 zoom-in-95 duration-100">
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-150"
                    >
                      My Account
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-150"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-150"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/Login"
                className="text-gray-700 hover:text-black transition-colors transform hover:scale-110 duration-200 flex items-center space-x-1"
                aria-label="Sign In"
              >
                <User className="h-5 w-5" />
                <span className="text-xs font-medium">Sign In</span>
              </Link>
            )}

            {/* Location icon */}
            <button
              className="text-gray-700 hover:text-black transition-colors transform hover:scale-110 duration-200"
              aria-label="Store Locator"
            >
              <MapPin className="h-5 w-5" />
            </button>

            {/* Wishlist icon */}
            <Link
              href="/wishlist"
              className="relative text-gray-700 hover:text-black transition-colors transform hover:scale-110 duration-200"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistQuantity > 0 && (
                <span className="absolute -top-2 -right-2 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full bg-rose-600">
                  {wishlistQuantity}
                </span>
              )}
            </Link>

            {/* Cart icon with count */}
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-black transition-colors transform hover:scale-110 duration-200"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full bg-rose-600">
                  {cartQuantity}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700 hover:text-black transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Navigation categories - Horizontal menu with dropdowns */}
        <nav className="hidden md:block">
          <ul className="flex justify-center space-x-1 py-2">
            {navigationCategories.map((category) => (
              <li key={category.name} className="relative">
                <div className="group">
                  <Link
                    href={category.link}
                    className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-rose-600 ${
                      activeDropdown === category.name ? "text-rose-600" : "text-gray-800"
                    }`}
                    onClick={(e) => category.subCategories && handleDropdownToggle(category.name, e)}
                  >
                    <span className="flex items-center">
                      {category.name}
                      {category.subCategories && (
                        <ChevronDown
                          className={`ml-1 h-4 w-4 transition-transform ${
                            activeDropdown === category.name ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </span>
                  </Link>

                  {/* Dropdown menu */}
                  {category.subCategories && activeDropdown === category.name && (
                    <div className="absolute left-0 z-10 mt-0 w-60 bg-white border border-gray-100 shadow-lg py-2">
                      {category.subCategories.map((subCategory) => (
                        <Link
                          key={subCategory.name}
                          href={subCategory.link}
                          className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-150 text-gray-800"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {subCategory.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <Link href="/" className="font-serif text-2xl font-bold tracking-wide text-rose-600">
                Drape Elegance
              </Link>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-4">
              <ul className="space-y-4">
                {navigationCategories.map((category) => (
                  <li key={category.name} className="border-b border-gray-100 pb-4">
                    <div className="flex items-center justify-between">
                      <Link
                        href={category.link}
                        className="text-base font-medium"
                        onClick={() => !category.subCategories && setMobileMenuOpen(false)}
                      >
                        {category.name}
                      </Link>

                      {category.subCategories && (
                        <button onClick={() => handleDropdownToggle(category.name)} className="p-1">
                          {activeDropdown === category.name ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                      )}
                    </div>

                    {category.subCategories && activeDropdown === category.name && (
                      <ul className="mt-2 ml-4 space-y-2">
                        {category.subCategories.map((subCategory) => (
                          <li key={subCategory.name}>
                            <Link
                              href={subCategory.link}
                              className="text-sm text-gray-600 hover:text-gray-900"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subCategory.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

