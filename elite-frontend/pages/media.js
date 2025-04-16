import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import PageBanner from '@/components/PageBanner/PageBanner';
import MediaHero from '@/components/MediaHero';
import BlogSection from '@/components/BlogSection';
import { useLanguage } from '@/context/LanguageContext';

export default function Media() {
  const { t } = useLanguage();
  
  return (
    <main>
      <PageBanner 
        title={t('pageBanner.media.title')}
        backgroundImage="/images/banner/bnr1.webp"
      />
      <MediaHero />
      <BlogSection />
    </main>
  );
}
