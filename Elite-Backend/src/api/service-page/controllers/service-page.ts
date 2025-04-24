/**
 * service-page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::service-page.service-page', ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;
    
    try {
      // استخدام findOne بشكل صريح بدلاً من الاعتماد على السلوك الافتراضي
      const entity = await strapi.entityService.findOne(
        'api::service-page.service-page',
        id,
        {
          populate: ctx.query.populate,
        }
      );
      
      if (!entity) {
        return ctx.notFound('لم يتم العثور على الخدمة المطلوبة');
      }
      
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      strapi.log.error(error);
      return ctx.badRequest('حدث خطأ أثناء استرداد الخدمة', { error: error.message });
    }
  }
}));
