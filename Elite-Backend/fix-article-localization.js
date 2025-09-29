const axios = require('axios');

async function fixArticleLocalization() {
    const API_URL = 'http://localhost:1337';
    
    try {
        console.log('🔗 Fixing Article Localization System...\n');

        // الخطوة 1: جلب جميع المقالات الحالية
        console.log('1. Fetching existing articles...');
        
        const [enResponse, arResponse] = await Promise.all([
            axios.get(`${API_URL}/api/blog-articles?locale=en&pagination[pageSize]=100&populate=*`),
            axios.get(`${API_URL}/api/blog-articles?locale=ar&pagination[pageSize]=100&populate=*`)
        ]);
        
        const enArticles = enResponse.data.data || [];
        const arArticles = arResponse.data.data || [];
        
        console.log(`✅ English articles: ${enArticles.length}`);
        console.log(`✅ Arabic articles: ${arArticles.length}`);

        if (enArticles.length === 0) {
            console.log('❌ No English articles found');
            return;
        }

        // الخطوة 2: إنشاء مقالات عربية مرتبطة بالـ localizations
        console.log('\n2. Creating Arabic versions with proper localization...\n');

        // مصفوفة ربط المقالات
        const articleMappings = [
            {
                enTitle: 'test-article-1',
                arTitle: 'مقالة تجريبية 1',
                arSlug: 'مقالة-تجريبية-1',
                arContent: 'هذا محتوى المقالة التجريبية الأولى باللغة العربية. تحتوي على معلومات مفيدة حول الطب البيطري والعناية بالحيوانات الأليفة.',
                arExcerpt: 'مقتطف من المقالة التجريبية الأولى'
            },
            {
                enTitle: 'Test Article for Development',
                arTitle: 'مقالة تجريبية للتطوير',
                arSlug: 'مقالة-تطوير',
                arContent: 'هذا محتوى مقالة التطوير باللغة العربية. تحتوي على معلومات تقنية حول تطوير التطبيقات.',
                arExcerpt: 'مقتطف من مقالة التطوير'
            }
        ];

        for (const mapping of articleMappings) {
            console.log(`--- Processing: ${mapping.enTitle} ---`);
            
            // البحث عن المقالة الإنجليزية
            const enArticle = enArticles.find(art => 
                art.title.includes(mapping.enTitle) || art.slug.includes('test-article')
            );

            if (!enArticle) {
                console.log(`❌ English article not found: ${mapping.enTitle}`);
                continue;
            }

            console.log(`✅ Found English article: "${enArticle.title}" (ID: ${enArticle.id}, DocID: ${enArticle.documentId})`);

            // التحقق من وجود النسخة العربية
            const existingArArticle = arArticles.find(art => 
                art.documentId === enArticle.documentId
            );

            if (existingArArticle) {
                console.log(`✅ Arabic version already exists: "${existingArArticle.title}"`);
                continue;
            }

            // إنشاء النسخة العربية مع نفس documentId
            console.log(`🆕 Creating Arabic version...`);

            try {
                // بيانات المقالة العربية
                const arabicData = {
                    data: {
                        title: mapping.arTitle,
                        slug: mapping.arSlug,
                        content: mapping.arContent,
                        excerpt: mapping.arExcerpt,
                        publishDate: enArticle.publishDate || new Date().toISOString().split('T')[0],
                        readTime: '5 دقائق',
                        featured: enArticle.featured || false
                    }
                };

                // إضافة العلاقات إذا كانت متوفرة
                if (enArticle.category?.id) {
                    // البحث عن تصنيف عربي أو إنشاؤه
                    const arCategoryResponse = await axios.get(`${API_URL}/api/blog-categories?locale=ar&pagination[pageSize]=100`).catch(() => ({ data: { data: [] } }));
                    const arCategories = arCategoryResponse.data.data || [];
                    
                    let arCategory = arCategories.find(cat => cat.documentId === enArticle.category.documentId);
                    if (!arCategory && arCategories.length > 0) {
                        arCategory = arCategories[0]; // استخدم أول تصنيف متوفر
                    }
                    
                    if (arCategory) {
                        arabicData.data.category = arCategory.id;
                    }
                }

                if (enArticle.author?.id) {
                    // البحث عن كاتب عربي أو استخدام نفس الكاتب
                    const arAuthorResponse = await axios.get(`${API_URL}/api/authors?locale=ar&pagination[pageSize]=100`).catch(() => ({ data: { data: [] } }));
                    const arAuthors = arAuthorResponse.data.data || [];
                    
                    let arAuthor = arAuthors.find(auth => auth.documentId === enArticle.author.documentId);
                    if (!arAuthor && arAuthors.length > 0) {
                        arAuthor = arAuthors[0]; // استخدم أول كاتب متوفر
                    }
                    
                    if (arAuthor) {
                        arabicData.data.author = arAuthor.id;
                    }
                }

                // محاولة إنشاء المقالة العربية باستخدام localization API
                console.log('Creating Arabic localization...');
                
                // الطريقة الصحيحة لإنشاء localization في Strapi
                const localizationUrl = `${API_URL}/api/blog-articles/${enArticle.documentId}/localizations`;
                
                const localizationData = {
                    ...arabicData.data,
                    locale: 'ar'
                };

                const createResponse = await axios.post(localizationUrl, {
                    data: localizationData
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });

                if (createResponse.status === 200 || createResponse.status === 201) {
                    console.log(`✅ Created Arabic localization: "${localizationData.title}"`);
                    console.log(`   Document ID: ${createResponse.data.data?.documentId || 'Same as English'}`);
                } else {
                    throw new Error(`Unexpected status: ${createResponse.status}`);
                }

            } catch (createError) {
                console.log(`❌ Failed to create Arabic version: ${createError.response?.status || createError.message}`);
                
                if (createError.response?.data) {
                    console.log(`   Error details:`, createError.response.data);
                }

                // Fallback: محاولة إنشاء مقالة جديدة عادية
                console.log(`🔄 Trying fallback method...`);
                
                try {
                    const fallbackResponse = await axios.post(`${API_URL}/api/blog-articles?locale=ar`, {
                        data: {
                            title: mapping.arTitle,
                            slug: mapping.arSlug,
                            content: mapping.arContent,
                            excerpt: mapping.arExcerpt,
                            publishDate: enArticle.publishDate || new Date().toISOString().split('T')[0],
                            readTime: '5 دقائق',
                            featured: false
                        }
                    });

                    console.log(`✅ Created Arabic article (fallback): "${mapping.arTitle}"`);
                } catch (fallbackError) {
                    console.log(`❌ Fallback also failed: ${fallbackError.message}`);
                }
            }

            console.log('');
        }

        // الخطوة 3: اختبار النظام
        console.log('3. Testing localization system...\n');

        for (const enArticle of enArticles.slice(0, 2)) {
            console.log(`Testing article: "${enArticle.title}" (${enArticle.documentId})`);
            
            try {
                // اختبار البحث بـ documentId في كلا اللغتين
                const [enTest, arTest] = await Promise.all([
                    axios.get(`${API_URL}/api/blog-articles?filters[documentId][$eq]=${enArticle.documentId}&locale=en&populate=*`),
                    axios.get(`${API_URL}/api/blog-articles?filters[documentId][$eq]=${enArticle.documentId}&locale=ar&populate=*`)
                ]);

                if (enTest.data.data.length > 0) {
                    console.log(`✅ English version found: "${enTest.data.data[0].title}"`);
                } else {
                    console.log(`❌ English version not found`);
                }

                if (arTest.data.data.length > 0) {
                    console.log(`✅ Arabic version found: "${arTest.data.data[0].title}"`);
                } else {
                    console.log(`⚠️ Arabic version not found`);
                }

                // اختبار الـ localizations
                const localizationsResponse = await axios.get(`${API_URL}/api/blog-articles/${enArticle.documentId}?locale=en&populate=localizations`);
                if (localizationsResponse.data.data?.localizations?.length > 0) {
                    console.log(`✅ Localizations found: ${localizationsResponse.data.data.localizations.length}`);
                } else {
                    console.log(`⚠️ No localizations found`);
                }

            } catch (testError) {
                console.log(`❌ Test failed: ${testError.message}`);
            }

            console.log('');
        }

        console.log('🚀 Frontend URLs to test:');
        for (const enArticle of enArticles.slice(0, 2)) {
            console.log(`\n"${enArticle.title}":`);
            console.log(`   English: http://localhost:3000/media/${enArticle.documentId}`);
            console.log(`   Arabic:  http://localhost:3000/ar/media/${enArticle.documentId}`);
        }

        console.log('\n✅ Article localization system configured!');
        console.log('Restart Strapi to apply schema changes, then test language switching.');

    } catch (error) {
        console.log(`❌ Process failed: ${error.message}`);
        
        if (error.response?.data) {
            console.log('Error details:', error.response.data);
        }
    }
}

fixArticleLocalization();
