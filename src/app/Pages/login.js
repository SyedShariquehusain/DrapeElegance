import { SignInOrUpForm } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCurrentUser } from "../../firebase";

export default function Login() {
  // Define theme colors to match the elegant design
  const colors = {
    primary: "#8a5a44", // Warm brown for primary accents
    secondary: "#f4e9e1", // Light beige
    accent: "#c78f6d", // Lighter brown for hover states
    dark: "#2d2626", // Almost black for text
    light: "#ffffff" // White for backgrounds
  };
  
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  
  // Redirect to home if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Decorative pattern - elegant saree-inspired border */}
      <div className="h-2" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent}, ${colors.primary})` }}></div>
      
      <div className="flex flex-col md:flex-row flex-1">
        {/* Left side - elegant image */}
        <div className="hidden md:flex md:w-1/2 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1887&auto=format&fit=crop')",
            backgroundPosition: "center 30%"
          }}>
          <div className="w-full h-full bg-black bg-opacity-10 flex items-center justify-center">
            <div className="text-white text-center p-12">
              <h2 className="font-serif text-4xl font-light mb-6">Welcome Back</h2>
              <p className="font-light text-lg opacity-90">Sign in to access your account and explore our exclusive collection</p>
            </div>
          </div>
        </div>
        
        {/* Right side - login form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16">
          <div className="w-full max-w-md">
            <h1 className="font-serif text-3xl text-center mb-2" style={{ color: colors.dark }}>Sign In</h1>
            <p className="text-center text-gray-500 mb-8">Welcome back to Drape Elegance</p>
            
            {/* Sign in form using Firebase Auth */}
            <div className="bg-white rounded-lg p-8 mb-6">
              <SignInOrUpForm signInOptions={{ 
                google: true, 
                facebook: true,
                emailAndPassword: true 
              }} />
            </div>
            
            {/* Decorative divider with saree pattern */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm text-gray-500">New to Drape Elegance?</span>
              </div>
            </div>
            
            <div className="text-center">
              <Link 
                to="/register" 
                className="inline-block font-medium transition-colors"
                style={{ color: colors.primary }}
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
