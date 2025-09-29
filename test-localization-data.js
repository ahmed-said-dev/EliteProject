async function testLocalizationData() {
    const API_URL = 'http://localhost:1337';
    
    try {
        console.log('🔍 Testing Article Localization Data...\n');

        // اختبار 1: جلب المقالات الإنجليزية مع localizations
        console.log('1. Getting English articles with localizations...');
        const enResponse = await fetch(`${API_URL}/api/blog-articles?populate=*&locale=en`);
        const enData = await enResponse.json();
        
        console.log(`✅ English articles: ${enData.data?.length || 0}`);
        
        if (enData.data && enData.data.length > 0) {
            const testArticle = enData.data[0];
            console.log(`\nTest Article (EN): "${testArticle.title}"`);
            console.log(`   - ID: ${testArticle.id}`);
            console.log(`   - Document ID: ${testArticle.documentId}`);
            console.log(`   - Locale: ${testArticle.locale}`);
            console.log(`   - Localizations:`, testArticle.localizations || 'None');
            
            if (testArticle.localizations && testArticle.localizations.length > 0) {
                console.log('   📝 Available localizations:');
                testArticle.localizations.forEach((loc, index) => {
                    console.log(`      ${index + 1}. Locale: ${loc.locale}, ID: ${loc.id}, Document ID: ${loc.documentId}`);
                });
            } else {
                console.log('   ⚠️ No localizations found - articles are not linked between languages');
            }
        }

        // اختبار 2: جلب المقالات العربية
        console.log('\n2. Getting Arabic articles...');
        const arResponse = await fetch(`${API_URL}/api/blog-articles?populate=*&locale=ar`);
        const arData = await arResponse.json();
        
        console.log(`✅ Arabic articles: ${arData.data?.length || 0}`);
        
        if (arData.data && arData.data.length > 0) {
            const testArticleAr = arData.data[0];
            console.log(`\nTest Article (AR): "${testArticleAr.title}"`);
            console.log(`   - ID: ${testArticleAr.id}`);
            console.log(`   - Document ID: ${testArticleAr.documentId}`);
            console.log(`   - Locale: ${testArticleAr.locale}`);
            console.log(`   - Localizations:`, testArticleAr.localizations || 'None');
        }

        // اختبار 3: تجربة البحث cross-language
        if (enData.data && enData.data.length > 0) {
            const testDocId = enData.data[0].documentId;
            console.log(`\n3. Testing cross-language lookup for document ID: ${testDocId}`);
            
            // جرب جلب نفس المقالة بالعربية
            console.log('Trying to get same document ID in Arabic...');
            try {
                const crossResponse = await fetch(`${API_URL}/api/blog-articles/${testDocId}?populate=*&locale=ar`);
                if (crossResponse.ok) {
                    const crossData = await crossResponse.json();
                    console.log(`✅ Found Arabic version: "${crossData.data.title}"`);
                } else {
                    console.log(`❌ No Arabic version found (${crossResponse.status})`);
                }
            } catch (error) {
                console.log(`❌ Error: ${error.message}`);
            }
        }

        console.log('\n📋 Analysis:');
        if (enData.data?.length > 0 && arData.data?.length > 0) {
            if (enData.data[0].localizations?.length > 0) {
                console.log('✅ Articles have localizations - can implement smart language switching');
            } else {
                console.log('⚠️ Articles do not have localizations - need alternative solution');
            }
        }

        console.log('\n💡 Solution Strategy:');
        console.log('1. Check if article has localizations');
        console.log('2. If yes, use localization data to find correct language version');
        console.log('3. If no, try to find equivalent article by slug or title');
        console.log('4. Fallback to showing "language not available" message');

    } catch (error) {
        console.log(`❌ Test failed: ${error.message}`);
    }
}

testLocalizationData();
