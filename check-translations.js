const fs = require('fs');
const path = require('path');

async function checkTranslations() {
    try {
        console.log('🔍 فحص حالة ملفات الترجمة...\n');

        // المسارات
        const englishPath = path.join(__dirname, 'elite-frontend/public/locales/en/common.json');
        const arabicPath = path.join(__dirname, 'elite-frontend/public/locales/ar/common.json');

        // التحقق من وجود الملفات
        const englishExists = fs.existsSync(englishPath);
        const arabicExists = fs.existsSync(arabicPath);

        console.log('📁 حالة الملفات:');
        console.log(`✅ الإنجليزية: ${englishExists ? 'موجود' : 'غير موجود'}`);
        console.log(`✅ العربية: ${arabicExists ? 'موجود' : 'غير موجود'}`);

        if (!englishExists || !arabicExists) {
            console.log('❌ بعض ملفات الترجمة مفقودة');
            return;
        }

        // قراءة الملفات
        const englishData = JSON.parse(fs.readFileSync(englishPath, 'utf8'));
        const arabicData = JSON.parse(fs.readFileSync(arabicPath, 'utf8'));

        console.log('\n🔑 فحص المفاتيح المطلوبة للمقالات:');

        // المفاتيح المطلوبة
        const requiredKeys = [
            'common.back',
            'common.loading',
            'common.loadingArticle',
            'articleDetail.notFound',
            'articleDetail.notFoundDesc',
            'articleDetail.backToArticles',
            'articleDetail.loadingArticle',
            'articleDetail.tags',
            'articleDetail.moreArticles',
            'articleDetail.moreArticlesDesc',
            'articleDetail.exploreArticles'
        ];

        const checkKey = (data, keyPath) => {
            const keys = keyPath.split('.');
            let current = data;
            
            for (const key of keys) {
                if (!current || typeof current !== 'object' || !(key in current)) {
                    return false;
                }
                current = current[key];
            }
            
            return true;
        };

        console.log('\n📊 نتائج الفحص:');
        console.log('المفتاح'.padEnd(30) + 'إنجليزي'.padEnd(15) + 'عربي');
        console.log('-'.repeat(60));

        const missingKeys = {
            english: [],
            arabic: []
        };

        requiredKeys.forEach(key => {
            const englishHas = checkKey(englishData, key);
            const arabicHas = checkKey(arabicData, key);
            
            const status = (englishHas ? '✅' : '❌').padEnd(15) + (arabicHas ? '✅' : '❌');
            console.log(key.padEnd(30) + status);
            
            if (!englishHas) missingKeys.english.push(key);
            if (!arabicHas) missingKeys.arabic.push(key);
        });

        // عرض المفاتيح المفقودة
        if (missingKeys.english.length > 0) {
            console.log('\n❌ مفاتيح مفقودة في الإنجليزية:');
            missingKeys.english.forEach(key => console.log(`   - ${key}`));
        }

        if (missingKeys.arabic.length > 0) {
            console.log('\n❌ مفاتيح مفقودة في العربية:');
            missingKeys.arabic.forEach(key => console.log(`   - ${key}`));
        }

        if (missingKeys.english.length === 0 && missingKeys.arabic.length === 0) {
            console.log('\n🎉 جميع المفاتيح المطلوبة موجودة!');
        }

        // فحص مفاتيح المقالات الموجودة
        console.log('\n📚 مفاتيح المقالات الموجودة:');
        
        if (englishData.article) {
            console.log(`✅ الإنجليزية - article: ${Object.keys(englishData.article).length} مفتاح`);
        }
        
        if (arabicData.article) {
            console.log(`✅ العربية - article: ${Object.keys(arabicData.article).length} مفتاح`);
        }

        if (englishData.articleDetail) {
            console.log(`✅ الإنجليزية - articleDetail: ${Object.keys(englishData.articleDetail).length} مفتاح`);
        }
        
        if (arabicData.articleDetail) {
            console.log(`✅ العربية - articleDetail: ${Object.keys(arabicData.articleDetail).length} مفتاح`);
        }

        // اختبار صفحة تفاصيل المقالة
        console.log('\n🧪 اختبار استخدام المفاتيح في الكود:');
        
        const articleDetailPath = path.join(__dirname, 'elite-frontend/pages/media/[id].js');
        if (fs.existsSync(articleDetailPath)) {
            const articleCode = fs.readFileSync(articleDetailPath, 'utf8');
            
            // البحث عن استخدام مفاتيح الترجمة
            const translationMatches = articleCode.match(/t\(['"`]([^'"`]+)['"`]\)/g);
            
            if (translationMatches) {
                console.log('📝 مفاتيح الترجمة المستخدمة في صفحة المقالة:');
                const uniqueKeys = [...new Set(translationMatches.map(match => 
                    match.replace(/t\(['"`]([^'"`]+)['"`]\)/, '$1')
                ))];
                
                uniqueKeys.forEach(key => {
                    const englishHas = checkKey(englishData, key);
                    const arabicHas = checkKey(arabicData, key);
                    const status = englishHas && arabicHas ? '✅' : '❌';
                    console.log(`   ${status} ${key}`);
                });
            }
        }

        console.log('\n💡 إرشادات:');
        if (missingKeys.arabic.length > 0) {
            console.log('🔧 لإصلاح المفاتيح المفقودة في العربية، شغل:');
            console.log('   node fix-arabic-translations.js');
        }
        
        console.log('🚀 لاختبار صفحة المقالة:');
        console.log('   1. cd elite-frontend && npm run dev');
        console.log('   2. افتح: http://localhost:3000/ar/media/test-article-id');

        console.log('\n✅ انتهى فحص الترجمات');

    } catch (error) {
        console.log(`❌ خطأ في الفحص: ${error.message}`);
    }
}

checkTranslations();
