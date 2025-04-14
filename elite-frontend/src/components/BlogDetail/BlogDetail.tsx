import React from 'react';
import Link from 'next/link';
// @ts-ignore
import styles from './BlogDetail.module.css';
import { blogPosts } from '@/components/BlogSection/BlogSection';

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

interface BlogDetailProps {
  post: BlogPostProps;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post }) => {
  // Generate random paragraph count between 5-7 for the blog content
  const paragraphCount = Math.floor(Math.random() * 3) + 5;
  
  // Dummy paragraphs for the blog content (in a real app, this would come from a CMS)
  const paragraphs = [
    "At Elite Veterinary Clinic, we understand the bond between you and your pet is special. That's why we're committed to providing the highest quality care for your furry family members. Our team of experienced veterinarians and staff are passionate about animal health and dedicated to making every visit as comfortable as possible.",
    "Regular wellness exams are essential for maintaining your pet's health and catching potential issues early. During these check-ups, our veterinarians will thoroughly examine your pet from nose to tail, looking for any signs of illness or areas of concern. We'll also discuss nutrition, behavior, and any questions you may have about your pet's care.",
    "Vaccinations are a crucial part of preventative healthcare for pets. They protect against a variety of serious and potentially fatal diseases. Our veterinarians will work with you to create a vaccination schedule tailored to your pet's specific needs, taking into account factors like age, lifestyle, and risk of exposure.",
    "Dental health is often overlooked but is vital for your pet's overall wellbeing. Poor dental hygiene can lead to pain, tooth loss, and even systemic health issues. Our clinic offers comprehensive dental services, from routine cleanings to more complex procedures. We also provide guidance on home dental care to keep your pet's teeth healthy between visits.",
    "Nutrition plays a significant role in your pet's health and longevity. Different pets have different nutritional needs based on their species, breed, age, weight, and health status. Our team can help you navigate the overwhelming number of pet food options to find the right diet for your companion.",
    "Behavior problems can be frustrating and may strain the relationship between you and your pet. Whether it's destructive chewing, inappropriate elimination, aggression, or anxiety, our veterinarians can help identify the cause and develop a plan to address the issue. Sometimes, behavioral problems can be a sign of an underlying medical condition, which is why a thorough examination is always the first step.",
    "Senior pets have special needs and may benefit from more frequent check-ups. As animals age, they become more susceptible to certain health conditions, like arthritis, kidney disease, and cognitive dysfunction. Early detection and management of these conditions can significantly improve your pet's quality of life in their golden years."
  ];
  
  // Use a subset of paragraphs for the blog content
  const contentParagraphs = paragraphs.slice(0, paragraphCount);
  
  // Generate a random date for the blog post if not provided
  const formattedDate = post.date || new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <section className={styles.blogDetailSection}>
      <div className={styles.container}>
        <div className={styles.blogContent}>
          <div className={styles.metadata}>
            <div className={styles.category}>{post.category}</div>
            <div className={styles.dateTime}>
              <span className={styles.date}>{formattedDate}</span>
              <span className={styles.dot}>•</span>
              <span className={styles.readTime}>{post.readTime}</span>
            </div>
          </div>
          
          <div className={styles.featuredImageContainer}>
            <img 
              src={post.image} 
              alt={post.title} 
              className={styles.featuredImage} 
            />
          </div>
          
          <div className={styles.authorInfo}>
            <div className={styles.author}>
              <img 
                src={post.authorImage} 
                alt={post.author} 
                className={styles.authorImage} 
              />
              <div className={styles.authorMeta}>
                <span className={styles.authorName}>{post.author}</span>
                <span className={styles.authorTitle}>Elite Veterinary Specialist</span>
              </div>
            </div>
            <div className={styles.socialShare}>
              <span className={styles.shareTitle}>Share:</span>
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialIcon}>
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className={styles.socialIcon}>
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className={styles.socialIcon}>
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className={styles.socialIcon}>
                  <i className="fab fa-pinterest-p"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className={styles.postContent}>
            <h1 className={styles.postTitle}>{post.title}</h1>
            
            <div className={styles.excerpt}>
              <p>{post.excerpt}</p>
            </div>
            
            <div className={styles.mainContent}>
              {contentParagraphs.map((paragraph, index) => (
                <p key={index} className={styles.paragraph}>{paragraph}</p>
              ))}
            </div>
            
            {/* Add a blockquote in the middle of the content */}
            <blockquote className={styles.blockquote}>
              "The bond with a true pet is as lasting as the ties of this earth can ever be. Taking care of their health is not just a responsibility; it's an act of love."
              <cite>- Elite Veterinary Team</cite>
            </blockquote>
            
            {/* Add more paragraphs after the blockquote */}
            {paragraphs.slice(paragraphCount, paragraphCount + 2).map((paragraph, index) => (
              <p key={`extra-${index}`} className={styles.paragraph}>{paragraph}</p>
            ))}
            
            {/* Add an image within the content */}
            <div className={styles.contentImage}>
              <img 
                src="https://images.unsplash.com/photo-1607923432780-25486e1ba869?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Veterinarian caring for pet" 
              />
              <span className={styles.imageCaption}>Our dedicated team provides compassionate care for every pet</span>
            </div>
            
            {/* Final paragraph */}
            <p className={styles.paragraph}>
              At Elite Veterinary Clinic, we believe in building lasting relationships with our clients and their pets. We're here for you through every stage of your pet's life, from playful puppyhood to dignified senior years. Thank you for trusting us with your pet's health and wellness.
            </p>
          </div>
          
          <div className={styles.tagsSection}>
            <div className={styles.tagsList}>
              {post.tags && post.tags.map((tag, index) => (
                <Link href={`/media/tag/${tag.name.toLowerCase().replace(/\s+/g, '-')}`} key={index} className={styles.tag}>
                  #{tag.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className={styles.authorBio}>
            <div className={styles.authorImage}>
              <img src={post.authorImage} alt={post.author} />
            </div>
            <div className={styles.bioContent}>
              <h3 className={styles.bioName}>{post.author}</h3>
              <p className={styles.bioText}>
                Dr. {post.author.split(' ')[1]} is a highly experienced veterinarian at Elite Veterinary Clinic with over 10 years of specialized experience in small animal medicine. Passionate about animal welfare and client education, they regularly contribute valuable insights to our blog to help pet owners provide the best care for their beloved companions.
              </p>
              <div className={styles.bioSocial}>
                <a href="#" className={styles.bioSocialIcon}><i className="fab fa-facebook-f"></i></a>
                <a href="#" className={styles.bioSocialIcon}><i className="fab fa-twitter"></i></a>
                <a href="#" className={styles.bioSocialIcon}><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
          
          <div className={styles.navigation}>
            <Link href={`/media/${post.id > 1 ? post.id - 1 : blogPosts.length}`} className={styles.navLink}>
              <i className="fas fa-arrow-left"></i>
              <span>Previous Post</span>
            </Link>
            <Link href="/media" className={styles.navHome}>
              <i className="fas fa-th-large"></i>
            </Link>
            <Link href={`/media/${post.id < blogPosts.length ? post.id + 1 : 1}`} className={styles.navLink}>
              <span>Next Post</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
          
          <div className={styles.comments}>
            <h3 className={styles.commentsTitle}>Comments (3)</h3>
            
            <div className={styles.commentsList}>
              <div className={styles.commentItem}>
                <div className={styles.commentAvatar}>
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="Sarah Johnson" />
                </div>
                <div className={styles.commentBody}>
                  <div className={styles.commentMeta}>
                    <h4 className={styles.commentAuthor}>Sarah Johnson</h4>
                    <span className={styles.commentDate}>April 12, 2025</span>
                  </div>
                  <p className={styles.commentText}>
                    This article was so helpful! I've been trying to figure out the best diet for my senior cat, and this gave me a lot of good information to consider. Thanks for sharing your expertise!
                  </p>
                  <a href="#" className={styles.replyBtn}>Reply</a>
                </div>
              </div>
              
              <div className={`${styles.commentItem} ${styles.commentReply}`}>
                <div className={styles.commentAvatar}>
                  <img src={post.authorImage} alt={post.author} />
                </div>
                <div className={styles.commentBody}>
                  <div className={styles.commentMeta}>
                    <h4 className={styles.commentAuthor}>{post.author}</h4>
                    <span className={styles.commentDate}>April 12, 2025</span>
                  </div>
                  <p className={styles.commentText}>
                    Thank you for your kind words, Sarah! I'm glad you found the information helpful. Feel free to schedule a consultation if you'd like more personalized advice for your senior cat's dietary needs.
                  </p>
                  <a href="#" className={styles.replyBtn}>Reply</a>
                </div>
              </div>
              
              <div className={styles.commentItem}>
                <div className={styles.commentAvatar}>
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="Michael Rogers" />
                </div>
                <div className={styles.commentBody}>
                  <div className={styles.commentMeta}>
                    <h4 className={styles.commentAuthor}>Michael Rogers</h4>
                    <span className={styles.commentDate}>April 10, 2025</span>
                  </div>
                  <p className={styles.commentText}>
                    I've been bringing my dog to Elite Veterinary for years and have always received excellent care. It's great to see you sharing such valuable information on your blog as well. Looking forward to more articles!
                  </p>
                  <a href="#" className={styles.replyBtn}>Reply</a>
                </div>
              </div>
            </div>
            
            <div className={styles.commentForm}>
              <h3 className={styles.formTitle}>Leave a Comment</h3>
              <form>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <input type="text" placeholder="Your Name*" className={styles.formControl} required />
                  </div>
                  <div className={styles.formGroup}>
                    <input type="email" placeholder="Your Email*" className={styles.formControl} required />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <textarea placeholder="Your Comment*" className={styles.formControl} rows={5} required></textarea>
                </div>
                <div className={styles.formCheck}>
                  <input type="checkbox" id="saveInfo" className={styles.formCheckInput} />
                  <label htmlFor="saveInfo" className={styles.formCheckLabel}>
                    Save my name and email for the next time I comment.
                  </label>
                </div>
                <button type="submit" className={styles.submitBtn}>Post Comment</button>
              </form>
            </div>
          </div>
        </div>
        
        <div className={styles.sidebar}>
          <div className={styles.sidebarWidget}>
            <form className={styles.searchForm}>
              <input type="text" placeholder="Search..." className={styles.searchInput} />
              <button type="submit" className={styles.searchBtn}>
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
          
          <div className={styles.sidebarWidget}>
            <h3 className={styles.widgetTitle}>Categories</h3>
            <ul className={styles.categoryList}>
              <li><Link href="/media/category/nutrition">Nutrition</Link> <span>(5)</span></li>
              <li><Link href="/media/category/preventative-care">Preventative Care</Link> <span>(8)</span></li>
              <li><Link href="/media/category/behavior">Pet Behavior</Link> <span>(3)</span></li>
              <li><Link href="/media/category/emergency-care">Emergency Care</Link> <span>(4)</span></li>
              <li><Link href="/media/category/senior-pet-care">Senior Pet Care</Link> <span>(6)</span></li>
              <li><Link href="/media/category/dental-health">Dental Health</Link> <span>(2)</span></li>
            </ul>
          </div>
          
          <div className={styles.sidebarWidget}>
            <h3 className={styles.widgetTitle}>Recent Posts</h3>
            <div className={styles.recentPosts}>
              {blogPosts.slice(0, 4).map(post => (
                <div key={post.id} className={styles.recentPost}>
                  <div className={styles.recentPostImage}>
                    <img src={post.image} alt={post.title} />
                  </div>
                  <div className={styles.recentPostInfo}>
                    <h4 className={styles.recentPostTitle}>
                      <Link href={`/media/${post.id}`}>{post.title}</Link>
                    </h4>
                    <span className={styles.recentPostDate}>{post.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.sidebarWidget}>
            <h3 className={styles.widgetTitle}>Tags</h3>
            <div className={styles.tagCloud}>
              <Link href="/media/tag/pet-health">Pet Health</Link>
              <Link href="/media/tag/nutrition">Nutrition</Link>
              <Link href="/media/tag/dogs">Dogs</Link>
              <Link href="/media/tag/cats">Cats</Link>
              <Link href="/media/tag/wellness">Wellness</Link>
              <Link href="/media/tag/preventative-care">Preventative Care</Link>
              <Link href="/media/tag/emergency">Emergency</Link>
              <Link href="/media/tag/dental-care">Dental Care</Link>
              <Link href="/media/tag/pet-behavior">Pet Behavior</Link>
              <Link href="/media/tag/senior-pets">Senior Pets</Link>
            </div>
          </div>
          
          <div className={styles.sidebarWidget}>
            <h3 className={styles.widgetTitle}>Subscribe</h3>
            <p className={styles.subscribeText}>
              Subscribe to our newsletter to receive the latest articles and updates from our team.
            </p>
            <form className={styles.subscribeForm}>
              <input type="email" placeholder="Your Email" className={styles.subscribeInput} required />
              <button type="submit" className={styles.subscribeBtn}>Subscribe</button>
            </form>
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
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
