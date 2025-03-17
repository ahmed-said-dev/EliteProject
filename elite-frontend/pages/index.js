import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import Header from '@/components/Header/Header';

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <main>
        {/* Hero Section */}
        <Section bgColor="bg-purple-600" className="text-white">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              رعاية بيطرية متميزة لحيواناتك الأليفة
            </h1>
            <p className="text-xl mb-8 max-w-2xl">
              نقدم أفضل خدمات الرعاية البيطرية على مدار الساعة مع فريق من الأطباء المتخصصين
            </p>
            <div className="flex gap-4">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                حجز موعد
              </Button>
              <Button variant="secondary" className="text-purple-600">
                خدماتنا
              </Button>
            </div>
          </div>
        </Section>

        {/* Features Section */}
        <Section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">خدماتنا المميزة</h2>
            <p className="text-gray-600">نقدم مجموعة متكاملة من الخدمات البيطرية لضمان صحة وسعادة حيواناتك الأليفة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Specialized Care */}
            <div className="text-center p-6 rounded-lg shadow-lg">
              <div className="text-4xl text-purple-600 mb-4">
                <i className="fas fa-stethoscope"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">رعاية متخصصة</h3>
              <p className="text-gray-600">
                فريق من الأطباء المتخصصين لتقديم أفضل رعاية لحيوانك الأليف
              </p>
            </div>

            {/* 24/7 Service */}
            <div className="text-center p-6 rounded-lg shadow-lg">
              <div className="text-4xl text-purple-600 mb-4">
                <i className="fas fa-clock"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">خدمة 24/7</h3>
              <p className="text-gray-600">
                متواجدون على مدار الساعة لتقديم الرعاية الطارئة عند الحاجة
              </p>
            </div>

            {/* Home Visits */}
            <div className="text-center p-6 rounded-lg shadow-lg">
              <div className="text-4xl text-purple-600 mb-4">
                <i className="fas fa-home"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">زيارات منزلية</h3>
              <p className="text-gray-600">
                نقدم خدمة الزيارات المنزلية لراحة حيوانك الأليف
              </p>
            </div>
          </div>
        </Section>

        {/* CTA Section */}
        <Section bgColor="bg-gray-100">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">هل تحتاج إلى مساعدة؟</h2>
            <p className="text-gray-600 mb-8">
              فريقنا جاهز للإجابة على استفساراتك وتقديم المساعدة اللازمة
            </p>
            <Button variant="primary">
              اتصل بنا
            </Button>
          </div>
        </Section>
      </main>
    </>
  );
}
