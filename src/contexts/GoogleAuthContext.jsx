import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

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
  const [authError, setAuthError] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingAuth = async () => {
      const token = localStorage.getItem('gbp_auth_token');
      if (token) {
        try {
          const userData = await apiService.verifyToken(token);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('gbp_auth_token');
          console.error('Token verification failed:', error);
        }
      }
    };

    checkExistingAuth();
  }, []);

  // Initialize Google API with proper scopes
  useEffect(() => {
    const initializeGoogleAPI = () => {
      if (window.gapi) {
        window.gapi.load('auth2', () => {
          const authInstance = window.gapi.auth2.init({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-google-client-id',
            scope: [
              'https://www.googleapis.com/auth/userinfo.email',
              'https://www.googleapis.com/auth/userinfo.profile',
              'https://www.googleapis.com/auth/business.manage'
            ].join(' ')
          });

          // Set up auth state listener
          authInstance.isSignedIn.listen(handleAuthStateChange);
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

  const handleAuthStateChange = (isSignedIn) => {
    if (!isSignedIn) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('gbp_auth_token');
    }
  };

  const signIn = async () => {
    setIsLoading(true);
    setAuthError(null);

    try {
      if (window.gapi && window.gapi.auth2) {
        const authInstance = window.gapi.auth2.getAuthInstance();
        const googleUser = await authInstance.signIn({
          prompt: 'consent' // Always show consent screen to ensure we get refresh token
        });

        const authCode = googleUser.getAuthResponse().access_token;
        const profile = googleUser.getBasicProfile();

        // Send auth code to our backend
        const response = await apiService.exchangeGoogleAuth({
          accessToken: authCode,
          profile: {
            id: profile.getId(),
            name: profile.getName(),
            email: profile.getEmail(),
            picture: profile.getImageUrl()
          }
        });

        // Store our backend token
        localStorage.setItem('gbp_auth_token', response.token);
        
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
        throw new Error('Google API not loaded');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setAuthError(error.message || 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      if (window.gapi && window.gapi.auth2) {
        const authInstance = window.gapi.auth2.getAuthInstance();
        await authInstance.signOut();
      }
      
      // Notify backend
      await apiService.signOut();
      
      // Clear local state
      localStorage.removeItem('gbp_auth_token');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Sign out error:', error);
      // Still clear local state even if backend call fails
      localStorage.removeItem('gbp_auth_token');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    authError,
    signIn,
    signOut
  };

  return (
    <GoogleAuthContext.Provider value={value}>
      {children}
    </GoogleAuthContext.Provider>
  );
};