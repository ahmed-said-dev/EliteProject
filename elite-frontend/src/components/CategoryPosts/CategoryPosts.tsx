import React from 'react';
import Link from 'next/link';
// @ts-ignore
import styles from './CategoryPosts.module.css';

// تعريف واجهة البيانات للتصنيف
interface CategoryProps {
  name: string;
  slug: string;
  count: number;
}

// تعريف واجهة البيانات للوسوم
interface TagProps {
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
  tags: TagProps[];
  delay?: string;
  featured?: boolean;
}

interface CategoryPostsProps {
  category: CategoryProps;
  posts: BlogPostProps[];
  allCategories: CategoryProps[];
}

const CategoryPosts: React.FC<CategoryPostsProps> = ({ category, posts, allCategories }) => {
  return (
    <section className={styles.categorySection}>
      <div className={styles.container}>
        <div className={styles.categoryHeader}>
          <div className={styles.categoryInfo}>
            <h1 className={styles.categoryTitle}>{category.name}</h1>
            <p className={styles.categoryDescription}>
              Browse our collection of articles about {category.name.toLowerCase()} for pets. 
              We offer expert insights and practical advice to help your furry friends live 
              their healthiest and happiest lives.
            </p>
            <div className={styles.categoryMeta}>
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
                      <div className={styles.categoryBadge}>{post.category}</div>
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
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className={styles.tag}>#{tag.name}</span>
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
                  <i className="fas fa-search"></i>
                </div>
                <h3 className={styles.noResultsTitle}>No Articles Found</h3>
                <p className={styles.noResultsMessage}>
                  We couldn't find any articles in this category. Please check back later as we're constantly adding new content.
                </p>
                <Link href="/media" className={styles.backToAllBtn}>
                  View All Articles
                </Link>
              </div>
            )}
          </div>
          
          <div className={styles.sidebar}>
            <div className={styles.sidebarWidget}>
              <h3 className={styles.widgetTitle}>Categories</h3>
              <ul className={styles.categoryList}>
                {allCategories.map((cat) => (
                  <li key={cat.slug} className={cat.slug === category.slug ? styles.active : ''}>
                    <Link href={`/media/category/${cat.slug}`}>
                      {cat.name}
                    </Link> 
                    <span>({cat.count})</span>
                  </li>
                ))}
              </ul>
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

export default CategoryPosts;
