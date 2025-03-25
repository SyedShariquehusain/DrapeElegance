import { useUserGuardContext } from "../../firebase";
import { Link } from "react-router-dom";

export default function Orders() {
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

  // Placeholder for order data
  const mockOrders = [
    { id: "ORD-001", date: "2025-03-10", status: "Delivered", total: "₹8,450", items: 2 },
    { id: "ORD-002", date: "2025-02-25", status: "Shipped", total: "₹5,200", items: 1 },
    { id: "ORD-003", date: "2025-01-15", status: "Processing", total: "₹12,750", items: 3 },
  ];

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "#4caf50";
      case "Shipped":
        return "#2196f3";
      case "Processing":
        return "#ff9800";
      default:
        return colors.dark;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Decorative pattern - elegant saree-inspired border */}
      <div className="h-2" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent}, ${colors.primary})` }}></div>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl mb-2" style={{ color: colors.dark }}>My Orders</h1>
            <p className="text-gray-500">Track your orders and purchases</p>
          </div>
          <Link 
            to="/account" 
            className="inline-block px-4 py-2 text-sm font-medium"
            style={{ color: colors.primary }}
          >
            Back to Account
          </Link>
        </div>
        
        {mockOrders.length > 0 ? (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left p-4 font-medium">Order</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Total</th>
                  <th className="text-left p-4 font-medium">Items</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium">{order.id}</td>
                    <td className="p-4 text-gray-600">{order.date}</td>
                    <td className="p-4">
                      <span 
                        className="inline-block px-2 py-1 rounded-full text-xs font-medium" 
                        style={{ 
                          backgroundColor: `${getStatusColor(order.status)}20`,
                          color: getStatusColor(order.status)
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 font-medium">{order.total}</td>
                    <td className="p-4 text-gray-600">{order.items}</td>
                    <td className="p-4 text-right">
                      <button 
                        className="text-sm font-medium transition-colors"
                        style={{ color: colors.primary }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h2 className="text-xl font-medium mb-2">No Orders Yet</h2>
              <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
              <Link 
                to="/sarees" 
                className="inline-block px-6 py-3 rounded text-white transition-colors"
                style={{ backgroundColor: colors.primary }}
              >
                Start Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
