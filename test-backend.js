const fetch = require('node-fetch');

async function testBackend() {
  try {
    console.log('Testing backend connection...');
    const response = await fetch('http://localhost:1337/api/blog-articles');
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend is running!');
      console.log(`Found ${data.data ? data.data.length : 0} articles`);
      return true;
    } else {
      console.log('❌ Backend responded with error:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Backend is not running:', error.message);
    return false;
  }
}

testBackend();
