import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faCat, faDog, faFish, faOtter, faDove, faHorse, faSpider, faCrow, faKiwiBird, faSyringe, faTooth, faEye, faBone, faScissors, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { translate } from "../../i18n";
import { useLanguage } from "@/context/LanguageContext";
import useHomeServices from "@/hooks/useHomeServices";

// قاموس لتحويل اسم الأيقونة إلى الأيقونة الفعلية
const iconMap = {
  faPaw: faPaw,
  faSyringe: faSyringe,
  faTooth: faTooth,
  faEye: faEye,
  faBone: faBone,
  faScissors: faScissors,
  faCat: faCat,
  faDog: faDog,
  faFish: faFish,
  faPlus: faPlus,
  faStar: faStar
};

const ServiceCard = ({ title, icon }: { 
  title: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 text-center relative flex flex-col items-center justify-center h-full min-h-[250px] hover:bg-[#E5EDF8] transition-colors duration-300">
      {icon}
      <h3 className="text-xl font-bold text-[#44396F] mb-4">{title}</h3>
      <FontAwesomeIcon icon={faStar} className="text-purple-300 absolute top-3 left-8" />
      <FontAwesomeIcon icon={faStar} className="text-purple-400 absolute top-10 right-10" />
      <FontAwesomeIcon icon={faStar} className="text-purple-500 absolute bottom-4 left-4" />
      <FontAwesomeIcon icon={faStar} className="text-purple-600 absolute bottom-8 right-6" />
    </div>
  );
};

const Services = () => {
  const { locale, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  
  // استخدام hook لجلب بيانات الخدمات من API
  const { formattedServices, isLoading, error } = useHomeServices();
  
  // الحصول على الأيقونة المناسبة بناءً على الاسم
  const getIconByName = (iconName: string) => {
    // إذا كان الاسم موجودًا في القاموس، استخدمه
    if (iconMap[iconName]) {
      return iconMap[iconName];
    }
    // وإلا، استخدم أيقونة faPaw كافتراضية
    return faPaw;
  };
  
  return (
    <div className="w-full py-16 bg-[#F5F5F7] relative overflow-hidden" dir={dir}>
      {/* Background animal icons */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-10 left-10">
          <FontAwesomeIcon icon={faPaw} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform rotate-45 opacity-90" />
        </div>
        <div className="absolute top-40 right-20">
          <FontAwesomeIcon icon={faCat} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform -rotate-30 opacity-80" />
        </div>
        <div className="absolute bottom-20 left-40">
          <FontAwesomeIcon icon={faDog} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform -rotate-45 opacity-85" />
        </div>
        <div className="absolute top-60 right-40">
          <FontAwesomeIcon icon={faFish} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform rotate-90 opacity-70" />
        </div>
        <div className="absolute bottom-40 left-20">
          <FontAwesomeIcon icon={faOtter} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform rotate-180 opacity-75" />
        </div>
        <div className="absolute top-20 right-60">
          <FontAwesomeIcon icon={faDove} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform -rotate-45 opacity-85" />
        </div>
        <div className="absolute bottom-60 right-20">
          <FontAwesomeIcon icon={faHorse} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform -rotate-12 opacity-90" />
        </div>
        <div className="absolute top-80 left-60">
          <FontAwesomeIcon icon={faSpider} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform rotate-12 opacity-70" />
        </div>
        <div className="absolute bottom-80 right-80">
          <FontAwesomeIcon icon={faCrow} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform -rotate-90 opacity-85" />
        </div>
        <div className="absolute top-40 left-80">
          <FontAwesomeIcon icon={faKiwiBird} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform rotate-180 opacity-80" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#44396F] mb-4">{translate('services.title', locale)}</h2>
          {/* Wavy divider */}
          <div className="w-32 h-6 mx-auto relative mb-6">
            <svg viewBox="0 0 200 30" className="w-full">
              <path d="M0,15 Q40,0 80,15 Q120,30 160,15 Q200,0 240,15" stroke="#8B5CF6" fill="none" strokeWidth="4"/>
            </svg>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {translate('services.description', locale)}
          </p>
        </div>
        
        {/* عرض رسالة تحميل أثناء جلب البيانات */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#44396F] mb-4"></div>
            <p>{translate('common.loading', locale) || 'جاري التحميل...'}</p>
          </div>
        )}
        
        {/* عرض رسالة خطأ في حالة فشل جلب البيانات */}
        {error && (
          <div className="text-center py-8 text-red-600">
            <p>{translate('common.error', locale) || 'حدث خطأ أثناء جلب البيانات'}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-[#44396F] text-white rounded-md hover:bg-[#9b87f5] transition-colors"
            >
              {translate('common.retry', locale) || 'إعادة المحاولة'}
            </button>
          </div>
        )}

        {/* عرض بيانات الخدمات من API */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {formattedServices.length > 0 ? (
              // عرض الخدمات الديناميكية من API
              formattedServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  icon={<FontAwesomeIcon 
                    icon={getIconByName(service.iconName)} 
                    style={{ height: '2em', width: '2em' }} 
                    className="text-purple-600 opacity-20 transform rotate-45" 
                  />}
                />
              ))
            ) : (
              // عرض بيانات افتراضية إذا لم يكن هناك بيانات من API
              <>
                <ServiceCard
                  title={translate('services.service1', locale)}
                  icon={<FontAwesomeIcon icon={faPaw} style={{ height: '2em', width: '2em' }} className="text-purple-600 opacity-20 transform rotate-45" />}
                />
                <ServiceCard
                  title={translate('services.service2', locale)}
                  icon={<FontAwesomeIcon icon={faSyringe} style={{ height: '2em', width: '2em' }} className="text-purple-600 opacity-20 transform rotate-45" />}
                />
                <ServiceCard
                  title={translate('services.service3', locale)}
                  icon={<FontAwesomeIcon icon={faTooth} style={{ height: '2em', width: '2em' }} className="text-purple-600 opacity-20 transform rotate-45" />}
                />
                <ServiceCard
                  title={translate('services.service4', locale)}
                  icon={<FontAwesomeIcon icon={faEye} style={{ height: '2em', width: '2em' }} className="text-purple-600 opacity-20 transform rotate-45" />}
                />
                <ServiceCard
                  title={translate('services.service5', locale)}
                  icon={<FontAwesomeIcon icon={faBone} style={{ height: '2em', width: '2em' }} className="text-purple-600 opacity-20 transform rotate-45" />}
                />
                <ServiceCard
                  title={translate('services.service6', locale)}
                  icon={<FontAwesomeIcon icon={faScissors} style={{ height: '2em', width: '2em' }} className="text-purple-600 opacity-20 transform rotate-45" />}
                />
              </>
            )}
          </div>
        )}
        
        <div className="text-center mt-8">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
            {translate('services.viewAllButton', locale)}
            <FontAwesomeIcon icon={faPlus} className={`${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Services;
