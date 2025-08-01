import React, { createContext, useState, useContext } from 'react';

// Create the CaptionContext
const CaptionContext = createContext();

// Custom hook to use the CaptionContext
export const useCaption = () => {
  const context = useContext(CaptionContext);
  if (!context) {
    throw new Error('useCaption must be used within a CaptionProvider');
  }
  return context;
};

// CaptionProvider component
export const CaptionProvider = ({ children }) => {
  const [caption, setCaption] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login function
  const login = (captionData) => {
    setCaption(captionData);
    setIsAuthenticated(true);
    // Store in localStorage
    localStorage.setItem('caption', JSON.stringify(captionData));
  };

  // Logout function
  const logout = () => {
    setCaption(null);
    setIsAuthenticated(false);
    // Clear from localStorage
    localStorage.removeItem('caption');
  };

  // Check if caption is logged in on app start
  const checkAuthStatus = () => {
    const storedCaption = localStorage.getItem('caption');
    if (storedCaption) {
      const captionData = JSON.parse(storedCaption);
      setCaption(captionData);
      setIsAuthenticated(true);
    }
  };

  const value = {
    caption,
    setCaption,
    isAuthenticated,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <CaptionContext.Provider value={value}>
      {children}
    </CaptionContext.Provider>
  );
};

export default CaptionContext;
