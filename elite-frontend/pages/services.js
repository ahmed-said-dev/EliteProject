import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import PageBanner from '@/components/PageBanner/PageBanner';
import ServiceJoinTeam from '@/components/ServiceJoinTeam';
import ServicesSection from '@/components/ServicesSection';

export default function Services() {
  return (
    <main>
      <PageBanner 
        title="Our Services"
        backgroundImage="/images/banner/bnr1.webp"
      />
      <ServicesSection />
      <ServiceJoinTeam />
    </main>
  );
}
