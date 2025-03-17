import { Section } from '@/components/ui/Section';
import { PricingCard } from '@/features/memberships/PricingCard';
import PageBanner from '@/components/PageBanner/PageBanner';

export default function Memberships() {
  const plans = [
    {
      name: 'الباقة الأساسية',
      price: '199',
      features: [
        'فحص شهري مجاني',
        'خصم 10% على الخدمات',
        'خصم 5% على المنتجات',
        'استشارات هاتفية مجانية',
        'تذكير بمواعيد التطعيم'
      ]
    },
    {
      name: 'الباقة المميزة',
      price: '399',
      featured: true,
      features: [
        'فحصان شهرياً مجاناً',
        'خصم 20% على الخدمات',
        'خصم 15% على المنتجات',
        'استشارات هاتفية مجانية غير محدودة',
        'خدمة الطوارئ المنزلية',
        'تقارير صحية شهرية',
        'أولوية في المواعيد'
      ]
    },
    {
      name: 'الباقة البلاتينية',
      price: '699',
      features: [
        'فحوصات شهرية غير محدودة',
        'خصم 30% على الخدمات',
        'خصم 25% على المنتجات',
        'رعاية منزلية شهرية',
        'خدمة الطوارئ المنزلية',
        'تقارير صحية أسبوعية',
        'أولوية قصوى في المواعيد',
        'برنامج تغذية مخصص'
      ]
    }
  ];

  const faqs = [
    {
      question: 'كيف يمكنني الاشتراك في إحدى الباقات؟',
      answer: 'يمكنك الاشتراك من خلال زيارة العيادة أو التواصل معنا عبر الهاتف. سيقوم فريقنا بمساعدتك في اختيار الباقة المناسبة واستكمال إجراءات الاشتراك.'
    },
    {
      question: 'هل يمكنني تغيير باقتي في أي وقت؟',
      answer: 'نعم، يمكنك الترقية إلى باقة أعلى في أي وقت. للتنزيل إلى باقة أقل، يجب إكمال فترة الاشتراك الحالية أولاً.'
    },
    {
      question: 'هل الباقات تشمل جميع أنواع الحيوانات الأليفة؟',
      answer: 'نعم، باقاتنا تشمل جميع أنواع الحيوانات الأليفة. يمكنك استشارة فريقنا للحصول على تفاصيل الخدمات المتوفرة لكل نوع.'
    },
    {
      question: 'كيف يتم تجديد الاشتراك؟',
      answer: 'يتم تجديد الاشتراك تلقائياً في نهاية كل شهر. يمكنك إلغاء التجديد التلقائي في أي وقت من خلال التواصل معنا.'
    }
  ];

  return (
    <main>
      <PageBanner 
        title="Memberships"
        backgroundImage="/images/banner/bnr1.webp"
      />
      <Section bgColor="bg-purple-600" className="text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">باقات العضوية</h1>
          <p className="text-xl max-w-2xl mx-auto">
            اختر الباقة المناسبة لحيوانك الأليف واستمتع بمجموعة من المزايا الحصرية
          </p>
        </div>
      </Section>

      {/* Pricing Plans */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <Section bgColor="bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">مزايا العضوية</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            استمتع بمجموعة من المزايا الحصرية مع باقات العضوية المختلفة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl text-purple-600 mb-4">
              <i className="fas fa-percentage"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">خصومات حصرية</h3>
            <p className="text-gray-600">خصومات على جميع الخدمات والمنتجات</p>
          </div>

          <div className="text-center">
            <div className="text-4xl text-purple-600 mb-4">
              <i className="fas fa-user-md"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">فحوصات مجانية</h3>
            <p className="text-gray-600">فحوصات دورية مجانية لحيوانك الأليف</p>
          </div>

          <div className="text-center">
            <div className="text-4xl text-purple-600 mb-4">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">دعم مستمر</h3>
            <p className="text-gray-600">استشارات هاتفية على مدار الساعة</p>
          </div>

          <div className="text-center">
            <div className="text-4xl text-purple-600 mb-4">
              <i className="fas fa-home"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">خدمة منزلية</h3>
            <p className="text-gray-600">خدمة الزيارات المنزلية للحالات الطارئة</p>
          </div>
        </div>
      </Section>

      {/* FAQs */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">الأسئلة الشائعة</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            إليك إجابات على الأسئلة الأكثر شيوعاً حول باقات العضوية
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section bgColor="bg-purple-600" className="text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">ابدأ رحلتك معنا اليوم</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            انضم إلى عائلتنا واحصل على أفضل رعاية لحيوانك الأليف
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            تواصل معنا للاشتراك
          </button>
        </div>
      </Section>
    </main>
  );
}
