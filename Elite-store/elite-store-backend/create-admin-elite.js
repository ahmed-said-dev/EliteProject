#!/usr/bin/env node

// Create Admin User Script for Elite Store Backend
const bcrypt = require('bcrypt');
const { Client } = require('pg');

console.log('🔐 Elite Store - Admin User Creator');
console.log('===================================\n');

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

// Admin user data - Updated with requested credentials
const adminData = {
  email: 'admin@elitestore.com',
  password: 'admin123456',
  firstName: 'Elite',
  lastName: 'Admin',
  role: 'admin'
};

async function createAdminUser() {
  const client = new Client(dbConfig);
  
  try {
    console.log('🔌 Connecting to DigitalOcean PostgreSQL database...');
    await client.connect();
    console.log('✅ Connected successfully!\n');

    // Check if user table exists, if not create it
    console.log('📋 Checking database schema...');
    
    // Create user table if it doesn't exist
    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS "user" (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        "isActive" BOOLEAN DEFAULT true,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    await client.query(createUserTableQuery);
    console.log('✅ User table ready!\n');

    // Check if admin user already exists
    console.log('🔍 Checking if admin user exists...');
    const existingUserQuery = 'SELECT id, email FROM "user" WHERE email = $1';
    const existingUser = await client.query(existingUserQuery, [adminData.email]);

    if (existingUser.rows.length > 0) {
      console.log('⚠️  Admin user already exists:', existingUser.rows[0]);
      
      // Update existing user password
      console.log('🔄 Updating admin user password...');
      const hashedPassword = await bcrypt.hash(adminData.password, 12);
      
      const updateQuery = `
        UPDATE "user" 
        SET password = $1, "firstName" = $2, "lastName" = $3, role = $4, "updatedAt" = CURRENT_TIMESTAMP
        WHERE email = $5
      `;
      
      await client.query(updateQuery, [
        hashedPassword,
        adminData.firstName,
        adminData.lastName,
        adminData.role,
        adminData.email
      ]);
      
      console.log('✅ Admin user updated successfully!');
    } else {
      // Create new admin user
      console.log('👤 Creating new admin user...');
      const hashedPassword = await bcrypt.hash(adminData.password, 12);
      
      const insertQuery = `
        INSERT INTO "user" (email, password, "firstName", "lastName", role, "isActive") 
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, email, "firstName", "lastName", role
      `;
      
      const result = await client.query(insertQuery, [
        adminData.email,
        hashedPassword,
        adminData.firstName,
        adminData.lastName,
        adminData.role,
        true
      ]);
      
      console.log('✅ Admin user created successfully!');
      console.log('📊 Created user:', result.rows[0]);
    }

    // Display login credentials
    console.log('\n🎉 Admin User Setup Complete!');
    console.log('================================');
    console.log('📧 Email:', adminData.email);
    console.log('🔑 Password:', adminData.password);
    console.log('👤 Role:', adminData.role);
    console.log('\n🚀 You can now test login with these credentials!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('🔍 Full error:', error);
    
    if (error.code === 'ENOTFOUND') {
      console.log('\n💡 Suggestions:');
      console.log('1. Check your internet connection');
      console.log('2. Verify the database host is correct');
      console.log('3. Ensure the database is running and accessible');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Suggestions:');
      console.log('1. Check if the database port (25060) is correct');
      console.log('2. Verify firewall settings allow connections');
      console.log('3. Check if the database service is running');
    } else if (error.code === '28P01') {
      console.log('\n💡 Authentication failed:');
      console.log('1. Verify username and password are correct');
      console.log('2. Check if the user has proper permissions');
    }
    
    process.exit(1);
  } finally {
    await client.end();
    console.log('\n🔌 Database connection closed.');
  }
}

// Test database connection first
async function testConnection() {
  const client = new Client(dbConfig);
  
  try {
    console.log('🧪 Testing database connection...');
    await client.connect();
    
    const result = await client.query('SELECT NOW() as current_time, version() as db_version');
    console.log('✅ Connection test successful!');
    console.log('⏰ Current time:', result.rows[0].current_time);
    console.log('🗄️  Database version:', result.rows[0].db_version.split(' ')[0]);
    
    await client.end();
    return true;
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    await client.end();
    return false;
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting Elite Store Admin Setup...\n');
  
  // Test connection first
  const connectionOk = await testConnection();
  
  if (connectionOk) {
    console.log('\n📝 Proceeding with admin user creation...\n');
    await createAdminUser();
  } else {
    console.log('\n❌ Cannot proceed without database connection.');
    console.log('Please check your database configuration and try again.');
    process.exit(1);
  }
}

// Run the script
main().catch(console.error);

