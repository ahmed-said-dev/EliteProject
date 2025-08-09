import { useState, useEffect, useCallback } from 'react';
import { gql } from '@apollo/client';
import { apolloClient } from '../lib/apollo';

// Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  avatar?: {
    url: string;
    alt?: string;
  };
  addresses: Array<{
    id: string;
    firstName: string;
    lastName: string;
    streetAddress1: string;
    streetAddress2?: string;
    city: string;
    postalCode: string;
    country: { code: string; country: string };
  }>;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// GraphQL Mutations and Queries
const LOGIN_MUTATION = gql`
  mutation TokenCreate($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      refreshToken
      errors {
        field
        message
        code
      }
      user {
        id
        email
        firstName
        lastName
        isActive
        avatar {
          url
          alt
        }
        addresses {
          id
          firstName
          lastName
          streetAddress1
          streetAddress2
          city
          postalCode
          country {
            code
            country
          }
        }
      }
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation AccountRegister($input: AccountRegisterInput!) {
    accountRegister(input: $input) {
      errors {
        field
        message
        code
      }
      user {
        id
        email
        firstName
        lastName
        isActive
      }
    }
  }
`;

const USER_QUERY = gql`
  query Me {
    me {
      id
      email
      firstName
      lastName
      isActive
      avatar {
        url
        alt
      }
      addresses {
        id
        firstName
        lastName
        streetAddress1
        streetAddress2
        city
        postalCode
        country {
          code
          country
        }
      }
    }
  }
`;

const TOKEN_VERIFY_MUTATION = gql`
  mutation TokenVerify($token: String!) {
    tokenVerify(token: $token) {
      isValid
      payload
      user {
        id
        email
        firstName
        lastName
        isActive
        avatar {
          url
          alt
        }
      }
    }
  }
`;

export const useSaleorAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  });

  // Load token from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('saleor_auth_token');
    if (token) {
      verifyToken(token);
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // Verify existing token
  const verifyToken = useCallback(async (token: string) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: TOKEN_VERIFY_MUTATION,
        variables: { token },
      });

      if (data.tokenVerify.isValid && data.tokenVerify.user) {
        setAuthState({
          user: data.tokenVerify.user,
          token,
          isAuthenticated: true,
          loading: false,
          error: null,
        });
        
        // Update Apollo client headers
        apolloClient.defaultContext = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('saleor_auth_token');
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        });
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('saleor_auth_token');
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: 'فشل في التحقق من الجلسة',
      });
    }
  }, []);

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));

      const { data } = await apolloClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: { email, password },
      });

      if (data.tokenCreate.errors && data.tokenCreate.errors.length > 0) {
        const errorMessage = data.tokenCreate.errors[0].message;
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error: errorMessage === 'Please, enter valid credentials' 
            ? 'بيانات تسجيل الدخول غير صحيحة' 
            : errorMessage
        }));
        return false;
      }

      if (data.tokenCreate.token && data.tokenCreate.user) {
        const { token, user } = data.tokenCreate;
        
        // Store token
        localStorage.setItem('saleor_auth_token', token);
        
        // Update state
        setAuthState({
          user,
          token,
          isAuthenticated: true,
          loading: false,
          error: null,
        });

        // Update Apollo client headers
        apolloClient.defaultContext = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        return true;
      }

      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: 'حدث خطأ غير متوقع أثناء تسجيل الدخول',
      }));
      return false;
    } catch (error: any) {
      console.error('Login error:', error);
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: 'لا يمكن الاتصال بالخادم. تأكد من تشغيل Saleor على المنفذ 8000',
      }));
      return false;
    }
  }, []);

  // Register function
  const register = useCallback(async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));

      const { data } = await apolloClient.mutate({
        mutation: REGISTER_MUTATION,
        variables: {
          input: {
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
          },
        },
      });

      if (data.accountRegister.errors && data.accountRegister.errors.length > 0) {
        const errorMessage = data.accountRegister.errors[0].message;
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error: errorMessage.includes('already exists') 
            ? 'هذا البريد الإلكتروني مسجل مسبقاً' 
            : errorMessage,
        }));
        return false;
      }

      if (data.accountRegister.user) {
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error: null,
        }));

        // Auto-login after successful registration
        return await login(userData.email, userData.password);
      }

      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: 'حدث خطأ غير متوقع أثناء التسجيل',
      }));
      return false;
    } catch (error: any) {
      console.error('Registration error:', error);
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: 'لا يمكن الاتصال بالخادم. تأكد من تشغيل Saleor على المنفذ 8000',
      }));
      return false;
    }
  }, [login]);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('saleor_auth_token');
    localStorage.removeItem('saleor_cart_id');
    
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });

    // Reset Apollo client headers
    apolloClient.resetStore();
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...authState,
    login,
    register,
    logout,
    clearError,
  };
};

export default useSaleorAuth;