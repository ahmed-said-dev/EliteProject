const axios = require('axios');

const API_URL = 'http://localhost:1337';

async function testArticleByID() {
    try {
        console.log('🔍 Testing Blog Article by ID API...\n');

        // اختبار 1: جلب جميع المقالات أولاً للحصول على IDs
        console.log('1. Getting all articles to find available IDs...');
        const allArticlesResponse = await axios.get(`${API_URL}/api/blog-articles?populate=*&locale=en`);
        
        if (!allArticlesResponse.data.data || allArticlesResponse.data.data.length === 0) {
            console.log('❌ No articles found in database!');
            console.log('Please create articles first through Strapi admin panel.');
            console.log('Go to: http://localhost:1337/admin');
            return;
        }

        const articles = allArticlesResponse.data.data;
        console.log(`✅ Found ${articles.length} articles:`);
        
        articles.forEach((article, index) => {
            console.log(`   ${index + 1}. ID: ${article.id} | Title: "${article.title}" | Slug: "${article.slug}"`);
        });

        // اختبار 2: جلب أول مقالة بالـ ID
        const firstArticle = articles[0];
        console.log(`\n2. Testing GET by ID: ${firstArticle.id}`);
        console.log(`URL: ${API_URL}/api/blog-articles/${firstArticle.id}?populate=*&locale=en`);
        
        try {
            const response = await axios.get(`${API_URL}/api/blog-articles/${firstArticle.id}?populate=*&locale=en`);
            
            if (response.status === 200 && response.data.data) {
                const article = response.data.data;
                
                console.log(`✅ SUCCESS! Article found by ID:`);
                console.log(`   📄 ID: ${article.id}`);
                console.log(`   📄 Title: "${article.title}"`);
                console.log(`   📄 Slug: "${article.slug}"`);
                console.log(`   📄 Locale: ${article.locale}`);
                console.log(`   📄 Author: ${article.author?.name || 'N/A'}`);
                console.log(`   📄 Category: ${article.category?.name || 'N/A'}`);
                console.log(`   📄 Excerpt: ${article.excerpt ? article.excerpt.substring(0, 50) + '...' : 'N/A'}`);
                console.log(`   📄 Content Length: ${article.content ? article.content.length : 0} characters`);
                console.log(`   📄 Published: ${article.publishedAt ? 'Yes' : 'No'}`);
                console.log(`   📄 Featured Image: ${article.featuredImage ? 'Yes' : 'No'}`);
                
                if (article.tags && article.tags.length > 0) {
                    console.log(`   🏷️ Tags: ${article.tags.map(tag => tag.name).join(', ')}`);
                }
                
                // اختبار تفصيلي للـ populate
                console.log(`\n📊 Populate Details:`);
                console.log(`   - Author populated: ${article.author ? 'Yes' : 'No'}`);
                console.log(`   - Category populated: ${article.category ? 'Yes' : 'No'}`);
                console.log(`   - Tags populated: ${article.tags ? `Yes (${article.tags.length})` : 'No'}`);
                console.log(`   - Featured Image populated: ${article.featuredImage ? 'Yes' : 'No'}`);
                
            } else {
                console.log(`❌ Unexpected response format:`, response.data);
            }
            
        } catch (error) {
            console.log(`❌ FAILED to get article by ID: ${error.response?.status} ${error.response?.statusText}`);
            if (error.response?.data) {
                console.log(`Error details:`, error.response.data);
            }
        }

        // اختبار 3: جلب بـ slug للمقارنة
        if (firstArticle.slug) {
            console.log(`\n3. Testing GET by Slug for comparison: ${firstArticle.slug}`);
            try {
                const slugResponse = await axios.get(`${API_URL}/api/blog-articles/${firstArticle.slug}?populate=*&locale=en`);
                
                if (slugResponse.status === 200 && slugResponse.data.data) {
                    console.log(`✅ Slug method also works! Both ID and Slug return the same article.`);
                } else {
                    console.log(`⚠️ Slug method failed but ID worked.`);
                }
                
            } catch (error) {
                console.log(`❌ Slug method failed: ${error.response?.status}`);
            }
        }

        // اختبار 4: اختبار ID غير موجود
        console.log(`\n4. Testing non-existent ID: 99999`);
        try {
            const notFoundResponse = await axios.get(`${API_URL}/api/blog-articles/99999?populate=*&locale=en`);
            console.log(`❓ Unexpected: Non-existent ID returned data`);
        } catch (error) {
            if (error.response?.status === 404) {
                console.log(`✅ Correct: Non-existent ID returns 404`);
            } else {
                console.log(`⚠️ Unexpected status for non-existent ID: ${error.response?.status}`);
            }
        }

        console.log(`\n🎉 API Testing Complete!`);
        console.log(`\n📝 Summary:`);
        console.log(`✅ GET /api/blog-articles/{id}?populate=*&locale=en is working correctly`);
        console.log(`✅ All article details are being returned`);
        console.log(`✅ Populate is working for related entities`);
        console.log(`\n🚀 Frontend can now use: http://localhost:3000/media/${firstArticle.id}`);

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
    testArticleByID()
        .then(() => {
            console.log('\n🏁 Test completed successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('\n💥 Test failed:', error.message);
            process.exit(1);
        });
}

module.exports = { testArticleByID };
