/**
 * blog-article controller
 */

import { factories } from '@strapi/strapi';

// إعداد المصفوفة الافتراضية للpopulate
const defaultPopulate = {
  category: true,
  tags: true,
  author: {
    populate: {
      avatar: true,
      socialLinks: true
    }
  },
  featuredImage: true
} as any;

export default factories.createCoreController('api::blog-article.blog-article', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    
    // استخراج اللغة من الاستعلام
    const locale = query.locale || 'en';
    
    // إضافة معاملات populate الافتراضية إذا لم تكن موجودة
    if (!query.populate) {
      query.populate = defaultPopulate;
    }
    
    // إضافة اللغة إلى الاستعلام
    query.locale = locale;
    
    try {
      // استخدام entityService للحصول على النتائج مع دعم i18n
      const entities = await strapi.entityService.findMany('api::blog-article.blog-article', {
        filters: query.filters || {},
        sort: query.sort || { publishDate: 'desc' },
        pagination: query.pagination || {},
        locale: locale,
        populate: query.populate || defaultPopulate
      });
      
      // تنظيف النتائج وإرجاعها
      const sanitizedEntities = await Promise.all(
        entities.map(entity => this.sanitizeOutput(entity, ctx))
      );
      
      return {
        data: sanitizedEntities,
        meta: {
          pagination: query.pagination || {},
          locale: locale
        }
      };
    } catch (error) {
      console.error('Error in find with locale:', error);
      return await super.find(ctx);
    }
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;
    const locale = query.locale || 'en';
    
    try {
      let entity;
      
      // البحث عن مقالة باستخدام الslug أو المعرف مع دعم اللغة
      if (isNaN(parseInt(id))) {
        // بحث باستخدام الslug مع اللغة
        const entities = await strapi.entityService.findMany('api::blog-article.blog-article', {
          filters: { slug: id },
          populate: defaultPopulate,
          locale: locale,
          limit: 1
        });
        entity = entities[0]; // أخذ أول نتيجة
      } else {
        // بحث باستخدام المعرف مع اللغة
        entity = await strapi.entityService.findOne('api::blog-article.blog-article', parseInt(id), {
          populate: defaultPopulate,
          locale: locale
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
    const locale = query.locale || 'en';
    
    // الحصول على limit من الاستعلام أو استخدام القيمة الافتراضية
    const limit = query.limit ? parseInt(query.limit as string) : 3;
    
    try {
      // البحث عن المقالة الحالية مع دعم اللغة
      const article = await strapi.entityService.findOne('api::blog-article.blog-article', id, {
        populate: {
          category: true,
          tags: true
        },
        locale: locale
      }) as any;
      
      if (!article) {
        return ctx.notFound(`No blog article found with id: ${id}`);
      }
      
      // الحصول على معرفات التصنيفات والعلامات للمقالة الحالية
      const categoryId = article.category?.id;
      const tagIds = article.tags?.map((tag: any) => tag.id) || [];
      
      // بناء فلاتر البحث للمقالات المرتبطة
      const filters: any = {
        id: { $ne: article.id }
      };
      
      // إضافة شروط البحث حسب التصنيف أو العلامات
      if (categoryId || tagIds.length > 0) {
        filters.$or = [];
        if (categoryId) {
          filters.$or.push({ category: { id: categoryId } });
        }
        if (tagIds.length > 0) {
          filters.$or.push({ tags: { id: { $in: tagIds } } });
        }
      }
      
      // البحث عن المقالات المرتبطة مع دعم اللغة
      const relatedArticles = await strapi.entityService.findMany('api::blog-article.blog-article', {
        filters: filters,
        sort: { publishDate: 'desc' },
        populate: defaultPopulate,
        locale: locale,
        limit: limit
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
