const axios = require('axios');

async function testFrontendComplete() {
    const API_URL = 'http://localhost:1337';
    
    try {
        console.log('🧪 Final Frontend Test...\n');

        // الحصول على المقالات
        const allResponse = await axios.get(`${API_URL}/api/blog-articles?populate=*&locale=en`);
        const articles = allResponse.data.data;
        
        if (articles.length === 0) {
            console.log('❌ No articles found!');
            return;
        }

        console.log('📋 Available Articles for Testing:\n');
        
        articles.forEach((article, index) => {
            console.log(`${index + 1}. "${article.title}"`);
            console.log(`   📄 Document ID: ${article.documentId}`);
            console.log(`   🔗 Frontend URL: http://localhost:3000/media/${article.documentId}`);
            console.log(`   📊 API URL: ${API_URL}/api/blog-articles/${article.documentId}?populate=*&locale=en`);
            console.log('');
        });

        // اختبار أول مقالة
        const testArticle = articles[0];
        console.log(`🎯 Testing Article: "${testArticle.title}"\n`);
        
        // اختبار API
        const apiResponse = await axios.get(`${API_URL}/api/blog-articles/${testArticle.documentId}?populate=*&locale=en`);
        const articleData = apiResponse.data.data;
        
        console.log('✅ API Response Success:');
        console.log(`   - Title: "${articleData.title}"`);
        console.log(`   - Author: ${articleData.author?.name || 'N/A'}`);
        console.log(`   - Category: ${articleData.category?.name || 'N/A'}`);
        console.log(`   - Content Length: ${articleData.content?.length || 0} chars`);
        console.log(`   - Featured Image: ${articleData.featuredImage ? 'Available' : 'N/A'}`);
        console.log(`   - Published Date: ${articleData.publishedAt || 'N/A'}`);
        console.log(`   - Tags: ${articleData.tags?.length || 0} tag(s)`);

        console.log('\n🚀 Frontend Testing Instructions:');
        console.log('1. Start frontend: cd elite-frontend && npm run dev');
        console.log('2. Test these URLs in browser:');
        console.log(`   - Main Article: http://localhost:3000/media/${testArticle.documentId}`);
        
        if (articles.length > 1) {
            console.log(`   - Second Article: http://localhost:3000/media/${articles[1].documentId}`);
        }
        
        console.log('\n📋 Expected Frontend Behavior:');
        console.log('✅ Article detail page loads without errors');
        console.log('✅ Article title, content, and metadata display correctly');
        console.log('✅ Author information appears');
        console.log('✅ Featured image shows (if available)');
        console.log('✅ Category and tags display');
        console.log('✅ Loading states work properly');
        console.log('✅ Error handling works for non-existent articles');

        console.log('\n🔍 Troubleshooting:');
        console.log('If frontend shows errors:');
        console.log('1. Check browser console for JavaScript errors');
        console.log('2. Verify useBlogApi.ts is updated correctly');
        console.log('3. Ensure BlogSection links use documentId');
        console.log('4. Check that article detail page uses new hook');

        console.log(`\n✨ Ready for Testing! Backend API is working perfectly.`);

    } catch (error) {
        console.log(`❌ Test failed: ${error.message}`);
        
        if (error.response) {
            console.log(`Response status: ${error.response.status}`);
            console.log(`Response data:`, error.response.data);
        }
    }
}

testFrontendComplete();
