/**
 * blog-article router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::blog-article.blog-article', {
  config: {
    find: {
      middlewares: [],
    },
    findOne: {
      middlewares: [],
    }
  },
  only: ['find', 'findOne'],
});
