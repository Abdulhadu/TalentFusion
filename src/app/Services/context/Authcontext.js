"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children, initialAuthenticated }) => {
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);

  useEffect(() => {
    // Check if the user is authenticated (e.g., check for the presence of a valid token)
    const checkAuthentication = async () => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        const isValidToken = await validateToken(token);

        if (isValidToken) {
          setAuthenticated(true);
        } else {
          localStorage.removeItem('jwtToken');
          setAuthenticated(false);
        }
      } else {
        setAuthenticated(false);
      }
    };
  
      // Call the function to check authentication
    checkAuthentication();
  },  [initialAuthenticated]);



  const validateToken =  async (token) => {
    try {
      console.log("Decoding token...");
      const decodedToken = jwtDecode(token);
      console.log("Decoded token:", decodedToken);
      const { exp } = decodedToken;
  
      // Check token expiration
      if (exp < Date.now() / 1000) {
        console.log("Token has expired");
        return false;
      }
  
      console.log("Token is valid");
      return true;
    } catch (error) {
      console.error("Error decoding token:", error.message);
      return false;
    }
  };

  const login = (token) => {
    localStorage.setItem('jwtToken', token);
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setAuthenticated(false);
  };
  

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};