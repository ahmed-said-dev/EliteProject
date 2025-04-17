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
      <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-3xl p-8 shadow-lg h-full border border-purple-200 overflow-hidden relative transform transition-all duration-500 hover:shadow-xl">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200 rounded-full opacity-30"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-200 rounded-full opacity-30"></div>
        <div className="relative z-10">
        <div className="relative h-72 mb-8 overflow-hidden rounded-2xl shadow-md transform transition-all duration-500 hover:shadow-xl group">
          <Image 
            src="https://images.pexels.com/photos/7516509/pexels-photo-7516509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Pet Care" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
            width={600}
            height={400}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent opacity-70"></div>
          <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'} text-white text-xl font-bold`}>
            {t('auth.benefits.eliteVet')}
          </div>
          <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} bg-gradient-to-r from-purple-600 to-purple-800 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-purple-400/30`}>
            <span className="animate-pulse">✨ </span>{t('auth.benefits.premium')}
          </div>
        </div>
        
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-800 to-purple-500 bg-clip-text text-transparent mb-6 relative">
          {t('auth.benefits.title')}
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-purple-600 to-purple-300 rounded-full"></div>
        </h3>
        
        <div className="space-y-6 my-8">
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
        
        <div className="mt-10 bg-gradient-to-r from-purple-800 to-purple-600 text-white p-5 rounded-2xl transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-purple-400/30">
          <div className="flex items-center">
            <div className="bg-white/20 p-3 rounded-full shadow-inner">
              <FontAwesomeIcon icon={faCheckCircle} className={`text-2xl text-white ${isRTL ? 'ml-3' : 'mr-3'}`} />
            </div>
            <p className="font-medium text-lg px-4">{t('auth.benefits.trustMessage')}</p>
          </div>
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
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-purple-100">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-full p-3 flex items-center justify-center shadow-md group-hover:shadow-lg">
            <FontAwesomeIcon icon={faPaw} className="text-white text-lg" />
          </div>
        </div>
        <div className={`${isRTL ? 'mr-4' : 'ml-4'} flex-1`}>
          <h4 className="text-lg font-bold text-purple-800 mb-1">{title}</h4>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
