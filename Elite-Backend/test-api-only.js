const axios = require('axios');

const API_URL = 'http://localhost:1337';

async function testBlogAPI() {
    try {
        console.log('🔍 Testing Blog API endpoints...\n');

        // اختبار 1: جلب جميع المقالات
        console.log('1. Testing: GET /api/blog-articles');
        try {
            const allArticlesResponse = await axios.get(`${API_URL}/api/blog-articles?populate=*&locale=en`);
            console.log(`✅ Success: Found ${allArticlesResponse.data.data.length} articles`);
            
            if (allArticlesResponse.data.data.length > 0) {
                const firstArticle = allArticlesResponse.data.data[0];
                console.log(`   - First article: "${firstArticle.title}" (ID: ${firstArticle.id}, Slug: ${firstArticle.slug})`);
                
                // اختبار 2: جلب مقالة واحدة بالـ ID
                console.log(`\n2. Testing: GET /api/blog-articles/${firstArticle.id}`);
                try {
                    const articleByIdResponse = await axios.get(`${API_URL}/api/blog-articles/${firstArticle.id}?populate=*&locale=en`);
                    console.log(`✅ Success: Article by ID loaded - "${articleByIdResponse.data.data.title}"`);
                } catch (error) {
                    console.log(`❌ Failed: Article by ID - ${error.response?.status} ${error.response?.statusText}`);
                }
                
                // اختبار 3: جلب مقالة واحدة بالـ Slug
                if (firstArticle.slug) {
                    console.log(`\n3. Testing: GET /api/blog-articles/${firstArticle.slug}`);
                    try {
                        const articleBySlugResponse = await axios.get(`${API_URL}/api/blog-articles/${firstArticle.slug}?populate=*&locale=en`);
                        console.log(`✅ Success: Article by Slug loaded - "${articleBySlugResponse.data.data.title}"`);
                    } catch (error) {
                        console.log(`❌ Failed: Article by Slug - ${error.response?.status} ${error.response?.statusText}`);
                    }
                }
            } else {
                console.log('⚠️ No articles found. You need to create articles manually in Strapi admin.');
            }
            
        } catch (error) {
            console.log(`❌ Failed: Cannot fetch articles - ${error.response?.status} ${error.response?.statusText}`);
        }

        // اختبار 4: اختبار endpoint غير موجود
        console.log(`\n4. Testing: GET /api/blog-articles/non-existent-article`);
        try {
            const nonExistentResponse = await axios.get(`${API_URL}/api/blog-articles/non-existent-article?populate=*&locale=en`);
            console.log(`❓ Unexpected: Non-existent article returned data`);
        } catch (error) {
            if (error.response?.status === 404) {
                console.log(`✅ Success: Non-existent article correctly returns 404`);
            } else {
                console.log(`❌ Failed: Non-existent article returns ${error.response?.status} instead of 404`);
            }
        }

        console.log('\n=== API Test Summary ===');
        console.log('If all tests pass ✅, the backend is working correctly.');
        console.log('You can now test the frontend at: http://localhost:3000/media/ARTICLE_ID_OR_SLUG');
        console.log('\nTo create test articles:');
        console.log('1. Go to: http://localhost:1337/admin');
        console.log('2. Create articles manually through the admin interface');
        console.log('3. Then test the frontend with those articles');

    } catch (error) {
        console.error('💥 Test failed:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('\n❌ Strapi is not running!');
            console.log('Please start Strapi first: npm run develop');
        }
    }
}

// تشغيل الدالة
if (require.main === module) {
    testBlogAPI()
        .then(() => {
            console.log('\n🎉 API testing completed!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('\n💥 API testing failed:', error.message);
            process.exit(1);
        });
}

module.exports = { testBlogAPI };
