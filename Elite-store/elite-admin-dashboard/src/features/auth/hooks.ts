import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from './service';
import { useAuth } from '../../hooks/useAuth';
import type { LoginRequest } from '../../types';
import toast from 'react-hot-toast';

// Login mutation
export const useLogin = () => {
  const { login } = useAuth();
  
  return useMutation({
    mutationFn: (credentials: LoginRequest) => login(credentials),
    onSuccess: () => {
      toast.success('تم تسجيل الدخول بنجاح!');
      // Note: Navigation is handled in LoginPage component
    },
    onError: (error: Error) => {
      toast.error(error.message || 'فشل في تسجيل الدخول');
    },
  });
};

// Logout mutation
export const useLogout = () => {
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      logout();
      queryClient.clear();
      toast.success('تم تسجيل الخروج بنجاح');
    },
    onError: (error: Error) => {
      logout(); // Force logout even if API call fails
      queryClient.clear();
      toast.error(error.message || 'حدث خطأ في تسجيل الخروج');
    },
  });
};

// Change password mutation
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) =>
      authService.changePassword(data),
    onSuccess: () => {
      toast.success('تم تغيير كلمة المرور بنجاح!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'فشل في تغيير كلمة المرور');
    },
  });
};

// Request password reset mutation
export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: (email: string) => authService.requestPasswordReset(email),
    onSuccess: () => {
      toast.success('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'فشل في إرسال رابط إعادة التعيين');
    },
  });
};

// Reset password mutation
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: { token: string; password: string }) =>
      authService.resetPassword(data),
    onSuccess: () => {
      toast.success('تم إعادة تعيين كلمة المرور بنجاح!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'فشل في إعادة تعيين كلمة المرور');
    },
  });
};
 