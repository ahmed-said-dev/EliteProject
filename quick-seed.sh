#!/bin/bash

# Quick Strapi Data Seeder for Elite Veterinary Clinic
echo "🚀 Elite Vet - Quick Data Seeder"
echo "================================"

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed or not in PATH"
    exit 1
fi

# Install axios if not available
echo "📦 Installing dependencies..."
npm init -y > /dev/null 2>&1
npm install axios > /dev/null 2>&1

echo "🌱 Starting data seeding..."

# Create a simplified seeding script for immediate execution
cat > temp-seed.js << 'EOF'
const axios = require('axios');

const STRAPI_URL = 'http://134.122.102.182:8080';
const API_URL = `${STRAPI_URL}/api`;

async function createEntry(endpoint, data) {
  try {
    console.log(`📝 Creating ${endpoint}...`);
    const response = await axios.post(`${API_URL}/${endpoint}`, { data }, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(`✅ Created ${endpoint}: ${response.data.data.id}`);
    return response.data.data;
  } catch (error) {
    console.error(`❌ Failed to create ${endpoint}:`, error.response?.status, error.response?.statusText);
    return null;
  }
}

async function quickSeed() {
  console.log('🔗 Connecting to Strapi...\n');

  // 1. Quick Doctor Homes
  const doctors = [
    { name: 'Dr. Mohammed Al-Sayed', specialty: 'Emergency & Critical Care Specialist', locale: 'en' },
    { name: 'Dr. Yasmin Abdallah', specialty: 'Pediatric Veterinarian', locale: 'en' },
    { name: 'Dr. Hassan Al-Maktoum', specialty: 'Orthopedic Surgeon', locale: 'en' },
    { name: 'Dr. Rania Khalil', specialty: 'Dermatology & Allergy Specialist', locale: 'en' },
    { name: 'Dr. Tariq Al-Zahra', specialty: 'Cardiology & Internal Medicine', locale: 'en' }
  ];

  console.log('🩺 Creating doctors...');
  for (const doctor of doctors) {
    await createEntry('doctor-homes', doctor);
  }

  // 2. Quick Home Services
  const services = [
    { title: 'Emergency Care 24/7', iconName: 'fas fa-ambulance' },
    { title: 'Routine Health Checkups', iconName: 'fas fa-heartbeat' },
    { title: 'Vaccinations & Prevention', iconName: 'fas fa-syringe' },
    { title: 'Dental Care Services', iconName: 'fas fa-tooth' },
    { title: 'Surgical Procedures', iconName: 'fas fa-user-md' },
    { title: 'Pet Grooming & Spa', iconName: 'fas fa-cut' }
  ];

  console.log('\n🏠 Creating home services...');
  for (const service of services) {
    await createEntry('home-services', service);
  }

  // 3. Quick Team Members
  const team = [
    { name: 'Dr. Ahmed Farouk', position: 'Chief Veterinarian & Small Animal Specialist', isActive: true },
    { name: 'Dr. Fatima Al-Zahra', position: 'Veterinary Surgeon & Emergency Care Specialist', isActive: true },
    { name: 'Dr. Omar Hassan', position: 'Exotic Pet Specialist & Avian Medicine', isActive: true },
    { name: 'Dr. Layla Mahmoud', position: 'Pet Nutritionist & Dermatology Specialist', isActive: true }
  ];

  console.log('\n👥 Creating team members...');
  for (const member of team) {
    await createEntry('team-members', member);
  }

  // 4. Quick Authors
  const authors = [
    { name: 'Dr. Sarah Johnson', bio: 'Veterinarian with 15+ years experience in small animal medicine', email: 'sarah@elitevet.com', locale: 'en' },
    { name: 'Dr. Michael Chen', bio: 'Certified veterinary surgeon specializing in orthopedic surgery', email: 'michael@elitevet.com', locale: 'en' },
    { name: 'Dr. Aisha Rahman', bio: 'Exotic animal medicine and preventive care specialist', email: 'aisha@elitevet.com', locale: 'en' }
  ];

  console.log('\n👨‍⚕️ Creating authors...');
  const createdAuthors = [];
  for (const author of authors) {
    const created = await createEntry('authors', author);
    if (created) createdAuthors.push(created);
  }

  // 5. Quick Blog Categories
  const categories = [
    { name: 'Pet Health', description: 'Health and wellness articles', slug: 'pet-health', locale: 'en' },
    { name: 'Pet Nutrition', description: 'Nutrition and diet guides', slug: 'pet-nutrition', locale: 'en' },
    { name: 'Emergency Care', description: 'Emergency veterinary information', slug: 'emergency-care', locale: 'en' }
  ];

  console.log('\n📂 Creating blog categories...');
  const createdCategories = [];
  for (const category of categories) {
    const created = await createEntry('blog-categories', category);
    if (created) createdCategories.push(created);
  }

  // 6. Quick Blog Articles
  const articles = [
    {
      title: 'Essential Pet Nutrition Guide',
      slug: 'essential-pet-nutrition-guide',
      excerpt: 'Learn the fundamentals of proper pet nutrition for optimal health.',
      content: 'A comprehensive guide to pet nutrition covering proteins, carbohydrates, fats, vitamins, and minerals essential for your pet\'s health.',
      publishDate: '2024-08-15',
      readTime: '5 min read',
      featured: true,
      locale: 'en'
    },
    {
      title: 'Emergency Pet Care Signs',
      slug: 'emergency-pet-care-signs', 
      excerpt: 'Recognize when your pet needs immediate veterinary attention.',
      content: 'Important warning signs that indicate your pet requires emergency medical care, including breathing problems, trauma, and toxic ingestion.',
      publishDate: '2024-08-10',
      readTime: '4 min read',
      featured: true,
      locale: 'en'
    }
  ];

  console.log('\n📝 Creating blog articles...');
  for (let i = 0; i < articles.length; i++) {
    const article = { ...articles[i] };
    if (createdCategories.length > 0) {
      article.category = createdCategories[i % createdCategories.length].id;
    }
    if (createdAuthors.length > 0) {
      article.author = createdAuthors[i % createdAuthors.length].id;
    }
    await createEntry('blog-articles', article);
  }

  console.log('\n🎉 Quick seeding completed!');
  console.log('\n📊 Created:');
  console.log(`   ✅ ${doctors.length} Doctors`);
  console.log(`   ✅ ${services.length} Home Services`);
  console.log(`   ✅ ${team.length} Team Members`);
  console.log(`   ✅ ${authors.length} Authors`);
  console.log(`   ✅ ${categories.length} Blog Categories`);
  console.log(`   ✅ ${articles.length} Blog Articles`);
  
  console.log('\n🌐 View your content:');
  console.log(`   📱 Website: http://134.122.102.182`);
  console.log(`   ⚙️  Admin: http://134.122.102.182:8080/admin`);
  console.log(`   🔗 API: http://134.122.102.182:8080/api/doctor-homes`);
}

quickSeed().catch(console.error);
EOF

# Run the seeding
echo "⚡ Executing quick seed..."
node temp-seed.js

# Cleanup
echo "🧹 Cleaning up..."
rm -f temp-seed.js

echo "✨ Done! Check your Strapi admin panel."
