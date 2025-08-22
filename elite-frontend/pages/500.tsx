import { NextPage } from 'next';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const ServerError: NextPage = () => {
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'text-right' : 'text-left';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" dir={dir}>
      <div className={`text-center p-8 ${textAlign}`}>
        <h1 className="text-6xl font-bold text-purple-800 mb-4">500</h1>
        <h2 className={`text-2xl font-semibold text-gray-700 mb-4 ${textAlign}`}>
          {t('errorPage.title')}
        </h2>
        <p className={`text-gray-600 mb-8 ${textAlign}`}>
          {t('errorPage.message')}
        </p>
        <Link
          href="/"
          className="inline-block bg-purple-800 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          {t('errorPage.backHome')}
        </Link>
      </div>
    </div>
  );
};

export default ServerError;
