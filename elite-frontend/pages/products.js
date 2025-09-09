import { Section } from '@/components/ui/Section';
import PageBanner from '@/components/PageBanner/PageBanner';
import StoreProductsSection from '@/components/ProductsSection/StoreProductsSection';
import { useLanguage } from '@/context/LanguageContext';

export default function Products() {
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  
  return (
    <main dir={dir}>
      <PageBanner 
        title={t('pageBanner.products.title') || 'منتجاتنا'}
        backgroundImage="https://images.pexels.com/photos/4587971/pexels-photo-4587971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <Section className="py-16 bg-gradient-to-br from-purple-100 via-indigo-50 to-violet-100 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-transparent rounded-full blur-xl"></div>
          <div className="absolute top-1/4 right-20 w-24 h-24 bg-gradient-to-br from-indigo-200/40 to-transparent rounded-full blur-lg"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-violet-200/25 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 bg-gradient-to-br from-purple-300/35 to-transparent rounded-full blur-lg"></div>
          
          {/* Animated floating elements */}
          <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-purple-300 rounded-full animate-pulse"></div>
          <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-indigo-300 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/3 left-2/3 w-1 h-1 bg-violet-400 rounded-full animate-bounce"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-purple-700 via-indigo-600 to-violet-700 bg-clip-text text-transparent">
               Our Products
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
              {t('productsSection.pageDescription') || 'اكتشف مجموعتنا المميزة من المنتجات عالية الجودة بأسعار تنافسية'}
            </p>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full"></div>
          </div>
          <StoreProductsSection />
        </div>
      </Section>
    </main>
  );
}