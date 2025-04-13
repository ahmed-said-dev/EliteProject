import React, { useState } from 'react';
import styles from '../components/ServiceComponents.module.css';

interface ServiceFAQProps {
  serviceType: string;
}

const ServiceFAQ: React.FC<ServiceFAQProps> = ({ serviceType }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Generate FAQs based on the service type
  const faqs = [
    {
      question: `What does the ${serviceType.toLowerCase()} service include?`,
      answer: `Our ${serviceType.toLowerCase()} service includes comprehensive care tailored to your pet's specific needs. We use state-of-the-art equipment and techniques to ensure the highest quality of veterinary care. The service covers initial consultation, examination, necessary procedures, and follow-up care recommendations.`
    },
    {
      question: 'How long does a typical appointment take?',
      answer: 'The duration of appointments varies depending on the specific service and your pet\'s individual needs. Basic consultations typically take 30-45 minutes, while more complex procedures may require additional time. We always ensure we allocate sufficient time to thoroughly address your pet\'s health requirements and answer any questions you may have.'
    },
    {
      question: 'Do I need to prepare my pet before bringing them in?',
      answer: 'For most routine visits, no special preparation is required. However, for specific procedures, we may recommend fasting or other preparations. When you schedule your appointment, our staff will provide detailed instructions tailored to your pet\'s specific service needs. Always ensure your pet is in a secure carrier or on a leash when bringing them to our clinic.'
    },
    {
      question: 'What if my pet needs additional treatment?',
      answer: 'If during the examination we identify that your pet requires additional treatment, we will discuss all options with you before proceeding. We provide detailed explanations of recommended procedures, associated costs, and expected outcomes, allowing you to make informed decisions about your pet\'s care. Our priority is always your pet\'s health and well-being.'
    },
    {
      question: 'Is there aftercare support available?',
      answer: 'Yes, we provide comprehensive aftercare support for all our services. This includes detailed post-visit care instructions, follow-up appointments when necessary, and access to our veterinary team for any questions or concerns that arise after your visit. We\'re committed to supporting you and your pet throughout the entire care process.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.serviceFAQ}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        
        <div className={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
            >
              <div 
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className={styles.faqAnswer}>
                <div className={styles.faqAnswerContent}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceFAQ;
