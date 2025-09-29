async function testMediaPage() {
    const API_URL = 'http://localhost:1337';
    
    try {
        console.log('🔍 Testing Media Page Data...\n');

        // اختبار 1: جلب المقالات مثل ما تفعل صفحة media
        console.log('1. Testing useBlogArticles API call...');
        const params = new URLSearchParams({
            'pagination[page]': '1',
            'pagination[pageSize]': '9',
            'populate': '*',
            'locale': 'en',
            'sort': 'publishDate:desc'
        });

        const url = `${API_URL}/api/blog-articles?${params}`;
        console.log(`🔗 URL: ${url}`);

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`✅ API Response received`);
        console.log(`   - Status: ${response.status}`);
        console.log(`   - Articles count: ${data.data?.length || 0}`);
        console.log(`   - Meta pagination:`, data.meta?.pagination || 'N/A');

        if (data.data && data.data.length > 0) {
            console.log('\n📋 Articles found:');
            data.data.forEach((article, index) => {
                console.log(`${index + 1}. "${article.title}"`);
                console.log(`   - ID: ${article.id}`);
                console.log(`   - Document ID: ${article.documentId}`);
                console.log(`   - Slug: ${article.slug || 'N/A'}`);
                console.log(`   - Author: ${article.author?.name || 'N/A'}`);
                console.log(`   - Category: ${article.category?.name || 'N/A'}`);
                console.log(`   - Featured: ${article.featured ? 'Yes' : 'No'}`);
                console.log(`   - Published: ${article.publishedAt || 'N/A'}`);
                console.log('');
            });

            console.log('✅ Data structure looks correct for BlogSection component');
            
            // اختبار 2: تحقق من الخصائص المطلوبة
            console.log('2. Checking required properties for BlogSection...');
            const testArticle = data.data[0];
            const requiredProps = ['id', 'documentId', 'title', 'slug', 'content'];
            const missingProps = requiredProps.filter(prop => !testArticle[prop]);
            
            if (missingProps.length === 0) {
                console.log('✅ All required properties present');
            } else {
                console.log(`❌ Missing properties: ${missingProps.join(', ')}`);
            }

            // اختبار 3: تحقق من البيانات المتعلقة
            console.log('\n3. Checking related data...');
            console.log(`   - Author data: ${testArticle.author ? 'Available' : 'Missing'}`);
            console.log(`   - Category data: ${testArticle.category ? 'Available' : 'Missing'}`);
            console.log(`   - Featured Image: ${testArticle.featuredImage ? 'Available' : 'Missing'}`);
            console.log(`   - Tags: ${testArticle.tags ? testArticle.tags.length + ' tag(s)' : 'Missing'}`);

        } else {
            console.log('❌ No articles returned from API');
            console.log('   This explains why the media page is empty');
        }

        console.log('\n🚀 Frontend Testing:');
        console.log('1. Make sure frontend is running: cd elite-frontend && npm run dev');
        console.log('2. Visit: http://localhost:3000/media');
        console.log('3. Check browser console for any errors');
        console.log('4. Verify useBlogArticles hook is working');

        console.log('\n📋 Expected Results:');
        if (data.data && data.data.length > 0) {
            console.log('✅ Media page should show articles');
            console.log('✅ BlogSection should render articles properly');
            console.log('✅ Links should work with documentId');
        } else {
            console.log('❌ Media page will be empty - no articles found');
        }

    } catch (error) {
        console.log(`❌ Test failed: ${error.message}`);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('💡 Make sure Strapi is running: cd elite-backend && npm run develop');
        }
    }
}

testMediaPage();
