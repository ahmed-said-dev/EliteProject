import { NextPage } from 'next';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const NotFound: NextPage = () => {
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'text-right' : 'text-left';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" dir={dir}>
      <div className={`text-center p-8 ${textAlign}`}>
        <h1 className="text-6xl font-bold text-purple-800 mb-4">404</h1>
        <h2 className={`text-2xl font-semibold text-gray-700 mb-4 ${textAlign}`}>
          {t('notFoundPage.title')}
        </h2>
        <p className={`text-gray-600 mb-8 ${textAlign}`}>
          {t('notFoundPage.message')}
        </p>
        <Link
          href="/"
          className="inline-block bg-purple-800 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          {t('notFoundPage.backHome')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
