import React, { createContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext();

// Decode JWT token
const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

// UserProvider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from token on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) setUser(decoded);
      else localStorage.removeItem("token"); // remove invalid token
    }
  }, []);

  // Login function
  const login = (token) => {
    if (!token) return;
    localStorage.setItem("token", token); // store token
    const decoded = decodeToken(token);
    if (decoded) setUser(decoded); // updates context immediately
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token"); // clear token
    setUser(null); // clear user state
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
