import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPaw, 
  faChevronLeft,
  faChevronRight,
  faMedkit
} from '@fortawesome/free-solid-svg-icons';
import { Section } from '@/components/ui/Section';
import styles from './CommunitySection.module.css';

interface CommunitySectionProps {
  isLogin: boolean;
  onToggleMode: () => void;
}

export default function CommunitySection({ isLogin, onToggleMode }: CommunitySectionProps) {
  return (
    <Section className="py-16 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dots-pattern opacity-5"></div>
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500 rounded-full opacity-5 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-500 rounded-full opacity-5 transform translate-x-1/4 translate-y-1/4"></div>
      
      {/* Scattered icons */}
      <div className="absolute top-1/4 right-10">
        <FontAwesomeIcon icon={faPaw} className="text-purple-300 text-4xl opacity-20" />
      </div>
      <div className="absolute bottom-1/4 left-10">
        <FontAwesomeIcon icon={faMedkit} className="text-purple-300 text-3xl opacity-20" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Join Our Pet Care Community</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sign up today and become part of our growing community of pet lovers and care providers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard 
            iconUrl="https://www.svgrepo.com/show/424621/pet-dog-animal.svg"
            title="Manage Multiple Pets"
            description="Keep track of each pet's health records, appointments, and medications in one place"
          />
          
          <FeatureCard 
            iconUrl="https://www.svgrepo.com/show/424614/pet-cat-animal.svg"
            title="Appointment Reminders"
            description="Receive timely notifications for upcoming vet visits and medication schedules"
          />
          
          <FeatureCard 
            iconUrl="https://www.svgrepo.com/show/424624/pet-paw-animal.svg"
            title="Pet Owner Resources"
            description="Access expert advice, articles, and forums on pet health and care"
          />
        </div>
        
        <div className="text-center mt-12">
          <button
            onClick={onToggleMode}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            {isLogin ? 'Start creating an account now' : 'Sign in to your account'}
            <FontAwesomeIcon icon={isLogin ? faChevronRight : faChevronLeft} className="ml-2" />
          </button>
        </div>
      </div>
    </Section>
  );
}

interface FeatureCardProps {
  iconUrl: string;
  title: string;
  description: string;
}

function FeatureCard({ iconUrl, title, description }: FeatureCardProps) {
  return (
    <div className="bg-purple-50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg text-center group">
      <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
        <img src={iconUrl} alt={title} className="h-10 w-10" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-purple-800 transition-colors">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
