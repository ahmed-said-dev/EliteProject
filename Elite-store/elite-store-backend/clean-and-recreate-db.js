#!/usr/bin/env node

// Clean and Recreate Database Script
const { Client } = require('pg');

console.log('🧹 Elite Store - Database Cleanup & Recreation');
console.log('==============================================\n');

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

async function cleanAndRecreateDatabase() {
  const client = new Client(dbConfig);
  
  try {
    console.log('🔗 Connecting to PostgreSQL database...');
    await client.connect();
    console.log('✅ Connected successfully!');

    // Drop all existing tables in correct order (foreign keys first)
    console.log('\n🧹 Cleaning up existing tables...');
    
    const dropCommands = [
      'DROP TABLE IF EXISTS "review" CASCADE;',
      'DROP TABLE IF EXISTS "order_item" CASCADE;',
      'DROP TABLE IF EXISTS "order" CASCADE;', 
      'DROP TABLE IF EXISTS "cart_item" CASCADE;',
      'DROP TABLE IF EXISTS "cart" CASCADE;',
      'DROP TABLE IF EXISTS "product_image" CASCADE;',
      'DROP TABLE IF EXISTS "product" CASCADE;',
      'DROP TABLE IF EXISTS "category" CASCADE;',
      'DROP TABLE IF EXISTS "user" CASCADE;'
    ];

    for (const dropCmd of dropCommands) {
      try {
        await client.query(dropCmd);
        console.log(`   ✅ ${dropCmd}`);
      } catch (error) {
        console.log(`   ⚠️ ${dropCmd} (table didn't exist)`);
      }
    }

    // Enable UUID extension
    console.log('\n🔧 Enabling UUID extension...');
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    console.log('✅ UUID extension enabled!');

    // Create fresh user table
    console.log('\n👤 Creating fresh user table...');
    const createUserTable = `
      CREATE TABLE "user" (
        "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "email" VARCHAR(255) UNIQUE NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        "firstName" VARCHAR(100) NOT NULL,
        "lastName" VARCHAR(100) NOT NULL,
        "phone" VARCHAR(20),
        "address" TEXT,
        "city" VARCHAR(100),
        "country" VARCHAR(100),
        "avatar" VARCHAR(500),
        "role" VARCHAR(50) DEFAULT 'user' NOT NULL,
        "status" VARCHAR(50) DEFAULT 'active' NOT NULL,
        "emailVerified" BOOLEAN DEFAULT false NOT NULL,
        "emailVerificationToken" VARCHAR(255),
        "passwordResetToken" VARCHAR(255),
        "passwordResetExpires" TIMESTAMP,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `;
    
    await client.query(createUserTable);
    console.log('✅ User table created!');

    // Create category table
    console.log('\n📂 Creating category table...');
    const createCategoryTable = `
      CREATE TABLE "category" (
        "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "slug" VARCHAR(255) UNIQUE,
        "isActive" BOOLEAN DEFAULT true NOT NULL,
        "sortOrder" INTEGER DEFAULT 0,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `;
    
    await client.query(createCategoryTable);
    console.log('✅ Category table created!');

    // Create product table
    console.log('\n🛍️ Creating product table...');
    const createProductTable = `
      CREATE TABLE "product" (
        "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "shortDescription" TEXT,
        "price" DECIMAL(10,2) NOT NULL,
        "discountPrice" DECIMAL(10,2),
        "sku" VARCHAR(100) UNIQUE,
        "stock" INTEGER DEFAULT 0 NOT NULL,
        "isActive" BOOLEAN DEFAULT true NOT NULL,
        "isFeatured" BOOLEAN DEFAULT false NOT NULL,
        "categoryId" UUID REFERENCES "category"(id),
        "weight" DECIMAL(8,2),
        "dimensions" VARCHAR(255),
        "tags" TEXT[],
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `;
    
    await client.query(createProductTable);
    console.log('✅ Product table created!');

    // Create cart table
    console.log('\n🛒 Creating cart table...');
    const createCartTable = `
      CREATE TABLE "cart" (
        "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "userId" UUID REFERENCES "user"(id) ON DELETE CASCADE,
        "isActive" BOOLEAN DEFAULT true NOT NULL,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `;
    
    await client.query(createCartTable);
    console.log('✅ Cart table created!');

    // Create order table
    console.log('\n📦 Creating order table...');
    const createOrderTable = `
      CREATE TABLE "order" (
        "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "orderNumber" VARCHAR(100) UNIQUE NOT NULL,
        "userId" UUID REFERENCES "user"(id),
        "totalAmount" DECIMAL(10,2) NOT NULL,
        "status" VARCHAR(50) DEFAULT 'pending' NOT NULL,
        "paymentStatus" VARCHAR(50) DEFAULT 'pending' NOT NULL,
        "paymentMethod" VARCHAR(50),
        "shippingAddress" TEXT,
        "billingAddress" TEXT,
        "notes" TEXT,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `;
    
    await client.query(createOrderTable);
    console.log('✅ Order table created!');

    console.log('\n🎉 Database cleanup and recreation completed successfully!');
    console.log('\n📋 Ready for admin user creation and TypeORM sync!');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n🔧 Please check database connectivity and permissions.');
  } finally {
    await client.end();
    console.log('\n🔌 Database connection closed.');
  }
}

// Run the script
if (require.main === module) {
  cleanAndRecreateDatabase();
}

module.exports = { cleanAndRecreateDatabase };
