import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPaw,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/components/BenefitsCard.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function BenefitsCard() {
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  
  return (
    <div className="w-full md:w-1/2 hidden md:block" dir={dir}>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 shadow-lg h-full">
        <div className="relative h-72 mb-8 overflow-hidden rounded-xl">
          <Image 
            src="https://images.pexels.com/photos/7516509/pexels-photo-7516509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Pet Care" 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-in-out"
            width={600}
            height={400}
          />
          <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} bg-purple-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md`}>
            {t('auth.benefits.eliteVet')}
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-purple-900 mb-5">{t('auth.benefits.title')}</h3>
        
        <div className="space-y-5">
          <BenefitItem 
            title={t('auth.benefits.items.healthRecords.title')} 
            description={t('auth.benefits.items.healthRecords.description')} 
          />
          
          <BenefitItem 
            title={t('auth.benefits.items.appointments.title')} 
            description={t('auth.benefits.items.appointments.description')} 
          />
          
          <BenefitItem 
            title={t('auth.benefits.items.discounts.title')} 
            description={t('auth.benefits.items.discounts.description')} 
          />
        </div>
        
        <div className="mt-8 bg-purple-800 text-white p-4 rounded-lg">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCheckCircle} className={`text-2xl ${isRTL ? 'ml-3' : 'mr-3'}`} />
            <p className="font-medium">{t('auth.benefits.trustMessage')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BenefitItemProps {
  title: string;
  description: string;
}

function BenefitItem({ title, description }: BenefitItemProps) {
  const { isRTL } = useLanguage();
  
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mt-1">
        <div className="bg-purple-100 rounded-full p-1.5 flex items-center justify-center">
          <FontAwesomeIcon icon={faPaw} className="text-purple-800 text-sm" />
        </div>
      </div>
      <div className={`${isRTL ? 'mr-4' : 'ml-4'}`}>
        <h4 className="text-lg font-medium text-purple-800">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
