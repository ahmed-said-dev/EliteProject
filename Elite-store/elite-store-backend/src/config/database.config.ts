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
  host: process.env.DB_HOST || 'elite-store-db-do-user-24606323-0.i.db.ondigitalocean.com',
  port: parseInt(process.env.DB_PORT || '25060', 10),
  username: process.env.DB_USERNAME || 'doadmin',
  password: process.env.DB_PASSWORD || 'AVNS_Sfg3cMWF_zNOSTFufbo',
  database: process.env.DB_NAME || 'defaultdb',
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
  synchronize: true, // Auto-create tables for initial setup
  logging: process.env.NODE_ENV === 'development',
  ssl: { 
    rejectUnauthorized: false,
    ca: undefined 
  },
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  }
};