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
        backgroundImage="https://images.unsplash.com/photo-1551730459-92db2a308d6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      />
      <ServiceJoinTeam />
      <ServicesSection />
    </main>
  );
}
