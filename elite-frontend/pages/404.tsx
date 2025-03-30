import { NextPage } from 'next';
import Link from 'next/link';

const NotFound: NextPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-purple-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-right">الصفحة غير موجودة</h2>
        <p className="text-gray-600 mb-8 text-right">عذراً، الصفحة التي تبحث عنها غير موجودة</p>
        <Link
          href="/"
          className="inline-block bg-purple-800 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
