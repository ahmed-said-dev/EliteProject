import { Section } from '@/components/ui/Section';
import PageBanner from '@/components/PageBanner/PageBanner';
import ProductsSection from '@/components/ProductsSection';
import { useLanguage } from '@/context/LanguageContext';

export default function Products() {
  const { t } = useLanguage();
  return (
    <main>
      <PageBanner 
        title={t('pageBanner.products.title')}
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