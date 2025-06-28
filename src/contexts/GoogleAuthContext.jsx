import React, { createContext, useContext, useState, useEffect } from 'react';

const GoogleAuthContext = createContext();

export const useGoogleAuth = () => {
  const context = useContext(GoogleAuthContext);
  if (!context) {
    throw new Error('useGoogleAuth must be used within a GoogleAuthProvider');
  }
  return context;
};

export const GoogleAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize Google API
  useEffect(() => {
    const initializeGoogleAPI = () => {
      if (window.gapi) {
        window.gapi.load('auth2', () => {
          window.gapi.auth2.init({
            client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with actual client ID
          });
        });
      }
    };

    // Load Google API script
    if (!window.gapi) {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = initializeGoogleAPI;
      document.body.appendChild(script);
    } else {
      initializeGoogleAPI();
    }
  }, []);

  const signIn = async () => {
    setIsLoading(true);
    try {
      // Mock authentication for demo purposes
      // In production, implement actual Google OAuth
      setTimeout(() => {
        const mockUser = {
          id: '12345',
          name: 'John Doe',
          email: 'john.doe@example.com',
          picture: 'https://via.placeholder.com/40x40/4285f4/ffffff?text=JD'
        };
        setUser(mockUser);
        setIsAuthenticated(true);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Sign in error:', error);
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    signIn,
    signOut
  };

  return (
    <GoogleAuthContext.Provider value={value}>
      {children}
    </GoogleAuthContext.Provider>
  );
};