'use strict';

/**
 * service controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::service.service', ({ strapi }) => ({
  // Override the default create method to add additional logic
  async create(ctx) {
    // Check if the user is authenticated and has the proper role
    if (!ctx.state.user || !ctx.state.user.roles.some(role => role.name === 'Admin')) {
      return ctx.forbidden('Only administrators can create services');
    }
    
    // Create the service entry
    const response = await super.create(ctx);
    return response;
  },

  // Override the default update method
  async update(ctx) {
    // Check if the user is authenticated and has the proper role
    if (!ctx.state.user || !ctx.state.user.roles.some(role => role.name === 'Admin')) {
      return ctx.forbidden('Only administrators can update services');
    }
    
    // Update the service entry
    const response = await super.update(ctx);
    return response;
  },

  // Override the default delete method
  async delete(ctx) {
    // Check if the user is authenticated and has the proper role
    if (!ctx.state.user || !ctx.state.user.roles.some(role => role.name === 'Admin')) {
      return ctx.forbidden('Only administrators can delete services');
    }
    
    // Delete the service entry
    const response = await super.delete(ctx);
    return response;
  },

  // Custom method to get all active services ordered by the order field
  async getActiveServices(ctx) {
    try {
      const services = await strapi.db.query('api::service.service').findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
      });
      
      return services;
    } catch (error) {
      ctx.body = error;
    }
  }
}));
