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
import Divider from '@/components/Divider';


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
      
      {/* Veterinary-themed pattern background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        <div className="absolute w-full h-full bg-repeat opacity-5" 
             style={{ backgroundSize: '100px' }}></div>
      </div>
      
      {/* Custom shape divider */}
      <div className="absolute left-0 right-0 h-24 -mt-12 transform rotate-180" style={{ zIndex: 2 }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
          <path fill="rgba(74, 45, 113, 0.07)" fillOpacity="1" d="M0,160L48,181.3C96,203,192,245,288,224C384,203,480,117,576,90.7C672,64,768,96,864,128C960,160,1056,192,1152,170.7C1248,149,1344,75,1392,37.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      <Section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          {/* Gradient background with custom shadow effect */}
          <div className="relative flex flex-col md:flex-row max-w-6xl mx-auto gap-10 items-stretch p-8 rounded-3xl"
               style={{
                 background: 'linear-gradient(135deg, rgba(74, 45, 113, 0.08) 0%, rgba(157, 78, 221, 0.05) 50%, rgba(219, 166, 255, 0.07) 100%)',
                 boxShadow: '0 10px 30px rgba(74, 45, 113, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
               }}>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-gradient-to-br from-purple-200/20 to-transparent -translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-gradient-to-tl from-purple-200/20 to-transparent translate-x-1/4 translate-y-1/4"></div>
            
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden" 
                 style={{ 
                   background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))',
                   border: '1px solid rgba(255, 255, 255, 0.15)',
                   zIndex: -1
                 }}>
            </div>
            
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

      {/* Decorative Divider with paw prints */}
      <div className="py-6 relative z-10">
        <Divider transparent={true} />
      </div>

      {/* Join Community Section */}
      <CommunitySection 
        isLogin={isLogin}
        toggleForm={toggleForm}
      />
    </main>
  );
}
