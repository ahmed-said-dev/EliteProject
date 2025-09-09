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
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export interface Author {
  id: number;
  name: string;
  bio?: string;
  email?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    website?: string;
    [key: string]: string | undefined;
  };
  avatar?: BlogImage;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  articlesCount?: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface BlogArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  publishDate: string;
  readTime: string;
  featured?: boolean;
  viewCount?: number;
  featuredImage: BlogImage;
  category: Category;
  tags: Tag[];
  author: Author;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  localizations?: any[];
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: PaginationInfo;
}

export interface ApiResponse<T> {
  data: T;
  meta: Meta;
}

// خطأ API
export interface ApiError {
  error: {
    status: number;
    name: string;
    message: string;
    details?: any;
  };
}

// حالة جلب البيانات
export interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

// استخراج صورة المقال بشكل آمن مع صورة احتياطية
export const getArticleImage = (article: BlogArticle): string => {
  if (!article?.featuredImage) return '/images/blog/placeholder.jpg';
  
  // إذا كان URL يحتوي على http أو https، فاستخدمه كما هو
  if (article.featuredImage.url?.startsWith('http')) {
    return article.featuredImage.url;
  }
  
  // لو كان يبدأ بـ / (نسبي) نضيف له عنوان الباك إند
  return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}${article.featuredImage.url}`;
};

// استخراج صورة المؤلف بشكل آمن مع صورة احتياطية
export const getAuthorImage = (article: BlogArticle): string => {
  if (!article?.author?.avatar?.url) return '/images/avatars/placeholder.jpg';
  
  // إذا كان URL يحتوي على http أو https، فاستخدمه كما هو
  if (article.author.avatar.url.startsWith('http')) {
    return article.author.avatar.url;
  }
  
  // لو كان يبدأ بـ / (نسبي) نضيف له عنوان الباك إند
  return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}${article.author.avatar.url}`;
};

// استخراج اسم المؤلف بشكل آمن
export const getAuthorName = (article: BlogArticle): string => {
  return article?.author?.name || 'Unknown Author';
};

// استخراج اسم التصنيف بشكل آمن
export const getCategoryName = (article: BlogArticle): string => {
  return article?.category?.name || 'Uncategorized';
};

