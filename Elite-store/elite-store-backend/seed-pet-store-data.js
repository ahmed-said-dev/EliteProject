#!/usr/bin/env node

// Pet Store Data Seeder for Elite Store Backend
const bcrypt = require('bcrypt');
const { Client } = require('pg');

console.log('🐾 Elite Store - Pet Store Data Seeder');
console.log('=====================================\n');

// Database configuration
const dbConfig = {
  host: 'elite-store-db-do-user-24606323-0.i.db.ondigitalocean.com',
  port: 25060,
  user: 'doadmin',
  password: 'AVNS_Sfg3cMWF_zNOSTFufbo',
  database: 'defaultdb',
  ssl: {
    rejectUnauthorized: false
  }
};

// Categories data
const categoriesData = [
  {
    name: 'Dog Food',
    slug: 'dog-food',
    description: 'Premium quality dog food for all breeds and ages',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'Cat Food',
    slug: 'cat-food',
    description: 'Nutritious cat food for healthy and happy cats',
    isActive: true,
    sortOrder: 2
  },
  {
    name: 'Pet Toys',
    slug: 'pet-toys',
    description: 'Fun and interactive toys for dogs and cats',
    isActive: true,
    sortOrder: 3
  },
  {
    name: 'Pet Medications',
    slug: 'pet-medications',
    description: 'Essential medications and health supplements for pets',
    isActive: true,
    sortOrder: 4
  },
  {
    name: 'Pet Accessories',
    slug: 'pet-accessories',
    description: 'Collars, leashes, beds, and other pet accessories',
    isActive: true,
    sortOrder: 5
  },
  {
    name: 'Pet Grooming',
    slug: 'pet-grooming',
    description: 'Grooming supplies and hygiene products for pets',
    isActive: true,
    sortOrder: 6
  },
  {
    name: 'Bird Care',
    slug: 'bird-care',
    description: 'Food, toys, and care products for birds',
    isActive: true,
    sortOrder: 7
  },
  {
    name: 'Fish & Aquarium',
    slug: 'fish-aquarium',
    description: 'Aquarium supplies and fish care products',
    isActive: true,
    sortOrder: 8
  }
];

