import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import PageBanner from '@/components/PageBanner/PageBanner';
import AboutUsIntro from '@/components/AboutUsIntro/AboutUsIntro';
import ImageGallerySlider from '@/components/ImageGallerySlider';

export default function About() {
  return (
    <main>
      <PageBanner 
        title="About Us"
        backgroundImage="img1.webp"
      />
      <AboutUsIntro/>
      <Section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">معرض أعمالنا</h2>
          <p className="text-gray-600">نقدم لكم مجموعة من الصور التي تعكس جودة خدماتنا وتجهيزات عيادتنا</p>
        </div>
        <ImageGallerySlider />
      </Section>
    </main>
  );
}
