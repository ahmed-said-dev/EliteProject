import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

// إضافة دالة useApiUrl لاستخدامها في الدوال الأخرى
function useApiUrl() {
  return { data: 
    process.env.NEXT_PUBLIC_API_URL || 
    'http://localhost:1337' };
}

// تعريف واجهات البيانات المحدثة حسب هيكل API الجديد
export interface BlogImage {
  id: number;
  name: string;
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  previewUrl?: string;
  provider: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface Author {
  id: number;
  name: string;
  email?: string;
  bio?: string;
  avatar?: BlogImage;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface BlogArticle {
  id: number;
  documentId: string; // إضافة Document ID لـ Strapi v5
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  publishDate?: string;
  readTime?: string;
  featured?: boolean;
  viewCount?: number;
  featuredImage?: BlogImage;
  category?: Category;
  tags?: Tag[];
  author?: Author;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  localizations?: any[];
}

// دالة محسنة للحصول على مقالة واحدة تدعم تغيير اللغة الذكي
export function useBlogArticle(articleId: string | number | undefined) {
  const { locale } = useLanguage();
  
  // حالة البيانات
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [languageWarning, setLanguageWarning] = useState<string | null>(null);
  
  // تتبع المقالة الأصلية لحالة تغيير اللغة
  const originalArticleRef = useRef<BlogArticle | null>(null);
  const currentLocaleRef = useRef<string>(locale);

  useEffect(() => {
    // إذا لم يكن هناك ID، أعد تعيين الحالة
    if (!articleId) {
      setArticle(null);
      setIsLoading(false);
      setError(null);
      setLanguageWarning(null);
      originalArticleRef.current = null;
      return;
    }

    console.log(`\n🔍 Starting to fetch article: ${articleId}`);
    console.log(`🌍 Locale: ${locale}`);
    console.log(`📝 Previous locale: ${currentLocaleRef.current}`);
    
    // تحقق إذا كان هذا تغيير لغة لنفس المقالة
    const isLanguageSwitch = currentLocaleRef.current !== locale && originalArticleRef.current;
    currentLocaleRef.current = locale;
    
    // بدء عملية التحميل
    setIsLoading(true);
    setError(null);
    setLanguageWarning(null);

    const API_BASE = 'http://localhost:1337';
    
    async function fetchArticle() {
      try {
        // المحاولة 1: البحث المباشر بـ articleId في اللغة المطلوبة
        console.log(`🔍 Trying direct access in ${locale}...`);
        
        const directUrl = `${API_BASE}/api/blog-articles/${articleId}?populate=*&locale=${locale}`;
        const directResponse = await fetch(directUrl);
        
        if (directResponse.ok) {
          const responseData = await directResponse.json();
          const foundArticle = responseData.data;
          
          console.log(`✅ Direct access successful: "${foundArticle.title}"`);
          setArticle(foundArticle);
          setError(null);
          setLanguageWarning(null);
          
          // حفظ المقالة كمرجع أصلي
          if (!originalArticleRef.current || !isLanguageSwitch) {
            originalArticleRef.current = foundArticle;
          }
          
          setIsLoading(false);
          return;
        }
        
        console.log(`❌ Direct access failed (${directResponse.status})`);
        
        // المحاولة 2: إذا كان هذا تغيير لغة، ابحث عن مقالة بديلة
        if (isLanguageSwitch && originalArticleRef.current) {
          console.log(`🔄 Language switch detected, searching for equivalent article...`);
          
          const searchResponse = await fetch(`${API_BASE}/api/blog-articles?populate=*&locale=${locale}&pagination[pageSize]=100`);
          
          if (searchResponse.ok) {
            const searchData = await searchResponse.json();
            const allArticles = searchData.data || [];
            
            // البحث بالـ slug أولاً
            let equivalentArticle = allArticles.find((art: BlogArticle) => 
              art.slug === originalArticleRef.current?.slug
            );
            
            // إذا لم توجد بالـ slug، ابحث بالعنوان المشابه
            if (!equivalentArticle) {
              const originalTitle = originalArticleRef.current.title.toLowerCase();
              equivalentArticle = allArticles.find((art: BlogArticle) => 
                art.title.toLowerCase().includes(originalTitle.split(' ')[0]) ||
                originalTitle.includes(art.title.toLowerCase().split(' ')[0])
              );
            }
            
            if (equivalentArticle) {
              console.log(`✅ Found equivalent article: "${equivalentArticle.title}"`);
              setArticle(equivalentArticle);
              setError(null);
              setLanguageWarning(null);
              setIsLoading(false);
              return;
            }
          }
          
          // المحاولة 3: إذا لم توجد ترجمة، اعرض المقالة الأصلية مع تحذير
          console.log(`⚠️ No translation found, showing original with warning`);
          setArticle(originalArticleRef.current);
          setError(null);
          setLanguageWarning(
            locale === 'ar' 
              ? 'هذه المقالة غير متوفرة باللغة العربية. يتم عرض النسخة الإنجليزية.'
              : 'This article is not available in English. Showing Arabic version.'
          );
          setIsLoading(false);
          return;
        }
        
        // المحاولة 4: البحث العام في جميع المقالات (للـ ID أو slug)
        console.log(`🔍 Searching all articles for ID/slug match...`);
        
        const allArticlesResponse = await fetch(`${API_BASE}/api/blog-articles?populate=*&locale=${locale}&pagination[pageSize]=100`);
        
        if (allArticlesResponse.ok) {
          const allData = await allArticlesResponse.json();
          const articles = allData.data || [];
          
          // البحث بـ ID, documentId, أو slug
          const foundArticle = articles.find((article: BlogArticle) => 
            article.id.toString() === articleId.toString() ||
            article.documentId === articleId ||
            article.slug === articleId
          );
          
          if (foundArticle) {
            console.log(`✅ Found article by search: "${foundArticle.title}"`);
            setArticle(foundArticle);
            setError(null);
            setLanguageWarning(null);
            
            // حفظ كمرجع أصلي
            if (!originalArticleRef.current) {
              originalArticleRef.current = foundArticle;
            }
            
            setIsLoading(false);
            return;
          }
        }
        
        // لم توجد المقالة
        console.log(`❌ Article not found anywhere`);
        setError(`Article not found: ${articleId}`);
        setArticle(null);
        setLanguageWarning(null);
        
      } catch (fetchError: any) {
        console.error(`❌ Fetch error:`, fetchError.message);
        setError(fetchError.message);
        setArticle(null);
        setLanguageWarning(null);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchArticle();

  }, [articleId, locale]);

  console.log(`📈 Hook state: loading=${isLoading}, hasArticle=${!!article}, error=${error}, warning=${languageWarning}`);

  return {
    data: article,
    isLoading,
    error,
    languageWarning // تحذير عندما تكون المقالة بلغة مختلفة عن المطلوبة
  };
}

// دالة للحصول على جميع المقالات (محدثة)
export function useBlogArticles(page = 1, pageSize = 10, filters?: Record<string, any>) {
  const { locale } = useLanguage();
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    pageCount: 0,
    total: 0
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        const API_BASE = 'http://localhost:1337';
        const params = new URLSearchParams({
          'pagination[page]': page.toString(),
          'pagination[pageSize]': pageSize.toString(),
          'populate': '*',
          'locale': locale,
          'sort': 'publishDate:desc'
        });

        // إضافة الفلاتر إذا كانت موجودة
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value) {
              params.append(`filters[${key}][$eq]`, value.toString());
            }
          });
        }

