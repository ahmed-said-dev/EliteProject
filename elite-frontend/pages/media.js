import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import PageBanner from '@/components/PageBanner/PageBanner';
import MediaHero from '@/components/MediaHero';
import BlogSection from '@/components/BlogSection';

export default function Media() {
  return (
    <main>
      <PageBanner 
        title="Elite Veterinary Blog"
        backgroundImage="/images/banner/bnr1.webp"
      />
      <MediaHero />
      <BlogSection />
    </main>
  );
}
