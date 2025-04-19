'use strict';

/**
 * doctor controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::doctor.doctor', ({ strapi }) => ({
  // Override the default create method to add additional logic
  async create(ctx) {
    // Check if the user is authenticated and has the proper role
    if (!ctx.state.user || !ctx.state.user.roles.some(role => role.name === 'Admin')) {
      return ctx.forbidden('Only administrators can create doctor profiles');
    }
    
    // Create the doctor profile
    const response = await super.create(ctx);
    return response;
  },

  // Override the default update method
  async update(ctx) {
    // Check if the user is authenticated and has the proper role
    if (!ctx.state.user || !ctx.state.user.roles.some(role => role.name === 'Admin')) {
      return ctx.forbidden('Only administrators can update doctor profiles');
    }
    
    // Update the doctor profile
    const response = await super.update(ctx);
    return response;
  },

  // Override the default delete method
  async delete(ctx) {
    // Check if the user is authenticated and has the proper role
    if (!ctx.state.user || !ctx.state.user.roles.some(role => role.name === 'Admin')) {
      return ctx.forbidden('Only administrators can delete doctor profiles');
    }
    
    // Delete the doctor profile
    const response = await super.delete(ctx);
    return response;
  },

  // Custom method to get all active doctors ordered by the order field
  async getActiveDoctors(ctx) {
    try {
      // Get all active doctors ordered by the order field
      const doctors = await strapi.entityService.findMany('api::doctor.doctor', {
        filters: { isActive: true },
        sort: { order: 'asc' },
        populate: ['image'],
      });

      // Format the response to include the image URL
      const formattedDoctors = doctors.map(doctor => {
        const { image, ...doctorData } = doctor;
        return {
          ...doctorData,
          imageUrl: image?.url ? strapi.config.get('server.url') + image.url : null,
        };
      });
      
      return formattedDoctors;
    } catch (error) {
      ctx.body = error;
    }
  },

  // Custom method to get featured doctors for homepage
  async getHomepageDoctors(ctx) {
    try {
      // Get only active doctors that should appear on the homepage
      const doctors = await strapi.entityService.findMany('api::doctor.doctor', {
        filters: { isActive: true },
        sort: { order: 'asc' },
        populate: ['image'],
        limit: 3, // Limit to 3 doctors for homepage
      });

      // Format the response to include the image URL
      const formattedDoctors = doctors.map(doctor => {
        const { image, ...doctorData } = doctor;
        return {
          ...doctorData,
          imageUrl: image?.url ? strapi.config.get('server.url') + image.url : null,
        };
      });
      
      return formattedDoctors;
    } catch (error) {
      ctx.body = error;
    }
  }
}));
