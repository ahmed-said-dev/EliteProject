import { useRouter } from 'next/router';
import { Section } from '@/components/ui/Section';
import PageBanner from '@/components/PageBanner/PageBanner';
import CategoryPosts from '@/components/CategoryPosts';
import { blogPosts } from '@/components/BlogSection/BlogSection';

// قائمة التصنيفات المتاحة مع عدد المقالات لكل منها
const categories = [
  { name: 'Nutrition', slug: 'nutrition', count: 5 },
  { name: 'Preventative Care', slug: 'preventative-care', count: 8 },
  { name: 'Pet Behavior', slug: 'behavior', count: 3 },
  { name: 'Emergency Care', slug: 'emergency-care', count: 4 },
  { name: 'Senior Pet Care', slug: 'senior-pet-care', count: 6 },
  { name: 'Dental Health', slug: 'dental-health', count: 2 },
  { name: 'Adoption', slug: 'adoption', count: 2 },
  { name: 'Exercise', slug: 'exercise', count: 1 },
  { name: 'Seasonal Care', slug: 'seasonal-care', count: 1 },
];

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;
  
  // البحث عن التصنيف الحالي من خلال المُعرف في الرابط
  const category = categories.find(cat => cat.slug === slug);
  
  // تصفية المقالات لإظهار المقالات التي تنتمي إلى التصنيف الحالي فقط
  const categoryPosts = blogPosts.filter(post => {
    const postCategorySlug = post.category.toLowerCase().replace(/\s+/g, '-');
    return postCategorySlug === slug;
  });
  
  // إذا لم يتم العثور على التصنيف أو لم تكن هناك مقالات
  if (!category && typeof window !== 'undefined') {
    return (
      <main>
        <PageBanner 
          title="Category Not Found"
          backgroundImage="/images/banner/bnr1.webp"
        />
        <Section className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4">Category not found</h2>
            <p className="mb-6">The category you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={() => router.push('/media')}
              className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark"
            >
              Return to Blog
            </button>
          </div>
        </Section>
      </main>
    );
  }
  
  return (
    <main>
      {category && (
        <>
          <PageBanner 
            title={`${category.name} Articles`}
            backgroundImage="/images/banner/bnr1.webp"
          />
          <CategoryPosts category={category} posts={categoryPosts} allCategories={categories} />
        </>
      )}
    </main>
  );
}
