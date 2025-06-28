import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiAlertCircle, FiRefreshCw } = FiIcons;

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <SafeIcon icon={FiAlertCircle} className="w-5 h-5 text-red-600 mr-2" />
          <span className="text-red-700">{message}</span>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
          >
            <SafeIcon icon={FiRefreshCw} className="w-4 h-4 mr-1" />
            Retry
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ErrorMessage;