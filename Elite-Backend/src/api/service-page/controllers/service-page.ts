/**
 * service-page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::service-page.service-page', ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;
    const { locale, populate } = ctx.query;
    
    console.log(`🔍 [Service Controller] Finding service with ID: ${id}, locale: ${locale || 'ar'}`);
    
    try {
      // تحديد اللغة المطلوبة (العربية كافتراضي)
      const targetLocale = locale || 'ar';
      
      // إعداد خيارات البحث
      const findOptions = {
        populate: populate || '*',
        locale: targetLocale,
      };
      
      console.log(`🔍 [Service Controller] Search options:`, findOptions);
      
      // البحث الأساسي بالـ ID واللغة المحددة
      let entity = await strapi.entityService.findOne(
        'api::service-page.service-page',
        id,
        findOptions
      );
      
      // إذا لم نجد النتيجة باللغة المطلوبة، نبحث في جميع اللغات
      if (!entity) {
        console.log(`⚠️ [Service Controller] Service not found with locale ${targetLocale}, searching in all locales...`);
        
        // البحث في جميع اللغات
        const allLocaleOptions = {
          ...findOptions,
          locale: 'all'
        };
        
        entity = await strapi.entityService.findOne(
          'api::service-page.service-page',
          id,
          allLocaleOptions
        );
        
        if (entity) {
          console.log(`✅ [Service Controller] Found service in locale: ${entity.locale}`);
        }
      }
      
      // إذا لم نجد الخدمة بعد، نحاول البحث باستخدام findMany مع فلتر
      if (!entity) {
        console.log(`⚠️ [Service Controller] Trying findMany approach...`);
        
        const entities = await strapi.entityService.findMany(
          'api::service-page.service-page',
          {
            filters: { id: parseInt(id) },
            populate: populate || '*',
            locale: 'all',
          }
        );
        
        if (entities && entities.length > 0) {
          // البحث عن النسخة باللغة المطلوبة أولاً
          entity = entities.find(e => e.locale === targetLocale) || entities[0];
          console.log(`✅ [Service Controller] Found service via findMany in locale: ${entity.locale}`);
        }
      }
      
      if (!entity) {
        console.log(`❌ [Service Controller] Service not found with ID: ${id}`);
        return ctx.notFound({
          error: {
            status: 404,
            name: 'NotFoundError',
            message: 'لم يتم العثور على الخدمة المطلوبة',
            details: {
              id: id,
              locale: targetLocale
            }
          }
        });
      }
      
      console.log(`✅ [Service Controller] Successfully found service: ${entity.title} (locale: ${entity.locale})`);
      
      // تنظيف البيانات وإرجاعها
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
      
    } catch (error) {
      console.error(`❌ [Service Controller] Error finding service:`, error);
      strapi.log.error(error);
      return ctx.badRequest({
        error: {
          status: 400,
          name: 'BadRequestError',
          message: 'حدث خطأ أثناء استرداد الخدمة',
          details: {
            originalError: error.message,
            id: id,
            locale: locale
          }
        }
      });
    }
  },

  async find(ctx) {
    const { locale } = ctx.query;
    console.log(`🔍 [Service Controller] Finding services with locale: ${locale || 'ar'}`);
    
    try {
      // استدعاء الدالة الأساسية مع ضمان وجود locale
      if (!ctx.query.locale) {
        ctx.query.locale = 'ar'; // تعيين العربية كافتراضي
      }
      
      const { data, meta } = await super.find(ctx);
      
      console.log(`✅ [Service Controller] Found ${data?.length || 0} services`);
      return { data, meta };
    } catch (error) {
      console.error(`❌ [Service Controller] Error finding services:`, error);
      strapi.log.error(error);
      return ctx.badRequest({
        error: {
          status: 400,
          name: 'BadRequestError',
          message: 'حدث خطأ أثناء استرداد الخدمات',
          details: {
            originalError: error.message,
            locale: locale
          }
        }
      });
    }
  }
}));
