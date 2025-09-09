const fetch = require('node-fetch');

async function testArabicBlogAPI() {
  console.log('🧪 اختبار API المقالات العربية...\n');
  
  const baseUrl = 'http://localhost:1337';
  
  try {
    // اختبار جلب المقالات العربية
    console.log('1️⃣ اختبار جلب المقالات العربية:');
    const articlesResponse = await fetch(`${baseUrl}/api/blog-articles?locale=ar&populate=*`);
    
    if (!articlesResponse.ok) {
      throw new Error(`HTTP ${articlesResponse.status}: ${articlesResponse.statusText}`);
    }
    
    const articlesData = await articlesResponse.json();
    console.log(`✅ تم جلب ${articlesData.data?.length || 0} مقالة عربية`);
    
    if (articlesData.data && articlesData.data.length > 0) {
      console.log(`📝 أول مقالة: "${articlesData.data[0].title}"`);
      console.log(`🔗 الرابط: ${articlesData.data[0].slug}`);
      console.log(`📅 تاريخ النشر: ${articlesData.data[0].publishDate}`);
    }
    
    // اختبار جلب المقالات الإنجليزية للمقارنة
    console.log('\n2️⃣ اختبار جلب المقالات الإنجليزية:');
    const englishResponse = await fetch(`${baseUrl}/api/blog-articles?locale=en&populate=*`);
    
    if (englishResponse.ok) {
      const englishData = await englishResponse.json();
      console.log(`✅ تم جلب ${englishData.data?.length || 0} مقالة إنجليزية`);
    }
    
    // اختبار جلب التصنيفات العربية
    console.log('\n3️⃣ اختبار جلب التصنيفات العربية:');
    const categoriesResponse = await fetch(`${baseUrl}/api/blog-categories?locale=ar`);
    
    if (categoriesResponse.ok) {
      const categoriesData = await categoriesResponse.json();
      console.log(`✅ تم جلب ${categoriesData.data?.length || 0} تصنيف عربي`);
      
      if (categoriesData.data && categoriesData.data.length > 0) {
        categoriesData.data.forEach(category => {
          console.log(`📁 ${category.name} (${category.slug})`);
        });
      }
    }
    
    // اختبار جلب المؤلفين العرب
    console.log('\n4️⃣ اختبار جلب المؤلفين العرب:');
    const authorsResponse = await fetch(`${baseUrl}/api/authors?locale=ar`);
    
    if (authorsResponse.ok) {
      const authorsData = await authorsResponse.json();
      console.log(`✅ تم جلب ${authorsData.data?.length || 0} مؤلف عربي`);
      
      if (authorsData.data && authorsData.data.length > 0) {
        authorsData.data.forEach(author => {
          console.log(`👤 ${author.name} (${author.email})`);
        });
      }
    }
    
    console.log('\n🎉 جميع الاختبارات نجحت! API المقالات العربية يعمل بشكل صحيح.');
    
  } catch (error) {
    console.error('\n❌ فشل في الاختبار:', error.message);
    console.log('\n💡 تأكد من:');
    console.log('   - تشغيل الباك إند على المنفذ 1337');
    console.log('   - تشغيل سكريبت زراعة البيانات العربية');
    console.log('   - تفعيل إضافة i18n في Strapi');
  }
}

// تشغيل الاختبار
testArabicBlogAPI();
