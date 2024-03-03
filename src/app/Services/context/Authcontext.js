"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children, initialAuthenticated }) => {
  const [recruiterAuthenticated, setRecruiterAuthenticated] = useState(initialAuthenticated);
  const [interviewerAuthenticated, setInterviewerAuthenticated] = useState(initialAuthenticated);

  useEffect(() => {
    // Check if the user is authenticated (e.g., check for the presence of a valid token)
    const checkAuthentication = async () => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        console.log("tokes is: ", token)
        const { user_type } = jwtDecode(token);
        console.log("user_type is: ", user_type)
        const isValidToken = await validateToken(token);

        if (isValidToken) {
          if ( user_type=== 'recruiter') {
            setRecruiterAuthenticated(true);
          } else if ( user_type === 'interviewer') {
            setInterviewerAuthenticated(true);
          } else {
            console.error('Invalid user type in token');
          }
        } else {
          localStorage.removeItem('jwtToken');
          setRecruiterAuthenticated(false);
          setInterviewerAuthenticated(false);
        }
      } else {
        setRecruiterAuthenticated(false);
        setInterviewerAuthenticated(false);
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
    const { user_type } = jwtDecode(token);
    if (user_type === 'recruiter') {
      setRecruiterAuthenticated(true);
    } else if (user_type === 'interviewer') {
      setInterviewerAuthenticated(true);
    } else {
      console.error('Invalid user type in token');
    }
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setRecruiterAuthenticated(false);
    setInterviewerAuthenticated(false);
  };
  

  return (
    <AuthContext.Provider value={{ recruiterAuthenticated, interviewerAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};