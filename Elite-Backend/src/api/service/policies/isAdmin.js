'use strict';

/**
 * `isAdmin` policy
 * Checks if the current user has the Admin role
 */

module.exports = async (ctx, config, { strapi }) => {
  try {
    // If there is no user or roles, deny access immediately
    if (!ctx.state.user || !ctx.state.user.roles) {
      return false;
    }

    // Check if the user has the Admin role
    const isAdmin = ctx.state.user.roles.some(
      role => role.name === 'Admin' || role.code === 'admin'
    );
    
    if (!isAdmin) {
      return false;
    }

    // If the user has the admin role, allow access
    return true;
  } catch (err) {
    strapi.log.error('Error in isAdmin policy:', err);
    return false;
  }
};
