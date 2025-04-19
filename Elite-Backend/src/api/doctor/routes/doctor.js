'use strict';

/**
 * doctor router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::doctor.doctor', {
  config: {
    find: {
      auth: false, // Allow public access to view doctors
    },
    findOne: {
      auth: false, // Allow public access to view a single doctor
    },
    create: {
      auth: true, // Require authentication for creating doctors
    },
    update: {
      auth: true, // Require authentication for updating doctors
    },
    delete: {
      auth: true, // Require authentication for deleting doctors
    },
  }
});
