import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGoogleAuth } from '../contexts/GoogleAuthContext';
import { apiService } from '../services/apiService';
import GoogleSignIn from '../components/GoogleSignIn';
import DashboardStats from '../components/DashboardStats';
import RecentActivity from '../components/RecentActivity';
import ErrorMessage from '../components/ErrorMessage';

const Dashboard = () => {
  const { isAuthenticated } = useGoogleAuth();
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [statsData, activityData] = await Promise.all([
        apiService.getDashboardStats(),
        apiService.getRecentActivity()
      ]);
      
      setStats(statsData);
      setActivity(activityData);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.response?.data?.message || 'Failed to load dashboard data');
      
      // Fallback to mock data
      setStats({
        totalProfiles: 4,
        averageRating: 4.5,
        totalViews: 12400,
        growthRate: 18.2
      });
      
      setActivity([
        {
          id: 1,
          type: 'review',
          title: 'New 5-star review',
          description: 'Downtown Coffee Shop received a new review',
          timestamp: '2024-01-15T10:30:00Z'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

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

        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={fetchDashboardData}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DashboardStats stats={stats} loading={loading} />
          </div>
          <div>
            <RecentActivity activity={activity} loading={loading} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;