const fs = require('fs');
const path = require('path');

// إصلاح سريع للمفاتيح العربية المفقودة
const arabicPath = path.join(__dirname, 'elite-frontend/public/locales/ar/common.json');

try {
    console.log('🔧 إصلاح سريع للمفاتيح العربية...\n');
    
    // قراءة الملف
    const content = fs.readFileSync(arabicPath, 'utf8');
    let data = JSON.parse(content);
    
    // إنشاء articleDetail إذا لم يكن موجوداً
    if (!data.articleDetail) {
        data.articleDetail = {};
    }
    
    // إضافة المفاتيح المطلوبة
    const missingKeys = {
        "moreArticles": "اكتشف المزيد من المقالات",
        "moreArticlesDesc": "استكشف مجموعتنا الشاملة من المقالات البيطرية ودلائل العناية بالحيوانات الأليفة.",
        "exploreArticles": "استكشف جميع المقالات",
        "notFound": "المقالة غير موجودة",
        "notFoundDesc": "المقالة التي تبحث عنها غير موجودة أو تم حذفها.",
        "backToArticles": "العودة إلى المقالات",
        "loadingArticle": "جاري تحميل المقالة...",
        "tags": "الوسوم"
    };
    
    console.log('➕ إضافة المفاتيح:');
    Object.entries(missingKeys).forEach(([key, value]) => {
        data.articleDetail[key] = value;
        console.log(`✅ articleDetail.${key} = "${value}"`);
    });
    
    // حفظ الملف
    fs.writeFileSync(arabicPath, JSON.stringify(data, null, 2), 'utf8');
    console.log('\n💾 تم حفظ الملف بنجاح!');
    
    console.log('\n🧪 اختبار النتائج:');
    console.log('1. شغل الفرونت اند: cd elite-frontend && npm run dev');
    console.log('2. افتح: http://localhost:3000/ar/media/any-article-id');
    console.log('3. ستجد النصوص العربية في قسم "اكتشف المزيد من المقالات"');
    
} catch (error) {
    console.log(`❌ خطأ: ${error.message}`);
}

console.log('\n✅ انتهى الإصلاح السريع!');
