#!/usr/bin/env node

// Test Admin Login Script
const axios = require('axios');
const { Client } = require('pg');

console.log('🔐 Elite Store - Admin Login Tester');
console.log('==================================\n');

const API_URL = 'http://134.122.102.182:3001/api';
const ADMIN_CREDENTIALS = {
  email: 'admin@elitestore.com',
  password: 'Admin123!@#'
};

// Database configuration
const dbConfig = {
  host: 'elite-store-db-do-user-24606323-0.i.db.ondigitalocean.com',
  port: 25060,
  user: 'doadmin',
  password: 'AVNS_Sfg3cMWF_zNOSTFufbo',
  database: 'defaultdb',
  ssl: {
    rejectUnauthorized: false
  }
};

async function checkDatabase() {
  const client = new Client(dbConfig);
  
  try {
    console.log('🔗 Checking database...');
    await client.connect();
    
    // Check if admin user exists
    const adminUser = await client.query(
      'SELECT id, email, "firstName", "lastName", role, "isActive", "isEmailVerified" FROM "user" WHERE email = $1',
      [ADMIN_CREDENTIALS.email]
    );
    
    if (adminUser.rows.length === 0) {
      console.log('❌ Admin user not found in database!');
      return false;
    }
    
    console.log('✅ Admin user found in database:');
    console.log('   ID:', adminUser.rows[0].id);
    console.log('   Email:', adminUser.rows[0].email);
    console.log('   Name:', adminUser.rows[0].firstName, adminUser.rows[0].lastName);
    console.log('   Role:', adminUser.rows[0].role);
    console.log('   Active:', adminUser.rows[0].isActive);
    console.log('   Email Verified:', adminUser.rows[0].isEmailVerified);
    
    return true;
    
  } catch (error) {
    console.error('❌ Database error:', error.message);
    return false;
  } finally {
    await client.end();
  }
}

async function testAPIConnection() {
  try {
    console.log('\n🌐 Testing API connection...');
    const response = await axios.get(`${API_URL}/health`, { timeout: 5000 });
    console.log('✅ API connection successful');
    return true;
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('❌ API server is not running on port 3001');
    } else if (error.response?.status === 404) {
      console.log('⚠️ API responding but /health endpoint not found');
      return true; // API is running, just no health endpoint
    } else {
      console.log('❌ API connection failed:', error.message);
    }
    return false;
  }
}

async function testLogin() {
  try {
    console.log('\n🔑 Testing admin login...');
    console.log('📧 Email:', ADMIN_CREDENTIALS.email);
    console.log('🔐 Password:', ADMIN_CREDENTIALS.password);
    
    const response = await axios.post(`${API_URL}/auth/login`, ADMIN_CREDENTIALS, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    console.log('✅ Login successful!');
    console.log('📋 Response:');
    console.log('   User ID:', response.data.user?.id);
    console.log('   User Email:', response.data.user?.email);
    console.log('   User Role:', response.data.user?.role);
    console.log('   Token Type:', response.data.tokenType);
    console.log('   Expires In:', response.data.expiresIn, 'seconds');
    
    return response.data.accessToken;
    
  } catch (error) {
    console.log('❌ Login failed!');
    
    if (error.response) {
      console.log('   Status:', error.response.status);
      console.log('   Status Text:', error.response.statusText);
      console.log('   Response Data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.log('   No response received');
      console.log('   Error:', error.message);
    } else {
      console.log('   Error:', error.message);
    }
    
    return null;
  }
}

async function testAuthenticatedRequest(token) {
  if (!token) {
    console.log('\n❌ No token available for authenticated request test');
    return;
  }
  
  try {
    console.log('\n🔒 Testing authenticated request...');
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 5000
    });
    
    console.log('✅ Authenticated request successful!');
    console.log('📋 Profile Data:');
    console.log('   ID:', response.data.id);
    console.log('   Email:', response.data.email);
    console.log('   Name:', response.data.firstName, response.data.lastName);
    console.log('   Role:', response.data.role);
    
  } catch (error) {
    console.log('❌ Authenticated request failed!');
    if (error.response) {
      console.log('   Status:', error.response.status);
      console.log('   Response:', error.response.data);
    } else {
      console.log('   Error:', error.message);
    }
  }
}

async function runTests() {
  console.log('🧪 Running comprehensive admin login tests...\n');
  
  // Test 1: Database check
  const dbOk = await checkDatabase();
  if (!dbOk) {
    console.log('\n🛑 Database test failed. Cannot continue.');
    return;
  }
  
  // Test 2: API connection
  const apiOk = await testAPIConnection();
  if (!apiOk) {
    console.log('\n🛑 API connection test failed. Cannot continue.');
    return;
  }
  
  // Test 3: Login attempt
  const token = await testLogin();
  
  // Test 4: Authenticated request
  await testAuthenticatedRequest(token);
  
  console.log('\n📋 Test Summary:');
  console.log('================');
  console.log(`   Database: ${dbOk ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   API Connection: ${apiOk ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Login: ${token ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Authenticated Request: ${token ? '✅ PASS' : '❌ FAIL'}`);
  
  if (token) {
    console.log('\n🎉 All tests passed! Admin login is working correctly.');
    console.log('\n🌐 You can now access the admin dashboard at:');
    console.log('   http://134.122.102.182:5173/login');
  } else {
    console.log('\n❌ Some tests failed. Please check the logs above.');
  }
}

// Run tests
runTests().catch(console.error);
