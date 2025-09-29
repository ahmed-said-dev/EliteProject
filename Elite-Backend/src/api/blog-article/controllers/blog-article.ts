/**
 * blog-article controller
 */

import { factories } from '@strapi/strapi';

// إعداد المصفوفة الافتراضية للpopulate - مبسطة لتجنب الأخطاء
const defaultPopulate = {
  category: true,
  tags: true,
  author: true,
  featuredImage: true
} as any;

export default factories.createCoreController('api::blog-article.blog-article', ({ strapi }) => ({
  async find(ctx) {
    console.log(`\n🔍 Custom Find Controller Called!`);
    console.log(`Query:`, ctx.query);
    return await super.find(ctx);
  },

  async findOne(ctx) {
    console.log(`\n🔍 Custom FindOne Controller Called!`);
    console.log(`ID: ${ctx.params.id}`);
    console.log(`URL: ${ctx.request.url}`);
    
    // جرب الـ default controller أولاً
    try {
      const result = await super.findOne(ctx);
      console.log(`✅ Super FindOne Success:`, result?.data?.title || 'No title');
      return result;
    } catch (error) {
      console.log(`❌ Super FindOne Failed:`, error.message);
      throw error;
    }
  }
}));
