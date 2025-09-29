const axios = require('axios');

async function quickTest() {
    const API_URL = 'http://localhost:1337';
    
    try {
        console.log('🚀 Quick API Test...\n');

        // اختبار 1: جلب جميع المقالات
        console.log('1. Getting all articles...');
        const allResponse = await axios.get(`${API_URL}/api/blog-articles?populate=*&locale=en`);
        const articles = allResponse.data.data;
        
        if (articles.length === 0) {
            console.log('❌ No articles found! Please create articles in Strapi admin first.');
            console.log('Go to: http://localhost:1337/admin');
            return;
        }

        console.log(`✅ Found ${articles.length} articles`);
        const testArticle = articles[0];
        console.log(`🎯 Will test with: ID=${testArticle.id}, Title="${testArticle.title}"`);

        // اختبار 2: جلب مقالة بالـ ID
        console.log(`\n2. Testing by ID: ${testArticle.id}`);
        const url = `${API_URL}/api/blog-articles/${testArticle.id}?populate=*&locale=en`;
        console.log(`URL: ${url}`);
        
        const response = await axios.get(url);
        
        if (response.status === 200 && response.data.data) {
            const article = response.data.data;
            console.log(`✅ SUCCESS! Article retrieved:`);
            console.log(`   📄 ID: ${article.id}`);
            console.log(`   📄 Title: "${article.title}"`);
            console.log(`   📄 Author: ${article.author?.name || 'N/A'}`);
            console.log(`   📄 Category: ${article.category?.name || 'N/A'}`);
            console.log(`   📄 Content: ${article.content ? 'Available' : 'N/A'} (${article.content?.length || 0} chars)`);
            console.log(`   📄 Featured Image: ${article.featuredImage ? 'Available' : 'N/A'}`);
            console.log(`   📄 Published: ${article.publishedAt ? 'Yes' : 'No'}`);
            
            console.log(`\n🎉 API is working perfectly!`);
            console.log(`🔗 Frontend URL: http://localhost:3000/media/${testArticle.id}`);
            
        } else {
            console.log('❌ Unexpected response format');
        }

    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.log('❌ Strapi is not running! Start it with: npm run develop');
        } else {
            console.log(`❌ Error: ${error.response?.status} ${error.message}`);
        }
    }
}

quickTest();
