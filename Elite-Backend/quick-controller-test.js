const axios = require('axios');

async function quickControllerTest() {
    const API_URL = 'http://localhost:1337';
    
    try {
        console.log('🧪 Quick Controller Test...\n');

        // اختبار 1: find (لنرى إذا كان controller يعمل)
        console.log('1. Testing find (should show custom controller log)...');
        const findResponse = await axios.get(`${API_URL}/api/blog-articles`);
        console.log(`✅ Find works: ${findResponse.data.data.length} articles`);
        
        // اختبار 2: findOne 
        if (findResponse.data.data.length > 0) {
            const testId = findResponse.data.data[0].id;
            console.log(`\n2. Testing findOne with ID: ${testId}`);
            console.log('   (Check backend console for custom controller logs)');
            
            try {
                const oneResponse = await axios.get(`${API_URL}/api/blog-articles/${testId}`);
                console.log(`✅ FindOne Success: "${oneResponse.data.data.title}"`);
            } catch (error) {
                console.log(`❌ FindOne Failed: ${error.response?.status} - ${error.response?.data?.error?.message}`);
            }
        }

        console.log(`\n📋 Expected in Backend Console:`);
        console.log(`   - "🔍 Custom Find Controller Called!" for find`);
        console.log(`   - "🔍 Custom FindOne Controller Called!" for findOne`);
        console.log(`\n   If you don't see these logs, the controller isn't being used!`);

    } catch (error) {
        console.log(`❌ Test failed: ${error.message}`);
    }
}

quickControllerTest();
