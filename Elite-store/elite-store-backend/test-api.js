#!/usr/bin/env node

// API Test Script for Elite Store Backend
console.log('🌐 Elite Store - API Test');
console.log('=========================\n');

// Test credentials
const credentials = {
  email: 'admin@elitestore.com',
  password: 'admin123456'
};

const baseURL = 'http://134.122.102.182/api';

// Test API endpoints
async function testAPI() {
  let fetch;
  
  try {
    // Try to import node-fetch
    fetch = (await import('node-fetch')).default;
  } catch (error) {
    console.log('📦 Installing node-fetch...');
    require('child_process').execSync('npm install node-fetch@2', { stdio: 'inherit' });
    fetch = require('node-fetch');
  }

  // Test 1: API Health Check
  console.log('🔍 Test 1: API Health Check');
  try {
    const healthResponse = await fetch(`${baseURL}/health`);
    console.log(`✅ API Health: ${healthResponse.status} ${healthResponse.statusText}`);
  } catch (error) {
    console.log('❌ API Health check failed:', error.message);
  }
  console.log();

  // Test 2: Login Endpoint
  console.log('🔍 Test 2: Login Endpoint');
  try {
    const loginResponse = await fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    });

    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      console.log('✅ Login successful!');
      console.log('🎫 Access Token:', loginData.access_token ? 'Received' : 'Not received');
      console.log('👤 User Info:', loginData.user || 'Not included');
      
      // Test 3: Protected Endpoint with Token
      if (loginData.access_token) {
        console.log('\n🔍 Test 3: Protected Endpoint');
        try {
          const profileResponse = await fetch(`${baseURL}/auth/profile`, {
            headers: {
              'Authorization': `Bearer ${loginData.access_token}`,
              'Content-Type': 'application/json'
            }
          });

          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            console.log('✅ Profile endpoint works!');
            console.log('👤 Profile data:', profileData);
          } else {
            console.log('❌ Profile endpoint failed:', profileResponse.status);
          }
        } catch (error) {
          console.log('❌ Profile test failed:', error.message);
        }
      }
      
    } else {
      const errorData = await loginResponse.text();
      console.log('❌ Login failed:', loginResponse.status, loginResponse.statusText);
      console.log('📄 Error response:', errorData);
    }
  } catch (error) {
    console.log('❌ Login test failed:', error.message);
    console.log('💡 Make sure the backend is running');
  }
  console.log();

  // Test 4: Users Endpoint
  console.log('🔍 Test 4: Users Endpoint');
  try {
    const usersResponse = await fetch(`${baseURL}/users`);
    console.log(`📊 Users endpoint: ${usersResponse.status} ${usersResponse.statusText}`);
    
    if (usersResponse.ok) {
      const usersData = await usersResponse.json();
      console.log('👥 Users count:', usersData.length || 'Unknown');
    }
  } catch (error) {
    console.log('❌ Users test failed:', error.message);
  }
  console.log();

  // Test 5: Products Endpoint
  console.log('🔍 Test 5: Products Endpoint');
  try {
    const productsResponse = await fetch(`${baseURL}/products`);
    console.log(`🛍️  Products endpoint: ${productsResponse.status} ${productsResponse.statusText}`);
    
    if (productsResponse.ok) {
      const productsData = await productsResponse.json();
      console.log('📦 Products count:', productsData.length || 'Unknown');
    }
  } catch (error) {
    console.log('❌ Products test failed:', error.message);
  }
  console.log();

  console.log('🎯 API Test Summary');
  console.log('==================');
  console.log('🌐 Base URL:', baseURL);
  console.log('📧 Test Email:', credentials.email);
  console.log('🔑 Test Password:', credentials.password);
}

// CURL examples
function showCurlExamples() {
  console.log('📋 CURL Examples');
  console.log('================\n');
  
  console.log('1️⃣ Login:');
  console.log(`curl -X POST ${baseURL}/auth/login \\`);
  console.log(`  -H "Content-Type: application/json" \\`);
  console.log(`  -d '${JSON.stringify(credentials)}'`);
  console.log();
  
  console.log('2️⃣ Get Profile (replace TOKEN with actual token):');
  console.log(`curl -X GET ${baseURL}/auth/profile \\`);
  console.log(`  -H "Authorization: Bearer TOKEN"`);
  console.log();
  
  console.log('3️⃣ Get Users:');
  console.log(`curl -X GET ${baseURL}/users`);
  console.log();
  
  console.log('4️⃣ Get Products:');
  console.log(`curl -X GET ${baseURL}/products`);
  console.log();
}

// Main execution
async function main() {
  console.log('🚀 Starting API tests...\n');
  
  await testAPI();
  
  console.log('\n📚 Additional Information:');
  showCurlExamples();
  
  console.log('💡 Tips:');
  console.log('- Use these credentials in your frontend');
  console.log('- Test with Postman for more detailed API exploration');
  console.log('- Check PM2 logs if API calls fail: pm2 logs elite-store-backend');
}

// Run the script
main().catch(console.error);

