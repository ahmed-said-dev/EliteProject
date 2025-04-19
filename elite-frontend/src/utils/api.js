/**
 * API Configuration for Elite Veterinary Project
 * This file manages the connection between frontend and backend
 */

// Backend base URL - change in different environments
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

// API endpoints
export const ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_URL}/api/auth/local`,
    REGISTER: `${API_URL}/api/auth/local/register`,
    FORGOT_PASSWORD: `${API_URL}/api/auth/forgot-password`,
    RESET_PASSWORD: `${API_URL}/api/auth/reset-password`,
  },
  
  // Content endpoints
  SERVICES: `${API_URL}/api/services`,
  PRODUCTS: `${API_URL}/api/products`,
  BLOG_POSTS: `${API_URL}/api/blog-posts`,
  APPOINTMENTS: `${API_URL}/api/appointments`,
  DOCTORS: `${API_URL}/api/doctors`,
  MEMBERSHIPS: `${API_URL}/api/memberships`,
  
  // Media endpoints
  UPLOAD: `${API_URL}/api/upload`,
  MEDIA: `${API_URL}/api/upload/files`,
};

/**
 * Default headers for API requests
 */
export const getHeaders = (token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Helper function to add query parameters to URLs
 */
export const addQueryParams = (url, params = {}) => {
  const queryString = Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  return queryString ? `${url}?${queryString}` : url;
};

/**
 * Fetch wrapper with error handling
 */
export const fetchAPI = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.error?.message || 'Something went wrong',
        details: data.error?.details,
      };
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