// تحديث دالة useBlogArticles لدعم التصفية حسب التصنيف والوسم
export function useBlogArticles(page = 1, pageSize = 10, filters?: Record<string, any>) {
  const { data: apiUrl } = useApiUrl();
  const { locale } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    pageCount: 0,
    total: 0,
    page: 1,
    pageSize: 10,
  });

  // تحويل filters إلى سلسلة JSON ثابتة لمنع إعادة استدعاء useEffect بشكل متكرر
  const filtersString = JSON.stringify(filters);

  useEffect(() => {
    // إنشاء متغير للتحكم في إلغاء الطلب في حالة إلغاء المكون
    let isActive = true;

    const fetchArticles = async () => {
      try {
        setLoading(true);
        
        // بناء عنوان URL مع المرشحات
        let url = `${apiUrl}/api/blog-articles?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&locale=${locale}`;
        
        // إضافة مرشح التصنيف
        if (filters?.category) {
          url += `&filters[category][id][$eq]=${filters.category}`;
        }
        
        // إضافة مرشح الوسم
        if (filters?.tag) {
          url += `&filters[tags][id][$eq]=${filters.tag}`;
        }
        
        // إضافة مرشح البحث
        if (filters?.search) {
          url += `&filters[$or][0][title][$containsi]=${encodeURIComponent(filters.search)}`;
          url += `&filters[$or][1][content][$containsi]=${encodeURIComponent(filters.search)}`;
        }

        // استخدام AbortController للتحكم في إلغاء الطلب
        const controller = new AbortController();
        const signal = controller.signal;

        const response = await fetch(url, { signal });
        
        // التحقق من أن المكون لا يزال نشطاً
        if (!isActive) return;
        
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        
        const data = await response.json();
        
        // التحقق مرة أخرى من أن المكون لا يزال نشطاً
        if (!isActive) return;
        
        setArticles(Array.isArray(data) ? data : data.data || []);
        
        if (data.meta?.pagination) {
          setPagination(data.meta.pagination);
        }
        setError(null);
      } catch (err) {
        // تجاهل أخطاء الإلغاء
        if (err.name === 'AbortError') return;
        
        if (isActive) {
          console.error('Error fetching blog articles:', err);
          setError(err instanceof Error ? err : new Error('Unknown error occurred'));
          setArticles([]);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    if (apiUrl) {
      fetchArticles();
    }
    
    // دالة التنظيف لإلغاء الاشتراك عند إلغاء التثبيت
    return () => {
      isActive = false;
    };
  }, [apiUrl, locale, page, pageSize, filtersString]); // استخدام filtersString بدلاً من filters

  return { articles, loading, error, pagination };
}

// دالة للحصول على مقالة واحدة باستخدام المعرف أو الـ slug
export function useBlogArticle(id: string | number | undefined, initialData?: any) {
  const { locale } = useLanguage();
  const [data, setData] = useState<any>(initialData || null);
  const [isLoading, setIsLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    // إعادة تعيين حالة التحميل إذا تغير المعرف
    if (!initialData) {
      setIsLoading(true);
    }

    // استدعاء مباشر للـ endpoint بالمعرف
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}/api/blog-articles/${id}?populate=*&locale=${locale}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((responseData) => {
        if (responseData && responseData.data) {
          setData(responseData.data);
        } else {
          setError('No article found');
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching blog article:', err);
        setError(err.message || 'Failed to fetch blog article');
        setIsLoading(false);
      });
  }, [id, locale, initialData]);

  return { data, isLoading, error };
}

// دالة للحصول على المقالات ذات الصلة
export function useRelatedArticles(articleId: string | number | undefined, limit = 3, initialData = null) {
  const [state, setState] = useState<FetchState<BlogArticle[]>>({
    data: initialData || null,
    isLoading: !initialData,
    error: null,
  });
  const { locale } = useLanguage();

  useEffect(() => {
    if (!articleId) {
      setState({
        data: null,
        isLoading: false,
        error: 'معرف المقالة غير محدد',
      });
      return;
    }

    // إذا كانت لدينا بيانات أولية، فلا نحتاج إلى جلب البيانات مرة أخرى
    if (initialData) {
      setState({
        data: initialData,
        isLoading: false,
        error: null
      });
      return;
    }

    const fetchRelatedArticles = async () => {
      setState(prev => ({ ...prev, isLoading: true }));
      try {
        const queryParams = new URLSearchParams({
          'limit': limit.toString(),
          'locale': locale,
          'populate': '*'
        });

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}/api/blog-articles/${articleId}/related?${queryParams}`
        );

        if (!response.ok) {
          // إذا لم تكن الإضافة مدعومة، نستخدم طريقة بديلة
          if (response.status === 404) {
            // جلب مقالات عشوائية بدلاً من ذلك
            return await fetchRandomArticles(articleId, limit);
          }
          
          const errorData: ApiError = await response.json();
          throw new Error(errorData.error?.message || 'حدث خطأ أثناء جلب المقالات ذات الصلة');
        }

        const responseData = await response.json();
        setState({
          data: responseData.data,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState({
          data: null,
          isLoading: false,
          error: error instanceof Error ? error.message : 'حدث خطأ غير متوقع',
        });
      }
    };

    // دالة بديلة لجلب مقالات عشوائية إذا لم تكن الـ related endpoint مدعومة
    const fetchRandomArticles = async (excludeId: string | number, limit: number) => {
      try {
        const queryParams = new URLSearchParams({
          'pagination[pageSize]': limit.toString(),
          'locale': locale,
          'populate': '*',
          'filters[id][$ne]': excludeId.toString()
        });

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}/api/blog-articles?${queryParams}`
        );

        if (!response.ok) {
          const errorData: ApiError = await response.json();
          throw new Error(errorData.error?.message || 'حدث خطأ أثناء جلب المقالات البديلة');
        }

        const responseData = await response.json();
        setState({
          data: responseData.data,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState({
          data: null,
          isLoading: false,
          error: error instanceof Error ? error.message : 'حدث خطأ غير متوقع',
        });
      }
    };

    fetchRelatedArticles();
  }, [articleId, limit, locale, initialData]);

  return state;
}

// دالة للحصول على فئات المدونة
export function useBlogCategories() {
  const { data: apiUrl } = useApiUrl();
  const { locale } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    // إنشاء متغير للتحكم في إلغاء الطلب في حالة إلغاء المكون
    let isActive = true;

    const fetchCategories = async () => {
      try {
        setLoading(true);
        
        // جلب التصنيفات مع عدد المقالات المرتبطة بكل تصنيف
        const response = await fetch(`${apiUrl}/api/blog-categories?populate[articles][count]=true&locale=${locale}`);
        
        // التحقق من أن المكون لا يزال نشطاً
        if (!isActive) return;
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const data = await response.json();
        
        // التحقق مرة أخرى من أن المكون لا يزال نشطاً
        if (!isActive) return;
        
        // جلب عدد المقالات لكل تصنيف بشكل منفصل
        const categoriesWithCounts = await Promise.all(
          (Array.isArray(data) ? data : data.data || []).map(async (category) => {
            if (!isActive) return category;
            
            try {
              // استعلام للحصول على عدد المقالات في هذا التصنيف
              const countResponse = await fetch(
                `${apiUrl}/api/blog-articles?filters[category][id][$eq]=${category.id}&pagination[pageSize]=1&pagination[page]=1&locale=${locale}`
              );
              
              if (!isActive) return category;
              
              if (countResponse.ok) {
                const countData = await countResponse.json();
                // إضافة عدد المقالات إلى كائن التصنيف
                return {
                  ...category,
                  articlesCount: countData.meta?.pagination?.total || 0
                };
              }
            } catch (err) {
              console.error(`Error fetching articles count for category ${category.id}:`, err);
            }
            
            return category;
          })
        );
        
        if (!isActive) return;
        
        setCategories(categoriesWithCounts);
        setError(null);
      } catch (err) {
        // تجاهل أخطاء الإلغاء
        if (err.name === 'AbortError') return;
        
        if (isActive) {
          console.error('Error fetching blog categories:', err);
          setError(err instanceof Error ? err : new Error('Unknown error occurred'));
          setCategories([]);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    if (apiUrl) {
      fetchCategories();
    }
    
    // دالة التنظيف لإلغاء الاشتراك عند إلغاء التثبيت
    return () => {
      isActive = false;
    };
  }, [apiUrl, locale]);

  return { categories, loading, error };
}

// دالة للحصول على علامات المدونة
export function useBlogTags() {
  const { data: apiUrl } = useApiUrl();
  const { locale } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [tags, setTags] = useState<any[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/api/blog-tags?populate=*&locale=${locale}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tags');
        }
        const data = await response.json();
        setTags(Array.isArray(data) ? data : data.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog tags:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        setTags([]);
      } finally {
        setLoading(false);
      }
    };

    if (apiUrl) {
      fetchTags();
    }
  }, [apiUrl, locale]);

  return { tags, loading, error };
}
