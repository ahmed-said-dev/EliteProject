import React from 'react';
import Link from 'next/link';
// @ts-ignore
import styles from './BlogSection.module.css';

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

export const blogPosts: BlogPostProps[] = [
  {
    id: 1,
    title: 'Pet Nutrition: What You Need to Know About Feeding Your Furry Friend',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Discover the essential nutrients your pet needs for optimal health and learn how to choose the right diet for their specific requirements.',
    date: 'April 10, 2025',
    author: 'Dr. Sarah Johnson',
    authorImage: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    readTime: '5 min read',
    category: 'Nutrition',
    tags: [
      { name: 'Pet Diet' },
      { name: 'Health' },
      { name: 'Nutrition' }
    ],
    delay: '0.1s',
    featured: true
  },
  {
    id: 2,
    title: 'Common Signs Your Pet Needs Immediate Veterinary Attention',
    image: 'https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Learn to recognize the warning signs that indicate your pet requires emergency medical care and what to do in these critical situations.',
    date: 'April 5, 2025',
    author: 'Dr. Michael Chen',
    authorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    readTime: '7 min read',
    category: 'Emergency Care',
    tags: [
      { name: 'Emergency' },
      { name: 'Pet Health' },
      { name: 'Warning Signs' }
    ],
    delay: '0.2s'
  },
  {
    id: 3,
    title: 'Preventative Care: Keeping Your Pet Healthy Year-Round',
    image: 'https://images.unsplash.com/photo-1567752881759-894011eece4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Prevention is better than cure. Explore the essential preventative care practices that will help your pet live a longer, healthier life.',
    date: 'March 28, 2025',
    author: 'Dr. Aisha Rahman',
    authorImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    readTime: '6 min read',
    category: 'Preventative Care',
    tags: [
      { name: 'Wellness' },
      { name: 'Pet Care' },
      { name: 'Prevention' }
    ],
    delay: '0.3s'
  },
  {
    id: 4,
    title: 'Understanding Pet Behavior: What Your Pet is Trying to Tell You',
    image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Decode your pet\'s behavior patterns and learn how to respond appropriately to their needs and emotions.',
    date: 'March 20, 2025',
    author: 'Dr. James Wilson',
    authorImage: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    readTime: '8 min read',
    category: 'Behavior',
    tags: [
      { name: 'Pet Behavior' },
      { name: 'Communication' },
      { name: 'Pet Psychology' }
    ],
    delay: '0.4s'
  },
  {
    id: 5,
    title: 'Adopting a New Pet: Everything You Need to Know',
    image: 'https://images.unsplash.com/photo-1553322396-0ab4730b9c2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Thinking about adding a new furry member to your family? Here\'s a comprehensive guide to the adoption process and initial care.',
    date: 'March 15, 2025',
    author: 'Dr. Emma Thompson',
    authorImage: 'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    readTime: '10 min read',
    category: 'Adoption',
    tags: [
      { name: 'Pet Adoption' },
      { name: 'New Pet' },
      { name: 'First-time Owners' }
    ],
    delay: '0.5s'
  },
  {
    id: 6,
    title: 'The Importance of Regular Dental Care for Your Pet',
    image: 'https://images.unsplash.com/photo-1612774412771-005aa26192dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Dental health is vital for your pet\'s overall wellbeing. Learn about proper dental care routines and common dental issues in pets.',
    date: 'March 8, 2025',
    author: 'Dr. Carlos Rodriguez',
    authorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    readTime: '5 min read',
    category: 'Dental Health',
    tags: [
      { name: 'Dental Care' },
      { name: 'Oral Health' },
      { name: 'Pet Hygiene' }
    ],
    delay: '0.6s'
  },
  {
    id: 7,
    title: 'Seasonal Pet Care: Protecting Your Pet Throughout the Year',
    image: 'https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Different seasons bring different challenges for pet care. Get tips on how to keep your pet safe and comfortable in every season.',
    date: 'March 1, 2025',
    author: 'Dr. Olivia Parker',
    authorImage: 'https://images.unsplash.com/photo-1611432579699-484f7990b127?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    readTime: '7 min read',
    category: 'Seasonal Care',
    tags: [
      { name: 'Weather' },
      { name: 'Seasonal Tips' },
      { name: 'Pet Safety' }
    ],
    delay: '0.7s'
  },
  {
    id: 8,
    title: 'Aging Pets: Providing Proper Care for Your Senior Companion',
    image: 'https://images.unsplash.com/photo-1518155317743-a8ff43ea6a5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    excerpt: 'As pets age, they require special care. Learn about the needs of senior pets and how to ensure their golden years are comfortable.',
    date: 'February 22, 2025',
    author: 'Dr. Robert Kim',
    authorImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    readTime: '9 min read',
    category: 'Senior Pet Care',
    tags: [
      { name: 'Aging Pets' },
      { name: 'Senior Care' },
      { name: 'Geriatric Pets' }
    ],
    delay: '0.8s'
  },
  {
    id: 9,
    title: 'The Benefits of Regular Exercise for Your Pet',
    image: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Physical activity is crucial for pets. Discover the many benefits of regular exercise and fun ways to keep your pet active.',
    date: 'February 15, 2025',
    author: 'Dr. Patricia Morgan',
    authorImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    readTime: '6 min read',
    category: 'Exercise',
    tags: [
      { name: 'Fitness' },
      { name: 'Activity' },
      { name: 'Pet Health' }
    ],
    delay: '0.9s'
  }
];

const BlogSection: React.FC = () => {
  return (
    <section className={styles.blogSection}>
      <div className={styles.shapesWrapper}>
        <div className={`${styles.shape} ${styles.shape1}`}></div>
        <div className={`${styles.shape} ${styles.shape2}`}></div>
        <div className={`${styles.shape} ${styles.shape3}`}></div>
      </div>
      
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Latest Articles</h2>
          <p className={styles.sectionDescription}>
            Explore insightful articles written by our experienced veterinarians to help you provide 
            the best care for your beloved pets.
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
                Read Full Article
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
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
