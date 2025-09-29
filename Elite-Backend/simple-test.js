const axios = require('axios');

async function simpleTest() {
    const API_URL = 'http://localhost:1337';
    
    try {
        console.log('🧪 Simple API Test...\n');

        // اختبار 1: جلب جميع المقالات بدون populate
        console.log('1. Testing basic find (without populate)...');
        const basicResponse = await axios.get(`${API_URL}/api/blog-articles?locale=en`);
        console.log(`✅ Basic find works: ${basicResponse.data.data.length} articles`);
        
        if (basicResponse.data.data.length === 0) {
            console.log('❌ No articles found! Create articles in Strapi admin first.');
            return;
        }

        const testId = basicResponse.data.data[0].id;
        console.log(`🎯 Testing with Article ID: ${testId}`);

        // اختبار 2: جلب مقالة واحدة بدون populate
        console.log(`\n2. Testing findOne without populate...`);
        const simpleOneResponse = await axios.get(`${API_URL}/api/blog-articles/${testId}?locale=en`);
        console.log(`✅ FindOne without populate works`);
        console.log(`   Title: ${simpleOneResponse.data.data.title}`);

        // اختبار 3: جلب مقالة واحدة مع populate بسيط
        console.log(`\n3. Testing findOne with basic populate...`);
        const populateResponse = await axios.get(`${API_URL}/api/blog-articles/${testId}?populate=category,tags,author,featuredImage&locale=en`);
        console.log(`✅ FindOne with populate works`);
        console.log(`   Title: ${populateResponse.data.data.title}`);
        console.log(`   Author: ${populateResponse.data.data.author?.name || 'N/A'}`);
        console.log(`   Category: ${populateResponse.data.data.category?.name || 'N/A'}`);

        // اختبار 4: جلب مقالة واحدة مع populate=*
        console.log(`\n4. Testing findOne with populate=*...`);
        try {
            const fullPopulateResponse = await axios.get(`${API_URL}/api/blog-articles/${testId}?populate=*&locale=en`);
            console.log(`✅ FindOne with populate=* works!`);
            console.log(`   Complete article data available`);
            
            console.log(`\n🎉 ALL TESTS PASSED!`);
            console.log(`📱 Frontend URL: http://localhost:3000/media/${testId}`);
            
        } catch (error) {
            console.log(`❌ populate=* failed: ${error.response?.status}`);
            console.log(`   But basic populate works, so API is functional`);
        }

    } catch (error) {
        console.log(`❌ Error: ${error.response?.status || error.message}`);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('💡 Strapi is not running! Start with: npm run develop');
        }
    }
}

simpleTest();
