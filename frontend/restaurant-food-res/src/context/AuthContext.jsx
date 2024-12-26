import React, { createContext, useState } from "react";
import { getToken, logout } from "../service/AuthService";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

  const login = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
