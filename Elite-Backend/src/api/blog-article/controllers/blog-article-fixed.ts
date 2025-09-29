/**
 * blog-article controller
 */

import { factories } from '@strapi/strapi';

// إعداد المصفوفة الافتراضية للpopulate - مبسطة لتجنب الأخطاء
const defaultPopulate = {
  category: true,
  tags: true,
  author: true,
  featuredImage: true
} as any;

export default factories.createCoreController('api::blog-article.blog-article', ({ strapi }) => ({
  async find(ctx) {
    console.log(`Blog articles find request`);
    return await super.find(ctx);
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;
    const locale = query.locale || 'en';
    
    console.log(`\n=== Blog Article FindOne ===`);
    console.log(`Requested ID/Slug: ${id}`);
    console.log(`Locale: ${locale}`);
    
    try {
      let article = null;
      
      // تحديد إذا كان ID رقمي أم slug
      const isNumericId = !isNaN(parseInt(id));
      
      if (isNumericId) {
        console.log(`Searching by numeric ID: ${id}`);
        
        // البحث بالـ ID الرقمي مع populate مباشرة
        article = await strapi.entityService.findOne('api::blog-article.blog-article', parseInt(id), {
          populate: defaultPopulate
        } as any);
        
        console.log(`ID search result: ${article ? 'Found' : 'Not found'}`);
        
      } else {
        console.log(`Searching by slug: ${id}`);
        
        // البحث بالـ slug
        const articles = await strapi.entityService.findMany('api::blog-article.blog-article', {
          filters: {
            slug: { $eq: id }
          },
          populate: defaultPopulate,
          limit: 1
        } as any);
        
        article = articles.length > 0 ? articles[0] : null;
        console.log(`Slug search result: ${article ? 'Found' : 'Not found'}`);
      }
      
      if (article) {
        console.log(`✅ Article found: "${article.title}"`);
        console.log(`   - ID: ${article.id}`);
        console.log(`   - Locale: ${article.locale || 'default'}`);
        console.log(`   - Published: ${article.publishedAt ? 'Yes' : 'No'}`);
      }
      
      // تحقق من وجود المقالة والنشر
      if (!article) {
        console.log(`Article not found with ${isNumericId ? 'ID' : 'slug'}: ${id}`);
        return ctx.notFound({
          data: null,
          error: {
            status: 404,
            name: 'NotFoundError',
            message: `Blog article not found`,
            details: {
              id: id,
              type: isNumericId ? 'id' : 'slug'
            }
          }
        });
      }
      
      // تحقق من أن المقالة منشورة
      if (!article.publishedAt) {
        console.log(`Article ${id} found but not published`);
        return ctx.notFound({
          data: null,
          error: {
            status: 404,
            name: 'NotFoundError', 
            message: `Blog article not published`,
            details: {
              id: id
            }
          }
        });
      }
      
      console.log(`✅ Article found: "${article.title}"`);
      console.log(`   - ID: ${article.id}`);
      console.log(`   - Locale: ${article.locale || 'default'}`);
      console.log(`   - Published: ${article.publishedAt}`);
      
      // تحديث عدد المشاهدات (اختياري)
      try {
        if (strapi.service('api::blog-article.blog-article')?.incrementViewCount) {
          await strapi.service('api::blog-article.blog-article').incrementViewCount(article.id);
        }
      } catch (viewError) {
        console.log(`Warning: Could not increment view count: ${viewError.message}`);
      }
      
      // تنظيف البيانات وإرجاع النتيجة
      const sanitizedEntity = await this.sanitizeOutput(article, ctx);
      const result = this.transformResponse(sanitizedEntity);
      
      console.log(`📤 Returning article data`);
      console.log(`=== End FindOne ===\n`);
      
      return result;
      
    } catch (error) {
      console.error(`❌ Error in findOne:`, error.message);
      console.error(`Stack:`, error.stack);
      
      return ctx.badRequest({
        data: null,
        error: {
          status: 400,
          name: 'BadRequestError',
          message: `Failed to fetch blog article: ${error.message}`,
          details: {
            id: id,
            originalError: error.message
          }
        }
      });
    }
  }
}));
