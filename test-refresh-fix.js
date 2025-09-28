const axios = require('axios');

const testRefreshFix = async () => {
  console.log('🔍 Testing Service Refresh Fix...\n');
  
  const baseUrl = 'http://localhost:1337';
  
  try {
    // Test 1: Check if backend is running
    console.log('📡 Test 1: Checking backend connectivity...');
    const healthCheck = await axios.get(`${baseUrl}/api/service-pages`, { timeout: 5000 });
    console.log(`✅ Backend is running - Found ${healthCheck.data.data.length} services\n`);
    
    if (healthCheck.data.data.length === 0) {
      console.log('⚠️  No services found in backend. Please add some services first.');
      return;
    }
    
    const testServiceId = healthCheck.data.data[0].id;
    console.log(`🎯 Using service ID ${testServiceId} for testing\n`);
    
    // Test 2: Test Arabic locale (the problematic case)
    console.log('📋 Test 2: Testing Arabic locale (ar)...');
    try {
      const arabicResponse = await axios.get(`${baseUrl}/api/service-pages/${testServiceId}?populate=*&locale=ar`);
      console.log(`✅ Arabic request successful:`);
      console.log(`   - Title: ${arabicResponse.data.data.title}`);
      console.log(`   - Locale: ${arabicResponse.data.data.locale}`);
      console.log(`   - Has image: ${arabicResponse.data.data.image ? 'Yes' : 'No'}`);
      console.log(`   - Has features: ${arabicResponse.data.data.features?.length || 0} features`);
    } catch (error) {
      console.error(`❌ Arabic request failed:`, error.response?.data || error.message);
    }
    
    console.log();
    
    // Test 3: Test English locale
    console.log('📋 Test 3: Testing English locale (en)...');
    try {
      const englishResponse = await axios.get(`${baseUrl}/api/service-pages/${testServiceId}?populate=*&locale=en`);
      console.log(`✅ English request successful:`);
      console.log(`   - Title: ${englishResponse.data.data.title}`);
      console.log(`   - Locale: ${englishResponse.data.data.locale}`);
    } catch (error) {
      console.error(`❌ English request failed:`, error.response?.data || error.message);
      
      // Try fallback without locale
      console.log('🔄 Trying fallback without locale...');
      try {
        const fallbackResponse = await axios.get(`${baseUrl}/api/service-pages/${testServiceId}?populate=*`);
        console.log(`✅ Fallback successful:`);
        console.log(`   - Title: ${fallbackResponse.data.data.title}`);
        console.log(`   - Locale: ${fallbackResponse.data.data.locale}`);
      } catch (fallbackError) {
        console.error(`❌ Fallback also failed:`, fallbackError.response?.data || fallbackError.message);
      }
    }
    
    console.log();
    
    // Test 4: Test 'all' locale
    console.log('📋 Test 4: Testing "all" locale...');
    try {
      const allResponse = await axios.get(`${baseUrl}/api/service-pages/${testServiceId}?populate=*&locale=all`);
      console.log(`✅ "All" locale request successful:`);
      console.log(`   - Title: ${allResponse.data.data.title}`);
      console.log(`   - Locale: ${allResponse.data.data.locale}`);
    } catch (error) {
      console.error(`❌ "All" locale request failed:`, error.response?.data || error.message);
    }
    
    console.log('\n🎉 Testing completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Start the frontend: cd elite-frontend && npm run dev');
    console.log('2. Visit a service detail page in Arabic: http://localhost:3000/ar/services/service-name-1');
    console.log('3. Refresh the page and check if it works');
    console.log('4. Switch language and test again');
    
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message);
    console.log('\n💡 To fix this:');
    console.log('1. Make sure Strapi backend is running:');
    console.log('   cd elite-backend');
    console.log('   npm run develop');
    console.log('2. Wait for "Server started" message');
    console.log('3. Run this test again');
  }
};

testRefreshFix();
