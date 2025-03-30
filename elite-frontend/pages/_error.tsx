import { NextPage } from 'next';
import Link from 'next/link';

interface ErrorProps {
  statusCode?: number;
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-purple-800 mb-4">{statusCode || '404'}</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-right">
          {statusCode === 404 ? 'الصفحة غير موجودة' : 'حدث خطأ ما'}
        </h2>
        <p className="text-gray-600 mb-8 text-right">
          {statusCode === 404
            ? 'عذراً، الصفحة التي تبحث عنها غير موجودة'
            : 'عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى'}
        </p>
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

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