// Products data
const productsData = [
  // Dog Food Products
  {
    name: 'Royal Canin Adult Dog Food',
    slug: 'royal-canin-adult-dog-food',
    description: 'Complete and balanced nutrition for adult dogs aged 1-8 years. Made with high-quality proteins and essential nutrients.',
    shortDescription: 'Premium adult dog food with balanced nutrition',
    sku: 'RC-DOG-001',
    price: 45.99,
    salePrice: 39.99,
    stockQuantity: 150,
    status: 'active',
    featured: true,
    weight: 15.0,
    tags: ['premium', 'adult', 'balanced nutrition'],
    categorySlug: 'dog-food'
  },
  {
    name: 'Pedigree Puppy Dry Food',
    slug: 'pedigree-puppy-dry-food',
    description: 'Specially formulated dry food for puppies up to 12 months. Contains DHA for brain development and calcium for strong bones.',
    shortDescription: 'Complete nutrition for growing puppies',
    sku: 'PED-PUP-001',
    price: 28.50,
    stockQuantity: 200,
    status: 'active',
    featured: true,
    weight: 10.0,
    tags: ['puppy', 'growth', 'brain development'],
    categorySlug: 'dog-food'
  },
  
  // Cat Food Products
  {
    name: 'Whiskas Adult Cat Food',
    slug: 'whiskas-adult-cat-food',
    description: 'Delicious and nutritious wet food for adult cats. Made with real chicken and vegetables for complete nutrition.',
    shortDescription: 'Tasty wet food with real chicken',
    sku: 'WHI-CAT-001',
    price: 18.75,
    salePrice: 15.99,
    stockQuantity: 300,
    status: 'active',
    featured: true,
    weight: 2.5,
    tags: ['adult cat', 'wet food', 'chicken'],
    categorySlug: 'cat-food'
  },
  {
    name: 'Royal Canin Kitten Food',
    slug: 'royal-canin-kitten-food',
    description: 'Specialized nutrition for kittens up to 12 months. Supports healthy growth and immune system development.',
    shortDescription: 'Premium kitten food for healthy growth',
    sku: 'RC-KIT-001',
    price: 35.00,
    stockQuantity: 120,
    status: 'active',
    featured: false,
    weight: 4.0,
    tags: ['kitten', 'growth', 'immune support'],
    categorySlug: 'cat-food'
  },
  
  // Pet Toys
  {
    name: 'Kong Classic Dog Toy',
    slug: 'kong-classic-dog-toy',
    description: 'Durable rubber toy perfect for stuffing with treats. Helps reduce boredom and promotes healthy chewing.',
    shortDescription: 'Durable rubber toy for active dogs',
    sku: 'KONG-001',
    price: 12.99,
    stockQuantity: 75,
    status: 'active',
    featured: true,
    weight: 0.5,
    tags: ['durable', 'interactive', 'chew toy'],
    categorySlug: 'pet-toys'
  },
  {
    name: 'Feather Wand Cat Toy',
    slug: 'feather-wand-cat-toy',
    description: 'Interactive feather wand toy that stimulates your cats natural hunting instincts. Great for exercise and bonding.',
    shortDescription: 'Interactive feather toy for cats',
    sku: 'FWT-001',
    price: 8.50,
    stockQuantity: 100,
    status: 'active',
    featured: false,
    weight: 0.2,
    tags: ['interactive', 'exercise', 'hunting'],
    categorySlug: 'pet-toys'
  },
  
  // Pet Medications
  {
    name: 'Flea & Tick Prevention Collar',
    slug: 'flea-tick-prevention-collar',
    description: 'Long-lasting flea and tick prevention collar for dogs. Provides 8 months of continuous protection.',
    shortDescription: '8-month flea and tick protection',
    sku: 'FTP-COL-001',
    price: 24.99,
    salePrice: 19.99,
    stockQuantity: 80,
    status: 'active',
    featured: true,
    weight: 0.1,
    tags: ['flea prevention', 'tick prevention', 'protection'],
    categorySlug: 'pet-medications'
  },
  {
    name: 'Joint Support Supplements',
    slug: 'joint-support-supplements',
    description: 'Glucosamine and chondroitin supplements for dogs with joint issues. Helps maintain mobility and comfort.',
    shortDescription: 'Joint health supplements for dogs',
    sku: 'JSS-001',
    price: 32.50,
    stockQuantity: 60,
    status: 'active',
    featured: false,
    weight: 0.3,
    tags: ['joint health', 'supplements', 'mobility'],
    categorySlug: 'pet-medications'
  },
  
  // Pet Accessories
  {
    name: 'Adjustable Dog Collar',
    slug: 'adjustable-dog-collar',
    description: 'Comfortable and durable nylon collar with quick-release buckle. Available in multiple colors and sizes.',
    shortDescription: 'Comfortable nylon collar with quick-release',
    sku: 'ADC-001',
    price: 15.99,
    stockQuantity: 200,
    status: 'active',
    featured: false,
    weight: 0.2,
    tags: ['collar', 'adjustable', 'comfortable'],
    categorySlug: 'pet-accessories'
  },
  {
    name: 'Retractable Dog Leash',
    slug: 'retractable-dog-leash',
    description: 'Heavy-duty retractable leash with 16ft cord. Features comfortable grip handle and one-touch brake system.',
    shortDescription: '16ft retractable leash with brake system',
    sku: 'RDL-001',
    price: 22.75,
    stockQuantity: 90,
    status: 'active',
    featured: true,
    weight: 0.8,
    tags: ['leash', 'retractable', 'heavy-duty'],
    categorySlug: 'pet-accessories'
  },
  
  // Pet Grooming
  {
    name: 'Pet Shampoo & Conditioner',
    slug: 'pet-shampoo-conditioner',
    description: 'Gentle, tearless shampoo and conditioner for dogs and cats. Made with natural ingredients for healthy coat.',
    shortDescription: 'Gentle shampoo with natural ingredients',
    sku: 'PSC-001',
    price: 16.50,
    stockQuantity: 120,
    status: 'active',
    featured: false,
    weight: 1.0,
    tags: ['shampoo', 'conditioner', 'natural'],
    categorySlug: 'pet-grooming'
  },
  {
    name: 'Professional Nail Clippers',
    slug: 'professional-nail-clippers',
    description: 'Sharp, stainless steel nail clippers with safety guard. Ergonomic design for comfortable grooming.',
    shortDescription: 'Sharp stainless steel nail clippers',
    sku: 'PNC-001',
    price: 9.99,
    stockQuantity: 150,
    status: 'active',
    featured: false,
    weight: 0.3,
    tags: ['nail clippers', 'grooming', 'stainless steel'],
    categorySlug: 'pet-grooming'
  },
  
  // Bird Care
  {
    name: 'Premium Bird Seed Mix',
    slug: 'premium-bird-seed-mix',
    description: 'Nutritious seed mix for parakeets, canaries, and other small birds. Contains vitamins and minerals.',
    shortDescription: 'Nutritious seed mix for small birds',
    sku: 'PBS-001',
    price: 12.25,
    stockQuantity: 80,
    status: 'active',
    featured: false,
    weight: 2.0,
    tags: ['bird food', 'seed mix', 'vitamins'],
    categorySlug: 'bird-care'
  },
  
  // Fish & Aquarium
  {
    name: 'Aquarium Filter System',
    slug: 'aquarium-filter-system',
    description: 'Multi-stage filtration system for 20-50 gallon aquariums. Includes biological, mechanical, and chemical filtration.',
    shortDescription: 'Multi-stage filter for medium aquariums',
    sku: 'AFS-001',
    price: 55.00,
    salePrice: 45.00,
    stockQuantity: 40,
    status: 'active',
    featured: true,
    weight: 3.5,
    tags: ['aquarium', 'filter', 'multi-stage'],
    categorySlug: 'fish-aquarium'
  }
];

