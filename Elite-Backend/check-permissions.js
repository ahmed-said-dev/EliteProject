const axios = require('axios');

async function checkPermissions() {
    const API_URL = 'http://localhost:1337';
    
    console.log('🔐 Checking API Permissions...\n');
    
    try {
        // اختبار صلاحية find
        console.log('1. Testing find permission (GET /api/blog-articles)');
        try {
            const findResponse = await axios.get(`${API_URL}/api/blog-articles`);
            console.log(`✅ Find permission: OK (${findResponse.status})`);
        } catch (error) {
            if (error.response?.status === 403) {
                console.log(`❌ Find permission: DENIED (403)`);
                console.log(`   💡 Fix: Enable "find" permission for Public role in Strapi admin`);
            } else {
                console.log(`❌ Find permission: ERROR (${error.response?.status || error.message})`);
            }
        }
        
        // اختبار صلاحية findOne
        console.log('\n2. Testing findOne permission (GET /api/blog-articles/1)');
        try {
            const findOneResponse = await axios.get(`${API_URL}/api/blog-articles/1`);
            console.log(`✅ FindOne permission: OK (${findOneResponse.status})`);
        } catch (error) {
            if (error.response?.status === 403) {
                console.log(`❌ FindOne permission: DENIED (403)`);
                console.log(`   💡 Fix: Enable "findOne" permission for Public role in Strapi admin`);
            } else if (error.response?.status === 404) {
                console.log(`✅ FindOne permission: OK (article not found is normal)`);
            } else {
                console.log(`❌ FindOne permission: ERROR (${error.response?.status || error.message})`);
            }
        }
        
        console.log('\n📋 Permissions Summary:');
        console.log('To fix permissions:');
        console.log('1. Go to: http://localhost:1337/admin');
        console.log('2. Settings → Roles → Public');
        console.log('3. Enable "find" and "findOne" for Blog-article');
        console.log('4. Save and try again');
        
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.log('❌ Strapi is not running!');
            console.log('Start it with: npm run develop');
        } else {
            console.log(`❌ Connection error: ${error.message}`);
        }
    }
}

checkPermissions();
