'use client'

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentUser, auth } from "../../firebase";
import { useRouter } from "next/navigation";



export default function Navbar() {
  const router = useRouter();
  // Define theme colors
  const colors = {
    primary: "#8a5a44", // Warm brown for primary accents
    secondary: "#f4e9e1", // Light beige for subtle highlights
    accent: "#c78f6d", // Lighter brown for hover states
    dark: "#2d2626", // Almost black for text
    light: "#ffffff" // White for backgrounds
  };
  const [activeDropdown, setActiveDropdown] = useState(" ");
//   const { user, loading } = useCurrentUser();
  // const navigate = useNavigate();
  
  // Categories with their subcategories
  const categories = [
    {
      name: "New In",
      link: "/new-arrivals",
      subCategories: [
        { name: "View all", link: "/new-arrivals" },
        { name: "This Week", link: "/new-arrivals/this-week" },
        { name: "Last Week", link: "/new-arrivals/last-week" }
      ]
    },
    {
      name: "Top Wear",
      link: "/top-wear",
      subCategories: [
        { name: "View all", link: "/top-wear" },
        { name: "Blouses", link: "/top-wear/blouses" },
        { name: "Tunics", link: "/top-wear/tunics" }
      ]
    },
    {
      name: "Sets",
      link: "/sets",
      subCategories: [
        { name: "View all", link: "/sets" },
        { name: "2 Piece sets", link: "/sets/2-piece" },
        { name: "3 Piece sets", link: "/sets/3-piece" }
      ]
    },
    {
      name: "Sarees",
      link: "/sarees",
      subCategories: [
        { name: "View all", link: "/sarees" },
        { name: "Saree Blouses", link: "/sarees/blouses" },
        { name: "Kurtas", link: "/sarees/kurtas" },
        { name: "Dresses", link: "/sarees/dresses" },
        { name: "Tunics", link: "/sarees/tunics" },
        { name: "3 Piece sets", link: "/sarees/3-piece-sets" },
        { name: "2 Piece sets", link: "/sarees/2-piece-sets" },
        { name: "Unstitched Dress Materials", link: "/sarees/unstitched-materials" },
        { name: "Kaftans", link: "/sarees/kaftans" }
      ]
    },
    {
      name: "Blouses",
      link: "/blouses",
      subCategories: [
        { name: "View all", link: "/blouses" },
        { name: "Designer Blouses", link: "/blouses/designer" },
        { name: "Ready to Wear", link: "/blouses/ready-to-wear" }
      ]
    },
    {
      name: "Bottom wear",
      link: "/bottom-wear",
      subCategories: [
        { name: "View all", link: "/bottom-wear" },
        { name: "Pants", link: "/bottom-wear/pants" },
        { name: "Skirts", link: "/bottom-wear/skirts" },
        { name: "Palazzos", link: "/bottom-wear/palazzos" }
      ]
    },
    {
      name: "Dupattas & More",
      link: "/dupattas",
      subCategories: [
        { name: "View all", link: "/dupattas" },
        { name: "Dupattas", link: "/dupattas/all" },
        { name: "Stoles", link: "/dupattas/stoles" }
      ]
    },
    {
      name: "Sale",
      link: "/sale"
    },
    {
      name: "Collections",
      link: "/collections",
      subCategories: [
        { name: "View all", link: "/collections" },
        { name: "Festive Collection", link: "/collections/festive" },
        { name: "Bridal Collection", link: "/collections/bridal" },
        { name: "Summer Collection", link: "/collections/summer" }
      ]
    },
    {
      name: "Online Exclusive",
      link: "/online-exclusive"
    }
  ];

  const handleDropdownToggle = (categoryName) => {
    if (activeDropdown === categoryName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(categoryName);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top bar with logo and icons */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          {/* Logo */}
          {/* <Link to="/" className="font-serif text-2xl font-bold tracking-wide" style={{ color: colors.primary }}> */}
            Drape Elegance
          {/* </Link> */}
          
          {/* Search and icons */}
          <div className="flex items-center space-x-6">
            {/* Search icon */}
            <button 
              className="text-gray-700 hover:text-black transition-colors transform hover:scale-110 duration-200" 
              aria-label="Search"
              style={{ color: colors.dark }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {/* User account icon */}
           
              <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
           
              <div className="flex items-center space-x-2">
                <div className="relative group">
                  <button 
                    className="text-gray-700 hover:text-black transition-colors transform hover:scale-110 duration-200 flex items-center space-x-1" 
                    aria-label="My Account"
                    style={{ color: colors.dark }}
                    onClick={() => navigate("/account")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {/* <span className="text-xs font-medium max-w-[80px] truncate">
                      {user.displayName || user.email?.split("@")[0] || "Account"}
                    </span> */}
                  </button>
                  
                  <div className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-100 shadow-lg py-2 hidden group-hover:block animate-in fade-in-50 zoom-in-95 duration-100">
                    {/* <Link
                      to="/account"
                      className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-150"
                      style={{ color: colors.dark }}
                    > */}
                      My Account
                    {/* </Link> */}
                    {/* <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-150"
                      style={{ color: colors.dark }}
                    > */}
                      My Orders
                    {/* </Link> */}
                    <button
                      onClick={async () => {
                        await auth.signOut();
                        navigate("/");
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-150"
                      style={{ color: colors.dark }}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>


              <div className="flex items-center space-x-6">
            <button
              className="text-gray-700 hover:text-black transition-colors transform hover:scale-110 duration-200 flex items-center space-x-1"
              onClick={() => router.push("/Login")}
              aria-label="Sign In"
              style={{ color: '#2d2626' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs font-medium">Sign In</span>
            </button>
          </div>
            
            {/* Location icon */}
            <button 
              className="text-gray-700 hover:text-black transition-colors transform hover:scale-110 duration-200" 
              aria-label="Store Locator"
              style={{ color: colors.dark }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            
            {/* Wishlist icon */}
            {/* <Link 
              to="/wishlist" 
              className="text-gray-700 hover:text-black transition-colors transform hover:scale-110 duration-200" 
              aria-label="Wishlist"
              style={{ color: colors.dark }}
            > */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            {/* </Link> */}
            
            {/* Cart icon with count */}
            {/* <Link 
              to="/cart" 
              className="relative text-gray-700 hover:text-black transition-colors transform hover:scale-110 duration-200" 
              aria-label="Shopping Cart"
              style={{ color: colors.dark }}
            > */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-2 -right-2 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full" style={{ backgroundColor: colors.primary }}>0</span>
            {/* </Link> */}
          </div>
        </div>
        
        {/* Navigation categories */}
        <nav className="flex justify-center border-t border-gray-100">
          <ul className="flex space-x-8 py-4">
            {categories.map((category) => (
              <li key={category.name} className="relative group">
                <button 
                  className="py-2 text-sm font-medium transition-colors flex items-center hover:opacity-70"
                  style={{ color: activeDropdown === category.name ? colors.primary : colors.dark }}
                  onClick={() => handleDropdownToggle(category.name)}
                  aria-expanded={activeDropdown === category.name}
                >
                  {category.name}
                  {category.subCategories && (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === category.name ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
                
                {/* Dropdown menu */}
                {category.subCategories && activeDropdown === category.name && (
                  <div className="absolute left-0 z-10 mt-2 w-60 bg-white border border-gray-100 shadow-lg py-2 animate-in fade-in-50 zoom-in-95 duration-100">
                    {category.subCategories.map((subCategory) => (
                      <div
                        key={subCategory.name}
                        to={subCategory.link}
                        className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-150"
                        style={{ color: colors.dark }}
                        onClick={() => setActiveDropdown(null)}
                      >
                        {subCategory.name}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
