"use client"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "../Components/navbar"
import { addToCart } from "../redux/slices/cartSlice"
import { removeFromWishlist } from "../redux/slices/wishlistSlice"
import { useToast } from "../Components/ui/toast-context"
import { Trash2 } from "lucide-react"

export default function Wishlist() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { addToast } = useToast()
  const { items } = useSelector((state) => state.wishlist)

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        product,
        quantity: 1,
      }),
    )

    addToast({
      message: `Added to bag`,
      type: "success",
      productImage: product.image,
      productTitle: product.title,
      productPrice: product.price,
      productSize: "Free Size",
      productQuantity: 1,
    })

    // Navigate to cart page
    router.push("/cart")
  }

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId))
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium mb-2">Guest Wishlist</h1>
          <p className="text-sm text-gray-600">
            VIEWING {items.length} {items.length === 1 ? "PRODUCT" : "PRODUCTS"}
          </p>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <div key={product.id} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                  <Link href={`/product/${product.id}`}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">
                    <Link href={`/product/${product.id}`}>{product.title}</Link>
                  </h3>
                  <p className="font-medium">₹{product.price.toLocaleString("en-IN")}</p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-rose-400 text-white py-3 text-sm font-medium hover:bg-rose-500 transition-colors"
                  >
                    ADD TO CART
                  </button>

                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="p-3 border border-gray-300 hover:bg-gray-50 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-block p-6 rounded-full bg-gray-100 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Your Wishlist is Empty</h3>
            <p className="text-gray-600 mb-6">Browse our collections and add your favorite items to your wishlist.</p>
            <Link
              href="/collections"
              className="inline-block px-6 py-3 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

