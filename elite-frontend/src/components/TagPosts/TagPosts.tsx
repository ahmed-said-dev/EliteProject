import React from 'react';
import Link from 'next/link';
// @ts-ignore
import styles from './TagPosts.module.css';

// تعريف واجهة البيانات للوسم
interface TagProps {
  name: string;
  slug: string;
  count: number;
}

// تعريف واجهة البيانات للوسوم المرتبطة بالمقالة
interface ArticleTagProps {
  name: string;
}

// تعريف واجهة البيانات للمقالة
interface BlogPostProps {
  id: number;
  title: string;
  image: string;
  excerpt: string;
  date: string;
  author: string;
  authorImage: string;
  readTime: string;
  category: string;
  tags: ArticleTagProps[];
  delay?: string;
  featured?: boolean;
}

interface TagPostsProps {
  tag: TagProps;
  posts: BlogPostProps[];
  allTags: TagProps[];
}

const TagPosts: React.FC<TagPostsProps> = ({ tag, posts, allTags }) => {
  return (
    <section className={styles.tagSection}>
      <div className={styles.container}>
        <div className={styles.tagHeader}>
          <div className={styles.tagInfo}>
            <h1 className={styles.tagTitle}>#{tag.name}</h1>
            <p className={styles.tagDescription}>
              Explore all articles tagged with <span className={styles.highlight}>#{tag.name}</span>. 
              Here you'll find expert advice, tips, and in-depth information about {tag.name.toLowerCase()} 
              to better care for your pets.
            </p>
            <div className={styles.tagMeta}>
              <span className={styles.postCount}>{posts.length} Articles</span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.postsContainer}>
            {posts.length > 0 ? (
              <div className={styles.postsGrid}>
                {posts.map((post) => (
                  <div 
                    key={post.id} 
                    className={styles.postCard}
                  >
                    <div className={styles.imageContainer}>
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className={styles.postImage} 
                      />
                      <Link href={`/media/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`} className={styles.categoryBadge}>
                        {post.category}
                      </Link>
                    </div>
                    
                    <div className={styles.postContent}>
                      <div className={styles.postMeta}>
                        <span className={styles.date}>{post.date}</span>
                        <span className={styles.dot}>•</span>
                        <span className={styles.readTime}>{post.readTime}</span>
                      </div>
                      
                      <h3 className={styles.postTitle}>
                        <Link href={`/media/${post.id}`}>{post.title}</Link>
                      </h3>
                      
                      <p className={styles.postExcerpt}>{post.excerpt}</p>
                      
                      <div className={styles.authorSection}>
                        <img 
                          src={post.authorImage} 
                          alt={post.author} 
                          className={styles.authorImage} 
                        />
                        <span className={styles.authorName}>{post.author}</span>
                      </div>
                    </div>
                    
                    <div className={styles.postFooter}>
                      <div className={styles.tagsList}>
                        {post.tags.slice(0, 2).map((postTag, index) => (
                          <Link 
                            key={index} 
                            href={`/media/tag/${postTag.name.toLowerCase().replace(/\s+/g, '-')}`} 
                            className={`${styles.tag} ${postTag.name.toLowerCase() === tag.name.toLowerCase() ? styles.activeTag : ''}`}
                          >
                            #{postTag.name}
                          </Link>
                        ))}
                      </div>
                      <Link href={`/media/${post.id}`} className={styles.btnPrimary}>
                        <i className="fas fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <div className={styles.noResultsIcon}>
                  <i className="fas fa-tag"></i>
                </div>
                <h3 className={styles.noResultsTitle}>No Articles Found</h3>
                <p className={styles.noResultsMessage}>
                  We couldn't find any articles with the tag "#{tag.name}". Please check out other tags or browse all our articles.
                </p>
                <Link href="/media" className={styles.backToAllBtn}>
                  View All Articles
                </Link>
              </div>
            )}
          </div>
          
          <div className={styles.sidebar}>
            <div className={styles.sidebarWidget}>
              <h3 className={styles.widgetTitle}>Popular Tags</h3>
              <div className={styles.tagCloud}>
                {allTags
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 20)
                  .map((tagItem) => (
                    <Link 
                      key={tagItem.slug} 
                      href={`/media/tag/${tagItem.slug}`}
                      className={`${styles.tagItem} ${tagItem.slug === tag.slug ? styles.activeTag : ''}`}
                    >
                      #{tagItem.name} 
                      <span className={styles.tagCount}>({tagItem.count})</span>
                    </Link>
                  ))}
              </div>
            </div>
            
            <div className={styles.sidebarWidget}>
              <div className={styles.consultation}>
                <h3 className={styles.consultationTitle}>Need Professional Advice?</h3>
                <p className={styles.consultationText}>
                  Our experienced veterinarians are here to help with all your pet health concerns.
                </p>
                <Link href="/contact" className={styles.consultationBtn}>
                  Schedule a Consultation
                </Link>
              </div>
            </div>
            
            <div className={styles.sidebarWidget}>
              <h3 className={styles.widgetTitle}>Subscribe</h3>
              <p className={styles.subscribeText}>
                Stay updated with our latest articles and pet care tips.
              </p>
              <form className={styles.subscribeForm}>
                <input type="email" placeholder="Your Email" className={styles.subscribeInput} required />
                <button type="submit" className={styles.subscribeBtn}>Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TagPosts;
