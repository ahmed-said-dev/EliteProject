export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'https://elitevetksa.com',
        'http://elitevetksa.com',
        'https://www.elitevetksa.com',
        'http://www.elitevetksa.com',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
      ],
      headers: '*',
      methods: ['GET','POST','PUT','PATCH','DELETE','HEAD','OPTIONS'],
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