// Additional users data
const usersData = [
  {
    email: 'john.doe@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1-555-0123',
    address: '123 Main Street',
    city: 'New York',
    country: 'USA',
    role: 'user'
  },
  {
    email: 'jane.smith@example.com',
    password: 'password123',
    firstName: 'Jane',
    lastName: 'Smith',
    phone: '+1-555-0456',
    address: '456 Oak Avenue',
    city: 'Los Angeles',
    country: 'USA',
    role: 'user'
  },
  {
    email: 'mike.johnson@example.com',
    password: 'password123',
    firstName: 'Mike',
    lastName: 'Johnson',
    phone: '+1-555-0789',
    address: '789 Pine Road',
    city: 'Chicago',
    country: 'USA',
    role: 'user'
  }
];

// Helper function to generate UUID
function generateUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Seeding functions
async function seedCategories(client) {
  console.log('📁 Seeding categories...');
  
  for (const category of categoriesData) {
    const categoryId = generateUuid();
    
    const insertQuery = `
      INSERT INTO categories (id, name, slug, description, "isActive", "sortOrder", "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        "isActive" = EXCLUDED."isActive",
        "sortOrder" = EXCLUDED."sortOrder",
        "updatedAt" = NOW()
      RETURNING id
    `;
    
    try {
      const result = await client.query(insertQuery, [
        categoryId,
        category.name,
        category.slug,
        category.description,
        category.isActive,
        category.sortOrder
      ]);
      
      console.log(`  ✅ ${category.name}`);
    } catch (error) {
      console.log(`  ❌ Failed to insert ${category.name}: ${error.message}`);
    }
  }
}

