const axios = require('axios');

const API_URL = 'http://localhost:1337/api';

async function testBlogAPI() {
  console.log('🔍 Testing Blog API...\n');
  
  try {
    // Test 1: Get all blog articles
    console.log('1. Testing GET /blog-articles');
    const allArticles = await axios.get(`${API_URL}/blog-articles?populate=*`);
    console.log(`✅ Found ${allArticles.data.data.length} articles total`);
    
    // Test 2: Get English articles
    console.log('\n2. Testing GET /blog-articles?locale=en');
    const englishArticles = await axios.get(`${API_URL}/blog-articles?populate=*&locale=en`);
    console.log(`✅ Found ${englishArticles.data.data.length} English articles`);
    
    // Test 3: Get Arabic articles
    console.log('\n3. Testing GET /blog-articles?locale=ar');
    const arabicArticles = await axios.get(`${API_URL}/blog-articles?populate=*&locale=ar`);
    console.log(`✅ Found ${arabicArticles.data.data.length} Arabic articles`);
    
    // Test 4: Test specific article by slug
    if (englishArticles.data.data.length > 0) {
      const firstArticle = englishArticles.data.data[0];
      console.log(`\n4. Testing GET /blog-articles/${firstArticle.slug}?locale=en`);
      
      try {
        const articleBySlug = await axios.get(`${API_URL}/blog-articles/${firstArticle.slug}?populate=*&locale=en`);
        console.log(`✅ Found article by slug: ${articleBySlug.data.data.title}`);
      } catch (error) {
        console.log(`❌ Error getting article by slug: ${error.response?.status} ${error.response?.statusText}`);
        console.log(`Response data:`, error.response?.data);
      }
      
      // Test 5: Test by ID
      console.log(`\n5. Testing GET /blog-articles/${firstArticle.id}?locale=en`);
      try {
        const articleById = await axios.get(`${API_URL}/blog-articles/${firstArticle.id}?populate=*&locale=en`);
        console.log(`✅ Found article by ID: ${articleById.data.data.title}`);
      } catch (error) {
        console.log(`❌ Error getting article by ID: ${error.response?.status} ${error.response?.statusText}`);
      }
    }
    
    // Show sample articles
    if (allArticles.data.data.length > 0) {
      console.log('\n📋 Sample articles:');
      allArticles.data.data.slice(0, 3).forEach(article => {
        console.log(`- ID: ${article.id}, Slug: ${article.slug}, Locale: ${article.locale}, Title: ${article.title}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error testing API:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure Strapi is running on http://localhost:1337');
      console.log('Run: cd elite-backend && npm run develop');
    }
  }
}

// Run if this script is called directly
if (require.main === module) {
  testBlogAPI().catch(console.error);
}

module.exports = { testBlogAPI };
