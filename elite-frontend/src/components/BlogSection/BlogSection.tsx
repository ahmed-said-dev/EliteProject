import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import styles from './BlogSection.module.css';
import { BlogArticle, getArticleImage, getAuthorImage, getAuthorName, getCategoryName } from '@/hooks/useBlogApi';

interface BlogSectionProps {
  articles: BlogArticle[];
  isHomePage?: boolean;
}

const BlogSection: React.FC<BlogSectionProps> = ({ articles = [], isHomePage = false }) => {
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  
  const [featuredArticles, setFeaturedArticles] = useState<BlogArticle[]>([]);
  const [regularArticles, setRegularArticles] = useState<BlogArticle[]>([]);

  useEffect(() => {
    if (articles && articles.length > 0) {
      const featured = articles.filter(article => article.featured).slice(0, 1);
      const regular = articles
        .filter(article => !featured.some(f => f.id === article.id))
        .slice(0, isHomePage ? 6 : articles.length);
      
      setFeaturedArticles(featured);
      setRegularArticles(regular);
    } else {
      setFeaturedArticles([]);
      setRegularArticles([]);
    }
  }, [articles, isHomePage]);

  if (!articles || articles.length === 0) {
    return (
      <section className={styles.blogSection} dir={dir}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <h2 className={styles.sectionTitle}>{t('blog.noArticles')}</h2>
            <p>{t('blog.checkBack')}</p>
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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
        
        {/* المقالات المميزة */}
        {featuredArticles.length > 0 && (
          <Link href={`/media/${featuredArticles[0].slug}`} className="cursor-pointer hover:opacity-90 transition-opacity block">
            <div key={featuredArticles[0].id} className={styles.featuredPost}>
              <div className={styles.featuredContent}>
                <div className={styles.categoryBadge}>
                  {getCategoryName(featuredArticles[0])}
                </div>
                <h2 className={styles.featuredTitle}>
                  {featuredArticles[0].title}
                </h2>
                <p className={styles.featuredExcerpt}>
                  {featuredArticles[0].excerpt}
                </p>
                <div className={styles.postMeta}>
                  <div className={styles.author}>
                    <img 
                      src={getAuthorImage(featuredArticles[0])} 
                      alt={getAuthorName(featuredArticles[0])} 
                      className={styles.authorImage} 
                    />
                    <span>{getAuthorName(featuredArticles[0])}</span>
                  </div>
                  
                  <div className={styles.postInfo}>
                    <span className={styles.date}>
                      {formatDate(featuredArticles[0].publishDate)}
                    </span>
                    <span className={styles.dot}>•</span>
                    <span className={styles.readTime}>{featuredArticles[0].readTime}</span>
                  </div>
                </div>
                <div className={styles.readMoreBtn}>
                  {t('blogSection.readMore')}
                </div>
              </div>
              <div className={styles.featuredImageWrapper}>
                <img 
                  src={getArticleImage(featuredArticles[0])} 
                  alt={featuredArticles[0].title} 
                  className={styles.featuredImage} 
                />
              </div>
            </div>
          </Link>
        )}

        <div className={styles.blogGrid}>
          {regularArticles.slice(0, isHomePage ? 6 : regularArticles.length).map((article, index) => (
            <Link 
              key={article.id} 
              href={`/media/${article.slug}`}
              className="cursor-pointer hover:opacity-90 transition-opacity block"
            >
              <div 
                className={`${styles.blogCard} ${styles.wowFadeInUp}`}
                data-wow-delay={`0.${index + 1}s`}
              >
                <div className={styles.blogCardWrapper}>
                  <div className={styles.imageContainer}>
                    <img 
                      src={getArticleImage(article)} 
                      alt={article.title} 
                      className={styles.blogImage} 
                    />
                    <div className={styles.categoryBadge}>
                      {getCategoryName(article)}
                    </div>
                  </div>
                  
                  <div className={styles.blogContent}>
                    <div className={styles.postMeta}>
                      <div className={styles.postInfo}>
                        <span className={styles.date}>
                          {formatDate(article.publishDate)}
                        </span>
                        <span className={styles.dot}>•</span>
                        <span className={styles.readTime}>{article.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className={styles.blogTitle}>{article.title}</h3>
                    <p className={styles.blogExcerpt}>{article.excerpt}</p>
                    
                    <div className={styles.authorSection}>
                      <img 
                        src={getAuthorImage(article)} 
                        alt={getAuthorName(article)} 
                        className={styles.authorImage} 
                      />
                      <span className={styles.authorName}>{getAuthorName(article)}</span>
                    </div>
                  </div>
                  
                  <div className={styles.blogCardFooter}>
                    <div className={styles.tagsList}>
                      {article.tags?.slice(0, 3).map((tag) => (
                        <span key={tag.id} className={styles.tag}>
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                    <div className={styles.btnPrimary}>
                      <i className="fas fa-arrow-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {isHomePage && (
          <div className={styles.textCenter} style={{ marginTop: '3rem' }}>
            <Link href="/media" className={styles.btnPrimaryLg}>
              {t('blogSection.viewAllArticles')}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;

// Backwards-compatibility stubs for legacy imports used in pages
// Some pages import { blogPosts } or { getBlogPosts } from this module.
// Provide minimal fallbacks to avoid build errors until those pages are refactored.
export const blogPosts: any[] = [];
export function getBlogPosts(_: any): any[] { return blogPosts; }
