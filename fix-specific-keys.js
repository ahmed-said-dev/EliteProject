const fs = require('fs');
const path = require('path');

async function fixSpecificKeys() {
    try {
        console.log('🔧 إصلاح المفاتيح المحددة: articleDetail.moreArticles, moreArticlesDesc, exploreArticles\n');

        // مسار الملف العربي
        const arabicPath = path.join(__dirname, 'elite-frontend/public/locales/ar/common.json');
        
        if (!fs.existsSync(arabicPath)) {
            console.log('❌ ملف الترجمة العربية غير موجود:', arabicPath);
            return;
        }

        // قراءة الملف العربي
        console.log('📖 قراءة الملف العربي...');
        const arabicContent = fs.readFileSync(arabicPath, 'utf8');
        let arabicData = JSON.parse(arabicContent);

        // التحقق من وجود articleDetail
        if (!arabicData.articleDetail) {
            console.log('➕ إنشاء قسم articleDetail جديد...');
            arabicData.articleDetail = {};
        } else {
            console.log('✅ قسم articleDetail موجود بالفعل');
        }

        // إضافة المفاتيح المطلوبة
        console.log('➕ إضافة المفاتيح المحددة...');
        
        const keysToAdd = {
            "moreArticles": "اكتشف المزيد من المقالات",
            "moreArticlesDesc": "استكشف مجموعتنا الشاملة من المقالات البيطرية ودلائل العناية بالحيوانات الأليفة.",
            "exploreArticles": "استكشف جميع المقالات"
        };

        // إضافة/تحديث المفاتيح
        Object.entries(keysToAdd).forEach(([key, value]) => {
            if (!arabicData.articleDetail[key]) {
                arabicData.articleDetail[key] = value;
                console.log(`✅ أضيف: articleDetail.${key} = "${value}"`);
            } else {
                console.log(`⚪ موجود بالفعل: articleDetail.${key}`);
            }
        });

        // إضافة مفاتيح إضافية مهمة إذا لم تكن موجودة
        const additionalKeys = {
            "notFound": "المقالة غير موجودة",
            "notFoundDesc": "المقالة التي تبحث عنها غير موجودة أو تم حذفها.",
            "backToArticles": "العودة إلى المقالات",
            "loadingArticle": "جاري تحميل المقالة...",
            "tags": "الوسوم"
        };

        Object.entries(additionalKeys).forEach(([key, value]) => {
            if (!arabicData.articleDetail[key]) {
                arabicData.articleDetail[key] = value;
                console.log(`➕ أضيف إضافي: articleDetail.${key} = "${value}"`);
            }
        });

        // كتابة الملف المحدث
        console.log('\n💾 حفظ الملف المحدث...');
        const updatedContent = JSON.stringify(arabicData, null, 2);
        fs.writeFileSync(arabicPath, updatedContent, 'utf8');
        console.log('✅ تم حفظ الملف بنجاح');

        // التحقق من النتائج
        console.log('\n🧪 التحقق من النتائج:');
        const testKeys = ['moreArticles', 'moreArticlesDesc', 'exploreArticles'];
        
        testKeys.forEach(key => {
            const value = arabicData.articleDetail[key];
            if (value) {
                console.log(`✅ articleDetail.${key}: "${value}"`);
            } else {
                console.log(`❌ articleDetail.${key}: غير موجود`);
            }
        });

        // فحص الملف الإنجليزي أيضاً
        console.log('\n🔍 فحص الملف الإنجليزي...');
        const englishPath = path.join(__dirname, 'elite-frontend/public/locales/en/common.json');
        
        if (fs.existsSync(englishPath)) {
            const englishContent = fs.readFileSync(englishPath, 'utf8');
            const englishData = JSON.parse(englishContent);
            
            testKeys.forEach(key => {
                const value = englishData.articleDetail?.[key];
                if (value) {
                    console.log(`✅ EN articleDetail.${key}: "${value}"`);
                } else {
                    console.log(`❌ EN articleDetail.${key}: غير موجود`);
                }
            });
        }

        console.log('\n🚀 خطوات الاختبار:');
        console.log('1. أعد تشغيل الفرونت اند:');
        console.log('   cd elite-frontend && npm run dev');
        console.log('');
        console.log('2. اختبر صفحة المقالة:');
        console.log('   http://localhost:3000/ar/media/any-article-id');
        console.log('');
        console.log('3. تحقق من ظهور النصوص:');
        console.log('   - "اكتشف المزيد من المقالات" في قسم CTA');
        console.log('   - "استكشف مجموعتنا الشاملة..." في الوصف');
        console.log('   - "استكشف جميع المقالات" في الزر');

        console.log('\n✅ تم إصلاح المفاتيح المحددة بنجاح!');

    } catch (error) {
        console.log(`❌ خطأ في العملية: ${error.message}`);
        console.log('💡 تأكد من وجود مجلد elite-frontend مع ملفات الترجمة');
    }
}

fixSpecificKeys();
