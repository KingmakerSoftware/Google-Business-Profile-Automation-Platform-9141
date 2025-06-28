import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBuilding, FiStar, FiEye, FiTrendingUp } = FiIcons;

const DashboardStats = () => {
  const stats = [
    {
      name: 'Total Profiles',
      value: '4',
      change: '+1',
      changeType: 'increase',
      icon: FiBuilding,
      color: 'blue'
    },
    {
      name: 'Average Rating',
      value: '4.5',
      change: '+0.2',
      changeType: 'increase',
      icon: FiStar,
      color: 'yellow'
    },
    {
      name: 'Total Views',
      value: '12.4K',
      change: '+5.2%',
      changeType: 'increase',
      icon: FiEye,
      color: 'green'
    },
    {
      name: 'Growth Rate',
      value: '18.2%',
      change: '+2.1%',
      changeType: 'increase',
      icon: FiTrendingUp,
      color: 'purple'
    }
  ];

  const colorMap = {
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600'
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-green-600 font-medium">
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${colorMap[stat.color]}`}>
                <SafeIcon icon={stat.icon} className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;