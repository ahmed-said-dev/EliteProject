import React from 'react';
import Link from 'next/link';
// @ts-ignore
import styles from './BlogSection.module.css';
import { useLanguage } from '@/context/LanguageContext';

interface TagProps {
  name: string;
}

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

export const getBlogPosts = (t: any): BlogPostProps[] => [
  {
    id: 1,
    title: t('blogPosts.1.title'),
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    excerpt: t('blogPosts.1.excerpt'),
    date: t('blogPosts.1.date'),
    author: t('blogPosts.1.author'),
    authorImage: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    readTime: t('blogPosts.1.readTime'),
    category: t('blogPosts.1.category'),
    tags: [
      { name: t('blogPosts.1.tags.tag1') },
      { name: t('blogPosts.1.tags.tag2') },
      { name: t('blogPosts.1.tags.tag3') }
    ],
    delay: '0.1s',
    featured: true
  },
  {
    id: 2,
    title: t('blogPosts.2.title'),
    image: 'https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    excerpt: t('blogPosts.2.excerpt'),
    date: t('blogPosts.2.date'),
    author: t('blogPosts.2.author'),
    authorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    readTime: t('blogPosts.2.readTime'),
    category: t('blogPosts.2.category'),
    tags: [
      { name: t('blogPosts.2.tags.tag1') },
      { name: t('blogPosts.2.tags.tag2') },
      { name: t('blogPosts.2.tags.tag3') }
    ],
    delay: '0.2s'
  },
  {
    id: 3,
    title: t('blogPosts.3.title'),
    image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    excerpt: t('blogPosts.3.excerpt'),
    date: t('blogPosts.3.date'),
    author: t('blogPosts.3.author'),
    authorImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    readTime: t('blogPosts.3.readTime'),
    category: t('blogPosts.3.category'),
    tags: [
      { name: t('blogPosts.3.tags.tag1') },
      { name: t('blogPosts.3.tags.tag2') },
      { name: t('blogPosts.3.tags.tag3') }
    ],
    delay: '0.3s'
  },
  {
    id: 4,
    title: t('blogPosts.4.title'),
    image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    excerpt: t('blogPosts.4.excerpt'),
    date: t('blogPosts.4.date'),
    author: t('blogPosts.4.author'),
    authorImage: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    readTime: t('blogPosts.4.readTime'),
    category: t('blogPosts.4.category'),
    tags: [
      { name: t('blogPosts.4.tags.tag1') },
      { name: t('blogPosts.4.tags.tag2') },
      { name: t('blogPosts.4.tags.tag3') }
    ],
    delay: '0.4s'
  },
  {
    id: 5,
    title: t('blogPosts.5.title'),
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    excerpt: t('blogPosts.5.excerpt'),
    date: t('blogPosts.5.date'),
    author: t('blogPosts.5.author'),
    authorImage: 'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    readTime: t('blogPosts.5.readTime'),
    category: t('blogPosts.5.category'),
    tags: [
      { name: t('blogPosts.5.tags.tag1') },
      { name: t('blogPosts.5.tags.tag2') },
      { name: t('blogPosts.5.tags.tag3') }
    ],
    delay: '0.5s'
  },
  {
    id: 6,
    title: t('blogPosts.6.title'),
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    excerpt: t('blogPosts.6.excerpt'),
    date: t('blogPosts.6.date'),
    author: t('blogPosts.6.author'),
    authorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    readTime: t('blogPosts.6.readTime'),
    category: t('blogPosts.6.category'),
    tags: [
      { name: t('blogPosts.6.tags.tag1') },
      { name: t('blogPosts.6.tags.tag2') },
      { name: t('blogPosts.6.tags.tag3') }
    ],
    delay: '0.6s'
  },
  {
    id: 7,
    title: t('blogPosts.7.title'),
    image: 'https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    excerpt: t('blogPosts.7.excerpt'),
    date: t('blogPosts.7.date'),
    author: t('blogPosts.7.author'),
    authorImage: 'https://images.unsplash.com/photo-1611432579699-484f7990b127?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    readTime: t('blogPosts.7.readTime'),
    category: t('blogPosts.7.category'),
    tags: [
      { name: t('blogPosts.7.tags.tag1') },
      { name: t('blogPosts.7.tags.tag2') },
      { name: t('blogPosts.7.tags.tag3') }
    ],
    delay: '0.7s'
  },
  {
    id: 8,
    title: t('blogPosts.8.title'),
    image: 'https://images.unsplash.com/photo-1518155317743-a8ff43ea6a5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    excerpt: t('blogPosts.8.excerpt'),
    date: t('blogPosts.8.date'),
    author: t('blogPosts.8.author'),
    authorImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    readTime: t('blogPosts.8.readTime'),
    category: t('blogPosts.8.category'),
    tags: [
      { name: t('blogPosts.8.tags.tag1') },
      { name: t('blogPosts.8.tags.tag2') },
      { name: t('blogPosts.8.tags.tag3') }
    ],
    delay: '0.8s'
  },
  {
    id: 9,
    title: t('blogPosts.9.title'),
    image: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    excerpt: t('blogPosts.9.excerpt'),
    date: t('blogPosts.9.date'),
    author: t('blogPosts.9.author'),
    authorImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    readTime: t('blogPosts.9.readTime'),
    category: t('blogPosts.9.category'),
    tags: [
      { name: t('blogPosts.9.tags.tag1') },
      { name: t('blogPosts.9.tags.tag2') },
      { name: t('blogPosts.9.tags.tag3') }
    ],
    delay: '0.9s'
  }
];

