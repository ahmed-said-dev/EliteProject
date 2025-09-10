import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPaw, faSyringe, faTooth, faEye, faBone, faScissors, 
  faCheckCircle, faChevronDown, faArrowLeft, faArrowRight,
  faClock, faUserMd, faHeart, faStar, faPhone, faCalendarAlt,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Footer from '../../src/components/Footer/Footer';
import { useLanguage } from '../../src/context/LanguageContext';
import { translate } from '../../i18n';
import useHomeServices from '../../src/hooks/useHomeServices';

// قاموس الأيقونات
const iconMap = {
  faPaw: faPaw,
  faSyringe: faSyringe,
  faTooth: faTooth,
  faEye: faEye,
  faBone: faBone,
  faScissors: faScissors
};

export default function ServiceDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { locale, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  const [service, setService] = useState(null);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  // استخدام hook لجلب بيانات الخدمات من API
  const { services, pages, isLoading, error } = useHomeServices();

  useEffect(() => {
    if (id && services && services.length > 0 && pages && pages.length > 0) {
      // البحث عن الخدمة في home array
      const currentService = services.find(s => s.id === Number(id));
      // البحث عن تفاصيل الخدمة في pages array
      const currentServiceDetails = pages.find(p => p.id === Number(id));
      
      if (currentService) {
        setService(currentService);
        setServiceDetails(currentServiceDetails);
        
        // Get 3 related services from home array
        const related = services
          .filter(s => s.id !== Number(id))
          .slice(0, 3);
        setRelatedServices(related);
      }
    }
  }, [id, services, pages]);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const getIconByName = (iconName) => {
    return iconMap[iconName] || faPaw;
  };

  // Handle booking button click
  const handleBookNow = () => {
    setShowBookingModal(true);
  };

  // Handle call button click
  const handleCallUs = () => {
    const phoneNumber = '+966123456789'; // رقم العيادة
    window.open(`tel:${phoneNumber}`, '_self');
  };

  // Handle WhatsApp booking
  const handleWhatsAppBooking = () => {
    const phoneNumber = '+966123456789';
    const message = encodeURIComponent(
      `مرحباً، أريد حجز موعد لخدمة: ${service?.title || 'خدمة بيطرية'}`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]" dir={dir}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#44396F] mb-4"></div>
          <p className="text-[#44396F] font-semibold">{translate('common.loading', locale) || 'جاري التحميل...'}</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]" dir={dir}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#44396F] mb-4">
            {translate('serviceDetail.notFound', locale) || 'الخدمة غير موجودة'}
          </h2>
          <Link href="/" className="bg-[#44396F] text-white px-6 py-3 rounded-lg hover:bg-[#9b87f5] transition-colors">
            {translate('serviceDetail.backToHome', locale) || 'العودة للرئيسية'}
          </Link>
        </div>
      </div>
    );
  }

  // Create FAQs based on the service type
  const faqs = [
    {
      question: translate('serviceDetail.faqs.whatIncludes', locale) || 'ماذا تشمل هذه الخدمة؟',
      answer: translate('serviceDetail.faqs.whatIncludesAnswer', locale) || 'تشمل خدماتنا فحص شامل ومتابعة دقيقة لحالة حيوانك الأليف مع استخدام أحدث التقنيات الطبية.'
    },
    {
      question: translate('serviceDetail.faqs.duration', locale) || 'كم تستغرق الخدمة؟',
      answer: translate('serviceDetail.faqs.durationAnswer', locale) || 'تختلف مدة الخدمة حسب نوع الفحص، لكن معظم الخدمات تستغرق من 30 إلى 60 دقيقة.'
    },
    {
      question: translate('serviceDetail.faqs.preparation', locale) || 'كيف أحضر حيواني الأليف؟',
      answer: translate('serviceDetail.faqs.preparationAnswer', locale) || 'ننصح بإحضار حيوانك الأليف في حالة هدوء، ويفضل الصيام لمدة 8 ساعات قبل بعض الفحوصات.'
    },
    {
      question: translate('serviceDetail.faqs.additionalTreatment', locale) || 'هل قد أحتاج لعلاج إضافي؟',
      answer: translate('serviceDetail.faqs.additionalTreatmentAnswer', locale) || 'سيقوم الطبيب البيطري بتقييم حالة حيوانك وإعلامك بأي علاج إضافي قد يحتاجه.'
    }
  ];

  return (
    <>
      <Head>
        <title>{service.title} | Elite Veterinary Clinic</title>
        <meta name="description" content={`معلومات تفصيلية عن خدمة ${service.title} لحيواناتك الأليفة`} />
      </Head>
      
      <main dir={dir} className="min-h-screen bg-[#F5F5F7]">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#44396F] via-[#9b87f5] to-[#E5EDF8] py-20 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <FontAwesomeIcon icon={faPaw} className="absolute top-10 left-10 text-white text-6xl transform rotate-45" />
            <FontAwesomeIcon icon={faHeart} className="absolute top-20 right-20 text-white text-4xl transform -rotate-12" />
            <FontAwesomeIcon icon={faStar} className="absolute bottom-20 left-20 text-white text-5xl transform rotate-12" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Back button */}
              <div className="mb-6">
                <button 
                  onClick={() => router.back()}
                  className="inline-flex items-center text-white hover:text-yellow-300 transition-colors"
                >
                  <FontAwesomeIcon 
                    icon={isRTL ? faArrowRight : faArrowLeft} 
                    className={`${isRTL ? 'ml-2' : 'mr-2'}`} 
                  />
                  {translate('common.back', locale) || 'العودة'}
                </button>
              </div>
              
              {/* Service icon */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full">
                  <FontAwesomeIcon 
                    icon={getIconByName(service.iconName)} 
                    className="text-white text-4xl"
                  />
                </div>
              </div>
              
              {/* Service title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {serviceDetails?.title || service.title}
              </h1>
              
              {/* Service badge */}
              {serviceDetails?.badge && (
                <div className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  {serviceDetails.badge}
                </div>
              )}
              
              {/* Service description */}
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {serviceDetails?.description || translate('serviceDetail.heroDescription', locale) || 'نقدم أفضل الخدمات البيطرية لحيوانك الأليف بأحدث التقنيات والمعدات الطبية'}
              </p>
              
              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleBookNow}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faCalendarAlt} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {translate('serviceDetail.bookNow', locale) || 'احجز الآن'}
                </button>
                <button 
                  onClick={handleCallUs}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faPhone} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {translate('serviceDetail.callUs', locale) || 'اتصل بنا'}
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Service Description Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-[#44396F] text-center mb-12">
                {translate('serviceDetail.aboutService', locale) || 'عن هذه الخدمة'}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {serviceDetails?.description || translate('serviceDetail.description', locale) || 'نقدم خدمات بيطرية شاملة ومتخصصة لحيوانك الأليف باستخدام أحدث التقنيات والمعدات الطبية. فريقنا من الأطباء البيطريين المتخصصين يضمن حصول حيوانك على أفضل رعاية ممكنة.'}
                  </p>
                  
                  {/* عرض المميزات من API */}
                  <div className="space-y-4">
                    {serviceDetails?.features && serviceDetails.features.length > 0 ? (
                      serviceDetails.features.map((feature, index) => (
                        <div key={feature.id} className="flex items-center">
                          <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-3" />
                          <span className="text-gray-700">{feature.text}</span>
                        </div>
                      ))
                    ) : (
                      // مميزات افتراضية
                      <>
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-3" />
                          <span className="text-gray-700">{translate('serviceDetail.feature1', locale) || 'فحص شامل ودقيق'}</span>
                        </div>
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-3" />
                          <span className="text-gray-700">{translate('serviceDetail.feature2', locale) || 'أطباء متخصصون وذوو خبرة'}</span>
                        </div>
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-3" />
                          <span className="text-gray-700">{translate('serviceDetail.feature3', locale) || 'معدات طبية حديثة'}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#E5EDF8] to-[#F5F5F7] p-8 rounded-2xl">
                  {/* عرض صورة الخدمة من API */}
                  {serviceDetails?.image?.url ? (
                    <div className="mb-6">
                      <img 
                        src={`${process.env.NEXT_PUBLIC_API_URL}${serviceDetails.image.url}`}
                        alt={serviceDetails.image.alternativeText || service.title}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                    </div>
                  ) : (
                    <div className="text-center mb-6">
                      <FontAwesomeIcon 
                        icon={getIconByName(service.iconName)} 
                        className="text-6xl text-[#44396F] mb-4"
                      />
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-[#44396F] mb-2">{serviceDetails?.title || service.title}</h3>
                    
                    {/* عرض الأيقونات من API */}
                    {serviceDetails?.icons && serviceDetails.icons.length > 0 && (
                      <div className="flex justify-center space-x-3 mb-4">
                        {serviceDetails.icons.slice(0, 4).map((iconItem) => (
                          <div key={iconItem.id} className="w-8 h-8 bg-[#44396F]/10 rounded-full flex items-center justify-center">
                            <i className={`${iconItem.icon} text-[#44396F]`}></i>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faClock} className="mr-1" />
                        <span>30-60 {translate('common.minutes', locale) || 'دقيقة'}</span>
                      </div>
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faUserMd} className="mr-1" />
                        <span>{translate('serviceDetail.expert', locale) || 'طبيب متخصص'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-[#44396F] text-center mb-12">
                {translate('serviceDetail.faq', locale) || 'الأسئلة الشائعة'}
              </h2>
              
              <div className="space-y-4">
                {/* عرض FAQ من البيانات الحقيقية */}
                {serviceDetails?.faq && serviceDetails.faq.length > 0 ? (
                  serviceDetails.faq.map((faq, index) => (
                    <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                      <button
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                        onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                      >
                        <span className="font-semibold text-gray-800">{faq.question}</span>
                        <FontAwesomeIcon 
                          icon={faChevronDown} 
                          className={`text-[#44396F] transition-transform ${activeFAQ === index ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {activeFAQ === index && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  // FAQ افتراضية في حالة عدم وجود بيانات
                  [
                    {
                      question: translate('serviceDetail.faq1Question', locale) || 'كم يستغرق الفحص؟',
                      answer: translate('serviceDetail.faq1Answer', locale) || 'يستغرق الفحص عادة من 30 إلى 60 دقيقة حسب نوع الخدمة.'
                    },
                    {
                      question: translate('serviceDetail.faq2Question', locale) || 'هل أحتاج لحجز موعد مسبق؟',
                      answer: translate('serviceDetail.faq2Answer', locale) || 'نعم، ننصح بحجز موعد مسبق لضمان توفر الوقت المناسب.'
                    },
                    {
                      question: translate('serviceDetail.faq3Question', locale) || 'ما هي تكلفة الخدمة؟',
                      answer: translate('serviceDetail.faq3Answer', locale) || 'تختلف التكلفة حسب نوع الخدمة، يرجى الاتصال للاستفسار عن الأسعار.'
                    }
                  ].map((faq, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                      <button
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                        onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                      >
                        <span className="font-semibold text-gray-800">{faq.question}</span>
                        <FontAwesomeIcon 
                          icon={faChevronDown} 
                          className={`text-[#44396F] transition-transform ${activeFAQ === index ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {activeFAQ === index && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Services Section */}
        {relatedServices.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-[#44396F] text-center mb-12">
                {translate('serviceDetail.relatedServices', locale) || 'خدمات ذات صلة'}
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {relatedServices.map((relatedService) => (
                  <div key={relatedService.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer group"
                       onClick={() => router.push(`/service/${relatedService.id}`)}>
                    <div className="text-center mb-4">
                      <FontAwesomeIcon 
                        icon={getIconByName(relatedService.iconName)} 
                        className="text-4xl text-[#44396F] group-hover:text-[#9b87f5] transition-colors"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-[#44396F] text-center mb-3 group-hover:text-[#9b87f5] transition-colors">
                      {relatedService.title}
                    </h3>
                    <div className="text-center">
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {translate('serviceDetail.learnMore', locale) || 'اعرف المزيد'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
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
                    icon={getIconByName(service?.iconName)} 
                    className="text-4xl text-[#44396F] mb-4"
                  />
                  <h3 className="text-2xl font-bold text-[#44396F] mb-2">
                    {translate('serviceDetail.bookNow', locale) || 'احجز الآن'}
                  </h3>
                  <p className="text-gray-600">
                    {service?.title}
                  </p>
                </div>
                
                <div className="space-y-4">
                  {/* WhatsApp booking */}
                  <button
                    onClick={handleWhatsAppBooking}
                    className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {translate('serviceDetail.bookViaWhatsApp', locale) || 'احجز عبر واتساب'}
                  </button>
                  
                  {/* Phone booking */}
                  <button
                    onClick={handleCallUs}
                    className="w-full bg-[#44396F] hover:bg-[#9b87f5] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faPhone} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {translate('serviceDetail.callToBook', locale) || 'اتصل للحجز'}
                  </button>
                  
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
      </main>
      
    </>
  );
}
