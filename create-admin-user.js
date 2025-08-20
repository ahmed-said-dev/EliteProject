// Create Admin User Script for Elite Store Backend
// This script creates an admin user for the Elite Store system

const http = require('http');
const bcrypt = require('bcrypt');

const BACKEND_URL = 'http://134.122.102.182/api';

function makeRequest(url, data, method = 'POST') {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const urlObj = new URL(url);
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 80,
      path: urlObj.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => { responseData += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function createAdminUser() {
  console.log('🔐 Creating Admin User for Elite Store...\n');

  // Admin user data
  const adminData = {
    email: 'admin@elitestore.com',
    password: 'admin123456',
    firstName: 'Admin',
    lastName: 'Elite Store',
    role: 'admin',
    isActive: true,
    isEmailVerified: true
  };

  try {
    console.log('📝 Attempting to register admin user...');
    
    // Try to register the admin user
    const response = await makeRequest(`${BACKEND_URL}/auth/register`, adminData);
    
    if (response.status >= 200 && response.status < 300) {
      console.log('✅ Admin user created successfully!');
      console.log(`📧 Email: ${adminData.email}`);
      console.log(`🔑 Password: ${adminData.password}`);
      console.log('\n🎯 You can now login to the admin dashboard at:');
      console.log('   http://134.122.102.182/admin/');
      
      if (response.data.token) {
        console.log(`\n🎫 Auth Token: ${response.data.token}`);
      }
    } else if (response.status === 409) {
      console.log('ℹ️ Admin user already exists');
      console.log(`📧 Email: ${adminData.email}`);
      console.log(`🔑 Password: ${adminData.password}`);
      console.log('\n🎯 Try logging in at: http://134.122.102.182/admin/');
    } else {
      console.log(`⚠️ Unexpected response (${response.status}):`, response.data);
    }

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    
    // Try alternative approach - direct login to test if user exists
    console.log('\n🔍 Testing if admin user already exists...');
    try {
      const loginResponse = await makeRequest(`${BACKEND_URL}/auth/login`, {
        email: adminData.email,
        password: adminData.password
      });
      
      if (loginResponse.status === 200) {
        console.log('✅ Admin user already exists and login works!');
        console.log(`📧 Email: ${adminData.email}`);
        console.log(`🔑 Password: ${adminData.password}`);
        console.log('\n🎯 Login at: http://134.122.102.182/admin/');
      } else {
        console.log('❌ Admin user does not exist or password is wrong');
        console.log('💡 Please check your backend configuration');
      }
    } catch (loginError) {
      console.error('❌ Login test failed:', loginError.message);
    }
  }
}

// Additional users for testing
async function createSampleUsers() {
  console.log('\n👥 Creating sample users for testing...\n');

  const sampleUsers = [
    {
      email: 'doctor@elitestore.com',
      password: 'doctor123',
      firstName: 'Dr. Ahmed',
      lastName: 'Al-Farisi',
      role: 'doctor',
      isActive: true,
      isEmailVerified: true
    },
    {
      email: 'nurse@elitestore.com', 
      password: 'nurse123',
      firstName: 'Nurse Sarah',
      lastName: 'Johnson',
      role: 'nurse',
      isActive: true,
      isEmailVerified: true
    },
    {
      email: 'customer@elitestore.com',
      password: 'customer123',
      firstName: 'Ahmed',
      lastName: 'Al-Sayed',
      role: 'customer',
      isActive: true,
      isEmailVerified: true
    }
  ];

  for (const user of sampleUsers) {
    try {
      console.log(`📝 Creating ${user.role}: ${user.email}...`);
      const response = await makeRequest(`${BACKEND_URL}/auth/register`, user);
      
      if (response.status >= 200 && response.status < 300) {
        console.log(`✅ ${user.role} created: ${user.email}`);
      } else if (response.status === 409) {
        console.log(`ℹ️ ${user.role} already exists: ${user.email}`);
      } else {
        console.log(`⚠️ ${user.role} creation failed (${response.status})`);
      }
    } catch (error) {
      console.log(`❌ Error creating ${user.role}: ${error.message}`);
    }
  }
}

// Run the script
async function main() {
  console.log('🚀 Elite Store User Management');
  console.log('==============================\n');
  
  await createAdminUser();
  await createSampleUsers();
  
  console.log('\n📋 Summary:');
  console.log('===========');
  console.log('🔐 Admin Login: admin@elitestore.com / admin123456');
  console.log('👨‍⚕️ Doctor Login: doctor@elitestore.com / doctor123');
  console.log('👩‍⚕️ Nurse Login: nurse@elitestore.com / nurse123');
  console.log('👤 Customer Login: customer@elitestore.com / customer123');
  console.log('\n🌐 Admin Dashboard: http://134.122.102.182/admin/');
  console.log('📚 API Docs: http://134.122.102.182/api/docs');
}

main().catch(console.error);
