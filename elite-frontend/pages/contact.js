import { Section } from '@/components/ui/Section';
import { SITE_CONFIG } from '@/utils/constants';
import PageBanner from '@/components/PageBanner/PageBanner';
import ContactInfo from '@/components/ContactInfo';

export default function Contact() {
  return (
    <main>
      <PageBanner 
        title="Contact Us"
        backgroundImage="/images/banner/bnr1.webp"
      />
      <Section className="contact-section py-16">
        <div className="container mx-auto">
          <ContactInfo />
        </div>
      </Section>
    </main>
  );
}
