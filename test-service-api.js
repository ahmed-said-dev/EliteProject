const axios = require('axios');

const testServiceAPI = async () => {
  const baseUrl = 'http://localhost:1337';
  
  console.log('🔍 Testing Service API...\n');
  
  try {
    // Test 1: Get all services
    console.log('📋 Test 1: Getting all services...');
    const allServicesResponse = await axios.get(`${baseUrl}/api/service-pages?populate=*&locale=ar`);
    console.log(`✅ Found ${allServicesResponse.data.data.length} services`);
    
    if (allServicesResponse.data.data.length > 0) {
      const firstService = allServicesResponse.data.data[0];
      console.log(`🎯 First service: ID=${firstService.id}, Title="${firstService.title}", Locale="${firstService.locale}"`);
      
      // Test 2: Get specific service by ID with Arabic locale
      console.log(`\n📋 Test 2: Getting service ID ${firstService.id} with Arabic locale...`);
      try {
        const serviceResponse = await axios.get(`${baseUrl}/api/service-pages/${firstService.id}?populate=*&locale=ar`);
        console.log(`✅ Service found: "${serviceResponse.data.data.title}" (locale: ${serviceResponse.data.data.locale})`);
      } catch (error) {
        console.error(`❌ Error getting service with Arabic locale:`, error.response?.data || error.message);
        
        // Test 3: Try without locale
        console.log(`\n📋 Test 3: Getting service ID ${firstService.id} without locale...`);
        try {
          const noLocaleResponse = await axios.get(`${baseUrl}/api/service-pages/${firstService.id}?populate=*`);
          console.log(`✅ Service found without locale: "${noLocaleResponse.data.data.title}" (locale: ${noLocaleResponse.data.data.locale})`);
        } catch (noLocaleError) {
          console.error(`❌ Error getting service without locale:`, noLocaleError.response?.data || noLocaleError.message);
        }
      }
      
      // Test 4: Try with 'all' locale
      console.log(`\n📋 Test 4: Getting service ID ${firstService.id} with 'all' locale...`);
      try {
        const allLocaleResponse = await axios.get(`${baseUrl}/api/service-pages/${firstService.id}?populate=*&locale=all`);
        console.log(`✅ Service found with 'all' locale: "${allLocaleResponse.data.data.title}" (locale: ${allLocaleResponse.data.data.locale})`);
      } catch (allLocaleError) {
        console.error(`❌ Error getting service with 'all' locale:`, allLocaleError.response?.data || allLocaleError.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Failed to connect to API:', error.message);
    console.log('💡 Make sure Strapi backend is running on http://localhost:1337');
    console.log('💡 Run: cd elite-backend && npm run develop');
  }
};

testServiceAPI();
