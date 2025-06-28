import React from 'react';
import { motion } from 'framer-motion';
import { useGoogleAuth } from '../contexts/GoogleAuthContext';
import GoogleSignIn from '../components/GoogleSignIn';
import DashboardStats from '../components/DashboardStats';
import RecentActivity from '../components/RecentActivity';

const Dashboard = () => {
  const { isAuthenticated } = useGoogleAuth();

  if (!isAuthenticated) {
    return <GoogleSignIn />;
  }

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage your Google Business Profiles and automation campaigns
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DashboardStats />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;