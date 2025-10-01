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
  unifiedSlug?: string; // Slug موحد للربط بين اللغات
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

// دالة موحدة للحصول على مقالة بطريقة مشابهة للخدمات
export function useBlogArticle(id: string | number | undefined) {
  const { locale } = useLanguage();
  
  // حالة البيانات
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // إذا لم يكن هناك ID، أعد تعيين الحالة
    if (!id) {
      setArticle(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    console.log(`\n🔍 [useBlogArticle] Fetching article: ${id}`);
    console.log(`🌍 [useBlogArticle] Locale: ${locale}`);
    
    // بدء عملية التحميل
    setIsLoading(true);
    setError(null);

    const API_BASE = 'http://localhost:1337';
    
    async function fetchUnifiedArticle() {
      try {
        // الإستراتيجية 1: البحث بـ documentId (مثل الخدمات تماماً)
        console.log(`🔍 [useBlogArticle] Strategy 1: Search by documentId with locale`);
        let searchUrl = `${API_BASE}/api/blog-articles?filters[documentId][$eq]=${id}&locale=${locale}&populate=*`;
        console.log(`🔍 [useBlogArticle] URL: ${searchUrl}`);
        
        let response = await fetch(searchUrl);
        
        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            console.log(`✅ [useBlogArticle] Found by documentId: "${data.data[0].title}"`);
            setArticle(data.data[0]);
            setError(null);
            setIsLoading(false);
            return;
          }
        }

        // الإستراتيجية 2: البحث المباشر بـ documentId (للتوافق مع القديم)
        console.log(`🔍 [useBlogArticle] Strategy 2: Direct access by documentId`);
        const directUrl = `${API_BASE}/api/blog-articles/${id}?locale=${locale}&populate=*`;
        response = await fetch(directUrl);
        
        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            console.log(`✅ [useBlogArticle] Found by direct access: "${data.data.title}"`);
            setArticle(data.data);
            setError(null);
            setIsLoading(false);
            return;
          }
        }

        // الإستراتيجية 3: البحث بـ slug (للتوافق مع الحالي)
        console.log(`🔍 [useBlogArticle] Strategy 3: Search by slug`);
        searchUrl = `${API_BASE}/api/blog-articles?filters[slug][$eq]=${id}&locale=${locale}&populate=*`;
        response = await fetch(searchUrl);
        
        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            console.log(`✅ [useBlogArticle] Found by slug: "${data.data[0].title}"`);
            setArticle(data.data[0]);
            setError(null);
            setIsLoading(false);
            return;
          }
        }

        // الإستراتيجية 4: البحث في جميع المقالات
        console.log(`🔍 [useBlogArticle] Strategy 4: Search all articles`);
        const allUrl = `${API_BASE}/api/blog-articles?locale=${locale}&populate=*&pagination[pageSize]=100`;
        response = await fetch(allUrl);
        
        if (response.ok) {
          const data = await response.json();
          const articles = data.data || [];
          
          // البحث بـ ID, documentId, أو slug
          const foundArticle = articles.find((article: BlogArticle) => 
            article.id.toString() === id.toString() ||
            article.documentId === id ||
            article.slug === id ||
            article.unifiedSlug === id
          );
          
          if (foundArticle) {
            console.log(`✅ [useBlogArticle] Found in search: "${foundArticle.title}"`);
            setArticle(foundArticle);
            setError(null);
            setIsLoading(false);
            return;
          }
        }

        // الإستراتيجية 5: إذا لم توجد، ابحث في اللغة الأخرى وأعد تحديد التوجه
        console.log(`🔍 [useBlogArticle] Strategy 5: Cross-language search`);
        const otherLocale = locale === 'ar' ? 'en' : 'ar';
        const crossUrl = `${API_BASE}/api/blog-articles?locale=${otherLocale}&populate=*&pagination[pageSize]=100`;
        response = await fetch(crossUrl);
        
        if (response.ok) {
          const data = await response.json();
          const articles = data.data || [];
          
          const originalArticle = articles.find((article: BlogArticle) => 
            article.id.toString() === id.toString() ||
            article.documentId === id ||
            article.slug === id
          );
          
          if (originalArticle) {
            console.log(`🔄 [useBlogArticle] Found in ${otherLocale}, redirecting...`);
            // البحث عن المقالة المقابلة في اللغة المطلوبة
            const equivalentSlug = originalArticle.unifiedSlug || originalArticle.slug;
            
            // إعادة البحث بـ slug موحد
            const redirectUrl = `${API_BASE}/api/blog-articles?filters[slug][$eq]=${equivalentSlug}&locale=${locale}&populate=*`;
            const redirectResponse = await fetch(redirectUrl);
            
            if (redirectResponse.ok) {
              const redirectData = await redirectResponse.json();
              if (redirectData.data && redirectData.data.length > 0) {
                console.log(`✅ [useBlogArticle] Found equivalent: "${redirectData.data[0].title}"`);
                setArticle(redirectData.data[0]);
                setError(null);
                setIsLoading(false);
                return;
              }
            }
          }
        }

        // لم توجد المقالة
        console.log(`❌ [useBlogArticle] Article not found: ${id}`);
        setError(`Article not found: ${id}`);
        setArticle(null);
        
      } catch (fetchError: any) {
        console.error(`❌ [useBlogArticle] Fetch error:`, fetchError.message);
        setError(fetchError.message);
        setArticle(null);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchUnifiedArticle();

  }, [id, locale]);

  console.log(`📈 [useBlogArticle] State: loading=${isLoading}, hasArticle=${!!article}, error=${error}`);

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
        console.log(`🔗 [useBlogArticles] Fetching: ${url}`);

        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        console.log(`✅ [useBlogArticles] Loaded: ${data.data?.length || 0} items`);
        
        setArticles(data.data || []);
        setPagination(data.meta?.pagination || pagination);
        
      } catch (err: any) {
        console.error('❌ [useBlogArticles] Error:', err.message);
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

// دالة للحصول على التصنيفات
export function useBlogCategories() {
  const { locale } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const API_BASE = 'http://localhost:1337';
        const url = `${API_BASE}/api/categories?locale=${locale}&populate=*`;
        
        console.log(`🔗 [useBlogCategories] Fetching: ${url}`);

        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        console.log(`✅ [useBlogCategories] Loaded: ${data.data?.length || 0} categories`);
        
        setCategories(data.data || []);
        
      } catch (err: any) {
        console.error('❌ [useBlogCategories] Error:', err.message);
        setError(err.message);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [locale]);

  return {
    categories,
    loading,
    error
  };
}

// دالة للحصول على الوسوم
export function useBlogTags() {
  const { locale } = useLanguage();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        setError(null);

        const API_BASE = 'http://localhost:1337';
        const url = `${API_BASE}/api/tags?locale=${locale}&populate=*`;
        
        console.log(`🔗 [useBlogTags] Fetching: ${url}`);

        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        console.log(`✅ [useBlogTags] Loaded: ${data.data?.length || 0} tags`);
        
        setTags(data.data || []);
        
      } catch (err: any) {
        console.error('❌ [useBlogTags] Error:', err.message);
        setError(err.message);
        setTags([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [locale]);

  return {
    tags,
    loading,
    error
  };
}
