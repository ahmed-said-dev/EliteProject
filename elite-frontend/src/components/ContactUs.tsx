import React from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { MapPin, Mail, PhoneCall } from "lucide-react";
import Image from "next/image";
import { translate } from "../../i18n";
import { useLanguage } from "@/context/LanguageContext";

const ContactUs = () => {
  const { locale, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  
  return (
    <>
      <div className="w-full bg-[#9b87f5] relative overflow-hidden py-8 sm:py-10 md:py-16" dir={dir}>
        {/* White wavy line at the top */}
        <div className="absolute left-0 top-0 w-full" style={{ zIndex: 1 }}>
          <Image
            src="/ContactUs/Asset 33-.png"
            alt="Wavy line decoration"
            width={1440}
            height={10}
            className="w-full object-contain"
            priority
          />
        </div>
        
        {/* Wave-shaped white overlay */}
        <div className="absolute left-0 right-0 -bottom-1 h-32">
          <svg viewBox="0 0 1440 200" className="w-full h-full" preserveAspectRatio="none">
            <path
              fill="white"
              d="M0,100 C150,200 350,0 500,100 C650,200 800,50 1000,100 C1200,150 1350,50 1440,100 V200 H0 V100 Z"
            ></path>
          </svg>
        </div>

        {/* Decorative stars */}
        <div className="absolute top-1/4 right-1/3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-purple-300 opacity-60">
            <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" fill="#C8B6FA" />
          </svg>
        </div>
        <div className="absolute bottom-1/3 right-1/4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-purple-300 opacity-60">
            <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" fill="#C8B6FA" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative">
          {/* White curved line decoration */}
          <div className="absolute left-16 top-4">
            <svg width="120" height="40" viewBox="0 0 120 40" className="opacity-30">
              <path d="M10,20 C30,5 60,35 80,20 C100,5 110,20 120,15" stroke="white" strokeWidth="3" fill="none" />
            </svg>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-yellow-400 text-4xl font-bold mb-2 text-center md:text-left">{translate('contactUs.title', locale)}</h2>
            
            {/* Wavy line decoration below heading */}
            <div className="w-48 h-5 mb-4 relative mx-auto md:mx-0">
              <svg width="100%" height="100%" viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,10 C10,5 20,15 30,10 C40,5 50,15 60,10 C70,5 80,15 90,10 C100,5 110,15 120,10 C130,5 140,15 150,10 C160,5 170,15 180,10 C190,5 200,15 200,10" 
                  stroke="#FFD700" strokeWidth="3" fill="none" />
              </svg>
            </div>
            
            <div className="flex flex-col md:flex-row md:space-x-8 pt-2 px-0 w-full">
              {/* Small decorative stars in the cloud */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 z-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" fill="#C8B6FA" opacity="0.4" />
                </svg>
              </div>
              <div className="absolute top-2/3 right-1/3 z-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" fill="#C8B6FA" opacity="0.4" />
                </svg>
              </div>

              {/* Contact Info and Map - full width on mobile */}
              <div className="w-full md:w-1/3 relative z-10 mb-10 md:mb-0 md:mr-6">
                <div className="bg-white bg-opacity-80 rounded-lg p-6 shadow-lg mb-6 w-full" style={{ zIndex: 25 }}>
                  <h3 className="text-[#44396F] font-bold text-xl mb-4">{translate('contactUs.contactInfo.title', locale)}</h3>
                  
                  <div className="flex items-start mb-4">
                    <MapPin className={`h-5 w-5 ${dir === 'rtl' ? 'ml-3' : 'mr-3'} mt-1 text-[#9b87f5]`} />
                    <div>
                      <p className="text-[#44396F] font-medium">{translate('contactUs.contactInfo.address1', locale)}</p>
                      <p className="text-[#44396F] font-medium">{translate('contactUs.contactInfo.address2', locale)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <Mail className={`h-5 w-5 ${dir === 'rtl' ? 'ml-3' : 'mr-3'} text-[#9b87f5]`} />
                    <p className="text-[#44396F] font-medium">{translate('contactUs.contactInfo.email', locale)}</p>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <PhoneCall className={`h-5 w-5 ${dir === 'rtl' ? 'ml-3' : 'mr-3'} text-[#9b87f5]`} />
                    <p className="text-[#44396F] font-medium">{translate('contactUs.contactInfo.phone', locale)}</p>
                  </div>
                </div>
                
                {/* Map component - full width on mobile */}
                <div className="h-[250px] bg-white rounded-lg overflow-hidden shadow-lg w-full" style={{ zIndex: 25 }}>
                  <div className="relative w-full h-full">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.0958453215124!2d46.72261737605582!3d24.77267667809022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f0394856b43d3%3A0x7a3af779599a56c3!2sQurtubah%2C%20Riyadh%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1712870620175!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Contact Form section - full width on mobile */}
              <div className="w-full md:w-2/3 mx-auto mb-10 md:mb-0 relative" style={{ zIndex: 20 }}>
                <div className="text-xl mb-10 text-center md:text-left relative w-full" style={{ zIndex: 25 }}>
                  <p className="text-[#44396F] font-bold bg-white bg-opacity-80 inline-block px-4 py-2 rounded-lg shadow-sm">{translate('contactUs.intro', locale)}</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-lg relative w-full" style={{ position: 'relative', zIndex: 25 }}>
                  <div className="mb-4">
                    <p className="text-[#44396F] font-bold text-lg mb-2">{translate('contactUs.form.heading', locale)}</p>
                    <p className="text-[#44396F] text-sm mb-4">{translate('contactUs.form.subHeading', locale)}</p>
                  </div>
                  <form>
                    <div className="mb-3">
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full px-4 py-2 bg-[#EFF1F5] rounded-md border-none focus:outline-none focus:ring-1 focus:ring-purple-300"
                        placeholder={translate('contactUs.form.namePlaceholder', locale)}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-2 bg-[#EFF1F5] rounded-md border-none focus:outline-none focus:ring-1 focus:ring-purple-300"
                        placeholder={translate('contactUs.form.emailPlaceholder', locale)}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <textarea 
                        id="message" 
                        rows={4}
                        className="w-full px-4 py-2 bg-[#EFF1F5] rounded-md border-none focus:outline-none focus:ring-1 focus:ring-purple-300"
                        placeholder={translate('contactUs.form.messagePlaceholder', locale)}
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-center">
                      <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-[#44396F] font-medium py-2.5 px-6 rounded-md w-full transition-colors">
                        {translate('contactUs.form.sendButton', locale)}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Connected cloud system across the section - hidden on small screens */}
        <div className="absolute inset-0 overflow-visible hidden md:block" style={{ zIndex: 5 }}>
          {/* Left cloud - repositioned to bottom and extended upward */}
          <div className="absolute left-0 bottom-0 w-3/5 h-[700px]" style={{ zIndex: 15 }}>
            <svg 
              className="w-full h-full" 
              viewBox="0 0 400 300" 
              preserveAspectRatio="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{
                borderBottomRightRadius: '90px',
                borderTopRightRadius: '150px'
              }}
            >
              <path d="M400,80 C400,80 380,40 320,40 C300,0 250,0 200,20 
                C150,0 80,20 50,60 C30,50 0,80 0,120 C0,120 0,300 0,300 L400,300 L400,80 Z" 
                fill="white" />
            </svg>
          </div>
          
          {/* Right cloud behind Asset 22 */}
          <div className="absolute bottom-0 w-[600px] h-[400px]" style={{ right: '20px' }}>
            <svg 
              className="w-full h-full" 
              viewBox="0 0 600 400" 
              preserveAspectRatio="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{
                borderTopLeftRadius: '120px',
                borderTopRightRadius: '270px'
              }}
            >
              <path d="M0,120 C0,120 50,80 120,100 C150,40 250,20 300,60 
                C400,30 500,40 550,100 C600,80 600,120 600,150 
                C600,150 600,400 600,400 L0,400 L0,120 Z" 
                fill="white" />
            </svg>
          </div>
          
          {/* Connecting cloud element */}
          <div className="absolute left-1/3 bottom-0 w-2/5 h-24" style={{ left: '35%' }}>
            <svg
              className="w-full h-full"
              viewBox="0 0 400 100"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0,0 C100,30 300,20 400,0 L400,100 L0,100 Z"
                fill="white" />
            </svg>
          </div>
        </div>
        
        {/* Asset 22 image at bottom-right - very large and prominent, hidden on small screens */}
        <div className="absolute right-0 -bottom-10 hidden md:block" style={{ zIndex: 50, width: 'min(500px, 40vw)', height: 'min(500px, 40vw)' }}>
          <Image 
            src="/ContactUs/Asset 35-.png"
            alt="Bottom right decoration"
            width={600}
            height={600}
            className="w-full h-full object-contain"
            priority
          />
        </div>
      </div>
    </>
  );
};

export default ContactUs;
