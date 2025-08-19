import { useRouter } from 'next/router';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/button';
import { FaClock, FaCalendarAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedinIn, FaTag, FaEye, FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';
import PageBanner from '@/components/PageBanner/PageBanner';
import { useLanguage } from '@/context/LanguageContext';
import { useBlogArticle, useRelatedArticles, getArticleImage, getAuthorImage } from '@/hooks/useBlogApi';
import { Loader } from '@/components/ui/Loader';
import BlogSection from '@/components/BlogSection';
import BlogSidebar from '@/components/BlogSidebar'; // Added import statement

const formatDate = (dateString, locale) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function ArticleDetail({ initialArticleData, initialRelatedData }) {
  const router = useRouter();
  const { id } = router.query;
  const { t, locale, dir } = useLanguage();
  
  const { data: article, isLoading, error } = useBlogArticle(id, initialArticleData);
  const { data: relatedArticles, isLoading: relatedLoading } = useRelatedArticles(
    article?.id, 
    3, 
    initialRelatedData
  );

  // عرض حالة التحميل عندما لا يكون هناك معرف أو في مرحلة التحميل الأولية
  if (!id || router.isFallback) {
    return (
      <Section className="py-20">
        <div className="container mx-auto text-center">
          <Loader />
        </div>
      </Section>
    );
  }

  // عرض رسالة خطأ إذا كان هناك مشكلة في جلب المقالة
  if (error) {
    return (
      <Section className="py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('article.error')}</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Button onClick={() => router.push('/media')}>{t('article.backToBlog')}</Button>
        </div>
      </Section>
    );
  }

  // عرض حالة التحميل
  if (isLoading || !article) {
    return (
      <Section className="py-20">
        <div className="container mx-auto text-center">
          <Loader />
        </div>
      </Section>
    );
  }

  const {
    title,
    content,
    publishDate,
    readTime,
    author,
    category,
    tags,
    viewCount,
    excerpt
  } = article;

  // استخراج معلومات المؤلف
  const authorName = author?.name || t('article.unknownAuthor');
  const authorBio = author?.bio || '';
  const authorAvatar = getAuthorImage(author);
  const authorSocialLinks = author?.socialLinks || {};

  // استخراج معلومات التصنيف والعلامات
  const categoryName = category?.name || t('article.uncategorized');
  const tagsList = tags?.map(tag => tag.name) || [];

  // الحصول على صورة المقالة
  const articleImage = getArticleImage(article);
  
  // قيمة متعددة لأصل استخدامها في خلفية CSS
  const imageBgUrl = `url('${articleImage}')`;

  return (
    <main dir={dir} className={`${locale === 'ar' ? 'font-arabic' : 'font-sans'} relative overflow-hidden bg-gradient-to-br from-white to-gray-50`}>
      {/* عناصر زخرفية للخلفية */}
      <div className="absolute top-0 left-0 right-0 h-[70vh] overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/90 to-primary/20 mix-blend-multiply"></div>
        <div className="absolute inset-0" style={{background: `${imageBgUrl} center/cover no-repeat fixed`, filter: 'blur(8px)'}}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      
      {/* دوائر زخرفية */}
      <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/10 to-primary/5 blur-3xl -z-10"></div>
      <div className="absolute top-80 right-10 w-80 h-80 rounded-full bg-gradient-to-tr from-primary/10 to-blue-400/5 blur-3xl -z-10"></div>
      
      {/* Page Banner */}
      <PageBanner 
        title={t('article.blogDetail')}
        subtitle={t('article.readOurLatestArticles')} 
        backgroundImage="/images/backgrounds/banner-bg.jpg"
      />

      {/* زر الرجوع */}
      <div className="container mx-auto px-4 mt-16 mb-4">
        <button 
          onClick={() => router.push('/media')}
          className="py-4 px-6 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group mt-4"
          style={{
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)'
          }}
        >
          {/* خلفية متحركة */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute top-0 left-0 w-full h-full bg-white/10 skew-y-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-white/5 -skew-y-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
          </div>
          
          {/* زخرفة النقاط */}
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/30"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-white/30"></div>
          
          {/* محتوى الزر */}
          <div className="relative z-10 flex items-center justify-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 text-white transition-all duration-300 group-hover:bg-white group-hover:text-primary">
              {locale === 'ar' ? <FaChevronRight size={12} /> : <FaChevronLeft size={12} />}
            </span>
            <span className="text-white text-lg">{t('article.backToBlog')}</span>
          </div>
          
          {/* هالة الضوء */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-2/3 h-20 bg-white/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </button>
      </div>
      
      {/* معلومات المقالة والصورة */}
      <Section className="pt-8 pb-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)' }}>
        {/* عناصر زخرفية للخلفية */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {/* نقاط زخرفية */}
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary/5"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-blue-300/5"></div>
          
          {/* أشكال هندسية */}
          <div className="absolute top-20 right-[20%] w-16 h-16 rotate-45 bg-primary/3 rounded-lg"></div>
          <div className="absolute bottom-10 left-[30%] w-20 h-20 rotate-12 bg-blue-400/3 rounded-lg"></div>
          
          {/* موجة زخرفية */}
          <svg className="absolute bottom-0 left-0 w-full opacity-10" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path fill="#4F46E5" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,149.3C384,139,480,85,576,101.3C672,117,768,203,864,208C960,213,1056,139,1152,117.3C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
          <svg className="absolute bottom-0 left-0 w-full opacity-5" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path fill="#4338CA" fillOpacity="1" d="M0,192L60,176C120,160,240,128,360,138.7C480,149,600,203,720,229.3C840,256,960,256,1080,229.3C1200,203,1320,149,1380,122.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* عمود المعلومات - يشغل كامل العرض في الأجهزة المحمولة، و 8 أعمدة في الشاشات الكبيرة */}
            <div className="lg:col-span-8 space-y-8">
              {/* معلومات الرأس */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 transform hover:shadow-2xl transition-all duration-500">
                {/* صورة المقالة الكبيرة */}
                <div className="relative h-[400px] overflow-hidden">
                  <Image 
                    src={articleImage} 
                    alt={title}
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10"></div>
                  
                  {/* تصنيف المقالة فوق الصورة */}
                  <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto z-10">
                    {category && (
                      <span className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
                        {categoryName}
                      </span>
                    )}
                  </div>
                  
                  {/* معلومات المقالة على الصورة */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight drop-shadow-md">
                      {title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-1 rtl:ml-1" />
                        <span>{t('article.publishedOn')} {formatDate(publishDate, locale)}</span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="mr-1 rtl:ml-1" />
                        <span>{readTime} {t('article.minutes')}</span>
                      </div>
                      <div className="flex items-center">
                        <FaEye className="mr-1 rtl:ml-1" />
                        <span>{viewCount || 0} {t('article.views')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* مختصر المقالة والمزيد من المعلومات */}
                <div className="p-6">
                  {/* معلومات الكاتب */}
                  <div className="flex items-center mb-6 pb-6 border-b border-gray-100">
                    <Avatar 
                      src={authorAvatar} 
                      alt={authorName}
                      size="lg"
                      className="border-4 border-white shadow-lg mr-4 rtl:ml-4 rtl:mr-0"
                    />
                    <div>
                      <div className="text-sm text-primary font-medium">
                        {t('article.by')}
                      </div>
                      <h3 className="font-bold text-xl text-gray-800">
                        {authorName}
                      </h3>
                    </div>
                  </div>
                  
                  {/* مختصر المقالة */}
                  {excerpt && (
                    <div className="relative bg-gray-50 rounded-xl p-6 mb-8">
                      <div className="absolute right-6 top-4 text-primary/10">
                        <FaQuoteRight size={60} />
                      </div>
                      <p className="text-lg text-gray-700 italic relative z-10">
                        {excerpt}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* محتوى المقالة */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-8">
                <div className="prose max-w-none prose-lg prose-blue prose-img:rounded-xl prose-headings:font-bold prose-blockquote:border-primary prose-blockquote:bg-gray-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
                
                {/* تاجات المقالة */}
                {tagsList.length > 0 && (
                  <div className="mt-10 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap items-center">
                      <FaTag className="text-primary mr-2 rtl:ml-2" />
                      <h4 className="text-lg font-semibold mr-3 rtl:ml-3">{t('article.tags')}:</h4>
                      <div className="flex flex-wrap">
                        {tagsList.map((tag, index) => (
                          <span 
                            key={index} 
                            className="inline-block bg-gray-100 hover:bg-gray-200 transition-colors rounded-full px-3 py-1 text-sm font-medium text-gray-700 mr-2 rtl:ml-2 mb-2"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* مشاركة المقالة */}
                <div className="mt-10 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap items-center justify-between">
                    <h4 className="text-lg font-semibold mb-3 md:mb-0">{t('article.share')}:</h4>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <button 
                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                        className="w-10 h-10 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                        aria-label="Share on Facebook"
                      >
                        <FaFacebook />
                      </button>
                      <button 
                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title)}`, '_blank')}
                        className="w-10 h-10 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                        aria-label="Share on Twitter"
                      >
                        <FaTwitter />
                      </button>
                      <button 
                        onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(title)}`, '_blank')}
                        className="w-10 h-10 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                        aria-label="Share on LinkedIn"
                      >
                        <FaLinkedinIn />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* الشريط الجانبي - يظهر بعد المحتوى في الأجهزة المحمولة، وعلى اليمين في الشاشات الكبيرة */}
            <div className="lg:col-span-4 space-y-8">
              {/* بطاقة الكاتب */}
              {author && (
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 sticky top-4">
                  <div className="bg-gradient-to-r from-primary-dark to-primary p-5 text-white">
                    <h3 className="text-xl font-bold">{t('article.aboutAuthor')}</h3>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        <Avatar 
                          src={authorAvatar}
                          alt={authorName}
                          size="xl"
                          className="border-4 border-white shadow-lg z-10 relative"
                        />
                        <div className="absolute inset-0 bg-primary/20 blur-xl -z-10 scale-150 rounded-full"></div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{authorName}</h3>
                      
                      {authorBio && (
                        <p className="text-gray-600 text-center mb-4">{authorBio}</p>
                      )}
                      
                      {authorSocialLinks && Object.keys(authorSocialLinks).length > 0 && (
                        <div className="flex space-x-3 rtl:space-x-reverse mt-3">
                          {authorSocialLinks.twitter && (
                            <a href={authorSocialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                              <FaTwitter size={16} />
                            </a>
                          )}
                          {authorSocialLinks.facebook && (
                            <a href={authorSocialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                              <FaFacebook size={16} />
                            </a>
                          )}
                          {authorSocialLinks.instagram && (
                            <a href={authorSocialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                              <FaInstagram size={16} />
                            </a>
                          )}
                          {authorSocialLinks.linkedin && (
                            <a href={authorSocialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                              <FaLinkedinIn size={16} />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* مكونات البحث والتصنيفات والوسوم */}
              <BlogSidebar />
              
              {/* تمت إزالة زر العودة للمدونة هنا لتجنب التكرار مع الزر الموجود في BlogSidebar */}
            </div>
          </div>
        </div>
      </Section>
      
      {/* المقالات ذات الصلة */}
      {!relatedLoading && relatedArticles && relatedArticles.length > 0 && (
        <Section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 relative">
              <div className="inline-block relative">
                <h2 className="text-3xl lg:text-4xl font-bold mb-2">{t('article.relatedArticles')}</h2>
                <div className="w-24 h-1 bg-primary mx-auto mt-3 relative">
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary-dark"></div>
                </div>
                <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
              </div>
            </div>
            <BlogSection articles={relatedArticles} isHomePage />
          </div>
        </Section>
      )}
    </main>
  );
}

export async function getServerSideProps({ params, locale }) {
  try {
    // الحصول على الـ slug أو id من المعلمات
    const { id } = params;
    
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}/api`;
    
    // جلب بيانات المقالة - استخدام الـ endpoint مباشرة
    const articleResponse = await fetch(`${apiUrl}/blog-articles/${id}?populate=*&locale=${locale}`);
    
    // إذا لم يتم العثور على المقالة، أعد توجيه إلى صفحة 404
    if (!articleResponse.ok) {
      return {
        notFound: true,
      };
    }
    
    const articleData = await articleResponse.json();
    
    // جلب المقالات ذات الصلة
    let relatedData = { data: [] };
    try {
      const relatedResponse = await fetch(`${apiUrl}/blog-articles/${articleData.data.id}/related?limit=3&populate=*&locale=${locale}`);
      
      if (relatedResponse.ok) {
        relatedData = await relatedResponse.json();
      } else if (relatedResponse.status === 404) {
        // إذا لم تكن نقطة النهاية متاحة، جلب مقالات عشوائية بدلاً من ذلك
        const randomResponse = await fetch(`${apiUrl}/blog-articles?pagination[pageSize]=3&populate=*&locale=${locale}&filters[id][$ne]=${articleData.data.id}`);
        
        if (randomResponse.ok) {
          relatedData = await randomResponse.json();
        }
      }
    } catch (error) {
      console.error('Error fetching related articles:', error);
    }
    
    return {
      props: {
        initialArticleData: articleData.data,
        initialRelatedData: relatedData.data,
      },
    };
  } catch (error) {
    console.error('Error fetching article data:', error);
    
    return {
      notFound: true,
    };
  }
}
