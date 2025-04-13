import { Section } from '@/components/ui/Section';
import { PricingCard } from '@/features/memberships/PricingCard';
import PageBanner from '@/components/PageBanner/PageBanner';
import Membership from '../src/components/Membership';
import Divider from '../src/components/Divider';

export default function Memberships() {
  return (
    <main>
      <PageBanner 
        title="Memberships"
        backgroundImage="/images/banner/bnr1.webp"
      />
      <Membership />
      <Divider />
    </main>
  );
}
