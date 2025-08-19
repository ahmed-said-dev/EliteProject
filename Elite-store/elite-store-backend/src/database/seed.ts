import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { User, UserRole, UserStatus } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Product, ProductStatus } from '../products/entities/product.entity';
import * as bcrypt from 'bcryptjs';
import { Repository, DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    console.log('🌱 Starting database seeding...');

    // Get repositories
    const userRepository = app.get<Repository<User>>(getRepositoryToken(User));
    const categoryRepository = app.get<Repository<Category>>(getRepositoryToken(Category));
    const productRepository = app.get<Repository<Product>>(getRepositoryToken(Product));
    
    // Get DataSource for direct SQL execution
    const dataSource = app.get(DataSource);

    // Clear existing data using TRUNCATE CASCADE
    console.log('🧹 Clearing existing data...');
    await dataSource.query(`
      TRUNCATE TABLE 
        "order_items", 
        "cart_items", 
        "product_images", 
        "orders", 
        "carts", 
        "products", 
        "categories", 
        "users" 
      RESTART IDENTITY CASCADE;
    `);

    // Seed Admin User
    console.log('👤 Creating admin user...');
    const adminUser = new User();
    adminUser.email = 'admin@elitestore.com';
    // Set plain password; it will be hashed by the User entity @BeforeInsert hook
    adminUser.password = 'admin123456';
    adminUser.firstName = 'Elite';
    adminUser.lastName = 'Admin';
    adminUser.role = UserRole.ADMIN;
    adminUser.status = UserStatus.ACTIVE;
    adminUser.emailVerified = true;
    adminUser.phone = '+1234567890';
    adminUser.address = '123 Admin Street';
    adminUser.city = 'Admin City';
    adminUser.country = 'Admin Country';
    await userRepository.save(adminUser);
    console.log('✅ Admin user created successfully!');

    // Seed Categories
    console.log('📁 Creating categories...');
    const categories = [
      { name: 'Electronics', slug: 'electronics', description: 'Electronic devices and gadgets', isActive: true, sortOrder: 1 },
      { name: 'Computers & Laptops', slug: 'computers-laptops', description: 'Computers, laptops, and accessories', isActive: true, sortOrder: 2 },
      { name: 'Smartphones', slug: 'smartphones', description: 'Mobile phones and accessories', isActive: true, sortOrder: 3 },
      { name: 'Home & Garden', slug: 'home-garden', description: 'Home and garden products', isActive: true, sortOrder: 4 },
      { name: 'Fashion', slug: 'fashion', description: 'Clothing and fashion accessories', isActive: true, sortOrder: 5 },
    ];

    console.log('💾 Saving categories to database...');
    const savedCategories: Category[] = [];
    for (const categoryData of categories) {
      const category = new Category();
      Object.assign(category, categoryData);
      const savedCategory = await categoryRepository.save(category);
      savedCategories.push(savedCategory);
    }
    console.log(`✅ Created ${savedCategories.length} categories`);

    // Seed Products
    console.log('📦 Creating products...');
    const products = [
      {
        name: 'iPhone 15 Pro',
        slug: 'iphone-15-pro',
        description: 'Latest iPhone with advanced features and powerful performance',
        shortDescription: 'Premium smartphone with cutting-edge technology',
        sku: 'IPHONE15PRO',
        price: 999.99,
        salePrice: 899.99,
        stockQuantity: 50,
        status: ProductStatus.ACTIVE,
        featured: true,
        published: true,
        weight: 0.2,
        dimensions: '6.1 x 2.8 x 0.3 inches',
        tags: ['smartphone', 'apple', 'iphone', 'mobile'],
        metaTitle: 'iPhone 15 Pro - Premium Smartphone',
        metaDescription: 'Get the latest iPhone 15 Pro with advanced features',
        viewsCount: 1250,
        salesCount: 45,
      },
      // ... باقي المنتجات كما هو ...
    ];

    console.log('💾 Saving products to database...');
    const savedProducts: Product[] = [];
    for (const productData of products) {
      const product = new Product();
      Object.assign(product, productData);
      
      // Assign category (first category for simplicity)
      if (savedCategories.length > 0) {
        product.category = savedCategories[0];
        product.categoryId = savedCategories[0].id;
      }
      
      const savedProduct = await productRepository.save(product);
      savedProducts.push(savedProduct);
    }
    console.log(`✅ Created ${savedProducts.length} products`);
    
    console.log('✅ Database seeding completed successfully!');
    console.log('📊 Created:');
    console.log(`   - 1 Admin user (admin@elitestore.com / admin123456)`);
    console.log(`   - ${savedCategories.length} Categories`);
    console.log(`   - ${savedProducts.length} Products`);
    console.log('');
    console.log('🔗 You can now:');
    console.log('   - Login as admin: admin@elitestore.com / admin123456');
    console.log('   - Access API docs: http://localhost:3001/api/docs');
    console.log('   - Access GraphQL: http://localhost:3001/graphql');
    
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    await app.close();
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seed();
}

export { seed };
 