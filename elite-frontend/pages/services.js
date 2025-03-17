import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import PageBanner from '@/components/PageBanner/PageBanner';

export default function Services() {
  const services = [
    {
      title: 'الرعاية الوقائية',
      description: 'فحوصات دورية شاملة وتطعيمات للحفاظ على صحة حيوانك الأليف',
      icon: 'fa-shield-alt'
    },
    {
      title: 'العلاج الطبي',
      description: 'علاج شامل للأمراض والحالات المرضية مع متابعة مستمرة',
      icon: 'fa-stethoscope'
    },
    {
      title: 'الجراحة',
      description: 'عمليات جراحية متقدمة في مرافق مجهزة بأحدث التقنيات',
      icon: 'fa-user-md'
    },
    {
      title: 'طب الأسنان',
      description: 'رعاية شاملة لصحة الفم والأسنان لحيوانك الأليف',
      icon: 'fa-tooth'
    },
    {
      title: 'الرعاية المنزلية',
      description: 'خدمات بيطرية متكاملة في منزلك لراحة حيوانك الأليف',
      icon: 'fa-home'
    },
    {
      title: 'خدمات الطوارئ',
      description: 'رعاية طارئة على مدار الساعة مع فريق طبي متخصص',
      icon: 'fa-ambulance'
    }
  ];

  return (
    <main>
      <PageBanner 
        title="Our Services"
        backgroundImage="/images/banner/bnr1.webp"
      />
      <Section bgColor="bg-purple-600" className="text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">خدماتنا</h1>
          <p className="text-xl max-w-2xl mx-auto">
            نقدم مجموعة شاملة من الخدمات البيطرية المتخصصة لضمان صحة وسعادة حيوانك الأليف
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl text-purple-600 mb-4">
                <i className={`fas ${service.icon}`}></i>
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Button variant="outline" className="w-full">
                المزيد من التفاصيل
              </Button>
            </div>
          ))}
        </div>
      </Section>

      <Section bgColor="bg-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">مستعدون لتقديم أفضل رعاية لحيوانك الأليف</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            فريقنا من الأطباء البيطريين المتخصصين جاهز لتقديم الرعاية المثالية لحيوانك الأليف
          </p>
          <Button variant="primary" className="mx-2">
            احجز موعداً الآن
          </Button>
          <Button variant="outline" className="mx-2">
            تواصل معنا
          </Button>
        </div>
      </Section>
    </main>
  );
}
