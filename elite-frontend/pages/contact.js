import { Section } from '@/components/ui/Section';
import { ContactForm } from '@/features/contact/ContactForm';
import { SITE_CONFIG } from '@/utils/constants';
import PageBanner from '@/components/PageBanner/PageBanner';

export default function Contact() {
  const contactInfo = [
    {
      title: 'العنوان',
      info: SITE_CONFIG.contact.address,
      icon: 'fa-location-dot'
    },
    {
      title: 'الهاتف',
      info: SITE_CONFIG.contact.phone,
      icon: 'fa-phone'
    },
    {
      title: 'البريد الإلكتروني',
      info: SITE_CONFIG.contact.email,
      icon: 'fa-envelope'
    },
    {
      title: 'ساعات العمل',
      info: (
        <>
          {SITE_CONFIG.workingHours.weekdays}<br />
          {SITE_CONFIG.workingHours.friday}<br />
          {SITE_CONFIG.workingHours.saturday}
        </>
      ),
      icon: 'fa-clock'
    }
  ];

  return (
    <main>
      <PageBanner 
        title="Contact Us"
        backgroundImage="/images/banner/bnr1.webp"
      />
      <Section bgColor="bg-purple-600" className="text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">اتصل بنا</h1>
          <p className="text-xl max-w-2xl mx-auto">
            نحن هنا للإجابة على جميع استفساراتك وتقديم المساعدة التي تحتاجها
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-8">معلومات الاتصال</h2>
            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 space-x-reverse">
                  <div className="text-2xl text-purple-600">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <div className="text-gray-600">{item.info}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="mt-8">
              <h3 className="font-bold mb-4">تابعنا على مواقع التواصل الاجتماعي</h3>
              <div className="flex space-x-4 space-x-reverse">
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-purple-600 hover:text-purple-700"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  href={SITE_CONFIG.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-purple-600 hover:text-purple-700"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-purple-600 hover:text-purple-700"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-8">أرسل لنا رسالة</h2>
            <ContactForm />
          </div>
        </div>
      </Section>

      {/* Map Section */}
      <Section bgColor="bg-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">موقعنا</h2>
          <p className="text-gray-600">يمكنك زيارتنا في موقعنا المميز في قلب المدينة</p>
        </div>
        <div className="h-96 bg-gray-300 rounded-lg">
          {/* Map component will be implemented here */}
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            خريطة الموقع
          </div>
        </div>
      </Section>
    </main>
  );
}
