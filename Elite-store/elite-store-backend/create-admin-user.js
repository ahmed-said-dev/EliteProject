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

// Admin user data
const adminData = {
  email: 'admin@elitestore.com',
  password: 'Admin123!@#',
  firstName: 'Elite',
  lastName: 'Admin',
  role: 'admin'
};

async function createAdminUser() {
  const client = new Client(dbConfig);
  
  try {
    console.log('🔗 Connecting to PostgreSQL database...');
    await client.connect();
    console.log('✅ Connected successfully!');

    // Check if users table exists, create if not
    console.log('\n📋 Checking/Creating users table...');
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS "user" (
        "id" SERIAL PRIMARY KEY,
        "email" VARCHAR(255) UNIQUE NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        "firstName" VARCHAR(100),
        "lastName" VARCHAR(100),
        "role" VARCHAR(50) DEFAULT 'user',
        "isActive" BOOLEAN DEFAULT true,
        "isEmailVerified" BOOLEAN DEFAULT false,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    await client.query(createUsersTable);
    console.log('✅ Users table ready!');

    // Check if admin user already exists
    console.log('\n👤 Checking for existing admin user...');
    const existingAdmin = await client.query(
      'SELECT id FROM "user" WHERE email = $1',
      [adminData.email]
    );

    if (existingAdmin.rows.length > 0) {
      console.log('⚠️ Admin user already exists! Updating password...');
      
      // Hash new password
      const hashedPassword = await bcrypt.hash(adminData.password, 10);
      
      // Update existing admin
      await client.query(
        'UPDATE "user" SET password = $1, "updatedAt" = CURRENT_TIMESTAMP WHERE email = $2',
        [hashedPassword, adminData.email]
      );
      
      console.log('✅ Admin password updated successfully!');
    } else {
      console.log('📝 Creating new admin user...');
      
      // Hash password
      const hashedPassword = await bcrypt.hash(adminData.password, 10);
      
      // Create admin user
      const result = await client.query(
        `INSERT INTO "user" (email, password, "firstName", "lastName", role, "isActive", "isEmailVerified")
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id, email`,
        [
          adminData.email,
          hashedPassword,
          adminData.firstName,
          adminData.lastName,
          adminData.role,
          true,
          true
        ]
      );
      
      console.log('✅ Admin user created successfully!');
      console.log(`📧 User ID: ${result.rows[0].id}`);
    }

    // Create categories table if needed
    console.log('\n📂 Checking/Creating categories table...');
    const createCategoriesTable = `
      CREATE TABLE IF NOT EXISTS "category" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "slug" VARCHAR(255) UNIQUE,
        "isActive" BOOLEAN DEFAULT true,
        "sortOrder" INTEGER DEFAULT 0,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    await client.query(createCategoriesTable);
    console.log('✅ Categories table ready!');

    // Create products table if needed
    console.log('\n🛍️ Checking/Creating products table...');
    const createProductsTable = `
      CREATE TABLE IF NOT EXISTS "product" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "price" DECIMAL(10,2) NOT NULL,
        "sku" VARCHAR(100) UNIQUE,
        "stock" INTEGER DEFAULT 0,
        "isActive" BOOLEAN DEFAULT true,
        "categoryId" INTEGER REFERENCES "category"(id),
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    await client.query(createProductsTable);
    console.log('✅ Products table ready!');

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📋 Admin Login Credentials:');
    console.log(`   📧 Email: ${adminData.email}`);
    console.log(`   🔑 Password: ${adminData.password}`);
    console.log('\n🌐 Access Admin Dashboard:');
    console.log('   🖥️ URL: http://134.122.102.182:5173/login');
    console.log('   📱 Or: http://134.122.102.182/admin/');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('   1. Check database connection details');
    console.error('   2. Ensure PostgreSQL server is running');
    console.error('   3. Verify network connectivity');
  } finally {
    await client.end();
    console.log('\n🔌 Database connection closed.');
  }
}

// Run the script
if (require.main === module) {
  createAdminUser();
}

module.exports = { createAdminUser };
