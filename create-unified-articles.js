async function createUnifiedArticles() {
    const API_URL = 'http://localhost:1337';
    
    try {
        console.log('🔗 Creating Unified Article System...\n');

        // الخطوة 1: جلب جميع المقالات الإنجليزية والعربية
        console.log('1. Fetching all existing articles...');
        
        const [enResponse, arResponse] = await Promise.all([
            fetch(`${API_URL}/api/blog-articles?locale=en&pagination[pageSize]=100`),
            fetch(`${API_URL}/api/blog-articles?locale=ar&pagination[pageSize]=100`)
        ]);
        
        const enData = await enResponse.json();
        const arData = await arResponse.json();
        
        const enArticles = enData.data || [];
        const arArticles = arData.data || [];
        
        console.log(`✅ English articles: ${enArticles.length}`);
        console.log(`✅ Arabic articles: ${arArticles.length}`);

        // الخطوة 2: إنشاء نظام ربط بناءً على المحتوى المشابه
        const articlePairs = [
            // ربط المقالات يدوياً بناءً على المحتوى الحالي
            {
                en: 'test-article-1',
                ar: 'مقالة-1', // سنستخدم slug جديد
                unifiedSlug: 'unified-article-1',
                enTitle: 'test-article-1',
                arTitle: 'مقالة تجريبية 1'
            },
            {
                en: 'test-article-dev',
                ar: 'تيست-التطوير',
                unifiedSlug: 'unified-dev-article',
                enTitle: 'Test Article for Development',
                arTitle: 'مقالة تجريبية للتطوير'
            }
        ];

        console.log('\n2. Creating unified article pairs...');

        for (const pair of articlePairs) {
            console.log(`\n--- Processing: ${pair.enTitle} <-> ${pair.arTitle} ---`);
            
            // البحث عن المقالة الإنجليزية
            const enArticle = enArticles.find(art => 
                art.slug === pair.en || art.title.includes(pair.enTitle)
            );
            
            // البحث عن المقالة العربية (أو إنشاؤها)
            let arArticle = arArticles.find(art => 
                art.title.includes('مقالة') || art.title.includes('تيست')
            );
            
            if (enArticle) {
                console.log(`✅ Found English article: "${enArticle.title}" (${enArticle.documentId})`);
                
                // تحديث المقالة الإنجليزية بـ unifiedSlug
                try {
                    const updateEnUrl = `${API_URL}/api/blog-articles/${enArticle.documentId}?locale=en`;
                    const updateEnData = {
                        data: {
                            unifiedSlug: pair.unifiedSlug,
                            slug: pair.en
                        }
                    };
                    
                    const updateEnResponse = await fetch(updateEnUrl, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updateEnData)
                    });
                    
                    if (updateEnResponse.ok) {
                        console.log(`✅ Updated English article with unifiedSlug: ${pair.unifiedSlug}`);
                    } else {
                        console.log(`⚠️ Failed to update English article: ${updateEnResponse.status}`);
                    }
                } catch (error) {
                    console.log(`❌ Error updating English article: ${error.message}`);
                }
            }
            
            if (arArticle) {
                console.log(`✅ Found Arabic article: "${arArticle.title}" (${arArticle.documentId})`);
                
                // تحديث المقالة العربية بـ unifiedSlug
                try {
                    const updateArUrl = `${API_URL}/api/blog-articles/${arArticle.documentId}?locale=ar`;
                    const updateArData = {
                        data: {
                            unifiedSlug: pair.unifiedSlug,
                            slug: pair.ar,
                            title: pair.arTitle
                        }
                    };
                    
                    const updateArResponse = await fetch(updateArUrl, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updateArData)
                    });
                    
                    if (updateArResponse.ok) {
                        console.log(`✅ Updated Arabic article with unifiedSlug: ${pair.unifiedSlug}`);
                    } else {
                        console.log(`⚠️ Failed to update Arabic article: ${updateArResponse.status}`);
                    }
                } catch (error) {
                    console.log(`❌ Error updating Arabic article: ${error.message}`);
                }
            } else {
                // إنشاء مقالة عربية جديدة
                console.log(`🆕 Creating new Arabic article...`);
                
                try {
                    const createArData = {
                        data: {
                            title: pair.arTitle,
                            slug: pair.ar,
                            unifiedSlug: pair.unifiedSlug,
                            content: 'محتوى المقالة باللغة العربية',
                            excerpt: 'مقتطف من المقالة',
                            publishDate: new Date().toISOString(),
                            readTime: '5 دقائق',
                            locale: 'ar',
                            publishedAt: new Date().toISOString()
                        }
                    };
                    
                    const createResponse = await fetch(`${API_URL}/api/blog-articles?locale=ar`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(createArData)
                    });
                    
                    if (createResponse.ok) {
                        const newArticle = await createResponse.json();
                        console.log(`✅ Created Arabic article: "${newArticle.data.title}"`);
                    } else {
                        console.log(`❌ Failed to create Arabic article: ${createResponse.status}`);
                    }
                } catch (error) {
                    console.log(`❌ Error creating Arabic article: ${error.message}`);
                }
            }
        }

        console.log('\n🎯 Testing unified system...');
        
        // اختبار النظام الموحد
        for (const pair of articlePairs) {
            console.log(`\nTesting: ${pair.unifiedSlug}`);
            
            // اختبار الإنجليزية
            const testEnUrl = `${API_URL}/api/blog-articles?filters[unifiedSlug][$eq]=${pair.unifiedSlug}&locale=en`;
            const testEnResponse = await fetch(testEnUrl);
            
            if (testEnResponse.ok) {
                const testEnData = await testEnResponse.json();
                if (testEnData.data.length > 0) {
                    console.log(`✅ English: "${testEnData.data[0].title}"`);
                }
            }
            
            // اختبار العربية
            const testArUrl = `${API_URL}/api/blog-articles?filters[unifiedSlug][$eq]=${pair.unifiedSlug}&locale=ar`;
            const testArResponse = await fetch(testArUrl);
            
            if (testArResponse.ok) {
                const testArData = await testArResponse.json();
                if (testArData.data.length > 0) {
                    console.log(`✅ Arabic: "${testArData.data[0].title}"`);
                }
            }
        }

        console.log('\n🚀 Frontend URLs to test:');
        for (const pair of articlePairs) {
            console.log(`\n${pair.enTitle}:`);
            console.log(`   English: http://localhost:3000/media/${pair.unifiedSlug}`);
            console.log(`   Arabic:  http://localhost:3000/ar/media/${pair.unifiedSlug}`);
        }

        console.log('\n✅ Unified article system created!');
        console.log('Now articles should switch languages seamlessly like services.');

    } catch (error) {
        console.log(`❌ Process failed: ${error.message}`);
    }
}

createUnifiedArticles();
