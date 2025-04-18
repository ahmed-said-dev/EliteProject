import React from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faCat, faDog, faFish, faOtter, faDove, faHorse, faSpider, faCrow } from "@fortawesome/free-solid-svg-icons";
import { Plus } from "lucide-react";
import { translate } from "../../i18n";
import { useLanguage } from "@/context/LanguageContext";

const Hero = () => {
  const { locale, isRTL } = useLanguage();
  const dir = 'rtl' ;

  return (
    <div className="relative w-full min-h-[600px] overflow-hidden" dir={dir}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Content section - Full width on mobile */}
        <div className="h-[600px] bg-[#6B4E98] relative overflow-hidden order-1 w-full">
          <div className="absolute inset-0">
            {/* Curved background shape */}
            <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-purple-500 rounded-tl-[80%] z-0">
              {/* Dog image */}
              <div className="absolute bottom-0 right-0">
                <img 
                  src="/Home/Asset 8-.png" 
                  alt="Dog" 
                  className="w-[400px] h-[400px] object-cover object-center bottom-0 right-0"
                />
              </div>
            </div>

            {/* Content wrapper with higher z-index */}
            <div className="absolute inset-0 z-10">
              <div className="max-w-lg absolute left-6 md:left-12 top-12" dir={dir === 'rtl' ? 'rtl' : 'ltr'}>
                <h1 className={`text-4xl font-bold text-yellow-300 mb-4 leading-tight ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  {translate('hero.title', locale)}
                </h1>
                
                <p className={`text-white text-lg mb-8 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  {translate('hero.subtitle', locale)}
                </p>
                
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-[#6B4E98] font-bold text-lg rounded-full w-fit px-8 py-2 flex items-center gap-2">
                  {translate('hero.bookButton', locale)}
                  <Plus className="h-5 w-5" />
                </Button>
              </div>

              {/* Paw Print Icons - Only 2 icons at bottom left */}
              <div className="absolute bottom-12 left-8 transform rotate-12">
                <FontAwesomeIcon icon={faPaw} style={{ height: '6em', width: '6em' }} className="text-yellow-300 opacity-80" />
              </div>
              
              <div className="absolute bottom-32 left-24 transform -rotate-12">
                <FontAwesomeIcon icon={faPaw} style={{ height: '6em', width: '6em' }} className="text-white opacity-80" />
              </div>
            </div>
          </div>
        </div>

        {/* Logo section - Hidden on mobile, visible on desktop */}
        <div className="hidden md:block h-[600px] bg-white relative order-2">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-[300px] h-[300px] relative">
              <img 
                src="/images/logo.png" 
                alt="Elite Vet Logo" 
                className="w-full h-full object-contain"
              />
              <div className="text-center mt-4">
                <div className="text-2xl text-purple-600 font-arabic">
                  {translate('hero.arabicName', locale)}
                </div>
                <div className="text-sm tracking-wider text-gray-500">
                  {translate('hero.englishName', locale)}
                </div>
              </div>
            </div>
          </div>
          {/* Interior image */}
          <img 
            src="/Home/Asset 1-.png"
            alt="Clinic Interior"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            <div className="w-2 h-2 rounded-full bg-purple-400/50"></div>
            <div className="w-2 h-2 rounded-full bg-purple-400/50"></div>
            <div className="w-2 h-2 rounded-full bg-purple-400/50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
