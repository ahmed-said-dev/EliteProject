import { useRouter } from 'next/router';
import { useLanguage } from '@/context/LanguageContext';
import { useBlogArticle } from '@/hooks/useBlogApi';
import { Loader } from '@/components/ui/Loader';

// دالة تنسيق التاريخ
const formatDate = (dateString, locale) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function ArticleDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { t, locale, isRTL } = useLanguage();
  
  console.log(`\n=== Article Detail Page ===`);
  console.log(`Article ID/Slug: ${id}`);
  console.log(`Locale: ${locale}`);
  
  // جلب بيانات المقالة
  const { data: article, isLoading, error } = useBlogArticle(id);
  
  console.log(`Page State:`, { 
    hasId: !!id, 
    isLoading, 
    hasArticle: !!article, 
    error 
  });

  // عرض حالة التحميل إذا لم يكن هناك ID
  if (!id || router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  // عرض حالة التحميل أثناء جلب البيانات
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-gray-600">Fetching article data...</p>
        </div>
      </div>
    );
  }

  // عرض رسالة خطأ
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-4">Error: {error}</p>
          <p className="text-sm text-gray-500 mb-6">ID: {id}</p>
          <div className="space-y-2">
            <button 
              onClick={() => router.back()}
              className="block w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Go Back
            </button>
            <button 
              onClick={() => router.reload()}
              className="block w-full bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // عرض رسالة إذا لم توجد المقالة
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No Article Data</h1>
          <p className="text-gray-600">The article data could not be loaded.</p>
        </div>
      </div>
    );
  }

  console.log(`✅ Article loaded:`, article.title);
  
  // استخراج بيانات المقالة
  const {
    title,
    content,
    publishDate,
    readTime,
    author,
    category,
    tags = [],
    viewCount = 0,
    excerpt,
    featuredImage
  } = article;

  // معلومات الكاتب
  const authorName = author?.name || 'Unknown Author';
  const categoryName = category?.name || 'Uncategorized';
  
  // رابط الصورة
  const imageUrl = featuredImage?.url 
    ? (featuredImage.url.startsWith('http') 
        ? featuredImage.url 
        : `http://localhost:1337${featuredImage.url}`)
    : '/images/blog/default.jpg';

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button 
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Articles
          </button>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Article Header */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            {/* Featured Image */}
            {imageUrl && (
              <div className="w-full h-64 sm:h-80 md:h-96 relative">
                <img 
                  src={imageUrl} 
                  alt={title}
                  className="w-full h-full object-cover"
                />
                {/* Category Badge */}
                {category && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {categoryName}
                    </span>
                  </div>
                )}
              </div>
            )}
            
            {/* Article Info */}
            <div className="p-6 sm:p-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {title}
              </h1>
              
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="font-medium">By: {authorName}</span>
                </div>
                {publishDate && (
                  <div className="flex items-center">
                    <span>📅 {formatDate(publishDate, locale)}</span>
                  </div>
                )}
                {readTime && (
                  <div className="flex items-center">
                    <span>⏱️ {readTime}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <span>👀 {viewCount} views</span>
                </div>
              </div>
              
              {/* Excerpt */}
              {excerpt && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-gray-700 text-lg italic">
                    {excerpt}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag.name || tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
