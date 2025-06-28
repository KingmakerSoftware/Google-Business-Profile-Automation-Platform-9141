import React from 'react';
import { motion } from 'framer-motion';
import { useGoogleAuth } from '../contexts/GoogleAuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiChrome, FiZap, FiShield, FiTrendingUp, FiAlertCircle } = FiIcons;

const GoogleSignIn = () => {
  const { signIn, isLoading, authError } = useGoogleAuth();

  const features = [
    {
      icon: FiZap,
      title: 'Automated Management',
      description: 'Streamline your Google Business Profile tasks with intelligent automation'
    },
    {
      icon: FiShield,
      title: 'Secure Connection',
      description: 'Your data is protected with enterprise-grade security standards'
    },
    {
      icon: FiTrendingUp,
      title: 'Performance Analytics',
      description: 'Track and optimize your business profile performance with detailed insights'
    }
  ];

  const permissions = [
    'View and manage your Google Business Profiles',
    'Access profile analytics and insights',
    'Manage posts and updates',
    'Monitor and respond to reviews'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-6"
          >
            <SafeIcon icon={FiChrome} className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Google Business Profile
            <span className="block text-blue-600">Automation Platform</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
          >
            Connect your Google Account to manage all your business profiles, 
            automate posts, monitor reviews, and track performance from one dashboard.
          </motion.p>

          {authError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center text-red-700"
            >
              <SafeIcon icon={FiAlertCircle} className="w-5 h-5 mr-2" />
              {authError}
            </motion.div>
          )}

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={signIn}
            disabled={isLoading}
            className="inline-flex items-center px-8 py-4 bg-white border-2 border-gray-300 rounded-xl text-gray-700 font-semibold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                Connecting...
              </>
            ) : (
              <>
                <img 
                  src="https://developers.google.com/identity/images/g-logo.png" 
                  alt="Google" 
                  className="w-6 h-6 mr-3"
                />
                Sign in with Google
              </>
            )}
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-sm text-gray-500"
          >
            <p className="mb-2">This app will request permission to:</p>
            <ul className="text-left max-w-md mx-auto space-y-1">
              {permissions.map((permission, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {permission}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                <SafeIcon icon={feature.icon} className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GoogleSignIn;