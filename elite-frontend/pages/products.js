import { Section } from '@/components/ui/Section';
import PageBanner from '@/components/PageBanner/PageBanner';
import StoreProductsSection from '@/components/ProductsSection/StoreProductsSection';
import { useLanguage } from '@/context/LanguageContext';

export default function Products() {
  const { t } = useLanguage();
  return (
    <main>
      <PageBanner 
        title={t('pageBanner.products.title') || 'منتجاتنا'}
        backgroundImage="https://images.pexels.com/photos/4587971/pexels-photo-4587971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <Section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">{t('productsSection.title') || 'تسوق منتجاتنا'}</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              {t('productsSection.pageDescription') || 'اكتشف مجموعتنا المميزة من المنتجات عالية الجودة بأسعار تنافسية'}
            </p>
          </div>
          <StoreProductsSection />
        </div>
      </Section>
    </main>
  );
}