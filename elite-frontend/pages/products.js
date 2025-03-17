import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { ProductCard } from '@/features/products/ProductCard';
import PageBanner from '@/components/PageBanner/PageBanner';

export default function Products() {


  return (
    <main>
      <PageBanner 
        title="Our Products"
        backgroundImage="/images/banner/bnr1.webp"
      />

    </main>
  );
}
