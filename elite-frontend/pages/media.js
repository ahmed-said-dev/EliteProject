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
        backgroundImage="https://images.unsplash.com/photo-1536500152107-01ab1422f932?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      />
      <MediaHero />
      <BlogSection />
    </main>
  );
}
