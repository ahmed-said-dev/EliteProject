import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { Cart } from '../cart/entities/cart.entity';
import { CartItem } from '../cart/entities/cart-item.entity';
import { ProductImage } from '../products/entities/product-image.entity';
import { Review } from '../products/entities/review.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'your_postgres_password',
  database: process.env.DB_NAME || 'elite_store',
  entities: [
    User,
    Product,
    Category,
    Order,
    OrderItem,
    Cart,
    CartItem,
    ProductImage,
    Review,
  ],
  synchronize: true, // في الإنتاج يجب تعطيل هذا واستخدام migrations
  logging: process.env.NODE_ENV === 'development',
  ssl: process.env.DATABASE_SSL === 'true' ? { 
    rejectUnauthorized: false,
    ca: undefined
  } : false,
  extra: process.env.DATABASE_SSL === 'true' ? {
    ssl: { rejectUnauthorized: false }
  } : {},
};