import { useUserGuardContext } from "app";
import { Link } from "react-router-dom";

export default function Wishlist() {
  // This page is protected and only accessible to logged-in users
  const { user } = useUserGuardContext();
  
  // Define theme colors to match the elegant design
  const colors = {
    primary: "#8a5a44", // Warm brown for primary accents
    secondary: "#f4e9e1", // Light beige
    accent: "#c78f6d", // Lighter brown for hover states
    dark: "#2d2626", // Almost black for text
    light: "#ffffff" // White for backgrounds
  };

  // Placeholder for wishlist items
  const mockWishlistItems = [
    {
      id: "PROD-001",
      name: "Kanjeevaram Silk Saree",
      price: "₹12,499",
      image: "https://images.unsplash.com/photo-1610189844577-60bc4d9c771c?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: "PROD-002",
      name: "Banarasi Silk Saree",
      price: "₹15,999",
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=300&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Decorative pattern - elegant saree-inspired border */}
      <div className="h-2" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent}, ${colors.primary})` }}></div>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl mb-2" style={{ color: colors.dark }}>My Wishlist</h1>
            <p className="text-gray-500">Your saved items</p>
          </div>
          <Link 
            to="/account" 
            className="inline-block px-4 py-2 text-sm font-medium"
            style={{ color: colors.primary }}
          >
            Back to Account
          </Link>
        </div>
        
        {mockWishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockWishlistItems.map((item) => (
              <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden transition-all hover:shadow-md">
                <div className="relative pb-[125%] overflow-hidden">
                  <img 
                    src={item.image}
                    alt={item.name}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <button 
                    className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill={colors.primary}>
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium mb-1">{item.name}</h3>
                  <p className="font-medium mb-4" style={{ color: colors.primary }}>{item.price}</p>
                  
                  <div className="flex space-x-2">
                    <button 
                      className="flex-1 px-4 py-2 rounded text-white text-sm transition-colors"
                      style={{ backgroundColor: colors.primary }}
                    >
                      Add to Cart
                    </button>
                    <Link 
                      to={`/product/${item.id}`}
                      className="px-4 py-2 rounded border text-sm transition-colors"
                      style={{ borderColor: colors.primary, color: colors.primary }}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h2 className="text-xl font-medium mb-2">Your Wishlist is Empty</h2>
              <p className="text-gray-500 mb-6">Save your favorite items to your wishlist.</p>
              <Link 
                to="/sarees" 
                className="inline-block px-6 py-3 rounded text-white transition-colors"
                style={{ backgroundColor: colors.primary }}
              >
                Explore Collection
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
