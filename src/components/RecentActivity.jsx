import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiStar, FiImage, FiFileText, FiCheckCircle } = FiIcons;

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'review',
      icon: FiStar,
      color: 'text-yellow-600 bg-yellow-100',
      title: 'New 5-star review',
      description: 'Downtown Coffee Shop received a new review',
      timestamp: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      type: 'photo',
      icon: FiImage,
      color: 'text-blue-600 bg-blue-100',
      title: 'Photos updated',
      description: 'Added 3 new photos to Bella Vista Restaurant',
      timestamp: '2024-01-14T16:45:00Z'
    },
    {
      id: 3,
      type: 'post',
      icon: FiFileText,
      color: 'text-green-600 bg-green-100',
      title: 'Post published',
      description: 'New promotion post for Tech Repair Solutions',
      timestamp: '2024-01-13T09:15:00Z'
    },
    {
      id: 4,
      type: 'verification',
      icon: FiCheckCircle,
      color: 'text-purple-600 bg-purple-100',
      title: 'Profile verified',
      description: 'Sunset Fitness Center verification completed',
      timestamp: '2024-01-12T14:20:00Z'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl border border-gray-200 p-6"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`p-2 rounded-lg ${activity.color}`}>
              <SafeIcon icon={activity.icon} className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 mb-1">
                {activity.title}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                {activity.description}
              </p>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium py-2 rounded-lg hover:bg-blue-50 transition-colors"
      >
        View all activity
      </motion.button>
    </motion.div>
  );
};

export default RecentActivity;