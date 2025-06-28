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
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      
      if (!clientId || clientId === 'your_actual_google_client_id_here') {
        setAuthError('Google Client ID not configured. Please check your .env file.');
        return;
      }

      if (window.gapi) {
        window.gapi.load('auth2', () => {
          try {
            const authInstance = window.gapi.auth2.init({
              client_id: clientId,
              scope: [
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/business.manage'
              ].join(' '),
              cookiepolicy: 'single_host_origin'
            });

            // Set up auth state listener
            authInstance.isSignedIn.listen(handleAuthStateChange);
            
            // Clear any previous errors if initialization succeeds
            setAuthError(null);
          } catch (error) {
            console.error('Google Auth initialization error:', error);
            setAuthError('Failed to initialize Google authentication. Please check your configuration.');
          }
        });
      }
    };

    // Load Google API script
    if (!window.gapi) {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = initializeGoogleAPI;
      script.onerror = () => {
        setAuthError('Failed to load Google API. Please check your internet connection.');
      };
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
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      
      if (!clientId || clientId === 'your_actual_google_client_id_here') {
        throw new Error('Google Client ID not configured. Please add VITE_GOOGLE_CLIENT_ID to your .env file.');
      }

      if (window.gapi && window.gapi.auth2) {
        const authInstance = window.gapi.auth2.getAuthInstance();
        
        if (!authInstance) {
          throw new Error('Google Auth not initialized. Please refresh the page and try again.');
        }

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
        throw new Error('Google API not loaded. Please refresh the page and try again.');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      
      let errorMessage = 'Failed to sign in with Google';
      
      if (error.error === 'popup_closed_by_user') {
        errorMessage = 'Sign-in was cancelled. Please try again.';
      } else if (error.error === 'access_denied') {
        errorMessage = 'Access was denied. Please grant the required permissions.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setAuthError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      if (window.gapi && window.gapi.auth2) {
        const authInstance = window.gapi.auth2.getAuthInstance();
        if (authInstance) {
          await authInstance.signOut();
        }
      }
      
      // Notify backend
      try {
        await apiService.signOut();
      } catch (error) {
        console.warn('Backend signout failed:', error);
      }
      
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