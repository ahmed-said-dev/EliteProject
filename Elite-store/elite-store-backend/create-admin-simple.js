#!/usr/bin/env node

// Simple Admin User Creator for Elite Store Backend
const bcrypt = require('bcrypt');
const { Client } = require('pg');

console.log('🔐 Elite Store - Simple Admin Creator');
console.log('====================================\n');

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
  password: 'admin123456',
  firstName: 'Elite',
  lastName: 'Admin',
  role: 'admin'
};

async function checkExistingSchema() {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    
    // Check what columns exist in the user table
    const columnsQuery = `
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'user' 
      ORDER BY ordinal_position;
    `;
    
    const columnsResult = await client.query(columnsQuery);
    console.log('📋 Existing user table columns:');
    columnsResult.rows.forEach(row => {
      console.log(`   - ${row.column_name} (${row.data_type})`);
    });
    
    return columnsResult.rows.map(row => row.column_name);
    
  } catch (error) {
    console.error('❌ Error checking schema:', error.message);
    return [];
  } finally {
    await client.end();
  }
}

async function createSimpleAdmin() {
  const client = new Client(dbConfig);
  
  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connected successfully!\n');

    // Check existing columns
    const existingColumns = await checkExistingSchema();
    
    // Check if admin user already exists
    console.log('🔍 Checking if admin user exists...');
    const existingUserQuery = 'SELECT * FROM "user" WHERE email = $1';
    const existingUser = await client.query(existingUserQuery, [adminData.email]);

    if (existingUser.rows.length > 0) {
      console.log('⚠️  Admin user already exists!');
      console.log('🔄 Updating password...');
      
      const hashedPassword = await bcrypt.hash(adminData.password, 12);
      
      // Update only the existing columns
      let updateQuery;
      let updateParams;
      
      if (existingColumns.includes('firstName') && existingColumns.includes('lastName')) {
        updateQuery = `
          UPDATE "user" 
          SET password = $1, "firstName" = $2, "lastName" = $3, role = $4
          WHERE email = $5
        `;
        updateParams = [hashedPassword, adminData.firstName, adminData.lastName, adminData.role, adminData.email];
      } else {
        updateQuery = `
          UPDATE "user" 
          SET password = $1, role = $2
          WHERE email = $3
        `;
        updateParams = [hashedPassword, adminData.role, adminData.email];
      }
      
      await client.query(updateQuery, updateParams);
      console.log('✅ Admin user updated successfully!');
      
    } else {
      console.log('👤 Creating new admin user...');
      const hashedPassword = await bcrypt.hash(adminData.password, 12);
      
      // Insert based on available columns
      let insertQuery;
      let insertParams;
      
      if (existingColumns.includes('firstName') && existingColumns.includes('lastName')) {
        insertQuery = `
          INSERT INTO "user" (email, password, "firstName", "lastName", role) 
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id, email, role
        `;
        insertParams = [adminData.email, hashedPassword, adminData.firstName, adminData.lastName, adminData.role];
      } else {
        insertQuery = `
          INSERT INTO "user" (email, password, role) 
          VALUES ($1, $2, $3)
          RETURNING id, email, role
        `;
        insertParams = [adminData.email, hashedPassword, adminData.role];
      }
      
      const result = await client.query(insertQuery, insertParams);
      console.log('✅ Admin user created successfully!');
      console.log('📊 Created user:', result.rows[0]);
    }

    // Verify the user was created/updated
    console.log('\n🔍 Verifying admin user...');
    const verifyQuery = 'SELECT id, email, role FROM "user" WHERE email = $1';
    const verifyResult = await client.query(verifyQuery, [adminData.email]);
    
    if (verifyResult.rows.length > 0) {
      const user = verifyResult.rows[0];
      console.log('✅ Verification successful!');
      console.log('👤 User details:', user);
    } else {
      console.log('❌ Verification failed - user not found');
    }

    // Display final results
    console.log('\n🎉 Setup Complete!');
    console.log('==================');
    console.log('📧 Email:', adminData.email);
    console.log('🔑 Password:', adminData.password);
    console.log('👤 Role:', adminData.role);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === '23505') {
      console.log('💡 Email already exists - this is expected if user was created before');
    }
  } finally {
    await client.end();
    console.log('\n🔌 Database connection closed.');
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting simple admin setup...\n');
  await createSimpleAdmin();
}

// Run the script
main().catch(console.error);

