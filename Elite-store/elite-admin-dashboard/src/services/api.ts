import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import type { ApiResponse, PaginatedResponse, QueryParams } from '../types';

// Global navigation handler to avoid circular imports
let globalNavigateHandler: ((path: string) => void) | null = null;

export const setGlobalNavigateHandler = (handler: (path: string) => void) => {
  globalNavigateHandler = handler;
};

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - remove token and redirect to login smoothly
      localStorage.removeItem('authToken');
      
      // Use React Router navigation instead of page reload
      if (globalNavigateHandler) {
        globalNavigateHandler('/login');
      } else {
        // Fallback to window.location only if no handler is set
        console.warn('No navigation handler set, falling back to window.location');
        window.location.href = '/login';
      }
    }
    
    // Format error message
    const message = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

// Generic API methods
export const apiService = {
  // GET request
  async get<T>(url: string, params?: QueryParams): Promise<ApiResponse<T>> {
    const config: AxiosRequestConfig = {};
    if (params) {
      config.params = params;
    }
    const response = await api.get(url, config);
    return response.data;
  },

  // GET paginated request
  async getPaginated<T>(url: string, params?: QueryParams): Promise<PaginatedResponse<T>> {
    const config: AxiosRequestConfig = {};
    if (params) {
      config.params = params;
    }
    const response = await api.get(url, config);
    return response.data;
  },

  // GET blob
  async getBlob(url: string, params?: Record<string, any>): Promise<Blob> {
    const response = await api.get(url, { params, responseType: 'blob' });
    return response.data as Blob;
  },

  // POST request
  async post<T, D = any>(url: string, data?: D): Promise<ApiResponse<T>> {
    const response = await api.post(url, data);
    return response.data;
  },

  // PUT request
  async put<T, D = any>(url: string, data?: D): Promise<ApiResponse<T>> {
    const response = await api.put(url, data);
    return response.data;
  },

  // PATCH request
  async patch<T, D = any>(url: string, data?: D): Promise<ApiResponse<T>> {
    const response = await api.patch(url, data);
    return response.data;
  },

  // DELETE request
  async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response = await api.delete(url);
    return response.data;
  },

  // File upload
  async upload<T>(url: string, formData: FormData): Promise<ApiResponse<T>> {
    const response = await api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default api;