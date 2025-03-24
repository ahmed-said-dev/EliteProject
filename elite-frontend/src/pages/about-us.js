import PageBanner from '@/components/PageBanner/PageBanner';
import WhyChooseUs from '@/components/WhyChooseUs/WhyChooseUs';

export default function AboutUs() {
  return (
    <>
      <PageBanner 
        title="About Us" 
        backgroundImage="/images/banner/bnr1.webp" 
      />
      <WhyChooseUs />
      {/* باقي محتوى الصفحة */}
    </>
  );
}
