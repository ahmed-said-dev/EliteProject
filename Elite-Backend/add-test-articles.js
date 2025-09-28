const axios = require('axios');

const API_URL = 'http://localhost:1337/api';

// Sample articles data
const sampleArticles = [
  // English Articles
  {
    title: 'Understanding Pet Behavior',
    slug: 'understanding-pet-behavior',
    excerpt: 'Learn about common pet behaviors and what they mean for your furry friend.',
    content: `Understanding your pet's behavior is crucial for building a strong relationship and ensuring their well-being. Pets communicate through various behaviors, and recognizing these signals can help you provide better care.

Common behaviors include tail wagging in dogs, which often indicates happiness, and purring in cats, which usually means contentment. However, context matters - a stiff tail wag might indicate tension rather than joy.

Observing your pet's daily habits can help you notice changes that might indicate health issues or stress. Regular veterinary checkups combined with behavioral awareness create the best care approach.`,
    locale: 'en',
    publishDate: new Date('2024-01-15'),
    readTime: '5 min read',
    featured: true,
    viewCount: 0
  },
  {
    title: 'Nutrition Guidelines for Healthy Pets',
    slug: 'nutrition-guidelines-healthy-pets',
    excerpt: 'Essential nutrition tips to keep your pets healthy and active throughout their lives.',
    content: `Proper nutrition is fundamental to your pet's health and longevity. Different pets have varying nutritional needs based on their age, size, and activity level.

High-quality protein should be the foundation of your pet's diet. For dogs, look for foods where meat is the first ingredient. Cats require even more protein as obligate carnivores.

Avoid feeding pets human foods that can be toxic, such as chocolate, grapes, onions, and artificial sweeteners. Always consult with your veterinarian about the best diet plan for your specific pet.`,
    locale: 'en',
    publishDate: new Date('2024-01-10'),
    readTime: '4 min read',
    featured: false,
    viewCount: 0
  },
  {
    title: 'Preventive Care: The Key to Pet Health',
    slug: 'preventive-care-pet-health',
    excerpt: 'Discover how preventive care can help your pet live a longer, healthier life.',
    content: `Preventive care is far more cost-effective and beneficial than treating diseases after they develop. Regular checkups allow veterinarians to detect problems early when they're most treatable.

Vaccinations protect pets from serious diseases. Core vaccines are essential for all pets, while non-core vaccines depend on lifestyle and risk factors. Your veterinarian will create a vaccination schedule tailored to your pet's needs.

Dental care is often overlooked but critically important. Regular teeth cleaning and dental checkups prevent periodontal disease, which can lead to more serious health issues.`,
    locale: 'en',
    publishDate: new Date('2024-01-05'),
    readTime: '6 min read',
    featured: false,
    viewCount: 0
  },
  
  // Arabic Articles
  {
    title: 'فهم سلوك الحيوانات الأليفة',
    slug: 'understanding-pet-behavior-ar',
    excerpt: 'تعرف على سلوكيات الحيوانات الأليفة الشائعة وماذا تعني لصديقك المفضل.',
    content: `فهم سلوك حيوانك الأليف أمر بالغ الأهمية لبناء علاقة قوية وضمان رفاهيته. تتواصل الحيوانات الأليفة من خلال سلوكيات مختلفة، والتعرف على هذه الإشارات يمكن أن يساعدك في توفير رعاية أفضل.

السلوكيات الشائعة تشمل هز الذيل في الكلاب، والذي غالباً ما يشير إلى السعادة، والخرخرة في القطط، والتي عادة ما تعني الرضا. ومع ذلك، السياق مهم - هز الذيل بطريقة متصلبة قد يشير إلى التوتر بدلاً من الفرح.

مراقبة العادات اليومية لحيوانك الأليف يمكن أن تساعدك في ملاحظة التغييرات التي قد تشير إلى مشاكل صحية أو ضغط نفسي.`,
    locale: 'ar',
    publishDate: new Date('2024-01-15'),
    readTime: '5 دقائق قراءة',
    featured: true,
    viewCount: 0
  },
  {
    title: 'إرشادات التغذية للحيوانات الأليفة الصحية',
    slug: 'nutrition-guidelines-healthy-pets-ar',
    excerpt: 'نصائح التغذية الأساسية للحفاظ على صحة ونشاط حيواناتك الأليفة طوال حياتها.',
    content: `التغذية السليمة أساسية لصحة حيوانك الأليف وطول عمره. الحيوانات الأليفة المختلفة لها احتياجات غذائية متنوعة بناءً على عمرها وحجمها ومستوى نشاطها.

البروتين عالي الجودة يجب أن يكون أساس النظام الغذائي لحيوانك الأليف. للكلاب، ابحث عن الأطعمة حيث يكون اللحم هو المكون الأول. القطط تحتاج لبروتين أكثر كونها من آكلات اللحوم بطبيعتها.

تجنب إطعام الحيوانات الأليفة الأطعمة البشرية التي يمكن أن تكون سامة، مثل الشوكولاتة والعنب والبصل والمحليات الصناعية.`,
    locale: 'ar',
    publishDate: new Date('2024-01-10'),
    readTime: '4 دقائق قراءة',
    featured: false,
    viewCount: 0
  }
];

