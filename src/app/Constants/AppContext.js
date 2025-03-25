import { createContext, useContext } from "react";

// Create App Context
const AppContext = createContext(null);

// Custom Hook to Access Context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default AppContext;
