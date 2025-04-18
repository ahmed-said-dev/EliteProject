import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPaw, faCat, faDog, faFish, faOtter, faDove, 
  faHorse, faSpider, faCrow, faKiwiBird, faBone, faSyringe 
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { translate } from "../../i18n";
import { useLanguage } from "@/context/LanguageContext";

interface DoctorCardProps {
  image: string;
  name: string;
  specialty?: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ image, name, specialty }) => {
  return (
    <div className="flex flex-col items-center group relative hover:transform hover:scale-105 transition-all duration-300">
      {/* Animal icon that appears on hover */}
      <div className="absolute -top-5 -right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <FontAwesomeIcon icon={faPaw} className="text-[#9b87f5] animate-bounce" size="lg" />
      </div>
      
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-4 relative">
        <Image 
          src={image} 
          alt={name} 
          className="object-cover" 
          fill 
          sizes="(max-width: 768px) 100vw, 128px"
        />
      </div>
      <h3 className="text-[#44396F] font-medium text-xl mb-1">{name}</h3>
      {specialty && <p className="text-gray-600 text-sm">{specialty}</p>}
    </div>
  );
};

const Doctors = () => {
  const { locale, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  
  return (
    <div className="w-full py-16 pb-48 bg-gray-100 relative" dir={dir}>
      {/* Background paw prints and animal icons */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {/* Multiple paw prints scattered throughout the background */}
        <div className="absolute top-10 left-10">
          <FontAwesomeIcon icon={faPaw} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform rotate-45" />
        </div>
        <div className="absolute top-20 right-20">
          <FontAwesomeIcon icon={faPaw} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform -rotate-12" />
        </div>
        <div className="absolute bottom-10 right-10">
          <FontAwesomeIcon icon={faPaw} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform rotate-90" />
        </div>
        <div className="absolute bottom-20 left-20">
          <FontAwesomeIcon icon={faPaw} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform rotate-180" />
        </div>
        <div className="absolute top-1/3 left-1/4">
          <FontAwesomeIcon icon={faPaw} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform -rotate-45" />
        </div>
        <div className="absolute top-1/4 right-1/3">
          <FontAwesomeIcon icon={faPaw} style={{ height: '3.5em', width: '3.5em' }} className="text-purple-600 transform rotate-12" />
        </div>
        <div className="absolute bottom-1/3 left-1/2">
          <FontAwesomeIcon icon={faPaw} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform -rotate-30" />
        </div>
        
        {/* Various animal icons */}
        <div className="absolute top-1/4 left-1/3">
          <FontAwesomeIcon icon={faCat} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform rotate-12" />
        </div>
        <div className="absolute bottom-1/4 right-1/4">
          <FontAwesomeIcon icon={faDog} style={{ height: '4.5em', width: '4.5em' }} className="text-purple-600 transform -rotate-12" />
        </div>
        <div className="absolute top-2/3 right-1/2">
          <FontAwesomeIcon icon={faBone} style={{ height: '3.5em', width: '3.5em' }} className="text-purple-600 transform rotate-45" />
        </div>
        <div className="absolute bottom-1/2 left-1/4">
          <FontAwesomeIcon icon={faFish} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform rotate-90" />
        </div>
      </div>
      
      {/* Pet image at the extreme left bottom */}
      <div className="absolute -bottom-4 left-0 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 z-10">
        <div className="relative w-full h-full">
          <Image 
            src="/DoctorsSections/Asset 31-.png" 
            alt="Pet image" 
            fill
            className="object-contain"
            sizes="(max-width: 640px) 160px, (max-width: 768px) 240px, 320px"
          />
        </div>
      </div>
      
      {/* Pet image at the extreme right bottom */}
      <div className="absolute -bottom-4 -right-2 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 z-10">
        <div className="relative w-full h-full">
          <Image 
            src="/DoctorsSections/Asset 32-.png" 
            alt="Pet image" 
            fill
            className="object-contain object-center"
            sizes="(max-width: 640px) 160px, (max-width: 768px) 240px, 320px"
          />
        </div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl font-bold text-[#44396F] mb-2">{translate('doctors.title', locale)}</h2>
        
        {/* Wavy line */}
        <div className="w-40 h-6 mx-auto relative my-4">
          <svg viewBox="0 0 200 30" className="w-full">
            <path d="M0,15 Q40,0 80,15 Q120,30 160,15 Q200,0 240,15" stroke="#9b87f5" fill="none" strokeWidth="4"/>
          </svg>
        </div>
        
        <p className="text-gray-700 mb-12 max-w-3xl mx-auto">
          {translate('doctors.description', locale)}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-12 relative">
          {/* Floating animal icons near the doctor cards */}
          

          
          <DoctorCard 
            image="/DoctorsSections/Asset 28-.png" 
            name={translate('doctors.doctor1.name', locale)}
            specialty={translate('doctors.doctor1.specialty', locale)}
          />
          <DoctorCard 
            image="/DoctorsSections/Asset 29-.png" 
            name={translate('doctors.doctor2.name', locale)}
            specialty={translate('doctors.doctor2.specialty', locale)}
          />
          <DoctorCard 
            image="/DoctorsSections/Asset 30-.png" 
            name={translate('doctors.doctor3.name', locale)}
            specialty={translate('doctors.doctor3.specialty', locale)}
          />
        </div>
      </div>
    </div>
  );
};

export default Doctors;
