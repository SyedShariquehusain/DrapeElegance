import { createSlice } from "@reduxjs/toolkit"
import { bestSellers, newArrivals } from "../../Mockdata/utils"

// Combine all products for initial state
const allProducts = [...bestSellers, ...newArrivals]

const initialState = {
  products: allProducts.map((product) => ({
    ...product,
    // Add any missing fields that might be needed
    description:
      product.description ||
      "This beautiful piece is crafted with meticulous attention to detail, featuring traditional designs with a modern twist. Perfect for both casual and formal occasions.",
    sizes: product.sizes || ["XS", "S", "M", "L", "XL"],
    details: product.details || {
      material: "100% Pure Cotton",
      care: "Dry clean only",
      fit: "Regular fit",
      origin: "Handcrafted in India",
    },
  })),
  selectedProduct: null,
  loading: false,
  error: null,
}

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    // This would be used when we integrate with an API
    setProducts: (state, action) => {
      state.products = action.payload
    },
  },
})

export const { setSelectedProduct, setLoading, setError, setProducts } = productsSlice.actions

export default productsSlice.reducer

