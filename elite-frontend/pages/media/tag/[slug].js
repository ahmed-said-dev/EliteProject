import { useRouter } from 'next/router';
import { Section } from '@/components/ui/Section';
import PageBanner from '@/components/PageBanner/PageBanner';
import TagPosts from '@/components/TagPosts';
import { blogPosts } from '@/components/BlogSection/BlogSection';

export default function TagPage() {
  const router = useRouter();
  const { slug } = router.query;
  
  // إذا كان المعرف غير متوفر بعد (أثناء SSR أو التحميل الأولي)
  if (!slug) {
    return (
      <main>
        <PageBanner
          title="Loading..."
          backgroundImage="/images/banner/bnr1.webp"
        />
        <Section className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4">Loading articles...</h2>
          </div>
        </Section>
      </main>
    );
  }
  
  // استرجاع اسم الوسم من المعرف (تحويل ما بعد الشرطة إلى مسافات)
  const tagName = slug.replace(/-/g, ' ');
  
  // تصفية المقالات المتعلقة بهذا الوسم
  const tagPosts = blogPosts.filter(post => {
    return post.tags.some(tag => 
      tag.name.toLowerCase() === tagName.toLowerCase() ||
      tag.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
    );
  });
  
  // تجميع كل الوسوم المتاحة من المقالات مع عدد المقالات لكل وسم
  const allTagsWithCounts = {};
  blogPosts.forEach(post => {
    post.tags.forEach(tag => {
      const tagSlug = tag.name.toLowerCase().replace(/\s+/g, '-');
      if (!allTagsWithCounts[tagSlug]) {
        allTagsWithCounts[tagSlug] = {
          name: tag.name,
          slug: tagSlug,
          count: 1
        };
      } else {
        allTagsWithCounts[tagSlug].count++;
      }
    });
  });
  
  const allTags = Object.values(allTagsWithCounts);
  
  // إذا لم يتم العثور على وسم أو لم تكن هناك مقالات
  if (tagPosts.length === 0) {
    return (
      <main>
        <PageBanner 
          title={`#${tagName}`}
          backgroundImage="/images/banner/bnr1.webp"
        />
        <Section className="py-16">
          <div className="container mx-auto">
            <TagPosts 
              tag={{ name: tagName, slug: slug, count: 0 }} 
              posts={[]} 
              allTags={allTags} 
            />
          </div>
        </Section>
      </main>
    );
  }
  
  return (
    <main>
      <PageBanner 
        title={`#${tagName}`}
        backgroundImage="/images/banner/bnr1.webp"
      />
      <Section className="py-16">
        <div className="container mx-auto">
          <TagPosts 
            tag={{ name: tagName, slug: slug, count: tagPosts.length }} 
            posts={tagPosts} 
            allTags={allTags} 
          />
        </div>
      </Section>
    </main>
  );
}
