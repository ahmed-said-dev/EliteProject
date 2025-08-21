#!/usr/bin/env node

// Fix Database Schema Script
require('dotenv').config();

console.log('🔧 Elite Store - Fix Database Schema');
console.log('====================================\n');

async function fixDatabase() {
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

    // Clean up old data that's causing issues
    console.log('🧹 Cleaning up problematic data...');
    
    // Delete users with null email addresses
    await client.query('DELETE FROM users WHERE email IS NULL OR email = \'\'');
    console.log('✅ Removed users with null/empty emails');

    // Drop and recreate users table to fix schema issues
    console.log('🔄 Recreating users table with correct schema...');
    
    // Drop the table if exists
    await client.query('DROP TABLE IF EXISTS users CASCADE');
    console.log('✅ Dropped existing users table');

    // Create fresh users table
    await client.query(`
      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        address TEXT,
        city VARCHAR(100),
        country VARCHAR(100),
        avatar TEXT,
        role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user', 'moderator')),
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
        "emailVerified" BOOLEAN DEFAULT false,
        "emailVerificationToken" VARCHAR(255),
        "passwordResetToken" VARCHAR(255),
        "passwordResetExpires" TIMESTAMP,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Created fresh users table with correct schema');

    // Create indexes for better performance
    await client.query('CREATE INDEX idx_users_email ON users(email)');
    await client.query('CREATE INDEX idx_users_role ON users(role)');
    await client.query('CREATE INDEX idx_users_status ON users(status)');
    console.log('✅ Created database indexes');

    console.log('\n🎉 Database schema fixed successfully!');
    console.log('🔄 You can now restart the backend application.');

  } catch (error) {
    console.error('❌ Error fixing database:', error.message);
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
fixDatabase().catch((error) => {
  console.error('💥 Script failed:', error.message);
  process.exit(1);
});
