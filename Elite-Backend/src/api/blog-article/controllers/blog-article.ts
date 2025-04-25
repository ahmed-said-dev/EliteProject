/**
 * blog-article controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::blog-article.blog-article', ({ strapi }) => ({
  /**
   * تعديل منطق findOne للسماح بالبحث بواسطة slug أو id
   * مع تحسين الاستعلامات ودعم populate كامل
   */
  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;
    
    // تحضير خيارات الـ populate الافتراضية
    const defaultPopulate = {
      featuredImage: true,
      category: {
        populate: ['icon']
      },
      tags: true,
      author: {
        populate: ['avatar', 'socialLinks']
      }
    };
    
    try {
      // معالجة البحث بواسطة slug
      if (isNaN(parseInt(id))) {
        // إذا كان المعرف ليس رقمًا، نفترض أنه slug
        const entity = await strapi.db.query('api::blog-article.blog-article').findOne({
          where: { slug: id },
          populate: query.populate || defaultPopulate
        });
        
        if (!entity) {
          return ctx.notFound('المقالة غير موجودة');
        }
        
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitizedEntity);
      }
      
      // تحديد خيارات الـ populate
      if (!query.populate) {
        query.populate = defaultPopulate;
      }
      
      // استدعاء المنطق الافتراضي مع التخصيصات
      const response = await super.findOne(ctx);
      
      // زيادة عدد المشاهدات (يمكن تعليقها إذا لم تكن مطلوبة)
      if (response.data) {
        const articleId = parseInt(id);
        await strapi.service('api::blog-article.blog-article').incrementViewCount(articleId);
      }
      
      return response;
    } catch (error) {
      // معالجة أي أخطاء غير متوقعة
      return ctx.badRequest('حدث خطأ أثناء البحث عن المقالة', { error: error instanceof Error ? error.message : 'خطأ غير معروف' });
    }
  },
  
  /**
   * دالة للحصول على المقالات المتعلقة بمقالة معينة
   * إما من نفس التصنيف أو بنفس العلامات
   */
  async findRelated(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;
    const limit = query.limit ? parseInt(query.limit as string) : 3;
    
    try {
      // التحقق من صحة المعرف
      const articleId = parseInt(id);
      if (isNaN(articleId)) {
        return ctx.badRequest('معرف المقالة غير صالح');
      }
      
      // الحصول على المقالة الحالية
      const article = await strapi.db.query('api::blog-article.blog-article').findOne({
        where: { id: articleId },
        populate: {
          category: true,
          tags: true
        }
      });
      
      if (!article) {
        return ctx.notFound('المقالة غير موجودة');
      }
      
      // الحصول على معرفات العلامات
      const tagIds = article.tags?.map(tag => tag.id) || [];
      const categoryId = article.category?.id;
      
      // استعلام للمقالات ذات الصلة (من نفس التصنيف أو بنفس العلامات)
      const relatedArticles = await strapi.db.query('api::blog-article.blog-article').findMany({
        where: {
          id: { $ne: articleId },
          $or: [
            categoryId ? { category: categoryId } : {},
            tagIds.length > 0 ? { tags: { id: { $in: tagIds } } } : {}
          ]
        },
        populate: {
          featuredImage: true,
          category: true,
          author: {
            populate: ['avatar']
          }
        },
        limit
      });
      
      const sanitizedEntities = await this.sanitizeOutput(relatedArticles, ctx);
      return this.transformResponse(sanitizedEntities);
    } catch (error) {
      return ctx.badRequest('حدث خطأ أثناء البحث عن المقالات ذات الصلة', { 
        error: error instanceof Error ? error.message : 'خطأ غير معروف' 
      });
    }
  }
}));
