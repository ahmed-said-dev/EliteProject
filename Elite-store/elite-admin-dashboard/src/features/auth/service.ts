import { apiService } from '../../services/api';
import type { LoginRequest, LoginResponse, User } from '../../types';

export const authService = {
  // Login
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiService.post<LoginResponse>('/auth/login', credentials);
    // Our backend returns a plain object, while apiService is typed as ApiResponse<T>
    // Cast to align with the actual response shape
    return response as unknown as LoginResponse;
  },

  // Get current user profile
  async getProfile(): Promise<User> {
    const response = await apiService.get<User>('/auth/profile');
    return response as unknown as User;
  },

  // Logout
  async logout(): Promise<void> {
    await apiService.post('/auth/logout');
  },

  // Refresh token
  async refreshToken(): Promise<LoginResponse> {
    const response = await apiService.post<LoginResponse>('/auth/refresh');
    return response.data;
  },

  // Change password
  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<void> {
    await apiService.patch('/auth/change-password', data);
  },

  // Request password reset
  async requestPasswordReset(email: string): Promise<void> {
    await apiService.post('/auth/forgot-password', { email });
  },

  // Reset password
  async resetPassword(data: { token: string; password: string }): Promise<void> {
    await apiService.post('/auth/reset-password', data);
  },
};
 