const axios = require('axios');

async function debugRoutes() {
    const API_URL = 'http://localhost:1337';
    
    try {
        console.log('🔍 Debugging Routes...\n');

        // اختبار 1: تحقق من routes المتاحة
        console.log('1. Testing available routes...');
        
        // جرب routes مختلفة
        const routesToTest = [
            '/api/blog-articles',
            '/api/blog-articles/15',
            '/api/blog-articles/15?populate=*',
            '/api/blog-articles/15?populate=*&locale=en'
        ];
        
        for (const route of routesToTest) {
            console.log(`\nTesting: ${route}`);
            try {
                const response = await axios.get(`${API_URL}${route}`);
                console.log(`✅ SUCCESS: ${response.status} - ${JSON.stringify(response.data).substring(0, 100)}...`);
            } catch (error) {
                console.log(`❌ FAILED: ${error.response?.status || error.code} - ${error.response?.data?.error?.message || error.message}`);
                
                // طباعة تفاصيل إضافية للأخطاء
                if (error.response?.data) {
                    console.log(`   Full error:`, JSON.stringify(error.response.data, null, 2));
                }
            }
        }

        // اختبار 2: جرب مع super.findOne
        console.log(`\n2. Testing if routes are configured properly...`);
        
        // اختبار مع different IDs
        const testIds = [15, 17, 19, 21, 1, 2, 3];
        
        for (const testId of testIds.slice(0, 3)) { // اختبار أول 3 فقط
            console.log(`\nTesting ID: ${testId}`);
            try {
                const response = await axios.get(`${API_URL}/api/blog-articles/${testId}`);
                console.log(`✅ ID ${testId}: SUCCESS!`);
                console.log(`   Title: ${response.data.data?.title || 'N/A'}`);
                break; // إذا نجح واحد، توقف
            } catch (error) {
                console.log(`❌ ID ${testId}: ${error.response?.status} - ${error.response?.data?.error?.message || error.message}`);
            }
        }

        // اختبار 3: تحقق من content types
        console.log(`\n3. Checking Strapi content-types...`);
        try {
            const contentTypesResponse = await axios.get(`${API_URL}/api/content-type-builder/content-types`).catch(() => {
                return axios.get(`${API_URL}/admin/content-type-builder/content-types`);
            }).catch(() => {
                console.log('Cannot access content-types endpoint (normal for production)');
                return null;
            });
            
            if (contentTypesResponse) {
                console.log(`✅ Content types accessible`);
            }
        } catch (error) {
            console.log(`Content types not accessible (expected)`);
        }

        console.log(`\n📋 Diagnosis:`);
        console.log(`   - If find works but findOne doesn't: Controller issue`);
        console.log(`   - If all routes fail: Permissions issue`);
        console.log(`   - If some IDs work: Database issue`);
        
        console.log(`\n💡 Next steps:`);
        console.log(`   1. Check Strapi backend console for errors`);
        console.log(`   2. Check if controller findOne method is being called`);
        console.log(`   3. Verify routes configuration`);

    } catch (error) {
        console.log(`❌ Debug failed: ${error.message}`);
    }
}

debugRoutes();
