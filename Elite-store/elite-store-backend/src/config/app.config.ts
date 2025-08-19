export const appConfig = () => ({
  port: parseInt(process.env.PORT || '3001', 10),
  database: {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'your_postgres_password',
    database: process.env.DB_NAME || 'elite_store',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_here',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    user: process.env.EMAIL_USER || '',
    password: process.env.EMAIL_PASSWORD || '',
  },
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    secretKey: process.env.STRIPE_SECRET_KEY || '',
  },
  upload: {
    destination: process.env.UPLOAD_DESTINATION || './uploads',
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10), // 5MB
  },
  cors: {
    origin: process.env.CORS_ORIGIN || [
      'http://localhost:3000', 
      'http://localhost:3001', 
      'http://localhost:5173', // Vite default port
      'http://localhost:4173'  // Vite preview port
    ],
    credentials: true,
  },
  graphql: {
    autoSchemaFile: true,
    sortSchema: true,
    playground: process.env.NODE_ENV !== 'production',
    introspection: process.env.NODE_ENV !== 'production',
  },
});

export type AppConfig = ReturnType<typeof appConfig>;
 