async function seedProducts(client) {
  console.log('\n🛍️ Seeding products...');
  
  // First, get category IDs
  const categoriesQuery = 'SELECT id, slug FROM categories';
  const categoriesResult = await client.query(categoriesQuery);
  const categoryMap = {};
  
  categoriesResult.rows.forEach(cat => {
    categoryMap[cat.slug] = cat.id;
  });
  
  for (const product of productsData) {
    const productId = generateUuid();
    const categoryId = categoryMap[product.categorySlug];
    
    if (!categoryId) {
      console.log(`  ⚠️  Category not found for ${product.name}`);
      continue;
    }
    
    const insertQuery = `
      INSERT INTO products (
        id, name, slug, description, "shortDescription", sku, price, "salePrice",
        "stockQuantity", status, featured, published, weight, tags,
        "categoryId", "createdAt", "updatedAt"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW(), NOW())
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        "shortDescription" = EXCLUDED."shortDescription",
        price = EXCLUDED.price,
        "salePrice" = EXCLUDED."salePrice",
        "stockQuantity" = EXCLUDED."stockQuantity",
        weight = EXCLUDED.weight,
        tags = EXCLUDED.tags,
        "updatedAt" = NOW()
      RETURNING id
    `;
    
    try {
      await client.query(insertQuery, [
        productId,
        product.name,
        product.slug,
        product.description,
        product.shortDescription,
        product.sku,
        product.price,
        product.salePrice || null,
        product.stockQuantity,
        product.status,
        product.featured,
        true, // published
        product.weight,
        product.tags,
        categoryId
      ]);
      
      console.log(`  ✅ ${product.name} ($${product.price})`);
    } catch (error) {
      console.log(`  ❌ Failed to insert ${product.name}: ${error.message}`);
    }
  }
}

async function seedUsers(client) {
  console.log('\n👥 Seeding additional users...');
  
  for (const user of usersData) {
    const userId = generateUuid();
    const hashedPassword = await bcrypt.hash(user.password, 12);
    
    const insertQuery = `
      INSERT INTO "user" (
        id, email, password, "firstName", "lastName", phone, address, city, country, role,
        status, "emailVerified", "createdAt", "updatedAt"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())
      ON CONFLICT (email) DO UPDATE SET
        "firstName" = EXCLUDED."firstName",
        "lastName" = EXCLUDED."lastName",
        phone = EXCLUDED.phone,
        address = EXCLUDED.address,
        city = EXCLUDED.city,
        country = EXCLUDED.country,
        "updatedAt" = NOW()
      RETURNING id
    `;
    
    try {
      await client.query(insertQuery, [
        userId,
        user.email,
        hashedPassword,
        user.firstName,
        user.lastName,
        user.phone,
        user.address,
        user.city,
        user.country,
        user.role,
        'active', // status
        false // emailVerified
      ]);
      
      console.log(`  ✅ ${user.firstName} ${user.lastName} (${user.email})`);
    } catch (error) {
      console.log(`  ❌ Failed to insert ${user.firstName} ${user.lastName}: ${error.message}`);
    }
  }
}

// Main seeding function
async function seedDatabase() {
  const client = new Client(dbConfig);
  
  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connected successfully!\n');
    
    // Seed data
    await seedCategories(client);
    await seedProducts(client);
    await seedUsers(client);
    
    // Final summary
    console.log('\n📊 Seeding Summary');
    console.log('==================');
    
    const categoriesCount = await client.query('SELECT COUNT(*) FROM categories');
    const productsCount = await client.query('SELECT COUNT(*) FROM products');
    const usersCount = await client.query('SELECT COUNT(*) FROM "user"');
    
    console.log(`📁 Categories: ${categoriesCount.rows[0].count}`);
    console.log(`🛍️ Products: ${productsCount.rows[0].count}`);
    console.log(`👥 Users: ${usersCount.rows[0].count}`);
    
    console.log('\n🎉 Pet Store Database Seeded Successfully!');
    console.log('==========================================');
    console.log('🌐 API Base URL: http://134.122.102.182/api');
    console.log('📚 Available Endpoints:');
    console.log('  - GET /categories - View all categories');
    console.log('  - GET /products - View all products');
    console.log('  - GET /users - View all users');
    console.log('  - POST /auth/login - Login with user credentials');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    console.error('🔍 Full error:', error);
  } finally {
    await client.end();
    console.log('\n🔌 Database connection closed.');
  }
}

// Run the seeder
async function main() {
  console.log('🚀 Starting Pet Store Data Seeding...\n');
  await seedDatabase();
}

main().catch(console.error);

