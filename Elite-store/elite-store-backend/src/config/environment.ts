export const environment = {
  production: process.env.NODE_ENV === 'production',
  port: parseInt(process.env.PORT || '3001', 10),
  database: {
    type: 'postgres' as const,
    host: process.env.DB_HOST || 'elite-store-db-do-user-24606323-0.i.db.ondigitalocean.com',
    port: parseInt(process.env.DB_PORT || '25060', 10),
    username: process.env.DB_USERNAME || 'doadmin',
    password: process.env.DB_PASSWORD || 'AVNS_Sfg3cMWF_zNOSTFufbo',
    database: process.env.DB_NAME || 'defaultdb',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_super_secure_jwt_secret_key_here_2024',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    password: process.env.EMAIL_PASSWORD || 'your-app-password',
  },
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_your_stripe_publishable_key',
    secretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_your_stripe_secret_key',
  },
  upload: {
    destination: process.env.UPLOAD_DESTINATION || './uploads',
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10), // 10MB
  },
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:3001', 
      'http://localhost:5173',
      'http://134.122.102.182',
      'http://134.122.102.182:5173',
      'http://134.122.102.182:3000',
      'http://134.122.102.182:3001'
    ],
    credentials: true,
  },
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@elitestore.com',
    password: process.env.ADMIN_PASSWORD || 'Admin123!@#',
  },
};
 