import { Section } from '@/components/ui/Section';
import PageBanner from '@/components/PageBanner/PageBanner';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { 
  LoginForm, 
  AuthPageDecorations,
  BenefitsCard,
  CommunitySection
} from '@/components/Auth';

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    // Name validation (only for registration)
    if (!isLogin && !formData.name) {
      errors.name = 'Name is required';
    }
    
    // Confirm password validation (only for registration)
    if (!isLogin && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call for authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setShowSuccess(true);
      
      // Reset form errors
      setFormErrors({});
      
      // Redirect after successful login/registration (simulated)
      setTimeout(() => {
        router.push('/');
      }, 2000);
      
    } catch (error) {
      console.error('Authentication error:', error);
      setFormErrors({ general: 'An error occurred during login. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Reset form data and errors when switching between login and register
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    });
    setFormErrors({});
    setShowSuccess(false);
  };

  return (
    <main className="bg-gradient-to-b from-purple-50 to-white min-h-screen relative overflow-hidden">
      {/* Decorative background elements */}
      <AuthPageDecorations />
      
      <PageBanner 
        title={isLogin ? "Login to Your Account" : "Create a New Account"}
        backgroundImage="https://images.pexels.com/photos/7788657/pexels-photo-7788657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        overlayOpacity={0.7}
      />
      
      <Section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row max-w-6xl mx-auto gap-10 items-stretch">
            
            {/* Form Card with decorative elements */}
            <LoginForm 
              isLogin={isLogin}
              formData={formData}
              formErrors={formErrors}
              showPassword={showPassword}
              rememberMe={rememberMe}
              loading={loading}
              showSuccess={showSuccess}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              toggleForm={toggleForm}
            />
            
            {/* Pet Image and Features */}
            <BenefitsCard />
          </div>
        </div>
      </Section>
      
      {/* Join Community Section */}
      <CommunitySection 
        isLogin={isLogin}
        toggleForm={toggleForm}
      />
    </main>
  );
}
