const fs = require('fs');
const path = require('path');

async function seedArabicBlogData() {
  const strapi = require('@strapi/strapi')();
  
  try {
    await strapi.load();
    
    console.log('🌱 بدء زراعة البيانات العربية للمدونة...');
    
    // قراءة بيانات المدونة العربية
    const arabicDataPath = path.join(__dirname, 'data', 'arabic-blog-data.json');
    const arabicData = JSON.parse(fs.readFileSync(arabicDataPath, 'utf8'));
    
    // إنشاء التصنيفات العربية
    console.log('📁 إنشاء التصنيفات العربية...');
    const createdCategories = {};
    
    for (const categoryData of arabicData.categories) {
      try {
        // البحث عن التصنيف الإنجليزي المقابل
        const englishCategory = await strapi.entityService.findMany('api::blog-category.blog-category', {
          filters: { slug: categoryData.slug },
          locale: 'en'
        });
        
        if (englishCategory && englishCategory.length > 0) {
          // إنشاء النسخة العربية للتصنيف الموجود
          const arabicCategory = await strapi.entityService.create('api::blog-category.blog-category', {
            data: {
              name: categoryData.name,
              slug: categoryData.slug,
              locale: 'ar',
              localizations: [englishCategory[0].id]
            }
          });
          createdCategories[categoryData.name] = arabicCategory;
          console.log(`✅ تم إنشاء التصنيف: ${categoryData.name}`);
        } else {
          // إنشاء تصنيف جديد باللغتين
          const newCategory = await strapi.entityService.create('api::blog-category.blog-category', {
            data: {
              name: categoryData.name,
              slug: categoryData.slug,
              locale: 'ar'
            }
          });
          createdCategories[categoryData.name] = newCategory;
          console.log(`✅ تم إنشاء التصنيف الجديد: ${categoryData.name}`);
        }
      } catch (error) {
        console.error(`❌ خطأ في إنشاء التصنيف ${categoryData.name}:`, error.message);
      }
    }
    
    // إنشاء المؤلفين العرب
    console.log('👥 إنشاء المؤلفين العرب...');
    const createdAuthors = {};
    
    for (const authorData of arabicData.authors) {
      try {
        const author = await strapi.entityService.create('api::author.author', {
          data: {
            name: authorData.name,
            email: authorData.email,
            locale: 'ar'
          }
        });
        createdAuthors[authorData.name] = author;
        console.log(`✅ تم إنشاء المؤلف: ${authorData.name}`);
      } catch (error) {
        console.error(`❌ خطأ في إنشاء المؤلف ${authorData.name}:`, error.message);
      }
    }
    
    // إنشاء المقالات العربية
    console.log('📝 إنشاء المقالات العربية...');
    
    for (const articleData of arabicData.articles) {
      try {
        // العثور على التصنيف والمؤلف
        const category = createdCategories[articleData.category.name];
        const author = createdAuthors[articleData.author.name];
        
        if (!category || !author) {
          console.warn(`⚠️ تخطي المقالة ${articleData.title} - التصنيف أو المؤلف غير موجود`);
          continue;
        }
        
        const article = await strapi.entityService.create('api::blog-article.blog-article', {
          data: {
            title: articleData.title,
            slug: articleData.slug,
            content: articleData.content,
            excerpt: articleData.excerpt,
            publishDate: articleData.publishDate,
            readTime: articleData.readTime,
            featured: articleData.featured,
            category: category.id,
            author: author.id,
            locale: 'ar',
            publishedAt: new Date()
          }
        });
        
        console.log(`✅ تم إنشاء المقالة: ${articleData.title}`);
      } catch (error) {
        console.error(`❌ خطأ في إنشاء المقالة ${articleData.title}:`, error.message);
      }
    }
    
    console.log('🎉 تم الانتهاء من زراعة البيانات العربية بنجاح!');
    
  } catch (error) {
    console.error('❌ خطأ في زراعة البيانات:', error);
  } finally {
    await strapi.destroy();
  }
}

// تشغيل السكريبت
if (require.main === module) {
  seedArabicBlogData()
    .then(() => {
      console.log('✨ تم الانتهاء من العملية');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 فشل في العملية:', error);
      process.exit(1);
    });
}

module.exports = seedArabicBlogData;
