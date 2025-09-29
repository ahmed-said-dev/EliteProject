async function testLanguageSwitch() {
    const API_URL = 'http://localhost:1337';
    
    try {
        console.log('🔄 Testing Language Switch Functionality...\n');

        // اختبار 1: جلب مقالة إنجليزية
        console.log('1. Getting English article...');
        const enResponse = await fetch(`${API_URL}/api/blog-articles?populate=*&locale=en&pagination[pageSize]=1`);
        const enData = await enResponse.json();
        
        if (!enData.data || enData.data.length === 0) {
            console.log('❌ No English articles found');
            return;
        }
        
        const enArticle = enData.data[0];
        console.log(`✅ English Article: "${enArticle.title}"`);
        console.log(`   - Document ID: ${enArticle.documentId}`);
        console.log(`   - Slug: ${enArticle.slug}`);
        console.log(`   - ID: ${enArticle.id}`);

        // اختبار 2: محاولة الوصول لنفس المقالة بالعربية
        console.log(`\n2. Trying to access same article in Arabic...`);
        
        // تجربة بـ Document ID
        console.log(`Testing Document ID: ${enArticle.documentId}`);
        const arByDocResponse = await fetch(`${API_URL}/api/blog-articles/${enArticle.documentId}?populate=*&locale=ar`);
        console.log(`   Document ID in Arabic: ${arByDocResponse.status} ${arByDocResponse.statusText}`);
        
        // تجربة بـ Slug
        console.log(`Testing Slug: ${enArticle.slug}`);
        const arBySlugResponse = await fetch(`${API_URL}/api/blog-articles/${enArticle.slug}?populate=*&locale=ar`);
        console.log(`   Slug in Arabic: ${arBySlugResponse.status} ${arBySlugResponse.statusText}`);

        // اختبار 3: البحث عن مقالات عربية مشابهة
        console.log(`\n3. Searching for equivalent Arabic articles...`);
        const allArResponse = await fetch(`${API_URL}/api/blog-articles?populate=*&locale=ar&pagination[pageSize]=10`);
        
        if (allArResponse.ok) {
            const allArData = await allArResponse.json();
            const arArticles = allArData.data || [];
            
            console.log(`✅ Found ${arArticles.length} Arabic articles:`);
            arArticles.forEach((article, index) => {
                console.log(`   ${index + 1}. "${article.title}" (ID: ${article.id}, DocID: ${article.documentId})`);
            });
            
            // محاولة إيجاد مقالة مشابهة
            const similarArticle = arArticles.find(art => 
                art.slug === enArticle.slug ||
                art.title.toLowerCase().includes(enArticle.title.toLowerCase().split(' ')[0])
            );
            
            if (similarArticle) {
                console.log(`\n🎯 Found potential equivalent: "${similarArticle.title}"`);
            } else {
                console.log(`\n⚠️ No equivalent Arabic article found`);
            }
        }

        // اختبار 4: سيناريو تغيير اللغة
        console.log(`\n4. Language Switch Scenario Test:`);
        console.log(`📝 Scenario: User is viewing English article, then switches to Arabic`);
        console.log(`   - Original Article: "${enArticle.title}" (${enArticle.documentId})`);
        console.log(`   - Expected Behavior:`);
        console.log(`     1. Try to find Arabic version with same documentId`);
        console.log(`     2. If not found, search for similar article by slug`);
        console.log(`     3. If not found, show original with warning`);

        console.log(`\n🚀 Frontend URLs to Test:`);
        console.log(`1. View English article:`);
        console.log(`   http://localhost:3000/media/${enArticle.documentId}`);
        console.log(`2. Switch to Arabic and see if article remains visible:`);
        console.log(`   http://localhost:3000/ar/media/${enArticle.documentId}`);
        
        if (allArResponse.ok && allArData.data.length > 0) {
            const arArticle = allArData.data[0];
            console.log(`3. View Arabic article:`);
            console.log(`   http://localhost:3000/ar/media/${arArticle.documentId}`);
            console.log(`4. Switch to English and see behavior:`);
            console.log(`   http://localhost:3000/media/${arArticle.documentId}`);
        }

        console.log(`\n📋 Expected Results:`);
        console.log(`✅ Articles load correctly in their original language`);
        console.log(`⚠️ When switching language, user sees warning if article not available`);
        console.log(`✅ Article remains visible with language warning`);
        console.log(`❌ User should NOT see "Not Found" error`);

        console.log(`\n🔧 Implementation Status:`);
        console.log(`✅ Updated useBlogArticle hook with language switching logic`);
        console.log(`✅ Added languageWarning support`);
        console.log(`✅ Updated article detail page to show warnings`);
        console.log(`🎯 Ready for testing!`);

    } catch (error) {
        console.log(`❌ Test failed: ${error.message}`);
    }
}

testLanguageSwitch();
