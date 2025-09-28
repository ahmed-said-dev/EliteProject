import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faCat, faDog, faFish, faOtter, faDove, faHorse, faSpider, faCrow, faPhone, faCalendarAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Plus } from "lucide-react";
import { translate } from "../../i18n";
import { useLanguage } from "@/context/LanguageContext";

const Hero = () => {
  const { locale, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Handle booking button click
  const handleBookAppointment = () => {
    setShowBookingModal(true);
  };

  // Handle call button click
  const handleCallUs = () => {
    const phoneNumber = '+966920011626'; // رقم العيادة الرسمي
    window.open(`tel:${phoneNumber}`, '_self');
  };

  // Handle WhatsApp booking
  const handleWhatsAppBooking = () => {
    const phoneNumber = '+966920011626';
    const message = encodeURIComponent(
      `مرحباً، أريد حجز موعد في عيادة النخبة البيطرية`
    );
    // إزالة أي مسافات قبل إنشاء رابط wa.me
    const cleaned = phoneNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleaned}?text=${message}`, '_blank');
  };

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
                
                <Button 
                  onClick={handleBookAppointment}
                  className="bg-yellow-400 hover:bg-yellow-500 text-[#6B4E98] font-bold text-lg rounded-full w-fit px-8 py-2 flex items-center gap-2"
                >
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
            src="/Home/Hero.png"
            alt="Clinic Interior"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
            style={{ transform: isRTL ?  'none' : 'scaleX(-1)' }}
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
      
      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative" dir={dir}>
            {/* Close button */}
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>
            
            {/* Modal content */}
            <div className="text-center">
              <div className="mb-6">
                <FontAwesomeIcon 
                  icon={faPaw} 
                  className="text-4xl text-[#44396F] mb-4"
                />
                <h3 className="text-2xl font-bold text-[#44396F] mb-2">
                  {translate('hero.bookButton', locale)}
                </h3>
                <p className="text-gray-600">
                  {translate('hero.subtitle', locale)}
                </p>
              </div>
              
              <div className="space-y-4">
                {/* WhatsApp booking */}
                <button
                  onClick={handleWhatsAppBooking}
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className={`${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                  {translate('serviceDetail.bookViaWhatsApp', locale) || 'احجز عبر واتساب'}
                </button>
                
                {/* Phone booking */}
                <a
                  href="tel:+966920011626"
                  className="w-full bg-[#44396F] hover:bg-[#9b87f5] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faPhone} className={`${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                  {translate('serviceDetail.callToBook', locale) || 'اتصل للحجز'}
                </a>
                
                {/* Cancel button */}
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {translate('common.cancel', locale) || 'إلغاء'}
                </button>
              </div>
              
              <div className="mt-6 text-sm text-gray-500 text-center">
                <p>{translate('serviceDetail.bookingNote', locale) || 'سيتم تأكيد موعدك خلال 24 ساعة'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
