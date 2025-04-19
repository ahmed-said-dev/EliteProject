'use strict';

/**
 * Custom doctor routes with additional endpoints
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/active-doctors',
      handler: 'doctor.getActiveDoctors',
      config: {
        auth: false // Allow public access to active doctors
      }
    },
    {
      method: 'GET',
      path: '/homepage-doctors',
      handler: 'doctor.getHomepageDoctors',
      config: {
        auth: false // Allow public access to homepage doctors
      }
    },
    // Admin-only routes with explicit policy checks
    {
      method: 'POST',
      path: '/doctors',
      handler: 'doctor.create',
      config: {
        auth: true,
        policies: ['api::doctor.isAdmin'],
      }
    },
    {
      method: 'PUT',
      path: '/doctors/:id',
      handler: 'doctor.update',
      config: {
        auth: true,
        policies: ['api::doctor.isAdmin'],
      }
    },
    {
      method: 'DELETE',
      path: '/doctors/:id',
      handler: 'doctor.delete',
      config: {
        auth: true,
        policies: ['api::doctor.isAdmin'],
      }
    }
  ]
};
