import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { apiService } from '../services/apiService';
import BusinessProfileCard from '../components/BusinessProfileCard';
import BusinessProfilesHeader from '../components/BusinessProfilesHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const BusinessProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getBusinessProfiles();
      setProfiles(data.profiles || []);
    } catch (err) {
      console.error('Error fetching profiles:', err);
      setError(err.response?.data?.message || 'Failed to load business profiles');
      
      // Fallback to mock data for demo
      const mockProfiles = [
        {
          id: '1',
          name: 'Downtown Coffee Shop',
          address: '123 Main St, Downtown, NY 10001',
          phone: '(555) 123-4567',
          website: 'https://downtowncoffee.com',
          rating: 4.5,
          reviewCount: 127,
          status: 'verified',
          category: 'Coffee Shop',
          photos: 15,
          posts: 8,
          lastUpdated: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          name: 'Bella Vista Restaurant',
          address: '456 Oak Ave, Midtown, NY 10002',
          phone: '(555) 987-6543',
          website: 'https://bellavista.com',
          rating: 4.2,
          reviewCount: 89,
          status: 'pending',
          category: 'Italian Restaurant',
          photos: 23,
          posts: 12,
          lastUpdated: '2024-01-14T16:45:00Z'
        }
      ];
      setProfiles(mockProfiles);
    } finally {
      setLoading(false);
    }
  };

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || profile.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <BusinessProfilesHeader
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            profileCount={0}
          />
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        <BusinessProfilesHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          profileCount={filteredProfiles.length}
          onRefresh={fetchProfiles}
        />

        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={fetchProfiles}
          />
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProfiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <BusinessProfileCard profile={profile} />
            </motion.div>
          ))}
        </motion.div>

        {filteredProfiles.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No business profiles found matching your criteria.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default BusinessProfiles;