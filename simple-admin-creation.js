// Simple Admin User Creation
console.log('🔐 Creating Admin User...');

const http = require('http');

const adminData = {
  email: 'admin@elitestore.com',
  password: 'admin123456',
  firstName: 'Admin',
  lastName: 'Elite Store',
  role: 'admin'
};

const postData = JSON.stringify(adminData);

const options = {
  hostname: '134.122.102.182',
  port: 80,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    console.log('Response:', data);
    
    if (res.statusCode === 201 || res.statusCode === 200) {
      console.log('\n✅ Admin user created successfully!');
    } else if (res.statusCode === 409) {
      console.log('\nℹ️ Admin user already exists');
    }
    
    console.log('\n📋 Login Details:');
    console.log('Email: admin@elitestore.com');
    console.log('Password: admin123456');
    console.log('\n🌐 Dashboard: http://134.122.102.182/admin/');
  });
});

req.on('error', (e) => {
  console.error(`Error: ${e.message}`);
});

req.write(postData);
req.end();
