import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Gallery } from '@/features/media/Gallery';

export default function Media() {
  const [activeTab, setActiveTab] = useState('photos');

  const mediaItems = {
    photos: [
      {
        type: 'image',
        url: '/images/gallery/clinic-1.jpg',
        title: 'العيادة الرئيسية',
        description: 'مرافق حديثة ومجهزة بأحدث التقنيات'
      },
      {
        type: 'image',
        url: '/images/gallery/surgery.jpg',
        title: 'غرفة العمليات',
        description: 'غرفة عمليات متطورة لإجراء العمليات الجراحية'
      },
      {
        type: 'image',
        url: '/images/gallery/examination.jpg',
        title: 'غرفة الفحص',
        description: 'غرفة فحص مريحة لحيوانك الأليف'
      },
      {
        type: 'image',
        url: '/images/gallery/pets-1.jpg',
        title: 'رعاية الحيوانات',
        description: 'نقدم رعاية متميزة لجميع الحيوانات الأليفة'
      },
      {
        type: 'image',
        url: '/images/gallery/team.jpg',
        title: 'فريقنا الطبي',
        description: 'فريق متخصص من الأطباء البيطريين'
      },
      {
        type: 'image',
        url: '/images/gallery/facility.jpg',
        title: 'مرافق العيادة',
        description: 'مرافق حديثة ومريحة'
      }
    ],
    videos: [
      {
        type: 'video',
        url: '/videos/clinic-tour.mp4',
        thumbnail: '/images/gallery/clinic-tour-thumb.jpg',
        title: 'جولة في العيادة',
        description: 'تعرف على مرافق عيادتنا المتطورة'
      },
      {
        type: 'video',
        url: '/videos/pet-care-tips.mp4',
        thumbnail: '/images/gallery/pet-care-thumb.jpg',
        title: 'نصائح للعناية بحيوانك الأليف',
        description: 'نصائح مهمة للعناية اليومية بحيوانك الأليف'
      },
      {
        type: 'video',
        url: '/videos/success-stories.mp4',
        thumbnail: '/images/gallery/success-thumb.jpg',
        title: 'قصص نجاح',
        description: 'قصص نجاح من عملائنا الكرام'
      }
    ]
  };

  return (
    <main>
      <Section bgColor="bg-purple-600" className="text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">معرض الوسائط</h1>
          <p className="text-xl max-w-2xl mx-auto">
            اكتشف عيادتنا ومرافقنا من خلال مجموعة من الصور والفيديوهات
          </p>
        </div>
      </Section>

      <Section>
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeTab === 'photos'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              الصور
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeTab === 'videos'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              الفيديوهات
            </button>
          </div>
        </div>

        {/* Gallery */}
        <Gallery items={mediaItems[activeTab]} />
      </Section>

      {/* Share Section */}
      <Section bgColor="bg-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">شارك تجربتك معنا</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            نحن نرحب دائماً بمشاركة صور وقصص حيواناتكم الأليفة. شاركونا لحظاتكم المميزة!
          </p>
          <div className="flex justify-center space-x-4 space-x-reverse">
            <a
              href="#"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <i className="fas fa-camera ml-2"></i>
              شارك صورك
            </a>
            <a
              href="#"
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <i className="fas fa-video ml-2"></i>
              شارك فيديو
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
