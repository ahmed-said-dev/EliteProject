import { Section } from '@/components/ui/Section';
import PageBanner from '@/components/PageBanner/PageBanner';
import { useRouter } from 'next/router';
import { 
  RegisterForm, 
  AuthPageDecorations,
  BenefitsCard,
  CommunitySection
} from '@/components/Auth';
import Divider from '@/components/Divider';
import { useLanguage } from '@/context/LanguageContext';


export default function Register() {
  const router = useRouter();
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  
  const toggleForm = () => {
    // Redirect to login page when toggle is clicked
    router.push('/login');
  };

  return (
    <main className="bg-gradient-to-b from-purple-50 to-white min-h-screen relative overflow-hidden" dir={dir}>
      {/* Decorative background elements */}
      <AuthPageDecorations />
      
      <PageBanner 
        title={t('auth.register.title')}
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
            <RegisterForm 
              onToggleMode={toggleForm}
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
        isLogin={false}
        toggleForm={toggleForm}
      />
    </main>
  );
}
