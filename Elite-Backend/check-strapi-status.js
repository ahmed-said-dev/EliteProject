const axios = require('axios');

async function checkStrapiStatus() {
    const API_URL = 'http://localhost:1337';
    
    try {
        console.log('🔍 Checking Strapi Status...\n');

        // اختبار 1: التحقق من أن Strapi يعمل
        console.log('1. Checking if Strapi is running...');
        const healthCheck = await axios.get(`${API_URL}/_health`).catch(() => {
            // إذا فشل health check، جرب endpoint آخر
            return axios.get(`${API_URL}/admin`);
        }).catch(() => {
            // إذا فشل admin، جرب API مباشرة
            return axios.get(`${API_URL}/api/blog-articles`);
        });
        
        console.log(`✅ Strapi is running! Status: ${healthCheck.status}`);

        // اختبار 2: التحقق من الصلاحيات
        console.log('\n2. Checking API permissions...');
        try {
            const apiResponse = await axios.get(`${API_URL}/api/blog-articles`);
            console.log(`✅ API accessible! Found ${apiResponse.data.data?.length || 0} articles`);
            
            if (apiResponse.data.data && apiResponse.data.data.length > 0) {
                const firstArticle = apiResponse.data.data[0];
                console.log(`📄 Sample article: ID ${firstArticle.id}, Title: "${firstArticle.title}"`);
                
                // اختبار findOne
                console.log(`\n3. Testing findOne with article ${firstArticle.id}...`);
                try {
                    const oneResponse = await axios.get(`${API_URL}/api/blog-articles/${firstArticle.id}`);
                    console.log(`✅ FindOne works! Article: "${oneResponse.data.data.title}"`);
                    
                    console.log(`\n🎉 ALL CHECKS PASSED!`);
                    console.log(`📋 Summary:`);
                    console.log(`   - Strapi: ✅ Running`);
                    console.log(`   - API: ✅ Accessible`);
                    console.log(`   - Articles: ✅ ${apiResponse.data.data.length} found`);
                    console.log(`   - FindOne: ✅ Working`);
                    console.log(`\n🔗 Test URLs:`);
                    console.log(`   - API: ${API_URL}/api/blog-articles/${firstArticle.id}?populate=*&locale=en`);
                    console.log(`   - Frontend: http://localhost:3000/media/${firstArticle.id}`);
                    
                } catch (oneError) {
                    console.log(`❌ FindOne failed: ${oneError.response?.status} ${oneError.message}`);
                    if (oneError.response?.data) {
                        console.log(`   Details:`, oneError.response.data);
                    }
                }
                
            } else {
                console.log(`⚠️ No articles found. Create articles in Strapi admin:`);
                console.log(`   Go to: ${API_URL}/admin`);
            }
            
        } catch (apiError) {
            if (apiError.response?.status === 403) {
                console.log(`❌ API access denied (403 Forbidden)`);
                console.log(`💡 Fix: Enable permissions in Strapi admin`);
                console.log(`   1. Go to: ${API_URL}/admin`);
                console.log(`   2. Settings → Roles → Public`);
                console.log(`   3. Enable "find" and "findOne" for Blog-article`);
            } else {
                console.log(`❌ API error: ${apiError.response?.status} ${apiError.message}`);
            }
        }

    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.log('❌ Strapi is not running!');
            console.log('💡 Start Strapi with: npm run develop');
        } else {
            console.log(`❌ Connection error: ${error.message}`);
        }
    }
}

checkStrapiStatus();
