/**
 * Test script to verify Strapi integration
 * Run: node test-strapi-integration.js
 */

const API_URL = 'http://localhost:1337';

async function testStrapiEndpoints() {
  console.log('🧪 Testing Strapi Integration...\n');

  const endpoints = [
    { name: 'Doctor Homes', url: `${API_URL}/api/doctor-homes?populate=*` },
    { name: 'Services', url: `${API_URL}/api/services?populate=*` },
    { name: 'Home Services', url: `${API_URL}/api/home-services?populate=*` },
    { name: 'Team Members', url: `${API_URL}/api/team-members?populate=*` },
    { name: 'Memberships', url: `${API_URL}/api/memberships?populate=*` },
    { name: 'Blog Posts', url: `${API_URL}/api/blog-articles?populate=*` },
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`Testing ${endpoint.name}...`);
      const response = await fetch(endpoint.url);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ ${endpoint.name}: ${data.data?.length || 0} items found`);
        
        // Show first item structure if available
        if (data.data && data.data[0]) {
          const firstItem = data.data[0];
          console.log(`   📋 Sample: ${JSON.stringify({
            id: firstItem.id,
            attributes: Object.keys(firstItem).filter(k => k !== 'id').slice(0, 3)
          }, null, 2)}`);
        }
      } else {
        console.log(`❌ ${endpoint.name}: HTTP ${response.status}`);
      }
    } catch (error) {
      console.log(`💥 ${endpoint.name}: ${error.message}`);
    }
    console.log('');
  }

  console.log('🎉 Test completed!\n');
  console.log('📝 Next steps:');
  console.log('1. Start Frontend: npm run dev');
  console.log('2. Check browser console for API calls');
  console.log('3. Verify data appears correctly');
}

// Run the test
testStrapiEndpoints().catch(console.error);
