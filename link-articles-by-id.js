async function linkArticlesByDocumentId() {
    const API_URL = 'http://localhost:1337';
    
    try {
        console.log('🔗 Linking Articles by Document ID (like Services)...\n');

        // الخطوة 1: جلب جميع المقالات الحالية
        console.log('1. Fetching all existing articles...');
        
        const [enResponse, arResponse] = await Promise.all([
            fetch(`${API_URL}/api/blog-articles?locale=en&pagination[pageSize]=100&populate=*`),
            fetch(`${API_URL}/api/blog-articles?locale=ar&pagination[pageSize]=100&populate=*`)
        ]);
        
        const enData = await enResponse.json();
        const arData = await arResponse.json();
        
        const enArticles = enData.data || [];
        const arArticles = arData.data || [];
        
        console.log(`✅ English articles: ${enArticles.length}`);
        console.log(`✅ Arabic articles: ${arArticles.length}`);

        if (enArticles.length === 0) {
            console.log('❌ No English articles found to link');
            return;
        }

        // الخطوة 2: إنشاء مقالات عربية مرتبطة بنفس الـ documentId
        console.log('\n2. Creating/Updating Arabic articles with same documentId...\n');

        for (const enArticle of enArticles) {
            console.log(`--- Processing: "${enArticle.title}" ---`);
            console.log(`English documentId: ${enArticle.documentId}`);

            // البحث عن مقالة عربية بنفس الـ documentId
            const existingArArticle = arArticles.find(ar => ar.documentId === enArticle.documentId);

            if (existingArArticle) {
                console.log(`✅ Arabic version already exists: "${existingArArticle.title}"`);
            } else {
                console.log(`🆕 Creating Arabic version with same documentId...`);

                // إنشاء مقالة عربية بنفس الـ documentId
                const arabicTitle = getArabicTitle(enArticle.title);
                const arabicContent = getArabicContent(enArticle.content);
                const arabicSlug = getArabicSlug(enArticle.slug);

                const createData = {
                    data: {
                        // نفس documentId للربط
                        documentId: enArticle.documentId,
                        title: arabicTitle,
                        slug: arabicSlug,
                        content: arabicContent,
                        excerpt: `مقتطف من ${arabicTitle}`,
                        publishDate: enArticle.publishDate || new Date().toISOString(),
                        readTime: enArticle.readTime || '5 دقائق',
                        featured: enArticle.featured || false,
                        locale: 'ar',
                        publishedAt: enArticle.publishedAt || new Date().toISOString()
                    }
                };

                try {
                    const response = await fetch(`${API_URL}/api/blog-articles?locale=ar`, {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(createData)
                    });

                    if (response.ok) {
                        const result = await response.json();
                        console.log(`✅ Created Arabic article: "${result.data.title}"`);
                        console.log(`   Document ID: ${result.data.documentId}`);
                    } else {
                        const errorData = await response.json().catch(() => ({}));
                        console.log(`❌ Failed to create Arabic article: ${response.status}`);
                        console.log(`   Error:`, errorData.error?.message || 'Unknown error');
                    }
                } catch (error) {
                    console.log(`❌ Error creating Arabic article: ${error.message}`);
                }
            }

            console.log('');
        }

        // الخطوة 3: اختبار النظام الجديد
        console.log('3. Testing the new system...\n');

        for (const enArticle of enArticles.slice(0, 2)) { // اختبار أول مقالتين
            const documentId = enArticle.documentId;
            
            console.log(`Testing documentId: ${documentId}`);

            // اختبار الإنجليزية
            const testEnUrl = `${API_URL}/api/blog-articles?filters[documentId][$eq]=${documentId}&locale=en&populate=*`;
            try {
                const testEnResponse = await fetch(testEnUrl);
                const testEnData = await testEnResponse.json();
                
                if (testEnData.data && testEnData.data.length > 0) {
                    console.log(`✅ English: "${testEnData.data[0].title}"`);
                } else {
                    console.log(`❌ English: Not found`);
                }
            } catch (error) {
                console.log(`❌ English: Error - ${error.message}`);
            }

            // اختبار العربية
            const testArUrl = `${API_URL}/api/blog-articles?filters[documentId][$eq]=${documentId}&locale=ar&populate=*`;
            try {
                const testArResponse = await fetch(testArUrl);
                const testArData = await testArResponse.json();
                
                if (testArData.data && testArData.data.length > 0) {
                    console.log(`✅ Arabic: "${testArData.data[0].title}"`);
                } else {
                    console.log(`❌ Arabic: Not found`);
                }
            } catch (error) {
                console.log(`❌ Arabic: Error - ${error.message}`);
            }

            console.log('');
        }

        console.log('🚀 Frontend URLs to test (same documentId, different languages):');
        
        for (const enArticle of enArticles.slice(0, 2)) {
            console.log(`\n"${enArticle.title}":`);
            console.log(`   English: http://localhost:3000/media/${enArticle.documentId}`);
            console.log(`   Arabic:  http://localhost:3000/ar/media/${enArticle.documentId}`);
        }

        console.log('\n✅ Articles linked by documentId like services!');
        console.log('Now language switching should work exactly like services.');

    } catch (error) {
        console.log(`❌ Process failed: ${error.message}`);
    }
}

// دوال مساعدة لإنشاء المحتوى العربي
function getArabicTitle(englishTitle) {
    const translations = {
        'test-article-1': 'مقالة تجريبية 1',
        'Test Article for Development': 'مقالة تجريبية للتطوير',
        'Permission Test Article': 'مقالة اختبار الصلاحيات'
    };
    
    return translations[englishTitle] || `النسخة العربية من: ${englishTitle}`;
}

function getArabicContent(englishContent) {
    return `هذا محتوى المقالة باللغة العربية. يحتوي على معلومات مفيدة حول الطب البيطري والعناية بالحيوانات الأليفة.

${englishContent ? `\n\nالمحتوى الأصلي:\n${englishContent}` : ''}`;
}

function getArabicSlug(englishSlug) {
    const slugTranslations = {
        'test-article-1': 'مقالة-تجريبية-1',
        'test-article-dev': 'مقالة-تطوير',
        'permission-test-1759101379587': 'اختبار-صلاحيات-1',
        'permission-test-1759101524794': 'اختبار-صلاحيات-2'
    };
    
    return slugTranslations[englishSlug] || `عربي-${englishSlug}`;
}

linkArticlesByDocumentId();
