import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  HeartIcon,
  SparklesIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { useLogin } from './hooks';
import type { LoginRequest } from '../../types';
import styles from './LoginPage.module.css';

// Custom Veterinary Icons
const VetLogo: React.FC = () => (
  <div className={styles.vetLogo}>
    <div className={styles.logoIcon}>
      <HeartIcon className={styles.heartIcon} />
      <div className={styles.pawOverlay}>
        <svg viewBox="0 0 24 24" className={styles.pawIcon}>
          <path fill="currentColor" d="M8.5 12c1.38 0 2.5-1.12 2.5-2.5S9.88 7 8.5 7 6 8.12 6 9.5s1.12 2.5 2.5 2.5zm7 0c1.38 0 2.5-1.12 2.5-2.5S16.88 7 15.5 7 13 8.12 13 9.5s1.12 2.5 2.5 2.5z"/>
        </svg>
      </div>
    </div>
    <div className={styles.logoText}>
      <h1>Elite Veterinary Care</h1>
      <p>المركز البيطري المتخصص</p>
    </div>
  </div>
);

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest, event?: React.BaseSyntheticEvent) => {
    // Prevent default form submission to avoid page reload
    if (event) {
      event.preventDefault();
    }
    
    try {
      await loginMutation.mutateAsync(data);
      // Navigate to dashboard smoothly after successful login
      navigate('/dashboard', { replace: true });
    } catch (error) {
      // Error handled by the mutation
      console.error('Login failed:', error);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        {/* Left Side - Login Form */}
        <div className={styles.loginFormSection}>
          <div className={styles.formContainer}>
            <VetLogo />
            
            <div className={styles.welcomeText}>
              <h2>مرحباً بك مرة أخرى</h2>
              <p>قم بتسجيل الدخول إلى لوحة التحكم</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
              {/* Email Field */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>البريد الإلكتروني</label>
                <input
                  type="email"
                  className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
                  placeholder="admin@elitestore.com"
                  {...register('email', {
                    required: 'البريد الإلكتروني مطلوب',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'البريد الإلكتروني غير صحيح',
                    },
                  })}
                />
                {errors.email && (
                  <span className={styles.formError}>{errors.email.message}</span>
                )}
              </div>

              {/* Password Field */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>كلمة المرور</label>
                <div className={styles.passwordInputContainer}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`${styles.formInput} ${errors.password ? styles.error : ''}`}
                    placeholder="••••••••"
                    {...register('password', {
                      required: 'كلمة المرور مطلوبة',
                      minLength: {
                        value: 6,
                        message: 'كلمة المرور يجب أن تكون على الأقل 6 أحرف',
                      },
                    })}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className={styles.formError}>{errors.password.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || loginMutation.isPending}
                className={styles.submitBtn}
              >
                {isSubmitting || loginMutation.isPending ? (
                  <div className={styles.loadingSpinner}></div>
                ) : (
                  <>
                    <ShieldCheckIcon className="w-5 h-5" />
                    تسجيل الدخول
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className={styles.demoCredentials}>
              <h4>بيانات تجريبية:</h4>
              <p>البريد: admin@elitestore.com</p>
              <p>كلمة المرور: admin123456</p>
            </div>
          </div>
        </div>

        {/* Right Side - Veterinary Image */}
        <div className={styles.loginImageSection}>
          <div className={styles.imageOverlay}>
            <div className={styles.floatingElements}>
              <SparklesIcon className={`${styles.floatingIcon} ${styles.icon1}`} />
              <HeartIcon className={`${styles.floatingIcon} ${styles.icon2}`} />
              <SparklesIcon className={`${styles.floatingIcon} ${styles.icon3}`} />
            </div>
            
            <div className={styles.welcomeMessage}>
              <h3>إدارة مركزك البيطري بكفاءة</h3>
              <p>نظام إدارة شامل للعيادات والمراكز البيطرية</p>
              
              <div className={styles.featuresList}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>💊</div>
                  <span>إدارة المنتجات والأدوية</span>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>📅</div>
                  <span>جدولة المواعيد</span>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>👥</div>
                  <span>إدارة الفريق الطبي</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
 