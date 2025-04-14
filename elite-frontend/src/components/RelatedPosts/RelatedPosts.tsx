import React from 'react';
import Link from 'next/link';
// @ts-ignore
import styles from './RelatedPosts.module.css';

// تعريف واجهة Tag لوسوم المقالة
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

interface RelatedPostsProps {
  posts: BlogPostProps[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  return (
    <section className={styles.relatedSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Related Articles</h2>
          <p className={styles.sectionDescription}>
            You might also be interested in these articles related to pet health and wellness.
          </p>
        </div>
        
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
                <Link href={`/media/${post.id}`} className={styles.readMoreBtn}>
                  Read Article
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
