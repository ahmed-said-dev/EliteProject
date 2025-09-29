async function testLocalizationAPI() {
    const API_URL = 'http://localhost:1337';
    
    try {
        console.log('🧪 Testing Article Localization API...\n');

        // اختبار 1: جلب المقالات بكلا اللغتين
        console.log('1. Testing basic API access...');
        
        const [enResponse, arResponse] = await Promise.all([
            fetch(`${API_URL}/api/blog-articles?locale=en&populate=*`),
            fetch(`${API_URL}/api/blog-articles?locale=ar&populate=*`)
        ]);
        
        const enData = await enResponse.json();
        const arData = await arResponse.json();
        
        console.log(`✅ English articles: ${enData.data?.length || 0}`);
        console.log(`✅ Arabic articles: ${arData.data?.length || 0}`);

        if (!enData.data || enData.data.length === 0) {
            console.log('❌ No English articles found. Please add articles in Strapi admin.');
            return;
        }

        // اختبار 2: اختبار البحث بـ documentId
        const testArticle = enData.data[0];
        console.log(`\n2. Testing documentId search for: "${testArticle.title}"`);
        console.log(`   Document ID: ${testArticle.documentId}`);

        const [enByDocId, arByDocId] = await Promise.all([
            fetch(`${API_URL}/api/blog-articles?filters[documentId][$eq]=${testArticle.documentId}&locale=en&populate=*`),
            fetch(`${API_URL}/api/blog-articles?filters[documentId][$eq]=${testArticle.documentId}&locale=ar&populate=*`)
        ]);

        const enByDocIdData = await enByDocId.json();
        const arByDocIdData = await arByDocId.json();

        console.log(`   English by documentId: ${enByDocIdData.data?.length > 0 ? '✅ Found' : '❌ Not found'}`);
        console.log(`   Arabic by documentId: ${arByDocIdData.data?.length > 0 ? '✅ Found' : '❌ Not found'}`);

        if (enByDocIdData.data?.length > 0) {
            console.log(`   English title: "${enByDocIdData.data[0].title}"`);
        }
        if (arByDocIdData.data?.length > 0) {
            console.log(`   Arabic title: "${arByDocIdData.data[0].title}"`);
        }

        // اختبار 3: اختبار الـ localizations
        console.log(`\n3. Testing localizations for documentId: ${testArticle.documentId}`);
        
        try {
            const localizationsResponse = await fetch(`${API_URL}/api/blog-articles/${testArticle.id}?populate=localizations`);
            const localizationsData = await localizationsResponse.json();
            
            if (localizationsData.data?.localizations) {
                console.log(`✅ Localizations found: ${localizationsData.data.localizations.length}`);
                localizationsData.data.localizations.forEach((loc, index) => {
                    console.log(`   ${index + 1}. Locale: ${loc.locale}, ID: ${loc.id}`);
                });
            } else {
                console.log(`⚠️ No localizations found`);
            }
        } catch (locError) {
            console.log(`❌ Error testing localizations: ${locError.message}`);
        }

        // اختبار 4: URLs للفرونت اند
        console.log(`\n4. Frontend test URLs:`);
        
        enData.data.slice(0, 3).forEach((article, index) => {
            console.log(`\n   Article ${index + 1}: "${article.title}"`);
            console.log(`   English: http://localhost:3000/media/${article.documentId}`);
            console.log(`   Arabic:  http://localhost:3000/ar/media/${article.documentId}`);
        });

        // اختبار 5: التحقق من نجاح النظام
        console.log(`\n5. System status:`);
        
        const hasEnglish = enData.data && enData.data.length > 0;
        const hasArabic = arData.data && arData.data.length > 0;
        const canSearchByDocId = enByDocIdData.data && enByDocIdData.data.length > 0;
        
        console.log(`   ✅ English articles available: ${hasEnglish ? 'Yes' : 'No'}`);
        console.log(`   ✅ Arabic articles available: ${hasArabic ? 'Yes' : 'No'}`);
        console.log(`   ✅ Search by documentId works: ${canSearchByDocId ? 'Yes' : 'No'}`);
        
        if (hasEnglish && canSearchByDocId) {
            console.log(`\n🎉 System ready for language switching!`);
            console.log(`   Frontend should now work like services.`);
        } else {
            console.log(`\n⚠️ System needs more setup:`);
            if (!hasArabic) {
                console.log(`   - Create Arabic articles manually in admin or run localization script`);
            }
            if (!canSearchByDocId) {
                console.log(`   - Check Strapi schema and restart if needed`);
            }
        }

    } catch (error) {
        console.log(`❌ Test failed: ${error.message}`);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('💡 Make sure Strapi is running: npm run develop');
        }
    }
}

testLocalizationAPI();
