import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">عن العيادة</h3>
            <p className="text-gray-300">
              نقدم أفضل رعاية بيطرية متخصصة لحيواناتكم الأليفة مع خدمة على مدار 24 ساعة
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-gray-300 hover:text-white">خدماتنا</Link></li>
              <li><Link href="/appointment" className="text-gray-300 hover:text-white">حجز موعد</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white">المنتجات</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white">اتصل بنا</Link></li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4">ساعات العمل</h3>
            <ul className="space-y-2 text-gray-300">
              <li>الأحد - الخميس: 9 ص - 9 م</li>
              <li>الجمعة: 10 ص - 6 م</li>
              <li>السبت: 9 ص - 4 م</li>
              <li>الطوارئ: 24/7</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">معلومات الاتصال</h3>
            <ul className="space-y-2 text-gray-300">
              <li>الهاتف: 123-456-789</li>
              <li>البريد: info@elitevet.com</li>
              <li>العنوان: شارع الرئيسي، المدينة</li>
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              {new Date().getFullYear()} Elite Vet. جميع الحقوق محفوظة
            </div>
            <div className="flex space-x-6 space-x-reverse mt-4 md:mt-0">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
