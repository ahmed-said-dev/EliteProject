import { Section } from '@/components/ui/Section';
import { SITE_CONFIG } from '@/utils/constants';
import PageBanner from '@/components/PageBanner/PageBanner';
import ContactInfo from '@/components/ContactInfo';
import MapSection from '@/components/MapSection';
import { useLanguage } from '@/context/LanguageContext';

export default function Contact() {
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  
  return (
    <main dir={dir}>
      <PageBanner 
        title={t('pageBanner.contact.title')}
        backgroundImage="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      />
      <Section className="contact-section py-16">
        <div className="container mx-auto">
          <ContactInfo />
        </div>
      </Section>
      
      {/* قسم الخريطة بعرض كامل */}
      <div className="w-full">
        <MapSection />
      </div>
    </main>
  );
}
