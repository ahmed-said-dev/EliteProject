import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faLock, 
  faEnvelope, 
  faEye, 
  faEyeSlash, 
  faExclamationCircle,
  faCheck,
  faPaw,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook, faApple } from '@fortawesome/free-brands-svg-icons';
import styles from '@/styles/components/LoginForm.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/SaleorAuthContext';
import { useRouter } from 'next/router';

interface LoginFormProps {
  onToggleMode: () => void;
  isLogin: boolean;
}

export default function LoginForm({ onToggleMode, isLogin }: LoginFormProps) {
  const { t, isRTL } = useLanguage();
  const { login, register, error: authError, clearError } = useAuth();
  const router = useRouter();
  const dir = isRTL ? 'rtl' : 'ltr';
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string | null}>({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    // Email validation
    if (!formData.email) {
      errors.email = t('auth.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t('auth.errors.invalidEmail');
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = t('auth.errors.passwordRequired');
    } else if (formData.password.length < 8) {
      errors.password = t('auth.errors.passwordLength');
    }
    
    // Name validation (only for registration)
    if (!isLogin && !formData.firstName) {
      errors.firstName = t('auth.errors.firstNameRequired') || 'الاسم الأول مطلوب';
    }
    
    if (!isLogin && !formData.lastName) {
      errors.lastName = t('auth.errors.lastNameRequired') || 'الاسم الأخير مطلوب';
    }
    
    // Confirm password validation (only for registration)
    if (!isLogin && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = t('auth.errors.passwordsMustMatch');
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Clear any previous auth errors
    clearError();
    setLoading(true);
    
    try {
      let success = false;
      
      if (isLogin) {
        // Login
        success = await login(formData.email, formData.password);
      } else {
        // Register
        success = await register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        });
      }
      
      if (success) {
        setShowSuccess(true);
        setFormErrors({});
        
        // Redirect after successful authentication
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      }
      
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full md:w-1/2 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 transform hover:shadow-purple-100 border border-purple-100 relative ${styles.formCard}`} dir={dir}>
      {/* Purple Decorative Edge with pattern */}
      <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-purple-500 to-purple-800 pattern-overlay"></div>
      
      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-purple-100 rounded-br-full opacity-40"></div>
        <div className="absolute top-4 left-4 text-purple-800">
          <FontAwesomeIcon icon={faPaw} className="text-2xl transform rotate-45" />
        </div>
      </div>
      
      <div className="absolute bottom-0 right-0 w-32 h-32 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-full h-full bg-purple-100 rounded-tl-full opacity-40"></div>
        <div className="absolute bottom-6 right-6 text-purple-800">
          <FontAwesomeIcon icon={faPaw} className="text-2xl transform -rotate-45" />
        </div>
      </div>
      
      {/* Success Message Overlay with animated paw prints */}
      {showSuccess && (
        <div className="absolute inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center z-10 animate-fadeIn">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 text-4xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {isLogin ? t('auth.login.successMessage') : t('auth.register.successMessage')}
          </h3>
          <p className="text-gray-600 mb-4 text-center">
            {isLogin ? t('auth.login.redirectMessage') : t('auth.register.redirectMessage')}
          </p>
          
          {/* Walking paw prints animation */}
          <div className="paw-walk-container">
            <div className="paw-print paw-1"><FontAwesomeIcon icon={faPaw} /></div>
            <div className="paw-print paw-2"><FontAwesomeIcon icon={faPaw} /></div>
            <div className="paw-print paw-3"><FontAwesomeIcon icon={faPaw} /></div>
            <div className="paw-print paw-4"><FontAwesomeIcon icon={faPaw} /></div>
            <div className="paw-print paw-5"><FontAwesomeIcon icon={faPaw} /></div>
          </div>
        </div>
      )}
      
      <div className="px-8 py-10 md:px-12 md:py-14">
        <div className="text-center mb-8">
          <div className="inline-block p-5 rounded-full bg-purple-100 mb-5 relative">
            <FontAwesomeIcon icon={faPaw} className="text-4xl text-purple-800" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-white text-xs" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            {isLogin ? t('auth.login.welcomeBack') : t('auth.register.joinCommunity')}
          </h2>
          <p className="text-gray-600">
            {isLogin 
              ? t('auth.login.signInAccess')
              : t('auth.register.createAccount')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Form error message if any */}
          {(formErrors.general || authError) && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500 mr-3" />
                <p className="text-red-700">{formErrors.general || authError}</p>
              </div>
            </div>
          )}
          
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative group">
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">الاسم الأول</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FontAwesomeIcon icon={faUser} className="text-purple-400 group-hover:text-purple-600 transition-colors duration-200" />
                    </div>
                                    <input
                  type="text"
                  id="first_name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border ${formErrors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300 group-hover:border-purple-400'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                      placeholder="أدخل الاسم الأول"
                    />
                  </div>
                  {formErrors.firstName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                      {formErrors.firstName}
                    </p>
                  )}
                </div>

                <div className="relative group">
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">الاسم الأخير</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FontAwesomeIcon icon={faUser} className="text-purple-400 group-hover:text-purple-600 transition-colors duration-200" />
                    </div>
                    <input
                      type="text"
                                        id="last_name"
                  name="lastName"
                  value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border ${formErrors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300 group-hover:border-purple-400'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                      placeholder="أدخل الاسم الأخير"
                    />
                  </div>
                  {formErrors.lastName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                      {formErrors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="relative group">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف (اختياري)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="fas fa-phone text-purple-400 group-hover:text-purple-600 transition-colors duration-200"></i>
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 group-hover:border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="أدخل رقم الهاتف"
                  />
                </div>
              </div>
            </>
          )}
          
          <div className="relative group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{isLogin ? t('auth.login.emailLabel') : t('auth.register.emailLabel')}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FontAwesomeIcon icon={faEnvelope} className="text-purple-400 group-hover:text-purple-600 transition-colors duration-200" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border ${formErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 group-hover:border-purple-400'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                placeholder={isLogin ? t('auth.login.emailPlaceholder') : t('auth.register.emailPlaceholder')}
              />
            </div>
            {formErrors.email && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                {formErrors.email}
              </p>
            )}
          </div>
          
          <div className="relative group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">{isLogin ? t('auth.login.passwordLabel') : t('auth.register.passwordLabel')}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FontAwesomeIcon icon={faLock} className="text-purple-400 group-hover:text-purple-600 transition-colors duration-200" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-3 border ${formErrors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 group-hover:border-purple-400'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                placeholder={isLogin ? t('auth.login.passwordPlaceholder') : t('auth.register.passwordPlaceholder')}
              />
              <button 
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon 
                  icon={showPassword ? faEyeSlash : faEye} 
                  className="text-gray-500 hover:text-purple-700"
                />
              </button>
            </div>
            {formErrors.password && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                {formErrors.password}
              </p>
            )}
          </div>
          
          {!isLogin && (
            <div className="relative group">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">{t('auth.register.confirmPasswordLabel')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-purple-400 group-hover:text-purple-600 transition-colors duration-200" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border ${formErrors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300 group-hover:border-purple-400'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                  placeholder={t('auth.register.confirmPasswordPlaceholder')}
                />
              </div>
              {formErrors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>
          )}
          
          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  {t('auth.login.rememberMe')}
                </label>
              </div>
              
              <a href="#" className="text-purple-600 hover:text-purple-800 transition-colors duration-300">{t('auth.login.forgotPassword')}</a>
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-lg shadow-md transition-all duration-300 flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isLogin ? t('auth.login.signingIn') : t('auth.register.creatingAccount')}
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPaw} className="mr-2" />
                {isLogin ? t('auth.login.signInButton') : t('auth.register.createButton')}
              </>
            )}
          </button>
        </form>
        
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">{t('auth.register.orContinueWith')}</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-3">
            <button
              type="button"
              className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faGoogle} className="text-red-500 text-lg" />
            </button>
            <button
              type="button"
              className="w-full py-3 px-4 bg-blue-600 border border-blue-700 rounded-lg shadow-sm text-white font-medium hover:bg-blue-700 transition-all duration-200 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faFacebook} className="text-lg" />
            </button>
            <button
              type="button"
              className="w-full py-3 px-4 bg-black border border-black rounded-lg shadow-sm text-white font-medium hover:bg-gray-900 transition-all duration-200 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faApple} className="text-lg" />
            </button>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            {isLogin ? t('auth.login.noAccount') : t('auth.register.haveAccount')}
            <button 
              type="button"
              onClick={onToggleMode}
              className="ml-1 font-semibold text-purple-700 hover:text-purple-900 transition-colors hover:underline"
            >
              {isLogin ? t('auth.login.createAccount') : t('auth.register.signIn')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
