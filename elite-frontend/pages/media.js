import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Section } from '@/components/ui/Section';
import PageBanner from '@/components/PageBanner/PageBanner';
import MediaHero from '@/components/MediaHero';
import BlogSection from '@/components/BlogSection';
import Loader from '@/components/ui/Loader';
import { useLanguage } from '@/context/LanguageContext';
import { useBlogArticles } from '@/hooks/useBlogApi';

export default function Media() {
  const router = useRouter();
  const { t, locale, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(9);
  
  // استخراج معلمات التصفية من عنوان URL
  const categoryId = router.query.category;
  const tagId = router.query.tag;
  const searchQuery = router.query.search;
  
  // تهيئة الفلاتر
  const filters = {};
  if (categoryId) filters.category = categoryId;
  if (tagId) filters.tag = tagId;
  if (searchQuery) filters.search = searchQuery;
  
  // استخدام الصفحة من عنوان URL إذا كانت موجودة
  useEffect(() => {
    if (router.query.page) {
      const page = parseInt(router.query.page.toString(), 10);
      if (!isNaN(page) && page > 0) {
        setCurrentPage(page);
      }
    } else {
      setCurrentPage(1);
    }
  }, [router.query.page]);
  
  // استخدام hook لجلب المقالات مع تطبيق الفلاتر
  const { data: articles, loading, error, pagination } = useBlogArticles(currentPage, pageSize, filters);
  
  // التعامل مع تغيير الصفحة
  const handlePageChange = (page) => {
    // تحديث معلمة الصفحة في عنوان URL
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page }
    }, undefined, { scroll: true });
  };
  
  // تحديد ما إذا كانت هناك فلاتر نشطة
  const hasActiveFilters = Object.keys(filters).length > 0;
  
  return (
    <main dir={dir}>
      <PageBanner 
        title={t('pageBanner.media.title')}
        backgroundImage="/images/backgrounds/media-banner.jpg"
      />
      
      {!hasActiveFilters && <MediaHero />}
      
      <Section className="py-16">
        <div className="container mx-auto px-4">
          {hasActiveFilters && (
            <div className="mb-10 flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-800">
                {categoryId && t('blogSidebar.filteredByCategory')}
                {tagId && t('blogSidebar.filteredByTag')}
                {searchQuery && t('blogSidebar.searchResults')}:
              </h2>
              <div className="flex-1"></div>
              <button
                onClick={() => router.push('/media')}
                className="bg-primary/10 hover:bg-primary/20 text-primary font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
              >
                {t('blogSidebar.clearFilters')}
              </button>
            </div>
          )}
          
          {/* عرض المقالات في صف واحد بدلاً من صفين */}
          <div>
            {loading ? (
              <div className="flex justify-center items-center min-h-[300px]">
                <Loader size="large" />
              </div>
            ) : error ? (
              <div className="text-center p-10 bg-red-50 rounded-xl">
                <p className="text-red-600 text-lg">{t('common.errorOccurred')}</p>
                <p className="text-gray-600 mt-2">{error.message}</p>
              </div>
            ) : articles && articles.length > 0 ? (
              <>
                {/* عرض المقالات */}
                <BlogSection articles={articles} />
                
                {/* Pagination */}
                {pagination && pagination.pageCount > 1 && (
                  <div className="mt-12 flex justify-center">
                    <div className="inline-flex items-center bg-white shadow-sm rounded-lg overflow-hidden">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-gray-50'}`}
                      >
                        {locale === 'ar' ? '›' : '‹'}
                      </button>
                      
                      {[...Array(pagination.pageCount)].map((_, index) => {
                        const page = index + 1;
                        // Show limited pages with ellipsis for better UX
                        if (
                          page === 1 || 
                          page === pagination.pageCount || 
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`w-10 h-10 flex items-center justify-center ${
                                currentPage === page 
                                  ? 'bg-primary text-white' 
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        } else if (
                          (page === currentPage - 2 && currentPage > 3) || 
                          (page === currentPage + 2 && currentPage < pagination.pageCount - 2)
                        ) {
                          return <span key={page} className="w-10 h-10 flex items-center justify-center">...</span>;
                        }
                        return null;
                      })}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === pagination.pageCount}
                        className={`px-4 py-2 ${currentPage === pagination.pageCount ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-gray-50'}`}
                      >
                        {locale === 'ar' ? '‹' : '›'}
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center p-10 bg-gray-50 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-600 mb-4">{t('blogSidebar.noArticlesFound')}</h3>
                <p className="text-gray-500">{t('blogSidebar.tryDifferentFilters')}</p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
}

export async function getServerSideProps({ locale }) {
  // نقوم فقط بإرجاع الـ props كما هي، وسنستخدم hooks لجلب البيانات في المكونات
  return {
    props: {}
  };
}
