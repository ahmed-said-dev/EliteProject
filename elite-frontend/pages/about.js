import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import PageBanner from '@/components/PageBanner/PageBanner';
import AboutUsIntro from '@/components/AboutUsIntro/AboutUsIntro';

export default function About() {
  return (
    <main>
      <PageBanner 
        title="About Us"
        backgroundImage="img1.webp"
      />
      <AboutUsIntro/>
    </main>
  );
}
