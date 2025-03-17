import { Section } from '@/components/ui/Section';
import { ContactForm } from '@/features/contact/ContactForm';
import { SITE_CONFIG } from '@/utils/constants';
import PageBanner from '@/components/PageBanner/PageBanner';

export default function Contact() {


  return (
    <main>
      <PageBanner 
        title="Contact Us"
        backgroundImage="/images/banner/bnr1.webp"
      />

    </main>
  );
}
