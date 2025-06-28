import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiStar, FiMapPin, FiPhone, FiGlobe, FiImage, FiFileText, FiCheckCircle, FiClock } = FiIcons;

const BusinessProfileCard = ({ profile }) => {
  const {
    name,
    address,
    phone,
    website,
    rating,
    reviewCount,
    status,
    category,
    photos,
    posts,
    lastUpdated
  } = profile;

  const statusConfig = {
    verified: {
      icon: FiCheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      label: 'Verified'
    },
    pending: {
      icon: FiClock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      label: 'Pending'
    }
  };

  const currentStatus = statusConfig[status] || statusConfig.pending;

  return (
    <motion.div
      whileHover={{ y: -4, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-blue-200 transition-all duration-200"
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
              {name}
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {category}
            </span>
          </div>
          <div className={`inline-flex items-center px-2.5 py-1 rounded-full ${currentStatus.bgColor}`}>
            <SafeIcon icon={currentStatus.icon} className={`w-3 h-3 mr-1 ${currentStatus.color}`} />
            <span className={`text-xs font-medium ${currentStatus.color}`}>
              {currentStatus.label}
            </span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-900">{rating}</span>
          </div>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm text-gray-600">{reviewCount} reviews</span>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-start">
            <SafeIcon icon={FiMapPin} className="w-4 h-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-sm text-gray-600 line-clamp-2">{address}</span>
          </div>
          <div className="flex items-center">
            <SafeIcon icon={FiPhone} className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{phone}</span>
          </div>
          {website && (
            <div className="flex items-center">
              <SafeIcon icon={FiGlobe} className="w-4 h-4 text-gray-400 mr-2" />
              <a 
                href={website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 truncate"
              >
                {website.replace('https://', '')}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <SafeIcon icon={FiImage} className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{photos} photos</span>
          </div>
          <div className="flex items-center">
            <SafeIcon icon={FiFileText} className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{posts} posts</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <span className="text-xs text-gray-500">
            Updated {formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 bg-white border-t border-gray-100">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200">
          Manage Profile
        </button>
      </div>
    </motion.div>
  );
};

export default BusinessProfileCard;