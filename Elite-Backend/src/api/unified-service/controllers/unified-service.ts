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

  async findOne(ctx: Context) {
    const idParam = ctx.params?.id;
    const locale = (ctx.query?.locale as string | undefined) || undefined;
    if (!idParam) {
      ctx.status = 400;
      ctx.body = { error: 'ID is required' };
      return;
    }

    const id = Number(idParam);
    const populate: any = { home: { populate: '*' }, pages: { populate: '*' }, localizations: { populate: '*' } };

    try {
      // 1) Fetch by ID without forcing locale first (ID is per-locale in Strapi)
      const baseEntry = await strapi.entityService.findOne('api::unified-service.unified-service' as any, id, { populate });
      if (!baseEntry) {
        ctx.status = 404;
        ctx.body = { error: 'Not Found' };
        return;
      }

      // 2) If a specific locale is requested and differs, try to fetch corresponding localized entry via documentId
      if (locale && baseEntry.locale !== locale) {
        const documentId = (baseEntry as any).documentId || (baseEntry as any)?.attributes?.documentId;
        if (documentId) {
          const localizedList = await strapi.entityService.findMany('api::unified-service.unified-service' as any, {
            filters: { documentId },
            locale,
            populate,
            limit: 1,
          });
          if (Array.isArray(localizedList) && localizedList.length > 0) {
            ctx.body = { data: localizedList[0] };
            return;
          }
        }
      }

      // 3) Fallback: return the base entry (its original locale)
      ctx.body = { data: baseEntry };
    } catch (error: any) {
      strapi.log.error('[unified-service] findOne error:', error);
      ctx.status = 500;
      ctx.body = { error: 'Failed to fetch unified service', details: error?.message };
    }
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


