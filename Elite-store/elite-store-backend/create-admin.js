#!/usr/bin/env node

// Create Admin User Script for Elite Store Backend
const bcrypt = require('bcryptjs');
require('dotenv').config();

console.log('🔧 Elite Store - Create Admin User');
console.log('==================================\n');

// Check if we have the required environment variables
if (!process.env.DB_HOST || !process.env.DB_USERNAME || !process.env.DB_PASSWORD) {
  console.error('❌ Missing required environment variables!');
  console.log('Please ensure the following are set in your .env file:');
  console.log('- DB_HOST');
  console.log('- DB_USERNAME'); 
  console.log('- DB_PASSWORD');
  console.log('- DB_NAME');
  process.exit(1);
}

async function createAdminUser() {
  const { Client } = require('pg');
  
  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
  });

  try {
    console.log('🔗 Connecting to database...');
    await client.connect();
    console.log('✅ Connected to database successfully!');

    // Check if users table exists (TypeORM will create it automatically)
    console.log('📋 Checking users table...');
    const tableExists = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `);
    
    if (!tableExists.rows[0].exists) {
      console.log('❌ Users table does not exist. Please run the backend application first to create the database schema.');
      return;
    }

    // Hash the password
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@elitestore.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';
    const firstName = 'Elite Store';
    const lastName = 'Admin';
    
    console.log('🔒 Hashing admin password...');
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    // Check if admin user already exists
    console.log('🔍 Checking if admin user exists...');
    const existingUser = await client.query(
      'SELECT id FROM users WHERE email = $1',
      [adminEmail]
    );

    if (existingUser.rows.length > 0) {
      console.log('⚠️ Admin user already exists, updating password...');
      await client.query(
        'UPDATE users SET password = $1, "firstName" = $2, "lastName" = $3, role = $4, "updatedAt" = CURRENT_TIMESTAMP WHERE email = $5',
        [hashedPassword, firstName, lastName, 'admin', adminEmail]
      );
    } else {
      console.log('👤 Creating new admin user...');
      await client.query(
        'INSERT INTO users (id, email, password, "firstName", "lastName", role, status, "emailVerified", "createdAt", "updatedAt") VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
        [adminEmail, hashedPassword, firstName, lastName, 'admin', 'active', true]
      );
    }

    // Verify the user was created/updated
    const user = await client.query(
      'SELECT id, email, "firstName", "lastName", role, status, "emailVerified", "createdAt" FROM users WHERE email = $1',
      [adminEmail]
    );

    if (user.rows.length > 0) {
      const userData = user.rows[0];
      console.log('\n✅ Admin user successfully created/updated!');
      console.log('📋 User Details:');
      console.log(`   ID: ${userData.id}`);
      console.log(`   Email: ${userData.email}`);
      console.log(`   Name: ${userData.firstName} ${userData.lastName}`);
      console.log(`   Role: ${userData.role}`);
      console.log(`   Status: ${userData.status}`);
      console.log(`   Email Verified: ${userData.emailVerified}`);
      console.log(`   Created: ${userData.createdAt}`);
      
      console.log('\n🔑 Login Credentials:');
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Password: ${adminPassword}`);
      
      console.log('\n🌐 You can now login to the admin dashboard at:');
      console.log('   http://134.122.102.182/admin/');
    }

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    if (error.code) {
      console.error(`   Error Code: ${error.code}`);
    }
    process.exit(1);
  } finally {
    await client.end();
    console.log('\n🔐 Database connection closed.');
  }
}

// Run the script
createAdminUser().catch((error) => {
  console.error('💥 Script failed:', error.message);
  process.exit(1);
});
