// Test script to check API connection
const axios = require('axios');

const testAPI = async () => {
  try {
    console.log('🔍 Testing API connection to http://localhost:1337...');
    
    // Test basic connection
    const healthCheck = await axios.get('http://localhost:1337/api/service-pages');
    console.log('✅ API is working!');
    console.log('📊 Response status:', healthCheck.status);
    console.log('📋 Data length:', healthCheck.data?.data?.length || 0);
    
    // Test specific service
    if (healthCheck.data?.data?.length > 0) {
      const firstService = healthCheck.data.data[0];
      console.log('🎯 First service ID:', firstService.id);
      console.log('🎯 First service title:', firstService.title);
      
      // Test fetching specific service
      const serviceDetail = await axios.get(`http://localhost:1337/api/service-pages/${firstService.id}?populate=*&locale=ar`);
      console.log('✅ Service detail fetch successful!');
      console.log('📋 Service detail title:', serviceDetail.data?.data?.title);
    }
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.response) {
      console.error('📊 Status:', error.response.status);
      console.error('📋 Data:', error.response.data);
    }
  }
};

testAPI();
