const axios = require('axios');

async function testDocumentId() {
    const API_URL = 'http://localhost:1337';
    
    try {
        console.log('🔍 Testing Document ID vs Regular ID...\n');

        // اختبار 1: جلب جميع المقالات لرؤية البنية
        console.log('1. Getting articles to see their structure...');
        const allResponse = await axios.get(`${API_URL}/api/blog-articles`);
        const articles = allResponse.data.data;
        
        if (articles.length === 0) {
            console.log('❌ No articles found!');
            return;
        }

        console.log(`✅ Found ${articles.length} articles:\n`);
        
        // طباعة تفاصيل كل مقالة
        articles.forEach((article, index) => {
            console.log(`Article ${index + 1}:`);
            console.log(`   📄 ID: ${article.id}`);
            console.log(`   📄 Document ID: ${article.documentId}`);
            console.log(`   📄 Title: "${article.title}"`);
            console.log(`   📄 Slug: "${article.slug || 'N/A'}"`);
            console.log(`   📄 Published: ${article.publishedAt ? 'Yes' : 'No'}`);
            console.log('');
        });

        // اختبار 2: تجربة الوصول بطرق مختلفة
        const testArticle = articles[0];
        console.log(`2. Testing different access methods for article: "${testArticle.title}"\n`);
        
        // تجربة 1: بالـ ID العادي
        console.log(`Testing with regular ID: ${testArticle.id}`);
        try {
            const idResponse = await axios.get(`${API_URL}/api/blog-articles/${testArticle.id}`);
            console.log(`✅ Regular ID works!`);
        } catch (error) {
            console.log(`❌ Regular ID failed: ${error.response?.status}`);
        }

        // تجربة 2: بالـ Document ID
        console.log(`Testing with document ID: ${testArticle.documentId}`);
        try {
            const docResponse = await axios.get(`${API_URL}/api/blog-articles/${testArticle.documentId}`);
            console.log(`✅ Document ID works!`);
        } catch (error) {
            console.log(`❌ Document ID failed: ${error.response?.status}`);
        }

        // تجربة 3: بالـ Slug
        if (testArticle.slug) {
            console.log(`Testing with slug: ${testArticle.slug}`);
            try {
                const slugResponse = await axios.get(`${API_URL}/api/blog-articles/${testArticle.slug}`);
                console.log(`✅ Slug works!`);
            } catch (error) {
                console.log(`❌ Slug failed: ${error.response?.status}`);
            }
        }

        // تجربة 4: مع populate
        console.log(`\nTesting with populate...`);
        const testMethods = [
            { name: 'Regular ID + populate', url: `${API_URL}/api/blog-articles/${testArticle.id}?populate=*` },
            { name: 'Document ID + populate', url: `${API_URL}/api/blog-articles/${testArticle.documentId}?populate=*` }
        ];

        for (const method of testMethods) {
            try {
                const response = await axios.get(method.url);
                console.log(`✅ ${method.name}: Success!`);
            } catch (error) {
                console.log(`❌ ${method.name}: Failed (${error.response?.status})`);
            }
        }

        console.log(`\n📋 Summary:`);
        console.log(`If Document ID works but regular ID doesn't, then Strapi v5 uses documentId for findOne`);
        console.log(`If Slug works, then custom routing for slugs is working`);
        console.log(`If nothing works, then it's a controller/permissions issue`);

    } catch (error) {
        console.log(`❌ Test failed: ${error.message}`);
    }
}

testDocumentId();
