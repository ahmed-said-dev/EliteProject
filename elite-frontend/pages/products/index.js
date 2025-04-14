import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import PageBanner from '@/components/PageBanner/PageBanner';
import ProductsSection from '@/components/ProductsSection';

export default function Products() {
  return (
    <main>
      <PageBanner 
        title="Pet Care Products"
        backgroundImage="/images/banner/bnr1.webp"
      />
      <Section className="py-16">
        <div className="container mx-auto">
          <ProductsSection />
        </div>
      </Section>
    </main>
  );
}
