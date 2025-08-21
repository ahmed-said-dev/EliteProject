import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // CORS (moved before helmet for better compatibility)
  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173',
        'http://localhost:4173',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:3001',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:4173',
        'http://134.122.102.182:3000',
        'http://134.122.102.182:5173',
        'http://134.122.102.182',
      ];
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // In development, allow all origins
        if (process.env.NODE_ENV !== 'production') {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'Accept', 
      'Origin', 
      'X-Requested-With',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Methods'
    ],
    exposedHeaders: ['Set-Cookie'],
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
    preflightContinue: false,
  });

  // Security (moved after CORS)
  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    // Disable COOP and Origin-Agent-Cluster on HTTP to avoid browser warnings
    crossOriginOpenerPolicy: false,
    originAgentCluster: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
        scriptSrc: [`'self'`, `'unsafe-inline'`, 'https:'],
        manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
        frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        connectSrc: [`'self'`, 'http://localhost:*', 'ws://localhost:*'],
      },
    },
  }));

  // Compression
  app.use(compression());

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('Elite Store API')
    .setDescription('Complete E-commerce API for Elite Store')
    .setVersion('1.0')
    .addTag('Authentication', 'User authentication and authorization')
    .addTag('Users', 'User management')
    .addTag('Products', 'Product management')
    .addTag('Categories', 'Category management')
    .addTag('Orders', 'Order management')
    .addTag('Cart', 'Shopping cart management')
    .addTag('Payments', 'Payment processing')
    .addTag('Admin', 'Admin dashboard and management')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  // Global prefix
  app.setGlobalPrefix('api');

  const port = configService.get<number>('port') || 3001;
  
  await app.listen(port);
  
  console.log(`🚀 Elite Store API is running on: http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
  console.log(`🎯 GraphQL Playground: http://localhost:${port}/graphql`);
}

bootstrap();
