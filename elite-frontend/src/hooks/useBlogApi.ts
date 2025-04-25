import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

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

// دالة للحصول على قائمة المقالات
export function useBlogArticles(page = 1, pageSize = 10, initialData = null, filters?: Record<string, any>) {
  const [state, setState] = useState<FetchState<ApiResponse<BlogArticle[]>>>({
    data: initialData || null,
    isLoading: !initialData,
    error: null,
  });
  const { locale } = useLanguage();

  useEffect(() => {
    // إذا كانت لدينا بيانات أولية وهذا هو الطلب الأول (الصفحة 1)، فلا نحتاج إلى جلب البيانات مرة أخرى
    if (initialData && page === 1 && !filters) {
      setState({
        data: initialData,
        isLoading: false,
        error: null
      });
      return;
    }

    const fetchArticles = async () => {
      setState(prev => ({ ...prev, isLoading: true }));
      try {
        // بناء معلمات الاستعلام
        const queryParams = new URLSearchParams({
          'pagination[page]': page.toString(),
          'pagination[pageSize]': pageSize.toString(),
          'locale': locale,
          'populate': '*'
        });

        // إضافة مرشحات إضافية إذا كانت موجودة
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            queryParams.append(`filters[${key}]`, value.toString());
          });
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}/api/blog-articles?${queryParams}`);
        
        if (!response.ok) {
          const errorData: ApiError = await response.json();
          throw new Error(errorData.error?.message || 'حدث خطأ أثناء جلب المقالات');
        }
        
        const data: ApiResponse<BlogArticle[]> = await response.json();
        setState({
          data,
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

    fetchArticles();
  }, [page, pageSize, JSON.stringify(filters), locale, initialData]);

  return state;
}

// الحصول على مقالة واحدة باستخدام المعرف أو الـ slug
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
export function useBlogCategories(initialData = null) {
  const [state, setState] = useState<FetchState<Category[]>>({
    data: initialData || null,
    isLoading: !initialData,
    error: null,
  });
  const { locale } = useLanguage();

  useEffect(() => {
    // إذا كانت لدينا بيانات أولية، فلا نحتاج إلى جلب البيانات مرة أخرى
    if (initialData) {
      setState({
        data: initialData,
        isLoading: false,
        error: null
      });
      return;
    }

    const fetchCategories = async () => {
      setState(prev => ({ ...prev, isLoading: true }));
      try {
        const queryParams = new URLSearchParams({
          'locale': locale,
          'sort[0]': 'name:asc'
        });

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}/api/blog-categories?${queryParams}`
        );

        if (!response.ok) {
          const errorData: ApiError = await response.json();
          throw new Error(errorData.error?.message || 'حدث خطأ أثناء جلب التصنيفات');
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

    fetchCategories();
  }, [locale, initialData]);

  return state;
}

// دالة للحصول على علامات المدونة
export function useBlogTags(initialData = null) {
  const [state, setState] = useState<FetchState<Tag[]>>({
    data: initialData || null,
    isLoading: !initialData,
    error: null,
  });
  const { locale } = useLanguage();

  useEffect(() => {
    // إذا كانت لدينا بيانات أولية، فلا نحتاج إلى جلب البيانات مرة أخرى
    if (initialData) {
      setState({
        data: initialData,
        isLoading: false,
        error: null
      });
      return;
    }

    const fetchTags = async () => {
      setState(prev => ({ ...prev, isLoading: true }));
      try {
        const queryParams = new URLSearchParams({
          'locale': locale,
          'sort[0]': 'name:asc'
        });

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}/api/blog-tags?${queryParams}`
        );

        if (!response.ok) {
          const errorData: ApiError = await response.json();
          throw new Error(errorData.error?.message || 'حدث خطأ أثناء جلب العلامات');
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

    fetchTags();
  }, [locale, initialData]);

  return state;
}
