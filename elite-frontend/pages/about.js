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
import { useLanguage } from '@/context/LanguageContext';

export default function About() {
  const { locale, isRTL, t } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';

  return (
    <main dir={dir}>
      <PageBanner 
        title={t('about.pageBanner.title')}
        backgroundImage="img1.webp"
      />
      <AboutUsIntro/>
      <Section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">{t('about.portfolio.title')}</h2>
          <p className="text-gray-600">{t('about.portfolio.description')}</p>
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
