export default {
  routes: [
    {
      method: 'GET',
      path: '/gallery-images',
      handler: 'gallery-image.find',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/gallery-images/:id',
      handler: 'gallery-image.findOne',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/gallery-images',
      handler: 'gallery-image.create',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
