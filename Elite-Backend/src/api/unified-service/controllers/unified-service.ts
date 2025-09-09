/**
 * unified-service controller (custom aggregator)
 */

import type { Context } from 'koa';

// Use core controller to expose CRUD on unified-service itself
export default {
  async find(ctx: Context) {
    // Delegate to Strapi's core to return unified-service entries
    // with components (home/pages) so the user manages fields in one place
    const locale = (ctx.query?.locale as string | undefined) || undefined;
    const opts: any = {
      populate: { home: { populate: '*' }, pages: { populate: '*' } },
      sort: { id: 'asc' },
    };
    if (locale) opts.locale = locale;
    const entries = await strapi.entityService.findMany('api::unified-service.unified-service' as any, opts);
    ctx.body = { data: entries };
  },

  async create(ctx: Context) {
    try {
      const { data } = ctx.request.body;
      const entry = await strapi.entityService.create('api::unified-service.unified-service' as any, {
        data: {
          ...data,
          publishedAt: new Date(),
        },
      });
      ctx.body = { data: entry };
    } catch (error: any) {
      strapi.log.error('[unified-service] create error:', error);
      ctx.status = 500;
      ctx.body = { error: 'Failed to create unified service', details: error?.message };
    }
  },
};


