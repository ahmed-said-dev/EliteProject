import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import PageBanner from '@/components/PageBanner/PageBanner';
import AboutUsIntro from '@/components/AboutUsIntro/AboutUsIntro';
import ImageGallerySlider from '@/components/ImageGallerySlider';
import EliteVetAboutSection from '@/components/EliteVetAboutSection/EliteVetAboutSection';
import EliteVetBenefits from '@/components/EliteVetBenefits/EliteVetBenefits';
import CorporateSocialResponsibility from '@/components/CorporateSocialResponsibility/CorporateSocialResponsibility';
import OurPartners from '@/components/OurPartners';
import TeamSection from '@/components/TeamSection';
import JoinTeam from '@/components/JoinTeam';

export default function About() {
  return (
    <main>
      <PageBanner 
        title="About Us"
        backgroundImage="img1.webp"
      />
      <AboutUsIntro/>
      <Section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Portfolio</h2>
          <p className="text-gray-600">Explore our state-of-the-art facilities and professional veterinary services</p>
        </div>
        <ImageGallerySlider />
      </Section>
      <EliteVetAboutSection/>
      <EliteVetBenefits/>
      <CorporateSocialResponsibility/>
      <OurPartners/>
      <TeamSection/>
      <JoinTeam/>
    </main>
  );
}
