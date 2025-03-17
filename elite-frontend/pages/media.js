import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Gallery } from '@/features/media/Gallery';
import PageBanner from '@/components/PageBanner/PageBanner';

export default function Media() {


  return (
    <main>
      <PageBanner 
        title="Media Gallery"
        backgroundImage="/images/banner/bnr1.webp"
      />

    </main>
  );
}
