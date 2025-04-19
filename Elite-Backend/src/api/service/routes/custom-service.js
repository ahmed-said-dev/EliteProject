'use strict';

/**
 * Custom service routes with additional endpoint for active services
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/active-services',
      handler: 'service.getActiveServices',
      config: {
        auth: false // Allow public access to active services
      }
    },
    // Admin-only routes with explicit policy checks
    {
      method: 'POST',
      path: '/services',
      handler: 'service.create',
      config: {
        auth: true,
        policies: ['api::service.isAdmin'],
      }
    },
    {
      method: 'PUT',
      path: '/services/:id',
      handler: 'service.update',
      config: {
        auth: true,
        policies: ['api::service.isAdmin'],
      }
    },
    {
      method: 'DELETE',
      path: '/services/:id',
      handler: 'service.delete',
      config: {
        auth: true,
        policies: ['api::service.isAdmin'],
      }
    }
  ]
};
