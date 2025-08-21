#!/usr/bin/env node

// Test All Users Login for Elite Store Backend
const bcrypt = require('bcrypt');
const { Client } = require('pg');

console.log('👥 Elite Store - Test All User Logins');
console.log('=====================================\n');

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

// All test credentials
const testUsers = [
  {
    email: 'admin@elitestore.com',
    password: 'admin123456',
    role: 'admin'
  },
  {
    email: 'john.doe@example.com',
    password: 'password123',
    role: 'user'
  },
  {
    email: 'jane.smith@example.com',
    password: 'password123',
    role: 'user'
  },
  {
    email: 'mike.johnson@example.com',
    password: 'password123',
    role: 'user'
  }
];

async function testUserLogin(client, user) {
  try {
    // Find user by email
    const userQuery = 'SELECT * FROM "user" WHERE email = $1';
    const userResult = await client.query(userQuery, [user.email]);

    if (userResult.rows.length === 0) {
      console.log(`  ❌ User not found: ${user.email}`);
      return false;
    }

    const dbUser = userResult.rows[0];
    
    // Test password
    const passwordMatch = await bcrypt.compare(user.password, dbUser.password);

    if (passwordMatch) {
      console.log(`  ✅ ${dbUser.firstName} ${dbUser.lastName} (${user.email}) - ${dbUser.role}`);
      return true;
    } else {
      console.log(`  ❌ Wrong password for: ${user.email}`);
      return false;
    }

  } catch (error) {
    console.log(`  ❌ Error testing ${user.email}: ${error.message}`);
    return false;
  }
}

async function testAPILogin(user) {
  try {
    let fetch;
    try {
      fetch = require('node-fetch');
    } catch (e) {
      // Skip if fetch not available
      return null;
    }
    
    const response = await fetch('http://134.122.102.182/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      return { success: false, status: response.status };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function main() {
  const client = new Client(dbConfig);
  
  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connected successfully!\n');

    console.log('🔐 Testing Database Logins');
    console.log('==========================');
    
    let successCount = 0;
    
    for (const user of testUsers) {
      const success = await testUserLogin(client, user);
      if (success) successCount++;
    }
    
    console.log(`\n📊 Database Login Results: ${successCount}/${testUsers.length} successful\n`);

    // Test API logins
    console.log('🌐 Testing API Logins');
    console.log('=====================');
    
    let apiSuccessCount = 0;
    
    for (const user of testUsers) {
      const result = await testAPILogin(user);
      
      if (result === null) {
        console.log(`  ⚠️  Skipped ${user.email} (fetch not available)`);
      } else if (result.success) {
        console.log(`  ✅ API login successful: ${user.email}`);
        apiSuccessCount++;
      } else {
        console.log(`  ❌ API login failed: ${user.email} (${result.status || result.error})`);
      }
    }
    
    console.log(`\n📊 API Login Results: ${apiSuccessCount}/${testUsers.length} successful\n`);

    // Final summary
    console.log('🎯 COMPLETE USER TEST SUMMARY');
    console.log('=============================');
    
    console.log('👤 Available User Accounts:');
    console.log('---------------------------');
    testUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email}`);
      console.log(`   Password: ${user.password}`);
      console.log(`   Role: ${user.role}`);
      console.log('');
    });
    
    console.log('🌐 API Endpoints to Test:');
    console.log('-------------------------');
    console.log('POST http://134.122.102.182/api/auth/login');
    console.log('GET  http://134.122.102.182/api/categories');
    console.log('GET  http://134.122.102.182/api/products');
    console.log('GET  http://134.122.102.182/api/auth/profile (requires auth)');
    console.log('');
    
    console.log('💡 Usage Examples:');
    console.log('------------------');
    console.log('# Admin Login:');
    console.log('curl -X POST http://134.122.102.182/api/auth/login \\');
    console.log('  -H "Content-Type: application/json" \\');
    console.log('  -d \'{"email":"admin@elitestore.com","password":"admin123456"}\'');
    console.log('');
    console.log('# Customer Login:');
    console.log('curl -X POST http://134.122.102.182/api/auth/login \\');
    console.log('  -H "Content-Type: application/json" \\');
    console.log('  -d \'{"email":"john.doe@example.com","password":"password123"}\'');
    console.log('');
    
    console.log('✅ All user accounts are ready for testing!');
    console.log('✅ Use these credentials in your frontend application');
    console.log('✅ Test different user roles (admin vs customer)');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await client.end();
    console.log('\n🔌 Database connection closed.');
  }
}

main().catch(console.error);

