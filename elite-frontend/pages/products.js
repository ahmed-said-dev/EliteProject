import { Section } from '@/components/ui/Section';
import PageBanner from '@/components/PageBanner/PageBanner';
import ProductsSection from '@/components/ProductsSection';

export default function Products() {
  return (
    <main>
      <PageBanner 
        title="Pet Care Products"
        backgroundImage="https://images.pexels.com/photos/4587971/pexels-photo-4587971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <Section className="py-16">
        <div className="container mx-auto">
          <ProductsSection />
        </div>
      </Section>
    </main>
  );
}