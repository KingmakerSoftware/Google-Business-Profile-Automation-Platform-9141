import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Create axios instance with interceptors
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('gbp_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('gbp_auth_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Authentication
  async exchangeGoogleAuth(authData) {
    const response = await apiClient.post('/auth/google', authData);
    return response.data;
  },

  async verifyToken(token) {
    const response = await apiClient.get('/auth/verify', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async signOut() {
    await apiClient.post('/auth/signout');
  },

  // Business Profiles
  async getBusinessProfiles(filters = {}) {
    const response = await apiClient.get('/business-profiles', { params: filters });
    return response.data;
  },

  async getBusinessProfile(profileId) {
    const response = await apiClient.get(`/business-profiles/${profileId}`);
    return response.data;
  },

  async updateBusinessProfile(profileId, updates) {
    const response = await apiClient.patch(`/business-profiles/${profileId}`, updates);
    return response.data;
  },

  async getProfileAnalytics(profileId, dateRange) {
    const response = await apiClient.get(`/business-profiles/${profileId}/analytics`, {
      params: dateRange
    });
    return response.data;
  },

  // Posts
  async createPost(profileId, postData) {
    const response = await apiClient.post(`/business-profiles/${profileId}/posts`, postData);
    return response.data;
  },

  async getPosts(profileId) {
    const response = await apiClient.get(`/business-profiles/${profileId}/posts`);
    return response.data;
  },

  // Reviews
  async getReviews(profileId) {
    const response = await apiClient.get(`/business-profiles/${profileId}/reviews`);
    return response.data;
  },

  async replyToReview(profileId, reviewId, reply) {
    const response = await apiClient.post(
      `/business-profiles/${profileId}/reviews/${reviewId}/reply`, 
      { reply }
    );
    return response.data;
  },

  // Dashboard
  async getDashboardStats() {
    const response = await apiClient.get('/dashboard/stats');
    return response.data;
  },

  async getRecentActivity() {
    const response = await apiClient.get('/dashboard/activity');
    return response.data;
  }
};