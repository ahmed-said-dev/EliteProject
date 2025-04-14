import { useRouter } from 'next/router';
import { Section } from '@/components/ui/Section';
import PageBanner from '@/components/PageBanner/PageBanner';
import BlogDetail from '@/components/BlogDetail';
import RelatedPosts from '@/components/RelatedPosts';
import { blogPosts } from '@/components/BlogSection/BlogSection';

export default function BlogDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const postId = parseInt(id);
  const post = blogPosts.find(post => post.id === postId);
  
  // Get 3 related posts (excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.id !== postId)
    .sort(() => 0.5 - Math.random()) // Random sort
    .slice(0, 3);
  
  if (!post && typeof window !== 'undefined') {
    return (
      <main>
        <PageBanner 
          title="Post Not Found"
          backgroundImage="/images/banner/bnr1.webp"
        />
        <Section className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4">Post not found</h2>
            <p className="mb-6">The post you're looking for doesn't exist or has been removed.</p>
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
      {post && (
        <>
          <PageBanner 
            title={post.title}
            backgroundImage="/images/banner/bnr1.webp"
          />
          <BlogDetail post={post} />
          <RelatedPosts posts={relatedPosts} />
        </>
      )}
    </main>
  );
}
