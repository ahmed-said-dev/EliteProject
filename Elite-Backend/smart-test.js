const axios = require('axios');

async function smartTest() {
    const API_URL = 'http://localhost:1337';
    
    try {
        console.log('🔍 Smart API Test...\n');

        // اختبار 1: جلب جميع المقالات والتحقق من IDs
        console.log('1. Getting all articles and checking their IDs...');
        const allResponse = await axios.get(`${API_URL}/api/blog-articles?locale=en`);
        const articles = allResponse.data.data;
        
        if (articles.length === 0) {
            console.log('❌ No articles found! Please create articles in Strapi admin first.');
            console.log('Go to: http://localhost:1337/admin');
            return;
        }

        console.log(`✅ Found ${articles.length} articles:`);
        articles.forEach((article, index) => {
            console.log(`   ${index + 1}. ID: ${article.id} | Title: "${article.title}" | Slug: "${article.slug || 'N/A'}"`);
        });

        // اختبار 2: اختبار كل مقالة بـ ID الخاص بها
        console.log(`\n2. Testing each article individually...\n`);
        
        for (let i = 0; i < Math.min(articles.length, 3); i++) { // اختبار أول 3 مقالات فقط
            const testArticle = articles[i];
            console.log(`--- Testing Article ${i + 1}: ID ${testArticle.id} ---`);
            
            try {
                // اختبار بدون populate
                console.log(`Testing: GET /api/blog-articles/${testArticle.id}?locale=en`);
                const basicResponse = await axios.get(`${API_URL}/api/blog-articles/${testArticle.id}?locale=en`);
                
                if (basicResponse.status === 200 && basicResponse.data.data) {
                    console.log(`✅ Basic fetch: SUCCESS`);
                    console.log(`   Title: "${basicResponse.data.data.title}"`);
                    
                    // اختبار مع populate
                    console.log(`Testing: GET /api/blog-articles/${testArticle.id}?populate=*&locale=en`);
                    const populateResponse = await axios.get(`${API_URL}/api/blog-articles/${testArticle.id}?populate=*&locale=en`);
                    
                    if (populateResponse.status === 200 && populateResponse.data.data) {
                        const populatedArticle = populateResponse.data.data;
                        console.log(`✅ Populate fetch: SUCCESS`);
                        console.log(`   Title: "${populatedArticle.title}"`);
                        console.log(`   Author: ${populatedArticle.author?.name || 'N/A'}`);
                        console.log(`   Category: ${populatedArticle.category?.name || 'N/A'}`);
                        console.log(`   Tags: ${populatedArticle.tags?.length || 0} tag(s)`);
                        console.log(`   Featured Image: ${populatedArticle.featuredImage ? 'Available' : 'N/A'}`);
                        console.log(`   Content: ${populatedArticle.content ? 'Available' : 'N/A'} (${populatedArticle.content?.length || 0} chars)`);
                        
                        // اختبار بـ slug إذا كان متوفر
                        if (testArticle.slug) {
                            console.log(`Testing: GET /api/blog-articles/${testArticle.slug}?populate=*&locale=en`);
                            try {
                                const slugResponse = await axios.get(`${API_URL}/api/blog-articles/${testArticle.slug}?populate=*&locale=en`);
                                console.log(`✅ Slug fetch: SUCCESS (${testArticle.slug})`);
                            } catch (slugError) {
                                console.log(`❌ Slug fetch: FAILED (${slugError.response?.status || slugError.message})`);
                            }
                        }
                        
                        console.log(`🎉 Article ${testArticle.id} - ALL TESTS PASSED!\n`);
                        
                        // إذا نجح الاختبار مع هذه المقالة، اعرض معلومات الفرونت اند
                        console.log(`📱 Frontend URLs for testing:`);
                        console.log(`   - By ID: http://localhost:3000/media/${testArticle.id}`);
                        if (testArticle.slug) {
                            console.log(`   - By Slug: http://localhost:3000/media/${testArticle.slug}`);
                        }
                        console.log(`   - API URL: ${API_URL}/api/blog-articles/${testArticle.id}?populate=*&locale=en`);
                        
                        return; // توقف عند أول مقالة ناجحة
                        
                    } else {
                        console.log(`❌ Populate fetch: Invalid response format`);
                    }
                } else {
                    console.log(`❌ Basic fetch: Invalid response format`);
                }
                
            } catch (error) {
                console.log(`❌ Article ${testArticle.id}: ${error.response?.status || error.message}`);
                if (error.response?.data) {
                    console.log(`   Error details:`, error.response.data.error?.message || 'Unknown error');
                }
            }
            console.log(''); // سطر فارغ
        }

    } catch (error) {
        console.log(`❌ Test failed: ${error.message}`);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('💡 Strapi is not running! Start with: npm run develop');
        } else if (error.response?.status === 400) {
            console.log('💡 Bad Request - Check controller and populate configuration');
        }
    }
}

smartTest();
