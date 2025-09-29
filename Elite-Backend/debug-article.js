const axios = require('axios');

// تكوين API
const API_URL = 'http://localhost:1337';

async function debugArticle(slug = 'understanding-pet-behavior') {
    try {
        console.log(`🔍 Debugging article with slug: ${slug}`);
        console.log(`🌐 API URL: ${API_URL}`);

        // اختبار الاتصال بـ Strapi
        try {
            const healthResponse = await axios.get(`${API_URL}/admin`);
            console.log('✅ Strapi is running');
        } catch (error) {
            console.log('❌ Strapi is not running or not accessible');
            return;
        }

        // البحث عن جميع المقالات
        console.log('\n📋 Checking all articles...');
        try {
            const allArticlesResponse = await axios.get(`${API_URL}/api/blog-articles?populate=*`);
            const articles = allArticlesResponse.data.data || [];
            console.log(`Found ${articles.length} articles:`);
            
            articles.forEach((article, index) => {
                console.log(`  ${index + 1}. ${article.title} (slug: ${article.slug})`);
            });
        } catch (error) {
            console.log('❌ Error fetching all articles:', error.message);
        }

        // البحث عن المقالة المحددة بالـ slug
        console.log(`\n🔍 Searching for article with slug: ${slug}`);
        try {
            const response = await axios.get(`${API_URL}/api/blog-articles/${slug}?populate=*&locale=en`);
            console.log('✅ Article found:', response.data.data.title);
            console.log('📄 Article data:', JSON.stringify(response.data.data, null, 2));
        } catch (error) {
            console.log('❌ Article not found with slug');
            console.log('Error details:', error.response?.data || error.message);
            
            // جرب البحث باستخدام filters
            console.log('\n🔄 Trying with filters...');
            try {
                const filterResponse = await axios.get(`${API_URL}/api/blog-articles?filters[slug][$eq]=${slug}&populate=*&locale=en`);
                const results = filterResponse.data.data || [];
                if (results.length > 0) {
                    console.log('✅ Found with filters:', results[0].title);
                } else {
                    console.log('❌ No results with filters');
                }
            } catch (filterError) {
                console.log('❌ Error with filters:', filterError.response?.data || filterError.message);
            }
        }

        // اختبار مع اللغة العربية
        console.log(`\n🌍 Testing with Arabic locale...`);
        try {
            const arResponse = await axios.get(`${API_URL}/api/blog-articles/${slug}?populate=*&locale=ar`);
            console.log('✅ Arabic article found:', arResponse.data.data.title);
        } catch (error) {
            console.log('❌ Arabic article not found:', error.response?.status || error.message);
        }

    } catch (error) {
        console.error('💥 Script error:', error.message);
    }
}

// تشغيل الدالة
if (require.main === module) {
    const slug = process.argv[2] || 'understanding-pet-behavior';
    debugArticle(slug)
        .then(() => {
            console.log('\n🎉 Debug completed!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Debug failed:', error.message);
            process.exit(1);
        });
}

module.exports = { debugArticle };
