import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./slices/cartSlice"
import productsReducer from "./slices/productSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
})

