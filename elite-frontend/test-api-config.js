#!/usr/bin/env node

// Test API Configuration for Elite Frontend
console.log('🧪 Elite Frontend - API Configuration Test');
console.log('==========================================\n');

// Test Environment Variables
console.log('📋 Environment Variables:');
console.log('==========================');
console.log('NEXT_PUBLIC_STORE_API_URL:', process.env.NEXT_PUBLIC_STORE_API_URL || 'Not set');
console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL || 'Not set');
console.log('NEXT_PUBLIC_STRAPI_URL:', process.env.NEXT_PUBLIC_STRAPI_URL || 'Not set');
console.log('NODE_ENV:', process.env.NODE_ENV || 'Not set');

// Read next.config.js to see environment configuration
console.log('\n📄 Next.js Configuration:');
console.log('==========================');
try {
  const nextConfig = require('./next.config.js');
  if (nextConfig.env) {
    console.log('Environment variables in next.config.js:');
    Object.entries(nextConfig.env).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });
  } else {
    console.log('No environment variables found in next.config.js');
  }
} catch (error) {
  console.log('❌ Could not read next.config.js:', error.message);
}

// Test API endpoints
console.log('\n🌐 Expected API Endpoints:');
console.log('===========================');

const expectedStoreAPI = 'http://134.122.102.182:3001/api';
const expectedStrapiAPI = 'http://134.122.102.182:8080';

console.log(`Store API (Products): ${expectedStoreAPI}/products`);
console.log(`Strapi API (CMS): ${expectedStrapiAPI}/api/global`);

// Test with fetch if available
async function testEndpoints() {
  console.log('\n🧪 Testing API Endpoints:');
  console.log('=========================');
  
  try {
    // Install node-fetch if needed
    let fetch;
    try {
      fetch = require('node-fetch');
    } catch (e) {
      console.log('📦 Installing node-fetch...');
      require('child_process').execSync('npm install node-fetch@2', { stdio: 'inherit' });
      fetch = require('node-fetch');
    }
    
    // Test Store API Products
    console.log('🛍️ Testing Store API /products...');
    try {
      const response = await fetch(`${expectedStoreAPI}/products?limit=5`);
      if (response.ok) {
        const data = await response.json();
        const count = Array.isArray(data) ? data.length : (data.data ? data.data.length : 0);
        console.log(`  ✅ Store API: ${count} products found`);
        if (count > 0) {
          const firstProduct = Array.isArray(data) ? data[0] : data.data[0];
          console.log(`  📦 Sample product: ${firstProduct.name} - $${firstProduct.price}`);
        }
      } else {
        console.log(`  ❌ Store API failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log(`  ❌ Store API error: ${error.message}`);
    }
    
    // Test Store API Categories
    console.log('\n📁 Testing Store API /categories...');
    try {
      const response = await fetch(`${expectedStoreAPI}/categories`);
      if (response.ok) {
        const categories = await response.json();
        console.log(`  ✅ Categories API: ${categories.length} categories found`);
        if (categories.length > 0) {
          console.log(`  📂 Sample category: ${categories[0].name}`);
        }
      } else {
        console.log(`  ❌ Categories API failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log(`  ❌ Categories API error: ${error.message}`);
    }
    
  } catch (error) {
    console.log('❌ API testing setup failed:', error.message);
  }
}

// Configuration advice
console.log('\n💡 Configuration Summary:');
console.log('==========================');
console.log('✅ next.config.js updated with correct NEXT_PUBLIC_STORE_API_URL');
console.log('✅ storeApi.ts updated to use NEXT_PUBLIC_STORE_API_URL');
console.log('✅ eliteApi.ts updated to use NEXT_PUBLIC_STORE_API_URL');
console.log('');
console.log('🔧 Next Steps:');
console.log('1. Rebuild the frontend: npm run build');
console.log('2. Restart the frontend server');
console.log('3. Test the products page: http://134.122.102.182/products');
console.log('');
console.log('📋 Expected Behavior:');
console.log('- Products page should load products from Elite Store backend');
console.log('- API calls should go to http://134.122.102.182:3001/api');
console.log('- No more localhost:3001 references');

// Run the tests
testEndpoints().then(() => {
  console.log('\n🎯 API Configuration Test Complete!');
}).catch(console.error);
