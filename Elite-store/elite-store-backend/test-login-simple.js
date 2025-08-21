#!/usr/bin/env node

// Simple Login Test for Elite Store Backend
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

async function testDatabaseLogin() {
  const client = new Client(dbConfig);
  
  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connected successfully!\n');

    // Find user by email
    console.log('🔍 Looking for user:', testCredentials.email);
    const userQuery = 'SELECT * FROM "user" WHERE email = $1';
    const userResult = await client.query(userQuery, [testCredentials.email]);

    if (userResult.rows.length === 0) {
      console.log('❌ User not found!');
      return false;
    }

    const user = userResult.rows[0];
    console.log('✅ User found:');
    console.log('   📧 Email:', user.email);
    console.log('   👤 Name:', `${user.firstName} ${user.lastName}`);
    console.log('   🔰 Role:', user.role);
    console.log('   🆔 ID:', user.id);

    // Test password
    console.log('\n🔑 Testing password...');
    const passwordMatch = await bcrypt.compare(testCredentials.password, user.password);

    if (passwordMatch) {
      console.log('✅ Password is correct!');
      console.log('\n🎉 DATABASE LOGIN TEST SUCCESSFUL!');
      return { success: true, user };
    } else {
      console.log('❌ Password is incorrect!');
      return { success: false, user };
    }

  } catch (error) {
    console.error('❌ Database error:', error.message);
    return { success: false, error: error.message };
  } finally {
    await client.end();
    console.log('\n🔌 Database connection closed.');
  }
}

async function testAPILogin() {
  console.log('\n🌐 Testing API Login...');
  console.log('========================');
  
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
    
    const apiUrl = 'http://134.122.102.182/api/auth/login';
    console.log('🔗 API URL:', apiUrl);
    console.log('📧 Email:', testCredentials.email);
    console.log('🔑 Password:', testCredentials.password);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testCredentials)
    });

    console.log('\n📊 API Response:');
    console.log('   🏷️  Status:', response.status, response.statusText);
    
    if (response.ok) {
      const data = await response.json();
      console.log('   ✅ Login successful!');
      console.log('   🎫 Access Token:', data.access_token ? 'Received ✅' : 'Not received ❌');
      
      if (data.user) {
        console.log('   👤 User Info:');
        console.log('      📧 Email:', data.user.email);
        console.log('      🔰 Role:', data.user.role);
        console.log('      🆔 ID:', data.user.id);
      }
      
      return { success: true, data };
    } else {
      const errorText = await response.text();
      console.log('   ❌ Login failed');
      console.log('   📄 Error:', errorText);
      return { success: false, error: errorText };
    }
    
  } catch (error) {
    console.log('❌ API test failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Backend server might not be running');
      console.log('   Try: pm2 restart elite-store-backend');
    }
    return { success: false, error: error.message };
  }
}

async function showCurlExample() {
  console.log('\n📋 CURL Command Example:');
  console.log('========================');
  console.log('curl -X POST http://134.122.102.182/api/auth/login \\');
  console.log('  -H "Content-Type: application/json" \\');
  console.log(`  -d '${JSON.stringify(testCredentials)}'`);
  console.log();
}

async function main() {
  console.log('🚀 Starting login tests...\n');
  
  // Test 1: Database Login
  const dbResult = await testDatabaseLogin();
  
  // Test 2: API Login
  const apiResult = await testAPILogin();
  
  // Show CURL example
  await showCurlExample();
  
  // Summary
  console.log('📋 TEST SUMMARY');
  console.log('===============');
  console.log('🗄️  Database Login:', dbResult.success ? '✅ PASSED' : '❌ FAILED');
  console.log('🌐 API Login:', apiResult.success ? '✅ PASSED' : '❌ FAILED');
  
  if (dbResult.success && apiResult.success) {
    console.log('\n🎉 ALL TESTS PASSED!');
    console.log('✅ Your admin credentials are working correctly');
    console.log('✅ You can now use these credentials in your frontend');
  } else if (dbResult.success && !apiResult.success) {
    console.log('\n⚠️  Database works, but API failed');
    console.log('💡 Check if the backend server is running');
    console.log('💡 Try: pm2 list && pm2 restart elite-store-backend');
  } else {
    console.log('\n❌ Tests failed');
    console.log('💡 Check the error messages above for details');
  }
  
  console.log('\n🔐 Admin Credentials:');
  console.log('📧 Email: admin@elitestore.com');
  console.log('🔑 Password: admin123456');
}

main().catch(console.error);

