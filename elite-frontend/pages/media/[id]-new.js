import { useRouter } from 'next/router';
import { useLanguage } from '@/context/LanguageContext';
import { useBlogArticle } from '@/hooks/useBlogApi';
import { Loader } from '@/components/ui/Loader';
import Head from 'next/head';
import Link from 'next/link';

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader />
            <p className="mt-4 text-gray-600 font-medium">
              {t('common.loadingArticle') || 'Loading article...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // عرض رسالة خطأ
  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">📰</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {t('articleDetail.notFound') || 'Article Not Found'}
            </h1>
            <p className="text-gray-600 mb-6">
              {error || t('articleDetail.notFoundDesc') || 'The article you are looking for does not exist or has been removed.'}
            </p>
            <Link href="/media" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              {t('articleDetail.backToArticles') || 'Back to Articles'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // استخراج البيانات
  const {
    title,
    content,
    excerpt,
    featuredImage,
    author,
    category,
    tags = [],
    publishDate,
    readTime,
    viewCount = 0,
    publishedAt
  } = article;

  const authorName = author?.name || 'Unknown Author';
  const categoryName = category?.name || 'General';

  // رابط الصورة المحسن
  const getImageUrl = (image) => {
    if (!image?.url) return '/images/blog/default-hero.jpg';
    
    if (image.url.startsWith('http')) {
      return image.url;
    }
    
    return `http://localhost:1337${image.url}`;
  };

  const imageUrl = getImageUrl(featuredImage);
  const authorImageUrl = getImageUrl(author?.avatar);

  return (
    <>
      <Head>
        <title>{title} | Elite Vet</title>
        <meta name="description" content={excerpt || title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt || title} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="article" />
      </Head>

      <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        
        {/* Hero Section with Image */}
        <div className="relative">
          {/* Background Image */}
          <div className="h-[60vh] md:h-[70vh] relative overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            {/* Back Button - Floating */}
            <div className="absolute top-6 left-6 right-6 z-10">
              <button 
                onClick={() => router.back()}
                className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full font-medium hover:bg-white transition-all shadow-lg"
              >
                <svg className={`w-5 h-5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t('common.back') || 'Back'}
              </button>
            </div>

            {/* Category Badge */}
            {category && (
              <div className="absolute top-6 right-6 z-10">
                <span className="inline-flex items-center px-4 py-2 bg-blue-600/90 backdrop-blur-sm text-white rounded-full text-sm font-medium shadow-lg">
                  {categoryName}
                </span>
              </div>
            )}

            {/* Article Title & Meta - Bottom of Hero */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {title}
                </h1>
                
                {/* Excerpt */}
                {excerpt && (
                  <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-3xl leading-relaxed">
                    {excerpt}
                  </p>
                )}

                {/* Author & Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-gray-300">
                  {/* Author */}
                  <div className="flex items-center">
                    {authorImageUrl !== '/images/blog/default-hero.jpg' ? (
                      <img 
                        src={authorImageUrl} 
                        alt={authorName}
                        className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-white/30"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3 border-2 border-white/30">
                        <span className="text-white font-semibold">
                          {authorName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-white">{authorName}</p>
                      <p className="text-sm text-gray-300">Author</p>
                    </div>
                  </div>
                  
                  {/* Date */}
                  {publishDate && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{formatDate(publishDate, locale)}</span>
                    </div>
                  )}
                  
                  {/* Read Time */}
                  {readTime && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{readTime}</span>
                    </div>
                  )}
                  
                  {/* Views */}
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{viewCount.toLocaleString()} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          
          {/* Article Content */}
          <article className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="p-8 md:p-12">
              <div className="prose prose-lg md:prose-xl max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: content }} 
                  className="text-gray-800 leading-relaxed"
                />
              </div>
            </div>
          </article>

          {/* Tags Section */}
          {tags.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {t('articleDetail.tags') || 'Tags'}
              </h3>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-colors cursor-pointer"
                  >
                    #{tag.name || tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Articles CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              {t('articleDetail.moreArticles') || 'Discover More Articles'}
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              {t('articleDetail.moreArticlesDesc') || 'Explore our comprehensive collection of veterinary articles and pet care guides.'}
            </p>
            <Link href="/media" className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-gray-50 transition-colors shadow-lg">
              {t('articleDetail.exploreArticles') || 'Explore All Articles'}
              <svg className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