        const url = `${API_BASE}/api/blog-articles?${params}`;
        console.log(`🔗 Fetching articles: ${url}`);

        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        console.log(`✅ Articles loaded: ${data.data?.length || 0} items`);
        
        setArticles(data.data || []);
        setPagination(data.meta?.pagination || pagination);
        
      } catch (err: any) {
        console.error('❌ Error fetching articles:', err.message);
        setError(err.message);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page, pageSize, locale, JSON.stringify(filters)]);

  return {
    data: articles,
    loading,
    error,
    pagination,
    refetch: () => {
      setLoading(true);
      // إعادة تحميل البيانات
    }
  };
}

// دوال مساعدة أخرى
export const getImageUrl = (image: BlogImage | undefined) => {
  if (!image?.url) return '/images/blog/default.jpg';
  
  if (image.url.startsWith('http')) {
    return image.url;
  }
  
  return `http://localhost:1337${image.url}`;
};

export const getCategoryName = (article: BlogArticle) => {
  return article?.category?.name || 'Uncategorized';
};

// دوال مساعدة إضافية للتوافق مع الكود الحالي
export const getArticleImage = (article: BlogArticle) => {
  return getImageUrl(article.featuredImage);
};

export const getAuthorImage = (article: BlogArticle) => {
  return getImageUrl(article.author?.avatar);
};

export const getAuthorName = (article: BlogArticle) => {
  return article?.author?.name || 'Unknown Author';
};

// دالة لتنسيق التاريخ
export const formatArticleDate = (dateString: string, locale: string = 'en') => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
