/**
 * gallery-image controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::gallery-image.gallery-image', ({ strapi }) => ({
  async find(ctx) {
    const locale = (ctx.query?.locale as string | undefined) || undefined;
    const opts: any = {
      populate: { image: true },
      sort: { order: 'asc' },
      filters: { isActive: true },
    };
    if (locale) opts.locale = locale;

    const entries = await strapi.entityService.findMany('api::gallery-image.gallery-image' as any, opts);
    ctx.body = { data: entries };
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const locale = (ctx.query?.locale as string | undefined) || undefined;
    const opts: any = {
      populate: { image: true },
    };
    if (locale) opts.locale = locale;

    const entry = await strapi.entityService.findOne('api::gallery-image.gallery-image' as any, id, opts);
    ctx.body = { data: entry };
  },

  async create(ctx) {
    try {
      const { data } = ctx.request.body;
      const entry = await strapi.entityService.create('api::gallery-image.gallery-image' as any, {
        data: {
          ...data,
          publishedAt: new Date(),
        },
      });
      ctx.body = { data: entry };
    } catch (error: any) {
      strapi.log.error('[gallery-image] create error:', error);
      ctx.status = 500;
      ctx.body = { error: 'Failed to create gallery image', details: error?.message };
    }
  },
}));
