import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import PageBanner from '@/components/PageBanner/PageBanner';
import MediaHero from '@/components/MediaHero';
import BlogSection from '@/components/BlogSection';
import { useLanguage } from '@/context/LanguageContext';
import { useBlogArticles } from '@/hooks/useBlogApi';

export default function Media({ initialData }) {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const { data, isLoading, error } = useBlogArticles(currentPage, pageSize, initialData);
  
  const blogArticles = data?.data || [];
  const totalPages = data?.meta?.pagination?.pageCount || 0;
  
  return (
    <main>
      <PageBanner 
        title={t('pageBanner.media.title')}
        backgroundImage="https://images.unsplash.com/photo-1536500152107-01ab1422f932?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      />
      <MediaHero />
      <BlogSection articles={blogArticles} />
      
      {/* Pagination */}
      {totalPages > 1 && (
        <Section className="py-8">
          <div className="container mx-auto flex justify-center">
            <div className="flex space-x-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark'}`}
              >
                {t('pagination.previous')}
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-md ${currentPage === i + 1 ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark'}`}
              >
                {t('pagination.next')}
              </button>
            </div>
          </div>
        </Section>
      )}
    </main>
  );
}

export async function getServerSideProps({ locale }) {
  try {
    // تهيئة URL للحصول على المقالات
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}/api/blog-articles`;
    
    // بناء معلمات الاستعلام
    const queryParams = new URLSearchParams({
      'pagination[page]': '1',
      'pagination[pageSize]': '20',
      'locale': locale,
      'populate': '*'
    });
    
    // جلب البيانات من الباك إند
    const response = await fetch(`${apiUrl}?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const initialData = await response.json();
    
    return {
      props: {
        initialData,
      },
    };
  } catch (error) {
    console.error('Error fetching blog data:', error);
    
    return {
      props: {
        initialData: null,
      },
    };
  }
}
