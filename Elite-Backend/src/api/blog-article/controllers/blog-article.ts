/**
 * blog-article controller
 */

import { factories } from '@strapi/strapi';

// إعداد المصفوفة الافتراضية للpopulate
const defaultPopulate = {
  category: true,
  tags: true,
  author: {
    populate: ['avatar', 'socialLinks']
  },
  featuredImage: true
};

export default factories.createCoreController('api::blog-article.blog-article', ({ strapi }) => ({
  async find(ctx) {
    // تطبيق نفس منطق الاستعلام الافتراضي
    const { query } = ctx;
    return await super.find(ctx);
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    
    try {
      let entity;
      
      // البحث عن مقالة باستخدام الslug أو المعرف
      if (isNaN(parseInt(id))) {
        // بحث باستخدام الslug
        entity = await strapi.db.query('api::blog-article.blog-article').findOne({
          where: { slug: id },
          populate: defaultPopulate
        });
      } else {
        // بحث باستخدام المعرف
        entity = await strapi.db.query('api::blog-article.blog-article').findOne({
          where: { id: parseInt(id) },
          populate: defaultPopulate
        });
      }
      
      if (!entity) {
        return ctx.notFound(`No blog article found with id/slug: ${id}`);
      }
      
      // زيادة عدد المشاهدات
      try {
        await strapi.service('api::blog-article.blog-article').incrementViewCount(entity.id);
      } catch (error) {
        // تسجيل الخطأ ولكن عدم إرجاع خطأ للمستخدم
        console.error('Error incrementing view count:', error);
      }
      
      // إرجاع النتيجة
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      console.error('Error in findOne:', error);
      return ctx.badRequest('Error finding blog article');
    }
  },

  async findRelated(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;
    
    // الحصول على limit من الاستعلام أو استخدام القيمة الافتراضية
    const limit = query.limit ? parseInt(query.limit as string) : 3;
    
    try {
      // البحث عن المقالة الحالية
      const article = await strapi.db.query('api::blog-article.blog-article').findOne({
        where: { id },
        populate: {
          category: true,
          tags: true
        }
      });
      
      if (!article) {
        return ctx.notFound(`No blog article found with id: ${id}`);
      }
      
      // الحصول على معرفات التصنيفات والعلامات للمقالة الحالية
      const categoryId = article.category?.id;
      const tagIds = article.tags?.map(tag => tag.id) || [];
      
      // استخدام query.findMany مباشرة بدلاً من entityService.findMany لتجنب مشكلات التوافق
      const relatedArticles = await strapi.db.query('api::blog-article.blog-article').findMany({
        where: {
          id: { $ne: article.id },
          $or: [
            categoryId ? { category: categoryId } : {},
            tagIds.length > 0 ? { tags: { id: { $in: tagIds } } } : {}
          ].filter(cond => Object.keys(cond).length > 0) // تصفية الشروط الفارغة
        },
        orderBy: { publishDate: 'desc' },
        populate: defaultPopulate,
        limit
      });
      
      // تنظيف النتائج وإرجاعها
      const sanitizedEntities = await Promise.all(
        relatedArticles.map(entity => this.sanitizeOutput(entity, ctx))
      );
      
      return {
        data: sanitizedEntities,
        meta: { limit }
      };
    } catch (error) {
      console.error('Error in findRelated:', error);
      return ctx.badRequest('Error finding related articles');
    }
  }
}));
