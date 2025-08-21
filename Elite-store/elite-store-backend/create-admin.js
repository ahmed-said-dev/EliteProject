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

    // Create users table if it doesn't exist
    console.log('📋 Creating users table if not exists...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS "user" (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        "isActive" BOOLEAN DEFAULT true,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Hash the password
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@elitestore.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';
    const adminName = process.env.ADMIN_NAME || 'Elite Store Admin';
    
    console.log('🔒 Hashing admin password...');
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    // Check if admin user already exists
    console.log('🔍 Checking if admin user exists...');
    const existingUser = await client.query(
      'SELECT id FROM "user" WHERE email = $1',
      [adminEmail]
    );

    if (existingUser.rows.length > 0) {
      console.log('⚠️ Admin user already exists, updating password...');
      await client.query(
        'UPDATE "user" SET password = $1, name = $2, role = $3, "updatedAt" = CURRENT_TIMESTAMP WHERE email = $4',
        [hashedPassword, adminName, 'admin', adminEmail]
      );
    } else {
      console.log('👤 Creating new admin user...');
      await client.query(
        'INSERT INTO "user" (email, password, name, role, "isActive") VALUES ($1, $2, $3, $4, $5)',
        [adminEmail, hashedPassword, adminName, 'admin', true]
      );
    }

    // Verify the user was created/updated
    const user = await client.query(
      'SELECT id, email, name, role, "isActive", "createdAt" FROM "user" WHERE email = $1',
      [adminEmail]
    );

    if (user.rows.length > 0) {
      const userData = user.rows[0];
      console.log('\n✅ Admin user successfully created/updated!');
      console.log('📋 User Details:');
      console.log(`   ID: ${userData.id}`);
      console.log(`   Email: ${userData.email}`);
      console.log(`   Name: ${userData.name}`);
      console.log(`   Role: ${userData.role}`);
      console.log(`   Active: ${userData.isActive}`);
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
