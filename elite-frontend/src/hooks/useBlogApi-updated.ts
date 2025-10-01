import { useState, useEffect } from 'react';
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
  publishDate: string;
  readTime: string;
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

// دالة محسنة للحصول على مقالة واحدة تدعم Document ID
export function useBlogArticle(articleId: string | number | undefined) {
  const { locale } = useLanguage();
  
  // حالة البيانات
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // إذا لم يكن هناك ID، أعد تعيين الحالة
    if (!articleId) {
      setArticle(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    console.log(`\n🔍 Starting to fetch article: ${articleId}`);
    console.log(`🌍 Locale: ${locale}`);
    
    // بدء عملية التحميل
    setIsLoading(true);
    setError(null);
    setArticle(null);

    const API_BASE = 'http://localhost:1337';
    
    // استراتيجية ذكية: جرب الـ articleId كما هو أولاً
    const directUrl = `${API_BASE}/api/blog-articles/${articleId}?populate=*&locale=${locale}`;
    
    console.log(`🔗 Trying direct URL: ${directUrl}`);

    // محاولة الوصول المباشر
    fetch(directUrl)
      .then(response => {
        console.log(`📨 Direct response: ${response.status}`);
        
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          // إذا فشل الوصول المباشر، جرب البحث في جميع المقالات
          console.log(`🔄 Direct access failed, searching in all articles...`);
          throw new Error('NOT_FOUND_DIRECT');
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      })
      .then(responseData => {
        // نجح الوصول المباشر
        console.log(`✅ Direct access successful`);
        handleSuccessResponse(responseData);
      })
      .catch(directError => {
        if (directError.message === 'NOT_FOUND_DIRECT') {
          // جرب البحث في جميع المقالات للعثور على الصحيح
          console.log(`🔍 Searching for article by ID/documentId/slug...`);
          
          fetch(`${API_BASE}/api/blog-articles?populate=*&locale=${locale}`)
            .then(response => response.json())
            .then(allArticlesData => {
              const articles = allArticlesData.data || [];
              
              // ابحث بـ ID, documentId, أو slug
              const foundArticle = articles.find((article: BlogArticle) => 
                article.id.toString() === articleId.toString() ||
                article.documentId === articleId ||
                article.slug === articleId
              );
              
              if (foundArticle) {
                console.log(`✅ Found article by search: "${foundArticle.title}"`);
                console.log(`   - ID: ${foundArticle.id}`);
                console.log(`   - Document ID: ${foundArticle.documentId}`);
                console.log(`   - Slug: ${foundArticle.slug}`);
                
                setArticle(foundArticle);
                setError(null);
              } else {
                console.log(`❌ Article not found in search results`);
                setError(`Article not found: ${articleId}`);
                setArticle(null);
              }
              
              setIsLoading(false);
            })
            .catch(searchError => {
              console.error(`❌ Search failed:`, searchError.message);
              setError(`Failed to search for article: ${searchError.message}`);
              setArticle(null);
              setIsLoading(false);
            });
        } else {
          // خطأ حقيقي في الـ API
          console.error(`❌ API Error:`, directError.message);
          setError(directError.message);
          setArticle(null);
          setIsLoading(false);
        }
      });

    function handleSuccessResponse(responseData: any) {
      console.log(`📄 Response data received`);
      
      if (responseData && responseData.data) {
        const articleData = responseData.data;
        console.log(`✅ Article loaded successfully:`);
        console.log(`   - Title: ${articleData.title}`);
        console.log(`   - ID: ${articleData.id}`);
        console.log(`   - Document ID: ${articleData.documentId}`);
        console.log(`   - Slug: ${articleData.slug}`);

        setArticle(articleData);
        setError(null);
      } else {
        console.warn(`⚠️ Invalid response structure:`, responseData);
        setError('Invalid article data received');
        setArticle(null);
      }

      setIsLoading(false);
    }

  }, [articleId, locale]);

  console.log(`📈 Hook state: loading=${isLoading}, hasArticle=${!!article}, error=${error}`);

  return {
    data: article,
    isLoading,
    error
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