const BlogSection: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  const blogPosts = getBlogPosts(t);
  return (
    <section className={styles.blogSection} dir={dir}>
      <div className={styles.shapesWrapper}>
        <div className={`${styles.shape} ${styles.shape1}`}></div>
        <div className={`${styles.shape} ${styles.shape2}`}></div>
        <div className={`${styles.shape} ${styles.shape3}`}></div>
      </div>
      
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('blogSection.title')}</h2>
          <p className={styles.sectionDescription}>
            {t('blogSection.description')}
          </p>
        </div>
        
        {/* Featured Post */}
        {blogPosts.filter(post => post.featured).map((post) => (
          <div key={post.id} className={styles.featuredPost}>
            <div className={styles.featuredContent}>
              <div className={styles.categoryBadge}>{post.category}</div>
              <h2 className={styles.featuredTitle}>{post.title}</h2>
              <p className={styles.featuredExcerpt}>{post.excerpt}</p>
              <div className={styles.postMeta}>
                <div className={styles.author}>
                  <img 
                    src={post.authorImage} 
                    alt={post.author} 
                    className={styles.authorImage} 
                  />
                  <span>{post.author}</span>
                </div>
                <div className={styles.postInfo}>
                  <span className={styles.date}>{post.date}</span>
                  <span className={styles.dot}>•</span>
                  <span className={styles.readTime}>{post.readTime}</span>
                </div>
              </div>
              <Link href={`/media/${post.id}`} className={styles.readMoreBtn}>
                {t('blogSection.readMore')}
              </Link>
            </div>
            <div className={styles.featuredImageWrapper}>
              <img 
                src={post.image} 
                alt={post.title} 
                className={styles.featuredImage} 
              />
            </div>
          </div>
        ))}

        <div className={styles.blogGrid}>
          {blogPosts.filter(post => !post.featured).slice(0, 6).map((post) => (
            <div 
              key={post.id} 
              className={`${styles.blogCard} ${styles.wowFadeInUp}`}
              data-wow-delay={post.delay}
            >
              <div className={styles.blogCardWrapper}>
                <div className={styles.imageContainer}>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className={styles.blogImage} 
                  />
                  <div className={styles.categoryBadge}>{post.category}</div>
                </div>
                
                <div className={styles.blogContent}>
                  <div className={styles.postMeta}>
                    <div className={styles.postInfo}>
                      <span className={styles.date}>{post.date}</span>
                      <span className={styles.dot}>•</span>
                      <span className={styles.readTime}>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className={styles.blogTitle}>{post.title}</h3>
                  <p className={styles.blogExcerpt}>{post.excerpt}</p>
                  
                  <div className={styles.authorSection}>
                    <img 
                      src={post.authorImage} 
                      alt={post.author} 
                      className={styles.authorImage} 
                    />
                    <span className={styles.authorName}>{post.author}</span>
                  </div>
                </div>
                
                <div className={styles.blogCardFooter}>
                  <div className={styles.tagsList}>
                    {post.tags.map((tag, index) => (
                      <span key={index} className={styles.tag}>#{tag.name}</span>
                    ))}
                  </div>
                  <Link href={`/media/${post.id}`} className={styles.btnPrimary}>
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.blogGrid} style={{ marginTop: '2rem' }}>
          {blogPosts.filter(post => !post.featured).slice(6).map((post) => (
            <div 
              key={post.id} 
              className={`${styles.blogCard} ${styles.wowFadeInUp}`}
              data-wow-delay={post.delay}
            >
              <div className={styles.blogCardWrapper}>
                <div className={styles.imageContainer}>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className={styles.blogImage} 
                  />
                  <div className={styles.categoryBadge}>{post.category}</div>
                </div>
                
                <div className={styles.blogContent}>
                  <div className={styles.postMeta}>
                    <div className={styles.postInfo}>
                      <span className={styles.date}>{post.date}</span>
                      <span className={styles.dot}>•</span>
                      <span className={styles.readTime}>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className={styles.blogTitle}>{post.title}</h3>
                  <p className={styles.blogExcerpt}>{post.excerpt}</p>
                  
                  <div className={styles.authorSection}>
                    <img 
                      src={post.authorImage} 
                      alt={post.author} 
                      className={styles.authorImage} 
                    />
                    <span className={styles.authorName}>{post.author}</span>
                  </div>
                </div>
                
                <div className={styles.blogCardFooter}>
                  <div className={styles.tagsList}>
                    {post.tags.map((tag, index) => (
                      <span key={index} className={styles.tag}>#{tag.name}</span>
                    ))}
                  </div>
                  <Link href={`/media/${post.id}`} className={styles.btnPrimary}>
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.textCenter} style={{ marginTop: '3rem' }}>
          <Link href="/media" className={styles.btnPrimaryLg}>
            {t('blogSection.viewAllArticles')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
