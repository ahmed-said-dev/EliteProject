const axios = require('axios');

// تكوين API
const API_URL = 'http://localhost:1337';
const API_TOKEN = null; // في التطوير المحلي، قد لا نحتاج لتوكن

async function createTestArticle() {
    try {
        console.log('🔄 Creating test article...');

        // أولاً، تحقق من وجود Category
        let category;
        try {
            const categoriesResponse = await axios.get(`${API_URL}/api/blog-categories?locale=en`);
            if (categoriesResponse.data.data && categoriesResponse.data.data.length > 0) {
                category = categoriesResponse.data.data[0];
                console.log('✅ Found existing category:', category.name);
            }
        } catch (error) {
            console.log('⚠️ No categories found, will create article without category');
        }

        // تحقق من وجود Author
        let author;
        try {
            const authorsResponse = await axios.get(`${API_URL}/api/authors?locale=en`);
            if (authorsResponse.data.data && authorsResponse.data.data.length > 0) {
                author = authorsResponse.data.data[0];
                console.log('✅ Found existing author:', author.name);
            }
        } catch (error) {
            console.log('⚠️ No authors found, will create article without author');
        }

        // البيانات الأساسية للمقالة
        const articleData = {
            title: 'Understanding Pet Behavior',
            slug: 'understanding-pet-behavior',
            content: `
            <h2>Understanding Your Pet's Behavior</h2>
            
            <p>Pet behavior is a fascinating and complex topic that every pet owner should understand. Our furry, feathered, and scaled companions communicate with us in ways that may seem mysterious at first, but with careful observation and knowledge, we can learn to understand their needs and emotions.</p>
            
            <h3>Common Behavioral Patterns</h3>
            
            <p>Different pets exhibit different behavioral patterns based on their species, breed, age, and individual personality. Dogs, for example, are pack animals and often display behaviors related to hierarchy and social bonding. Cats, on the other hand, are more solitary creatures and may show territorial behaviors.</p>
            
            <h3>Signs of Stress in Pets</h3>
            
            <p>Recognizing stress signals in your pet is crucial for their well-being:</p>
            <ul>
                <li>Changes in appetite or eating habits</li>
                <li>Excessive vocalization or unusual quietness</li>
                <li>Destructive behavior</li>
                <li>Lethargy or restlessness</li>
                <li>Changes in bathroom habits</li>
            </ul>
            
            <h3>Positive Reinforcement Training</h3>
            
            <p>The most effective way to shape your pet's behavior is through positive reinforcement. This means rewarding good behavior rather than punishing bad behavior. Rewards can include treats, praise, toys, or whatever your pet finds most motivating.</p>
            
            <h3>When to Seek Professional Help</h3>
            
            <p>If your pet's behavior changes suddenly or becomes problematic, it's important to consult with a veterinarian or animal behaviorist. Sometimes, behavioral issues can be signs of underlying medical conditions that require professional attention.</p>
            
            <p>At Elite Veterinary Clinic, our team of experienced veterinarians can help you understand your pet's behavior and develop strategies to address any concerns. We believe that understanding your pet leads to a stronger bond and a happier life together.</p>
            `,
            excerpt: 'Learn to understand your pet\'s behavior patterns, recognize stress signals, and discover effective training techniques. Our comprehensive guide helps pet owners build stronger bonds with their furry companions.',
            publishDate: new Date().toISOString().split('T')[0],
            readTime: '5 min read',
            featured: false,
            publishedAt: new Date(),
            locale: 'en'
        };

        // إضافة Category إذا كان متاحاً
        if (category) {
            articleData.category = category.id;
        }

        // إضافة Author إذا كان متاحاً
        if (author) {
            articleData.author = author.id;
        }

        // إنشاء المقالة
        const headers = {
            'Content-Type': 'application/json',
        };

        if (API_TOKEN) {
            headers.Authorization = `Bearer ${API_TOKEN}`;
        }

        const response = await axios.post(`${API_URL}/api/blog-articles`, {
            data: articleData
        }, { headers });

        if (response.data) {
            console.log('✅ Test article created successfully!');
            console.log('📄 Article details:');
            console.log(`   - Title: ${response.data.data.title}`);
            console.log(`   - Slug: ${response.data.data.slug}`);
            console.log(`   - URL: ${API_URL}/api/blog-articles/${response.data.data.slug}`);
            console.log(`   - Frontend URL: http://localhost:3000/media/${response.data.data.slug}`);
        }

        return response.data;
        
    } catch (error) {
        console.error('❌ Error creating test article:', error.message);
        
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', JSON.stringify(error.response.data, null, 2));
        }
        
        throw error;
    }
}

// تشغيل الدالة
if (require.main === module) {
    createTestArticle()
        .then(() => {
            console.log('🎉 Script completed successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Script failed:', error.message);
            process.exit(1);
        });
}

module.exports = { createTestArticle };
