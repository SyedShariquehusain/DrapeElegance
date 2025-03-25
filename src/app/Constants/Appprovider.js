import { useState } from "react";
import AppContext from "./AppContext";

const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    isLoggedIn: false,
  });

  const login = (user) => {
    setState({ user, isLoggedIn: true });
  };

  const logout = () => {
    setState({ user: null, isLoggedIn: false });
  };

  return (
    <AppContext.Provider value={{ state, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
