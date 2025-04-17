import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PageBanner from '../../src/components/PageBanner/PageBanner';
import Footer from '../../src/components/Footer/Footer';

// Import services data directly from ServicesSection
const getServices = async () => {
  // Dynamic import to avoid problems in SSR
  const module = await import('../../src/components/ServicesSection/ServicesSection');
  return module.services;
};

export default function ServiceDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServiceData() {
      if (id) {
        try {
          const allServices = await getServices();
          const currentService = allServices.find(s => s.id === Number(id));
          
          if (currentService) {
            setService(currentService);
            
            // Get 3 related services
            const related = allServices
              .filter(s => s.id !== Number(id))
              .slice(0, 3);
            setRelatedServices(related);
          }
          
          setLoading(false);
        } catch (error) {
          console.error('Error loading service data:', error);
          setLoading(false);
        }
      }
    }
    
    loadServiceData();
  }, [id]);

  const toggleFAQ = (index) => {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems[index].classList.toggle('active');
  };

  if (loading) {
    return <div className="loading-screen">جاري التحميل...</div>;
  }

  if (!service) {
    return (
      <div className="error-screen">
        <h2>الخدمة غير موجودة</h2>
        <Link href="/services">
          <a className="btn-primary">العودة للخدمات</a>
        </Link>
      </div>
    );
  }

  // Create FAQs based on the service type
  const faqs = [
    {
      question: `What does the ${service.title.toLowerCase()} service include?`,
      answer: `Our ${service.title.toLowerCase()} service includes comprehensive care tailored to your pet's specific needs. We use state-of-the-art equipment and techniques to ensure the highest quality of veterinary care.`
    },
    {
      question: 'How long does a typical appointment take?',
      answer: 'The duration of appointments varies depending on the specific service and your pet\'s individual needs. Basic consultations typically take 30-45 minutes, while more complex procedures may require additional time.'
    },
    {
      question: 'Do I need to prepare my pet before bringing them in?',
      answer: 'For most routine visits, no special preparation is required. However, for specific procedures, we may recommend fasting or other preparations. When you schedule your appointment, our staff will provide detailed instructions.'
    },
    {
      question: 'What if my pet needs additional treatment?',
      answer: 'If during the examination we identify that your pet requires additional treatment, we will discuss all options with you before proceeding. We provide detailed explanations of recommended procedures, associated costs, and expected outcomes.'
    }
  ];

  return (
    <>
      <Head>
        <title>{service.title} | Elite Veterinary Clinic</title>
        <meta name="description" content={`Detailed information about our ${service.title} service for your pets`} />
      </Head>
      
      <PageBanner
        title={service.title}
        backgroundImage="/images/banner/bnr1.webp"
      />
      
      <main>
        <div className="service-detail-page">
          {/* Hero Section */}
          <section className="service-hero">
            <div className="container">
              <div className="hero-content">
                <div className="hero-text-content">
                  <h1 className="hero-title">{service.title}</h1>
                  {service.badge && (
                    <div className="hero-badge">
                      <span><i className="fa fa-certificate"></i> {service.badge}</span>
                    </div>
                  )}
                </div>
                <div className="hero-image-wrapper">
                  <div className="hero-image-container">
                    <img src={service.image} alt={service.title} className="hero-image" />
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Service Description Section */}
          <section className="service-description">
            <div className="container">
              <h2 className="section-title">Service Overview</h2>
              
              <div className="description-content">
                <div className="desc-text">
                  <p>
                    {service.description || "Our comprehensive veterinary service delivers exceptional care tailored to your pet's specific needs. With state-of-the-art equipment and expert veterinarians, we ensure your beloved companion receives the highest standard of medical attention."}
                  </p>
                  <p>
                    Our veterinary professionals are committed to delivering personalized care with compassion and expertise. 
                    We combine modern techniques with a gentle approach to ensure your pet's comfort during every visit.
                  </p>
                </div>
                
                <div className="desc-icons-wrapper">
                  <h3>Key Highlights</h3>
                  <div className="desc-icons-container">
                    {service.icons.map((icon, index) => (
                      <div key={index} className="icon-item">
                        <i className={`fas ${icon.icon}`}></i>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Service Features Section */}
          <section className="service-features">
            <div className="container">
              <h2 className="section-title">What We Offer</h2>
              
              <div className="features-container">
                {service.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <div className="feature-content">
                      <div className="feature-icon">
                        <i className="fas fa-check-circle"></i>
                      </div>
                      <div className="feature-text">
                        {feature.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="service-faq">
            <div className="container">
              <h2 className="section-title">Frequently Asked Questions</h2>
              
              <div className="faq-container">
                {faqs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <div 
                      className="faq-question"
                      onClick={() => toggleFAQ(index)}
                    >
                      {faq.question}
                      <i className="fas fa-chevron-down"></i>
                    </div>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Related Services Section */}
          <section className="service-related">
            <div className="container">
              <h2 className="section-title">Related Services</h2>
              
              <div className="related-grid">
                {relatedServices.map((relatedService) => (
                  <div key={relatedService.id} className="related-card">
                    <div className="related-image">
                      <img src={relatedService.image} alt={relatedService.title} />
                    </div>
                    <div className="related-content">
                      <h3 className="related-title">{relatedService.title}</h3>
                      
                      {relatedService.badge && (
                        <span className="related-badge">
                          <i className="fa fa-circle"></i> {relatedService.badge}
                        </span>
                      )}
                      
                      <div className="related-features">
                        {relatedService.features.slice(0, 3).map((feature, index) => (
                          <div key={index} className="related-feature">
                            <i className="fas fa-check-circle"></i>
                            <span>{feature.text.split(':')[0]}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Link href={`/service/${relatedService.id}`}>
                        <a className="related-btn">
                          View Service
                        </a>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
