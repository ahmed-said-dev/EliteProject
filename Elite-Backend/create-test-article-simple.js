const axios = require('axios');

const API_URL = 'http://localhost:1337';

async function createTestArticle() {
    try {
        console.log('🔄 Creating test article...');

        // بيانات المقالة
        const articleData = {
            title: 'Test Article for Development',
            slug: 'test-article-dev',
            content: `
                <h1>Test Article for Development</h1>
                <p>This is a test article created for testing the blog detail page functionality.</p>
                
                <h2>Article Content</h2>
                <p>This article contains various content to test the display of:</p>
                <ul>
                    <li>Headings and paragraphs</li>
                    <li>Lists and formatting</li>
                    <li>Images and media</li>
                    <li>Links and references</li>
                </ul>
                
                <h3>Technical Details</h3>
                <p>The article detail page should properly display:</p>
                <ol>
                    <li>Article title and metadata</li>
                    <li>Author information</li>
                    <li>Publication date and read time</li>
                    <li>Article content with proper formatting</li>
                    <li>Tags and categories</li>
                </ol>
                
                <blockquote>
                    <p>This is a test blockquote to verify proper styling of quoted content.</p>
                </blockquote>
                
                <p>The page should work correctly in both Arabic and English locales, with proper RTL support when needed.</p>
            `,
            excerpt: 'A comprehensive test article to verify the functionality of the blog detail page in both Arabic and English locales.',
            publishDate: '2025-01-15',
            readTime: '3 min read',
            featured: false,
            publishedAt: new Date().toISOString(),
            locale: 'en'
        };

        // إنشاء المقالة
        const response = await axios.post(`${API_URL}/api/blog-articles`, {
            data: articleData
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.data) {
            const article = response.data.data;
            console.log('✅ Test article created successfully!');
            console.log(`📄 Article Details:`);
            console.log(`   - ID: ${article.id}`);
            console.log(`   - Title: ${article.title}`);
            console.log(`   - Slug: ${article.slug}`);
            console.log(`   - Locale: ${article.locale}`);
            console.log();
            console.log(`🌐 Test URLs:`);
            console.log(`   - Frontend (ID): http://localhost:3000/media/${article.id}`);
            console.log(`   - Frontend (Slug): http://localhost:3000/media/${article.slug}`);
            console.log(`   - API (ID): ${API_URL}/api/blog-articles/${article.id}?populate=*&locale=en`);
            console.log(`   - API (Slug): ${API_URL}/api/blog-articles/${article.slug}?populate=*&locale=en`);
            
            return article;
        }

    } catch (error) {
        console.error('❌ Error creating test article:', error.message);
        
        if (error.response) {
            console.error(`HTTP ${error.response.status}: ${error.response.statusText}`);
            if (error.response.data) {
                console.error('Response:', JSON.stringify(error.response.data, null, 2));
            }
        }
        
        throw error;
    }
}

// تشغيل الدالة
if (require.main === module) {
    createTestArticle()
        .then(() => {
            console.log('\n🎉 Test article creation completed!');
            console.log('📝 Next steps:');
            console.log('1. Start frontend: cd ../elite-frontend && npm run dev');
            console.log('2. Test the article detail page using the URLs above');
            process.exit(0);
        })
        .catch((error) => {
            console.error('\n💥 Failed to create test article:', error.message);
            process.exit(1);
        });
}

module.exports = { createTestArticle };
