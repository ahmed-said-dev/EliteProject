/**
 * team-member controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::team-member.team-member', ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;
    
    try {
      // استخدام findOne بشكل صريح بدلاً من الاعتماد على السلوك الافتراضي
      const entity = await strapi.entityService.findOne(
        'api::team-member.team-member',
        id,
        {
          populate: ctx.query.populate,
        }
      );
      
      if (!entity) {
        return ctx.notFound('لم يتم العثور على عضو الفريق المطلوب');
      }
      
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      strapi.log.error(error);
      return ctx.badRequest('حدث خطأ أثناء استرداد بيانات عضو الفريق', { error: error.message });
    }
  }
}));
