"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ProductListingPage from "../Components/productListingPage"

export default function SareesPage() {
  const allProducts = useSelector((state) => state.products.products)
  const [sareeProducts, setSareeProducts] = useState([])

  useEffect(() => {
    // Filter products to only include sarees
    // In a real app, you'd have proper categorization in your data
    // This is a simplified example
    const filtered = allProducts.filter(
      (product) =>
        !product.title.toLowerCase().includes("blouse") &&
        (!product.category || !product.category.toLowerCase().includes("blouse")),
    )

    setSareeProducts(filtered)
  }, [allProducts])

  // Define category tabs
  const categoryTabs = [
    {
      id: "all",
      label: "ALL SAREES",
      filter: () => true,
    },
    {
      id: "silk",
      label: "SILK SAREES",
      filter: (product) => product.fabric === "Silk",
    },
    {
      id: "cotton",
      label: "COTTON SAREES",
      filter: (product) => product.fabric === "Cotton",
    },
    {
      id: "linen",
      label: "LINEN SAREES",
      filter: (product) => product.fabric === "Linen",
    },
  ]

  // Define banner image
  const bannerImage = {
    src: "https://images.unsplash.com/photo-1610189844577-60bc4d9c771c?q=80&w=1887&auto=format&fit=crop",
    alt: "Saree Collection",
    overlay: true,
    title: "ELEGANT SAREES",
    subtitle: "Discover our exquisite collection of handcrafted sarees",
    cta: {
      text: "Shop Now",
      url: "/collections/sarees",
    },
  }

  // Define description
  const description =
    "Explore our stunning collection of sarees crafted with meticulous attention to detail. From traditional silk sarees to contemporary designs, find the perfect saree for every occasion."

  return (
    <ProductListingPage
      title="Sarees"
      description={description}
      products={sareeProducts}
      bannerImage={bannerImage}
      categoryTabs={categoryTabs}
    />
  )
}

