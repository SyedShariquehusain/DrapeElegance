import { useUserGuardContext } from "../../firebase";
import { Link } from "react-router-dom";

export default function Account() {
  // This page is protected and only accessible to logged-in users
  // The useUserGuardContext hook ensures user is never null in protected pages
  const { user } = useUserGuardContext();
  
  // Define theme colors to match the elegant design
  const colors = {
    primary: "#8a5a44", // Warm brown for primary accents
    secondary: "#f4e9e1", // Light beige
    accent: "#c78f6d", // Lighter brown for hover states
    dark: "#2d2626", // Almost black for text
    light: "#ffffff" // White for backgrounds
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Decorative pattern - elegant saree-inspired border */}
      <div className="h-2" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent}, ${colors.primary})` }}></div>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-serif text-3xl mb-2" style={{ color: colors.dark }}>My Account</h1>
        <p className="text-gray-500 mb-8">Manage your profile and preferences</p>
        
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="h-16 w-16 rounded-full object-cover" />
                ) : (
                  <span className="text-2xl font-serif" style={{ color: colors.primary }}>
                    {user.displayName ? user.displayName[0].toUpperCase() : user.email ? user.email[0].toUpperCase() : "U"}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-xl font-medium">{user.displayName || "Welcome"}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="font-medium mb-4">Account Details</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p>{user.email}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Account created</p>
                <p>{user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "N/A"}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Last sign in</p>
                <p>{user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-medium">My Orders</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-500 mb-4">View and track your orders</p>
              <Link 
                to="/orders" 
                className="inline-block px-4 py-2 rounded text-white text-sm transition-colors"
                style={{ backgroundColor: colors.primary }}
              >
                View Orders
              </Link>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-medium">My Wishlist</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-500 mb-4">View your saved items</p>
              <Link 
                to="/wishlist" 
                className="inline-block px-4 py-2 rounded text-white text-sm transition-colors"
                style={{ backgroundColor: colors.primary }}
              >
                View Wishlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
