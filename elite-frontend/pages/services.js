import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import PageBanner from '@/components/PageBanner/PageBanner';
import ServiceJoinTeam from '@/components/ServiceJoinTeam';
import ServicesSection from '@/components/ServicesSection';
import { useLanguage } from '@/context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();
  return (
    <main>
      <PageBanner 
        title={t('pageBanner.services.title')}
        backgroundImage="/images/banner/bnr1.webp"
      />
      <ServiceJoinTeam />
      <ServicesSection />
    </main>
  );
}
