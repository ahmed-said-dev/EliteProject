import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaSearch, FaTag, FaFolder, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useBlogCategories, useBlogTags } from '@/hooks/useBlogApi';
import { useLanguage } from '@/context/LanguageContext';
import Loader from '@/components/ui/Loader';

interface BlogSidebarProps {
  activeCategoryId?: string | number;
  activeTagId?: string | number;
  searchQuery?: string;
  className?: string;
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({ 
  activeCategoryId, 
  activeTagId,
  searchQuery = '',
  className = '' 
}) => {
  const { categories, loading: loadingCategories } = useBlogCategories();
  const { tags, loading: loadingTags } = useBlogTags();
  const { t, locale } = useLanguage();
  const router = useRouter();
  const [search, setSearch] = useState(searchQuery);
  const isRTL = locale === 'ar';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push({
        pathname: '/media',
        query: { ...router.query, search: search.trim(), page: 1 }
      });
    } else {
      // إزالة معلمة البحث إذا كان حقل البحث فارغًا
      const { search, ...restQuery } = router.query;
      router.push({
        pathname: '/media',
        query: { ...restQuery, page: 1 }
      });
    }
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* مربع البحث */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
        <div className="bg-gradient-to-r from-primary-dark to-primary p-4 text-white">
          <h3 className="text-xl font-bold">{t('blogSidebar.search')}</h3>
        </div>
        <div className="p-5">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('blogSidebar.searchPlaceholder')}
              className="w-full py-2 px-4 pr-10 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            />
            <button 
              type="submit"
              className="absolute inset-y-0 right-0 rtl:left-0 rtl:right-auto px-3 flex items-center text-gray-500 hover:text-primary"
            >
              <FaSearch />
            </button>
          </form>
        </div>
      </div>

      {/* تصنيفات المدونة */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
        <div className="bg-gradient-to-r from-primary-dark to-primary p-4 text-white">
          <h3 className="text-xl font-bold">{t('blogSidebar.categories')}</h3>
        </div>
        <div className="p-5">
          {loadingCategories ? (
            <div className="flex justify-center py-4">
              <Loader size="small" />
            </div>
          ) : (
            <ul className="space-y-2">
              {categories && categories.length > 0 ? (
                <>
                  <li>
                    <Link 
                      href="/media"
                      className={`flex items-center py-2 px-3 rounded-lg transition-colors hover:bg-gray-100 ${!activeCategoryId ? 'bg-gray-100 text-primary font-medium' : ''}`}
                    >
                      <FaFolder className={`${isRTL ? 'ml-2' : 'mr-2'} text-primary/70`} />
                      {t('blogSidebar.allCategories')}
                    </Link>
                  </li>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link 
                        href={`/media?category=${category.id}`}
                        className={`flex items-center py-2 px-3 rounded-lg transition-colors hover:bg-gray-100 ${activeCategoryId === category.id.toString() ? 'bg-gray-100 text-primary font-medium' : ''}`}
                      >
                        <FaFolder className={`${isRTL ? 'ml-2' : 'mr-2'} text-primary/70`} />
                        {category.attributes?.name || category.name}
                        <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          {category.articlesCount || category.attributes?.articles?.data?.length || 0}
                        </span>
                      </Link>
                    </li>
                  ))}
                </>
              ) : (
                <div className="text-center py-4 text-gray-500">{t('blogSidebar.noCategories')}</div>
              )}
            </ul>
          )}
        </div>
      </div>

      {/* وسوم المدونة */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
        <div className="bg-gradient-to-r from-primary-dark to-primary p-4 text-white">
          <h3 className="text-xl font-bold">{t('blogSidebar.tags')}</h3>
        </div>
        <div className="p-5">
          {loadingTags ? (
            <div className="flex justify-center py-4">
              <Loader size="small" />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {tags && tags.length > 0 ? (
                <>
                  <Link 
                    href="/media"
                    className={`inline-flex items-center py-1.5 px-3 rounded-full text-sm ${!activeTagId ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                  >
                    {t('blogSidebar.allTags')}
                  </Link>
                  {tags.map((tag) => (
                    <Link 
                      key={tag.id}
                      href={`/media?tag=${tag.id}`}
                      className={`inline-flex items-center py-1.5 px-3 rounded-full text-sm ${activeTagId === tag.id.toString() ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                    >
                      <FaTag className={`${isRTL ? 'ml-1.5' : 'mr-1.5'} text-xs`} />
                      {tag.attributes?.name || tag.name}
                    </Link>
                  ))}
                </>
              ) : (
                <div className="text-center py-4 w-full text-gray-500">{t('blogSidebar.noTags')}</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* زر العودة للمدونة */}
      <div>
        <button 
          onClick={() => router.push('/media')}
          className="w-full p-4 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group mt-4"
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
            <span className="text-white text-lg">{t('article.viewAllArticles')}</span>
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 text-white transition-all duration-300 group-hover:bg-white group-hover:text-primary">
              {isRTL ? <FaArrowLeft size={12} /> : <FaArrowRight size={12} />}
            </span>
          </div>
          
          {/* هالة الضوء */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-2/3 h-20 bg-white/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </button>
      </div>
    </div>
  );
};

export default BlogSidebar;
