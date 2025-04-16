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
      <PageBanner 
        title={t('pageBanner.memberships.title')}
        backgroundImage="/images/banner/bnr1.webp"
      />
      {/* <MembershipIntro /> */}
      <Membership />
      <Divider />
      <PricingSection />
    </main>
  );
}
