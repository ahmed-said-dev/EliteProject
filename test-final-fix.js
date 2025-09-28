const axios = require('axios');

const testFinalFix = async () => {
  console.log('🔍 Testing Final Service Detail Fix...\n');
  console.log('📋 This test simulates the exact scenario that was failing:\n');
  console.log('1. User visits English service page');
  console.log('2. Switches to Arabic');
  console.log('3. Refreshes page');
  console.log('4. Should see Arabic content, not "Service not found"\n');
  
  const baseUrl = 'http://localhost:1337';
  
  try {
    // Test backend connectivity
    console.log('📡 Step 1: Checking backend connectivity...');
    const healthCheck = await axios.get(`${baseUrl}/api/service-pages`, { timeout: 5000 });
    console.log(`✅ Backend is running - Found ${healthCheck.data.data.length} services\n`);
    
    if (healthCheck.data.data.length === 0) {
      console.log('⚠️  No services found. Please add services to test.');
      return;
    }
    
    // Get first service for testing
    const testService = healthCheck.data.data[0];
    console.log(`🎯 Using test service:`);
    console.log(`   - ID: ${testService.id}`);
    console.log(`   - Title: ${testService.title}`);
    console.log(`   - Slug: ${testService.slug || 'N/A'}`);
    console.log(`   - Locale: ${testService.locale}\n`);
    
    // Test the new getServerSideProps logic
    console.log('📋 Step 2: Testing new getServerSideProps strategies...\n');
    
    // Strategy 1: Fetch by ID with Arabic locale
    console.log('🔍 Strategy 1: Fetch by ID with Arabic locale');
    try {
      const arabicByIdUrl = `${baseUrl}/api/service-pages/${testService.id}?populate=*&locale=ar`;
      console.log(`   URL: ${arabicByIdUrl}`);
      
      const arabicResponse = await axios.get(arabicByIdUrl);
      console.log(`   ✅ Success: ${arabicResponse.data.data.title} (${arabicResponse.data.data.locale})`);
    } catch (error) {
      console.log(`   ❌ Failed: ${error.response?.status} - ${error.response?.data?.error?.message || error.message}`);
    }
    
    // Strategy 2: Fetch by ID with all locales
    console.log('\n🔍 Strategy 2: Fetch by ID with all locales');
    try {
      const allLocalesUrl = `${baseUrl}/api/service-pages/${testService.id}?populate=*&locale=all`;
      console.log(`   URL: ${allLocalesUrl}`);
      
      const allLocalesResponse = await axios.get(allLocalesUrl);
      console.log(`   ✅ Success: ${allLocalesResponse.data.data.title} (${allLocalesResponse.data.data.locale})`);
    } catch (error) {
      console.log(`   ❌ Failed: ${error.response?.status} - ${error.response?.data?.error?.message || error.message}`);
    }
    
    // Strategy 3: Fetch by ID without locale
    console.log('\n🔍 Strategy 3: Fetch by ID without locale');
    try {
      const noLocaleUrl = `${baseUrl}/api/service-pages/${testService.id}?populate=*`;
      console.log(`   URL: ${noLocaleUrl}`);
      
      const noLocaleResponse = await axios.get(noLocaleUrl);
      console.log(`   ✅ Success: ${noLocaleResponse.data.data.title} (${noLocaleResponse.data.data.locale})`);
    } catch (error) {
      console.log(`   ❌ Failed: ${error.response?.status} - ${error.response?.data?.error?.message || error.message}`);
    }
    
    // Strategy 4: Search all services
    console.log('\n🔍 Strategy 4: Search all services and find by slug/ID');
    try {
      const searchUrl = `${baseUrl}/api/service-pages?populate=*&locale=ar`;
      console.log(`   URL: ${searchUrl}`);
      
      const searchResponse = await axios.get(searchUrl);
      const services = searchResponse.data.data;
      console.log(`   📋 Found ${services.length} services in Arabic`);
      
      // Simulate slug matching
      const testSlug = `service-name-${testService.id}`;
      console.log(`   🔍 Looking for slug pattern: ${testSlug}`);
      
      const foundBySlug = services.find(service => {
        const matches = [
          service.slug === testSlug,
          service.slug?.includes(testSlug),
          testSlug.includes(service.id?.toString()),
          service.id?.toString() === testService.id?.toString()
        ];
        return matches.some(match => match);
      });
      
      if (foundBySlug) {
        console.log(`   ✅ Found by search: ${foundBySlug.title} (ID: ${foundBySlug.id})`);
      } else {
        console.log(`   ⚠️  Not found by slug, but services exist`);
      }
    } catch (error) {
      console.log(`   ❌ Failed: ${error.response?.status} - ${error.response?.data?.error?.message || error.message}`);
    }
    
    console.log('\n🎉 Backend testing completed!\n');
    
    // Frontend testing instructions
    console.log('📝 Frontend Testing Steps:');
    console.log('1. Make sure both backend and frontend are running:');
    console.log('   Backend: cd elite-backend && npm run develop');
    console.log('   Frontend: cd elite-frontend && npm run dev');
    console.log('');
    console.log('2. Test the exact scenario:');
    console.log(`   a. Visit: http://localhost:3000/en/services/service-name-${testService.id}`);
    console.log('   b. Switch language to Arabic using the language switcher');
    console.log('   c. Refresh the page (F5)');
    console.log('   d. Should see Arabic content instead of "الخدمة غير موجودة"');
    console.log('');
    console.log('3. Check browser console for detailed logs:');
    console.log('   - getServerSideProps logs show which strategy worked');
    console.log('   - LanguageContext logs show URL changes');
    console.log('   - Service detail logs show data flow');
    console.log('');
    console.log('4. Alternative test URLs:');
    console.log(`   - http://localhost:3000/ar/services/service-name-${testService.id}`);
    console.log(`   - http://localhost:3000/services/service-name-${testService.id}`);
    
    // Test different slug patterns
    console.log('\n🔍 Testing different slug patterns...');
    const slugPatterns = [
      `service-name-${testService.id}`,
      `${testService.id}-service-name`,
      `service-${testService.id}`,
      testService.id.toString()
    ];
    
    for (const pattern of slugPatterns) {
      console.log(`\n🔍 Testing slug pattern: ${pattern}`);
      
      // Simulate ID extraction
      const match = pattern.match(/(\d+)/);
      if (match && match[1]) {
        const extractedId = parseInt(match[1], 10);
        console.log(`   ✅ Extracted ID: ${extractedId} (matches: ${extractedId === testService.id})`);
      } else {
        console.log(`   ❌ No ID extracted from pattern`);
      }
    }
    
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message);
    console.log('\n💡 To fix this:');
    console.log('1. Start Strapi backend: cd elite-backend && npm run develop');
    console.log('2. Wait for "Server started" message');
    console.log('3. Run this test again: node test-final-fix.js');
  }
};

testFinalFix();
