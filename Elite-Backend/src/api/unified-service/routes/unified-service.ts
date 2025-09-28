export default {
  routes: [
    {
      method: 'GET',
      path: '/unified-services',
      handler: 'unified-service.find',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/unified-services/:id',
      handler: 'unified-service.findOne',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/unified-services',
      handler: 'unified-service.create',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};