// Create categories
const categories = [
  { name: 'Pet Care', nameAr: 'رعاية الحيوانات الأليفة' },
  { name: 'Nutrition', nameAr: 'التغذية' },
  { name: 'Health', nameAr: 'الصحة' },
  { name: 'Behavior', nameAr: 'السلوك' }
];

// Create authors
const authors = [
  {
    name: 'Dr. Sarah Johnson',
    nameAr: 'د. سارة جونسون',
    bio: 'Veterinary specialist with 10+ years of experience in small animal medicine.',
    bioAr: 'أخصائية بيطرية مع أكثر من 10 سنوات من الخبرة في طب الحيوانات الصغيرة.'
  },
  {
    name: 'Dr. Ahmed Mohamed',
    nameAr: 'د. أحمد محمد',
    bio: 'Expert in veterinary nutrition and preventive care.',
    bioAr: 'خبير في التغذية البيطرية والرعاية الوقائية.'
  }
];

async function createTestData() {
  console.log('🚀 Creating test blog data...\n');
  
  try {
    // Create categories first
    console.log('📁 Creating categories...');
    const createdCategories = [];
    for (const cat of categories) {
      try {
        // Create English version
        const enCategory = await axios.post(`${API_URL}/blog-categories`, {
          data: {
            name: cat.name,
            locale: 'en'
          }
        });
        
        // Create Arabic version
        const arCategory = await axios.post(`${API_URL}/blog-categories`, {
          data: {
            name: cat.nameAr,
            locale: 'ar'
          }
        });
        
        createdCategories.push({
          en: enCategory.data.data,
          ar: arCategory.data.data
        });
        
        console.log(`✅ Created category: ${cat.name} / ${cat.nameAr}`);
      } catch (error) {
        console.log(`⚠️  Category might already exist: ${cat.name}`);
      }
    }
    
    // Create authors
    console.log('\n👥 Creating authors...');
    const createdAuthors = [];
    for (const author of authors) {
      try {
        // Create English version
        const enAuthor = await axios.post(`${API_URL}/authors`, {
          data: {
            name: author.name,
            bio: author.bio,
            locale: 'en'
          }
        });
        
        // Create Arabic version
        const arAuthor = await axios.post(`${API_URL}/authors`, {
          data: {
            name: author.nameAr,
            bio: author.bioAr,
            locale: 'ar'
          }
        });
        
        createdAuthors.push({
          en: enAuthor.data.data,
          ar: arAuthor.data.data
        });
        
        console.log(`✅ Created author: ${author.name} / ${author.nameAr}`);
      } catch (error) {
        console.log(`⚠️  Author might already exist: ${author.name}`);
      }
    }
    
    // Get existing categories and authors in case creation failed
    const existingCategories = await axios.get(`${API_URL}/blog-categories`);
    const existingAuthors = await axios.get(`${API_URL}/authors`);
    
    // Create articles
    console.log('\n📝 Creating articles...');
    for (const article of sampleArticles) {
      try {
        // Get random category and author
        const categoryPool = existingCategories.data.data.filter(c => c.locale === article.locale);
        const authorPool = existingAuthors.data.data.filter(a => a.locale === article.locale);
        
        const randomCategory = categoryPool[Math.floor(Math.random() * categoryPool.length)];
        const randomAuthor = authorPool[Math.floor(Math.random() * authorPool.length)];
        
        const newArticle = await axios.post(`${API_URL}/blog-articles`, {
          data: {
            ...article,
            category: randomCategory?.id,
            author: randomAuthor?.id,
            publishedAt: article.publishDate
          }
        });
        
        console.log(`✅ Created article: ${article.title} (${article.locale})`);
      } catch (error) {
        console.log(`❌ Error creating article ${article.title}:`, error.response?.data?.error?.message || error.message);
      }
    }
    
    console.log('\n🎉 Test data creation completed!');
    console.log('\n🔗 Test URLs:');
    console.log('- All articles: http://localhost:1337/api/blog-articles?populate=*');
    console.log('- English articles: http://localhost:1337/api/blog-articles?populate=*&locale=en');
    console.log('- Arabic articles: http://localhost:1337/api/blog-articles?populate=*&locale=ar');
    console.log('- Specific article: http://localhost:1337/api/blog-articles/understanding-pet-behavior?populate=*&locale=en');
    
  } catch (error) {
    console.error('❌ Error creating test data:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure Strapi is running on http://localhost:1337');
      console.log('Run: cd elite-backend && npm run develop');
    }
  }
}

// Run if this script is called directly
if (require.main === module) {
  createTestData().catch(console.error);
}

module.exports = { createTestData };
