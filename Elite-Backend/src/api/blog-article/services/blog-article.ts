/**
 * blog-article service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::blog-article.blog-article', ({ strapi }) => ({
  /**
   * دالة خاصة لزيادة عدد مشاهدات المقالة
   */
  async incrementViewCount(articleId: number) {
    try {
      const article = await strapi.db.query('api::blog-article.blog-article').findOne({
        where: { id: articleId },
        populate: { viewCount: true }
      });
      
      // تحديث عدد المشاهدات إذا كان الحقل موجوداً
      if (article && article.viewCount !== undefined) {
        await strapi.db.query('api::blog-article.blog-article').update({
          where: { id: articleId },
          data: { viewCount: article.viewCount + 1 }
        });
      }
    } catch (error) {
      // تسجيل الخطأ ولكن لا نعيق إرجاع الاستجابة الأصلية
      console.error('خطأ في زيادة عدد المشاهدات:', error);
    }
  }
}));
