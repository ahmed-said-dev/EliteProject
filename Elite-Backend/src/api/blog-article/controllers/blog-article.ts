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
    
    console.log(`🔍 [Blog Articles] Finding articles for locale: ${locale}`);
    
    try {
      // استخدام db.query للحصول على النتائج مع دعم i18n
      const entities = await strapi.db.query('api::blog-article.blog-article').findMany({
        where: {
          locale: locale,
          ...(query.filters || {})
        },
        orderBy: query.sort || { publishDate: 'desc' },
        limit: query.pagination?.limit || 25,
        offset: query.pagination?.start || 0,
        populate: {
          category: true,
          tags: true,
          author: {
            populate: {
              avatar: true,
              socialLinks: true
            }
          },
          featuredImage: true
        }
      });
      
      console.log(`✅ [Blog Articles] Found ${entities.length} articles`);
      
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
      console.error('❌ [Blog Articles] Error in find:', error);
      return await super.find(ctx);
    }
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;
    const locale = query.locale || 'en';
    
    console.log(`🔍 [Blog Article] Finding article with id/slug: ${id}, locale: ${locale}`);
    
    try {
      let entity;
      
      // البحث عن مقالة باستخدام الslug أو المعرف مع دعم اللغة
      if (isNaN(parseInt(id))) {
        // بحث باستخدام الslug مع اللغة
        console.log(`🔍 [Blog Article] Searching by slug: ${id}`);
        
        const entities = await strapi.db.query('api::blog-article.blog-article').findMany({
          where: {
            slug: id,
            locale: locale
          },
          populate: {
            category: true,
            tags: true,
            author: {
              populate: {
                avatar: true,
                socialLinks: true
              }
            },
            featuredImage: true
          },
          limit: 1
        });
        
        entity = entities[0];
        console.log(`✅ [Blog Article] Found by slug:`, !!entity);
      } else {
        // بحث باستخدام المعرف مع اللغة
        console.log(`🔍 [Blog Article] Searching by ID: ${id}`);
        
        entity = await strapi.db.query('api::blog-article.blog-article').findOne({
          where: {
            id: parseInt(id),
            locale: locale
          },
          populate: {
            category: true,
            tags: true,
            author: {
              populate: {
                avatar: true,
                socialLinks: true
              }
            },
            featuredImage: true
          }
        });
        
        console.log(`✅ [Blog Article] Found by ID:`, !!entity);
      }
      
      if (!entity) {
        console.log(`❌ [Blog Article] No article found with id/slug: ${id} for locale: ${locale}`);
        return ctx.notFound(`No blog article found with id/slug: ${id}`);
      }
      
      // زيادة عدد المشاهدات
      try {
        if (entity.id) {
          await strapi.db.query('api::blog-article.blog-article').update({
            where: { id: entity.id },
            data: { viewCount: (entity.viewCount || 0) + 1 }
          });
        }
      } catch (error) {
        console.error('Error incrementing view count:', error);
      }
      
      console.log(`✅ [Blog Article] Returning article:`, entity.title);
      
      // إرجاع النتيجة
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      console.error('❌ [Blog Article] Error in findOne:', error);
      return ctx.badRequest(`Error finding blog article: ${error.message}`);
    }
  },

  async findRelated(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;
    const locale = query.locale || 'en';
    
    // الحصول على limit من الاستعلام أو استخدام القيمة الافتراضية
    const limit = query.limit ? parseInt(query.limit as string) : 3;
    
    console.log(`🔍 [Blog Related] Finding related articles for ${id}, locale: ${locale}`);
    
    try {
      // البحث عن المقالة الحالية مع دعم اللغة
      const article = await strapi.db.query('api::blog-article.blog-article').findOne({
        where: {
          id: parseInt(id),
          locale: locale
        },
        populate: {
          category: true,
          tags: true
        }
      }) as any;
      
      if (!article) {
        return ctx.notFound(`No blog article found with id: ${id}`);
      }
      
      console.log(`✅ [Blog Related] Found main article: ${article.title}`);
      
      // الحصول على معرفات التصنيفات والعلامات للمقالة الحالية
      const categoryId = article.category?.id;
      const tagIds = article.tags?.map((tag: any) => tag.id) || [];
      
      // بناء فلاتر البحث للمقالات المرتبطة
      let whereConditions: any = {
        id: { $ne: article.id },
        locale: locale
      };
      
      // إضافة شروط البحث حسب التصنيف أو العلامات
      if (categoryId || tagIds.length > 0) {
        whereConditions.$or = [];
        if (categoryId) {
          whereConditions.$or.push({ 
            category: { id: categoryId } 
          });
        }
        if (tagIds.length > 0) {
          whereConditions.$or.push({ 
            tags: { id: { $in: tagIds } } 
          });
        }
      }
      
      // البحث عن المقالات المرتبطة مع دعم اللغة
      const relatedArticles = await strapi.db.query('api::blog-article.blog-article').findMany({
        where: whereConditions,
        orderBy: { publishDate: 'desc' },
        limit: limit,
        populate: {
          category: true,
          tags: true,
          author: {
            populate: {
              avatar: true,
              socialLinks: true
            }
          },
          featuredImage: true
        }
      });
      
      console.log(`✅ [Blog Related] Found ${relatedArticles.length} related articles`);
      
      // تنظيف النتائج وإرجاعها
      const sanitizedEntities = await Promise.all(
        relatedArticles.map(entity => this.sanitizeOutput(entity, ctx))
      );
      
      return {
        data: sanitizedEntities,
        meta: { limit }
      };
    } catch (error) {
      console.error('❌ [Blog Related] Error in findRelated:', error);
      return ctx.badRequest(`Error finding related articles: ${error.message}`);
    }
  }
}));
