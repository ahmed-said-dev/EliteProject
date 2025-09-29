const axios = require('axios');

async function testFrontendFix() {
    const API_URL = 'http://localhost:1337';
    
    try {
        console.log('🧪 Testing Frontend Fix with Document ID...\n');

        // اختبار 1: جلب المقالات للحصول على IDs
        console.log('1. Getting articles for testing...');
        const allResponse = await axios.get(`${API_URL}/api/blog-articles?populate=*&locale=en`);
        const articles = allResponse.data.data;
        
        if (articles.length === 0) {
            console.log('❌ No articles found!');
            return;
        }

        const testArticle = articles[0];
        console.log(`✅ Test article: "${testArticle.title}"`);
        console.log(`   - ID: ${testArticle.id}`);
        console.log(`   - Document ID: ${testArticle.documentId}`);
        console.log(`   - Slug: ${testArticle.slug}`);

        // اختبار 2: التحقق من الـ API URLs للفرونت اند
        console.log(`\n2. Testing API URLs that frontend will use...\n`);
        
        const testUrls = [
            {
                name: 'Document ID (Recommended)',
                url: `${API_URL}/api/blog-articles/${testArticle.documentId}?populate=*&locale=en`,
                frontendUrl: `http://localhost:3000/media/${testArticle.documentId}`
            },
            {
                name: 'Regular ID (Legacy)',
                url: `${API_URL}/api/blog-articles/${testArticle.id}?populate=*&locale=en`, 
                frontendUrl: `http://localhost:3000/media/${testArticle.id}`
            },
            {
                name: 'Slug (Custom)',
                url: `${API_URL}/api/blog-articles/${testArticle.slug}?populate=*&locale=en`,
                frontendUrl: `http://localhost:3000/media/${testArticle.slug}`
            }
        ];

        for (const testCase of testUrls) {
            console.log(`Testing: ${testCase.name}`);
            console.log(`API URL: ${testCase.url}`);
            
            try {
                const response = await axios.get(testCase.url);
                const article = response.data.data;
                
                console.log(`✅ SUCCESS!`);
                console.log(`   - Title: "${article.title}"`);
                console.log(`   - Author: ${article.author?.name || 'N/A'}`);
                console.log(`   - Category: ${article.category?.name || 'N/A'}`);
                console.log(`   - Featured Image: ${article.featuredImage ? 'Available' : 'N/A'}`);
                console.log(`   🌐 Frontend URL: ${testCase.frontendUrl}`);
                
            } catch (error) {
                console.log(`❌ FAILED: ${error.response?.status} ${error.response?.statusText}`);
            }
            console.log('');
        }

        // اختبار 3: توصيات للفرونت اند
        console.log(`📋 Frontend Implementation Recommendations:\n`);
        
        console.log(`✅ RECOMMENDED: Use Document ID`);
        console.log(`   - Stable across Strapi versions`);
        console.log(`   - Works with current API`);
        console.log(`   - URL: /media/${testArticle.documentId}`);
        
        console.log(`\n⚠️ ALTERNATIVE: Smart Detection`);
        console.log(`   - Try direct access first`);
        console.log(`   - Fallback to search if not found`);
        console.log(`   - Supports ID, documentId, and slug`);
        
        console.log(`\n🔧 Frontend Changes Needed:`);
        console.log(`   1. Update article links to use documentId instead of id`);
        console.log(`   2. Update useBlogArticle hook to handle documentId`);
        console.log(`   3. Test all article detail pages`);
        
        console.log(`\n🎯 Test URLs for Browser:`);
        articles.slice(0, 2).forEach((article, index) => {
            console.log(`   Article ${index + 1}: http://localhost:3000/media/${article.documentId}`);
        });

    } catch (error) {
        console.log(`❌ Test failed: ${error.message}`);
    }
}

testFrontendFix();
