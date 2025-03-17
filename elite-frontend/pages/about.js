import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export default function About() {
  const stats = [
    { number: '15+', label: 'سنوات خبرة' },
    { number: '10,000+', label: 'حيوان تمت رعايتهم' },
    { number: '24/7', label: 'خدمة متواصلة' },
    { number: '100%', label: 'رضا العملاء' }
  ];

  const values = [
    {
      title: 'الرعاية المتميزة',
      description: 'نلتزم بتقديم أعلى مستويات الرعاية لكل حيوان أليف',
      icon: 'fa-heart'
    },
    {
      title: 'الخبرة المتخصصة',
      description: 'فريق من الأطباء المتخصصين ذوي الخبرة العالية',
      icon: 'fa-user-md'
    },
    {
      title: 'التقنيات الحديثة',
      description: 'نستخدم أحدث التقنيات والمعدات في مجال الطب البيطري',
      icon: 'fa-microscope'
    }
  ];

  return (
    <main>
      <Section bgColor="bg-purple-600" className="text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">من نحن</h1>
          <p className="text-xl max-w-2xl mx-auto">
            عيادة إيليت للرعاية البيطرية - نقدم أفضل رعاية صحية للحيوانات الأليفة منذ عام 2010
          </p>
        </div>
      </Section>

      {/* Stats Section */}
      <Section bgColor="bg-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Our Story */}
      <Section bgColor="bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">قصتنا</h2>
          <p className="text-gray-600 mb-6">
            بدأت رحلتنا في عام 2010 برؤية واضحة لتقديم رعاية بيطرية متميزة في المملكة العربية السعودية.
            منذ ذلك الحين، نمونا لنصبح واحدة من أكبر وأكثر العيادات البيطرية ثقة في المنطقة.
          </p>
          <p className="text-gray-600">
            نفخر بفريقنا المتخصص من الأطباء البيطريين والفنيين الذين يكرسون جهودهم لتقديم أفضل رعاية
            ممكنة لحيواناتكم الأليفة.
          </p>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <h2 className="text-3xl font-bold text-center mb-12">قيمنا</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center p-6">
              <div className="text-4xl text-purple-600 mb-4">
                <i className={`fas ${value.icon}`}></i>
              </div>
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section bgColor="bg-purple-600" className="text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">انضم إلى عائلتنا</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            دع فريقنا المتخصص يقدم أفضل رعاية لحيوانك الأليف
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              احجز موعداً
            </Button>
            <Button variant="secondary" className="text-purple-600">
              تواصل معنا
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
