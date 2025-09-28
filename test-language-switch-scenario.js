const axios = require('axios');

const testLanguageSwitchScenario = async () => {
  console.log('🔍 Testing Language Switch Scenario...\n');
  console.log('📋 Scenario:');
  console.log('1. User visits site in English');
  console.log('2. Goes to service detail page (English)');
  console.log('3. Switches language to Arabic from within the page');
  console.log('4. Refreshes the page');
  console.log('5. Should see Arabic content, not "Service not found"\n');
  
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
    
    // Test 2: Simulate English request (initial page load)
    console.log('📋 Test 2: Simulating English page load...');
    try {
      const englishResponse = await axios.get(`${baseUrl}/api/service-pages/${testServiceId}?populate=*&locale=en`);
      console.log(`✅ English request successful:`);
      console.log(`   - Title: ${englishResponse.data.data.title}`);
      console.log(`   - Locale: ${englishResponse.data.data.locale}`);
      console.log(`   - ID: ${englishResponse.data.data.id}`);
    } catch (error) {
      console.log(`⚠️  English version not available, trying without locale...`);
      try {
        const fallbackResponse = await axios.get(`${baseUrl}/api/service-pages/${testServiceId}?populate=*`);
        console.log(`✅ Fallback successful:`);
        console.log(`   - Title: ${fallbackResponse.data.data.title}`);
        console.log(`   - Locale: ${fallbackResponse.data.data.locale}`);
        console.log(`   - ID: ${fallbackResponse.data.data.id}`);
      } catch (fallbackError) {
        console.error(`❌ Both English and fallback failed:`, fallbackError.response?.data || fallbackError.message);
        return;
      }
    }
    
    console.log();
    
    // Test 3: Simulate Arabic request (after language switch + refresh)
    console.log('📋 Test 3: Simulating Arabic request after language switch...');
    try {
      const arabicResponse = await axios.get(`${baseUrl}/api/service-pages/${testServiceId}?populate=*&locale=ar`);
      console.log(`✅ Arabic request successful:`);
      console.log(`   - Title: ${arabicResponse.data.data.title}`);
      console.log(`   - Locale: ${arabicResponse.data.data.locale}`);
      console.log(`   - ID: ${arabicResponse.data.data.id}`);
      console.log(`   - Has image: ${arabicResponse.data.data.image ? 'Yes' : 'No'}`);
      console.log(`   - Has features: ${arabicResponse.data.data.features?.length || 0} features`);
    } catch (error) {
      console.error(`❌ Arabic request failed:`, error.response?.data || error.message);
      
      // This is the problematic case - let's test our fallback mechanisms
      console.log('\n🔄 Testing fallback mechanisms...');
      
      // Fallback 1: Without locale
      try {
        console.log('🔄 Fallback 1: Request without locale...');
        const noLocaleResponse = await axios.get(`${baseUrl}/api/service-pages/${testServiceId}?populate=*`);
        console.log(`✅ No-locale fallback successful:`);
        console.log(`   - Title: ${noLocaleResponse.data.data.title}`);
        console.log(`   - Locale: ${noLocaleResponse.data.data.locale}`);
      } catch (noLocaleError) {
        console.error(`❌ No-locale fallback failed:`, noLocaleError.response?.data || noLocaleError.message);
      }
      
      // Fallback 2: With 'all' locale
      try {
        console.log('🔄 Fallback 2: Request with locale=all...');
        const allLocaleResponse = await axios.get(`${baseUrl}/api/service-pages/${testServiceId}?populate=*&locale=all`);
        console.log(`✅ All-locale fallback successful:`);
        console.log(`   - Title: ${allLocaleResponse.data.data.title}`);
        console.log(`   - Locale: ${allLocaleResponse.data.data.locale}`);
      } catch (allLocaleError) {
        console.error(`❌ All-locale fallback failed:`, allLocaleError.response?.data || allLocaleError.message);
      }
    }
    
    console.log('\n🎉 Backend testing completed!');
    console.log('\n📝 Next steps to test the full scenario:');
    console.log('1. Start the frontend: cd elite-frontend && npm run dev');
    console.log('2. Visit: http://localhost:3000/en/services/service-name-1');
    console.log('3. Switch language to Arabic using the language switcher');
    console.log('4. Refresh the page (F5 or Ctrl+R)');
    console.log('5. Check if Arabic content appears instead of "Service not found"');
    console.log('\n🔍 Watch the browser console for debug logs:');
    console.log('- LanguageContext logs for language switching');
    console.log('- ServiceDetail logs for locale mismatch detection');
    console.log('- getServerSideProps logs for server-side data fetching');
    
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

testLanguageSwitchScenario();
