import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BusinessProfileCard from '../components/BusinessProfileCard';
import BusinessProfilesHeader from '../components/BusinessProfilesHeader';
import LoadingSpinner from '../components/LoadingSpinner';

const BusinessProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Mock API call to fetch business profiles
    const fetchProfiles = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data
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
        },
        {
          id: '3',
          name: 'Tech Repair Solutions',
          address: '789 Pine St, Uptown, NY 10003',
          phone: '(555) 456-7890',
          website: 'https://techrepair.com',
          rating: 4.8,
          reviewCount: 234,
          status: 'verified',
          category: 'Electronics Repair',
          photos: 8,
          posts: 5,
          lastUpdated: '2024-01-13T09:15:00Z'
        },
        {
          id: '4',
          name: 'Sunset Fitness Center',
          address: '321 Elm Dr, Westside, NY 10004',
          phone: '(555) 234-5678',
          website: 'https://sunsetfitness.com',
          rating: 4.6,
          reviewCount: 156,
          status: 'verified',
          category: 'Gym',
          photos: 31,
          posts: 18,
          lastUpdated: '2024-01-12T14:20:00Z'
        }
      ];
      
      setProfiles(mockProfiles);
      setLoading(false);
    };

    fetchProfiles();
  }, []);

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
        />

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

        {filteredProfiles.length === 0 && (
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