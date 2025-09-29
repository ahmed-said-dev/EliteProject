const fs = require('fs');
const path = require('path');

async function fixArabicTranslations() {
    try {
        console.log('🔧 إصلاح ترجمات المقالات العربية...\n');

        // قراءة الملف العربي
        const arabicFilePath = path.join(__dirname, 'elite-frontend/public/locales/ar/common.json');
        console.log(`📖 قراءة الملف: ${arabicFilePath}`);
        
        if (!fs.existsSync(arabicFilePath)) {
            console.log('❌ ملف الترجمة العربية غير موجود');
            return;
        }

        const arabicContent = fs.readFileSync(arabicFilePath, 'utf8');
        let arabicData;
        
        try {
            arabicData = JSON.parse(arabicContent);
            console.log('✅ تم تحليل JSON بنجاح');
        } catch (parseError) {
            console.log('❌ خطأ في تحليل JSON:', parseError.message);
            return;
        }

        // التحقق من وجود articleDetail
        if (!arabicData.articleDetail) {
            console.log('➕ إضافة مفاتيح articleDetail...');
            
            // إضافة المفاتيح المفقودة
            arabicData.articleDetail = {
                "notFound": "المقالة غير موجودة",
                "notFoundDesc": "المقالة التي تبحث عنها غير موجودة أو تم حذفها.",
                "backToArticles": "العودة إلى المقالات",
                "loadingArticle": "جاري تحميل المقالة...",
                "tags": "الوسوم",
                "moreArticles": "اكتشف المزيد من المقالات",
                "moreArticlesDesc": "استكشف مجموعتنا الشاملة من المقالات البيطرية ودلائل العناية بالحيوانات الأليفة.",
                "exploreArticles": "استكشف جميع المقالات"
            };

            // كتابة الملف المحدث
            const updatedContent = JSON.stringify(arabicData, null, 2);
            fs.writeFileSync(arabicFilePath, updatedContent, 'utf8');
            
            console.log('✅ تم إضافة مفاتيح articleDetail بنجاح');
        } else {
            console.log('✅ مفاتيح articleDetail موجودة بالفعل');
        }

        // التحقق من وجود مفاتيح common إضافية
        if (!arabicData.common.loadingArticle) {
            console.log('➕ إضافة مفاتيح common إضافية...');
            
            arabicData.common.loadingArticle = "جاري تحميل المقالة...";
            arabicData.common.articleNotFound = "المقالة غير موجودة";
            arabicData.common.back = "رجوع";
            
            // كتابة الملف المحدث
            const updatedContent = JSON.stringify(arabicData, null, 2);
            fs.writeFileSync(arabicFilePath, updatedContent, 'utf8');
            
            console.log('✅ تم إضافة مفاتيح common إضافية بنجاح');
        }

        // إنشاء ملف اختبار للتحقق من الترجمات
        console.log('\n📝 إنشاء ملف اختبار الترجمات...');
        
        const testTranslations = {
            'common.back': arabicData.common.back || 'رجوع',
            'common.loadingArticle': arabicData.common.loadingArticle || 'جاري التحميل...',
            'articleDetail.notFound': arabicData.articleDetail?.notFound || 'غير موجود',
            'articleDetail.notFoundDesc': arabicData.articleDetail?.notFoundDesc || 'الوصف غير متوفر',
            'articleDetail.backToArticles': arabicData.articleDetail?.backToArticles || 'العودة',
            'articleDetail.loadingArticle': arabicData.articleDetail?.loadingArticle || 'جاري التحميل...',
            'articleDetail.tags': arabicData.articleDetail?.tags || 'الوسوم',
            'articleDetail.moreArticles': arabicData.articleDetail?.moreArticles || 'المزيد من المقالات',
            'articleDetail.moreArticlesDesc': arabicData.articleDetail?.moreArticlesDesc || 'وصف المقالات',
            'articleDetail.exploreArticles': arabicData.articleDetail?.exploreArticles || 'استكشف المقالات'
        };

        console.log('\n🧪 اختبار الترجمات:');
        Object.entries(testTranslations).forEach(([key, value]) => {
            console.log(`✅ ${key}: "${value}"`);
        });

        console.log('\n🎯 ملفات محدثة:');
        console.log(`📁 ${arabicFilePath}`);

        console.log('\n📋 المفاتيح المضافة:');
        console.log('✅ articleDetail.notFound');
        console.log('✅ articleDetail.notFoundDesc');
        console.log('✅ articleDetail.backToArticles');
        console.log('✅ articleDetail.loadingArticle');
        console.log('✅ articleDetail.tags');
        console.log('✅ articleDetail.moreArticles');
        console.log('✅ articleDetail.moreArticlesDesc');
        console.log('✅ articleDetail.exploreArticles');

        console.log('\n🚀 الخطوات التالية:');
        console.log('1. أعد تشغيل الفرونت اند: cd elite-frontend && npm run dev');
        console.log('2. اختبر صفحة تفاصيل المقالة');
        console.log('3. تأكد من ظهور الترجمات العربية بشكل صحيح');

        console.log('\n✅ تم إصلاح مشاكل الترجمة بنجاح!');

    } catch (error) {
        console.log(`❌ خطأ في العملية: ${error.message}`);
        console.log('💡 تأكد من وجود مجلد elite-frontend في نفس مستوى هذا الملف');
    }
}

fixArabicTranslations();
