import { Section } from '@/components/ui/Section';
import { PricingCard } from '@/features/memberships/PricingCard';
import PageBanner from '@/components/PageBanner/PageBanner';
import Membership from '../src/components/Membership';
import MembershipIntro from '../src/components/MembershipIntro';
import Divider from '../src/components/Divider';
import PricingSection from '../src/components/PricingSection';
import { useLanguage } from '@/context/LanguageContext';

export default function Memberships() {
  const { t } = useLanguage();
  
  return (
    <main>
      {/* <PageBanner 
        title={t('pageBanner.memberships.title')}
        backgroundImage="https://images.unsplash.com/photo-1601758124277-f0086d5ab050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      /> */}
      {/* <MembershipIntro /> */}
      <Membership />
      <Divider />
      <PricingSection />
    </main>
  );
}
