#!/usr/bin/env node

// Test Login Script for Elite Store Backend
const bcrypt = require('bcrypt');
const { Client } = require('pg');

console.log('🔐 Elite Store - Login Test');
console.log('===========================\n');

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

// Test credentials
const testCredentials = {
  email: 'admin@elitestore.com',
  password: 'admin123456'
};

async function testLogin() {
  const client = new Client(dbConfig);
  
  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connected successfully!\n');

    // Find user by email
    console.log('🔍 Looking for user:', testCredentials.email);
    const userQuery = 'SELECT id, email, password, "firstName", "lastName", role, "isActive" FROM "user" WHERE email = $1';
    const userResult = await client.query(userQuery, [testCredentials.email]);

    if (userResult.rows.length === 0) {
      console.log('❌ User not found!');
      console.log('💡 Make sure you ran the create-admin-elite.js script first');
      return false;
    }

    const user = userResult.rows[0];
    console.log('✅ User found:', {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive
    });

    // Test password
    console.log('\n🔑 Testing password...');
    const passwordMatch = await bcrypt.compare(testCredentials.password, user.password);

    if (passwordMatch) {
      console.log('✅ Password is correct!');
      console.log('\n🎉 LOGIN TEST SUCCESSFUL!');
      console.log('================================');
      console.log('📧 Email:', user.email);
      console.log('👤 Name:', `${user.firstName} ${user.lastName}`);
      console.log('🔰 Role:', user.role);
      console.log('🟢 Status:', user.isActive ? 'Active' : 'Inactive');
      
      return true;
    } else {
      console.log('❌ Password is incorrect!');
      console.log('💡 Expected password:', testCredentials.password);
      return false;
    }

  } catch (error) {
    console.error('❌ Error during login test:', error.message);
    return false;
  } finally {
    await client.end();
    console.log('\n🔌 Database connection closed.');
  }
}

// Test API endpoint (if backend is running)
async function testAPILogin() {
  console.log('\n🌐 Testing API login endpoint...');
  
  try {
    const fetch = require('node-fetch');
    
    const response = await fetch('http://134.122.102.182/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testCredentials)
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ API login successful!');
      console.log('🎫 Token received:', data.access_token ? 'Yes' : 'No');
      console.log('👤 User info:', data.user ? data.user : 'Not included');
      return true;
    } else {
      const errorData = await response.text();
      console.log('❌ API login failed:', response.status, response.statusText);
      console.log('📄 Response:', errorData);
      return false;
    }
  } catch (error) {
    console.log('⚠️  API test failed (backend might not be running):', error.message);
    console.log('💡 Make sure the backend is running on port 3001');
    return false;
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting login tests...\n');
  
  // Test database login
  const dbLoginSuccess = await testLogin();
  
  if (dbLoginSuccess) {
    // Test API login if database test passed
    await testAPILogin();
  }
  
  console.log('\n📋 Test Summary:');
  console.log('================');
  console.log('🗄️  Database login:', dbLoginSuccess ? '✅ PASSED' : '❌ FAILED');
  
  if (!dbLoginSuccess) {
    console.log('\n💡 To fix database login:');
    console.log('1. Run: node create-admin-elite.js');
    console.log('2. Then run this test again');
  }
}

// Handle missing dependencies
try {
  require('node-fetch');
} catch (e) {
  console.log('📦 Installing missing dependency: node-fetch');
  require('child_process').execSync('npm install node-fetch@2', { stdio: 'inherit' });
}

// Run the script
main().catch(console.error);

