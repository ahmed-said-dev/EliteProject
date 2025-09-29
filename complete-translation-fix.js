const fs = require('fs');
const path = require('path');

async function completeTranslationFix() {
    try {
        console.log('🔧 الحل الشامل لمشاكل الترجمة في صفحة تفاصيل المقالة...\n');

        // مسارات الملفات
        const englishPath = path.join(__dirname, 'elite-frontend/public/locales/en/common.json');
        const arabicPath = path.join(__dirname, 'elite-frontend/public/locales/ar/common.json');

        // ===== إصلاح الملف الإنجليزي =====
        console.log('🇺🇸 إصلاح الملف الإنجليزي...');
        
        if (fs.existsSync(englishPath)) {
            const englishContent = fs.readFileSync(englishPath, 'utf8');
            let englishData = JSON.parse(englishContent);

            // إضافة المفاتيح المفقودة في common
            if (!englishData.common.loadingArticle) {
                englishData.common.loadingArticle = "Loading article...";
            }
            if (!englishData.common.tryAgain) {
                englishData.common.tryAgain = "Try Again";
            }

            // التأكد من وجود articleDetail
            if (!englishData.articleDetail) {
                englishData.articleDetail = {};
            }

            // إضافة/تحديث مفاتيح articleDetail
            const englishArticleKeys = {
                "notFound": "Article Not Found",
                "notFoundDesc": "The article you are looking for does not exist or has been removed.",
                "backToArticles": "Back to Articles",
                "loadingArticle": "Loading article...",
                "tags": "Tags",
                "moreArticles": "Discover More Articles",
                "moreArticlesDesc": "Explore our comprehensive collection of veterinary articles and pet care guides.",
                "exploreArticles": "Explore All Articles"
            };

            Object.assign(englishData.articleDetail, englishArticleKeys);

            // كتابة الملف المُحدث
            fs.writeFileSync(englishPath, JSON.stringify(englishData, null, 2), 'utf8');
            console.log('✅ تم تحديث الملف الإنجليزي');
        }

        // ===== إصلاح الملف العربي =====
        console.log('\n🇸🇦 إصلاح الملف العربي...');
        
        if (fs.existsSync(arabicPath)) {
            const arabicContent = fs.readFileSync(arabicPath, 'utf8');
            let arabicData = JSON.parse(arabicContent);

            // إضافة المفاتيح المفقودة في common
            if (!arabicData.common.loadingArticle) {
                arabicData.common.loadingArticle = "جاري تحميل المقالة...";
            }
            if (!arabicData.common.tryAgain) {
                arabicData.common.tryAgain = "حاول مرة أخرى";
            }

            // التأكد من وجود articleDetail
            if (!arabicData.articleDetail) {
                arabicData.articleDetail = {};
            }

            // إضافة/تحديث مفاتيح articleDetail
            const arabicArticleKeys = {
                "notFound": "المقالة غير موجودة",
                "notFoundDesc": "المقالة التي تبحث عنها غير موجودة أو تم حذفها.",
                "backToArticles": "العودة إلى المقالات",
                "loadingArticle": "جاري تحميل المقالة...",
                "tags": "الوسوم",
                "moreArticles": "اكتشف المزيد من المقالات",
                "moreArticlesDesc": "استكشف مجموعتنا الشاملة من المقالات البيطرية ودلائل العناية بالحيوانات الأليفة.",
                "exploreArticles": "استكشف جميع المقالات"
            };

            Object.assign(arabicData.articleDetail, arabicArticleKeys);

            // كتابة الملف المُحدث
            fs.writeFileSync(arabicPath, JSON.stringify(arabicData, null, 2), 'utf8');
            console.log('✅ تم تحديث الملف العربي');
        }

        // ===== التحقق من النتائج =====
        console.log('\n🧪 فحص النتائج النهائية...');
        
        const testKeys = [
            'common.loadingArticle',
            'common.tryAgain',
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
                if (!current || !(key in current)) return false;
                current = current[key];
            }
            return true;
        };

        console.log('\n📊 حالة المفاتيح:');
        console.log('المفتاح'.padEnd(35) + 'إنجليزي'.padEnd(15) + 'عربي');
        console.log('-'.repeat(65));

        const englishData = JSON.parse(fs.readFileSync(englishPath, 'utf8'));
        const arabicData = JSON.parse(fs.readFileSync(arabicPath, 'utf8'));

        let allGood = true;

        testKeys.forEach(key => {
            const englishHas = checkKey(englishData, key);
            const arabicHas = checkKey(arabicData, key);
            
            const englishStatus = englishHas ? '✅' : '❌';
            const arabicStatus = arabicHas ? '✅' : '❌';
            
            console.log(key.padEnd(35) + englishStatus.padEnd(15) + arabicStatus);
            
            if (!englishHas || !arabicHas) {
                allGood = false;
            }
        });

        // ===== اختبار الاستخدام في الكود =====
        console.log('\n🔍 فحص استخدام المفاتيح في الكود...');
        
        const articleFilePath = path.join(__dirname, 'elite-frontend/pages/media/[id].js');
        if (fs.existsSync(articleFilePath)) {
            const articleCode = fs.readFileSync(articleFilePath, 'utf8');
            
            const usedKeys = [
                'common.back',
                'common.loadingArticle',
                'common.tryAgain',
                'articleDetail.notFound',
                'articleDetail.notFoundDesc',
                'articleDetail.backToArticles',
                'articleDetail.tags',
                'articleDetail.moreArticles',
                'articleDetail.moreArticlesDesc',
                'articleDetail.exploreArticles'
            ];

            console.log('📝 المفاتيح المستخدمة في الكود:');
            usedKeys.forEach(key => {
                const inCode = articleCode.includes(`t('${key}')`);
                const englishHas = checkKey(englishData, key);
                const arabicHas = checkKey(arabicData, key);
                
                const status = inCode && englishHas && arabicHas ? '✅' : '❌';
                const details = [];
                if (!inCode) details.push('غير مستخدم');
                if (!englishHas) details.push('مفقود بالإنجليزية');
                if (!arabicHas) details.push('مفقود بالعربية');
                
                console.log(`   ${status} ${key} ${details.length > 0 ? '(' + details.join(', ') + ')' : ''}`);
            });
        }

        // ===== تعليمات الاختبار =====
        console.log('\n🚀 خطوات الاختبار:');
        console.log('1. شغل السكريبت:');
        console.log('   node complete-translation-fix.js');
        console.log('');
        console.log('2. شغل الفرونت اند:');
        console.log('   cd elite-frontend && npm run dev');
        console.log('');
        console.log('3. اختبر URLs:');
        console.log('   🇺🇸 إنجليزي: http://localhost:3000/media/test-article-id');
        console.log('   🇸🇦 عربي: http://localhost:3000/ar/media/test-article-id');
        console.log('');
        console.log('4. اختبر الحالات:');
        console.log('   ✅ مقالة موجودة - تحميل عادي');
        console.log('   ❌ مقالة غير موجودة - رسالة خطأ مترجمة');
        console.log('   ⏳ أثناء التحميل - رسالة تحميل مترجمة');
        console.log('   🔄 تبديل اللغات - ترجمة فورية');

        if (allGood) {
            console.log('\n🎉 تم إصلاح جميع مشاكل الترجمة بنجاح!');
        } else {
            console.log('\n⚠️ لا تزال هناك بعض المشاكل في الترجمة');
        }

        console.log('\n✅ انتهى الحل الشامل للترجمة');

    } catch (error) {
        console.log(`❌ خطأ في العملية: ${error.message}`);
        console.log('💡 تأكد من وجود مجلد elite-frontend مع ملفات الترجمة');
    }
}

completeTranslationFix();
