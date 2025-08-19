export const environment = {
  production: false,
  port: 3001,
  database: {
    type: 'sqlite' as const,
    database: 'elite-store.db',
  },
  jwt: {
    secret: 'elite-store-secret-key-123456-change-in-production',
    expiresIn: '7d',
  },
  email: {
    host: 'smtp.gmail.com',
    port: 587,
    user: 'your-email@gmail.com',
    password: 'your-app-password',
  },
  stripe: {
    publishableKey: 'pk_test_your_stripe_publishable_key',
    secretKey: 'sk_test_your_stripe_secret_key',
  },
  upload: {
    destination: './uploads',
    maxFileSize: 5 * 1024 * 1024, // 5MB
  },
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  },
  admin: {
    email: 'admin@elitestore.com',
    password: 'admin123456',
  },
};
 