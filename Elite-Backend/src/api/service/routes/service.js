'use strict';

/**
 * service router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::service.service', {
  config: {
    find: {
      auth: false, // Allow public access to view services
    },
    findOne: {
      auth: false, // Allow public access to view a single service
    },
    create: {
      auth: true, // Require authentication for creating services
    },
    update: {
      auth: true, // Require authentication for updating services
    },
    delete: {
      auth: true, // Require authentication for deleting services
    },
  }
});
