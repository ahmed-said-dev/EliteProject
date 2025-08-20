// Quick Strapi Data Seeder - Elite Veterinary Clinic
// Run with: node quick-seed.js

console.log('🚀 Elite Vet - Quick Data Seeder');
console.log('================================\n');

// Simple axios alternative for minimal dependencies
const https = require('https');
const http = require('http');

const STRAPI_URL = 'http://134.122.102.182:8080';
const API_URL = `${STRAPI_URL}/api`;

// Simple HTTP POST function
function makeRequest(url, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ data });
    const urlObj = new URL(url);
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 80,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function createEntry(endpoint, data, description = '') {
  try {
    console.log(`📝 Creating ${description || endpoint}...`);
    const response = await makeRequest(`${API_URL}/${endpoint}`, data);
    
    if (response.status >= 200 && response.status < 300) {
      console.log(`✅ Created ${endpoint}: ${response.data.data?.id || 'success'}`);
      return response.data.data;
    } else {
      console.error(`❌ Failed to create ${endpoint}: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error creating ${endpoint}:`, error.message);
    return null;
  }
}

async function quickSeed() {
  console.log('🔗 Connecting to Strapi...\n');

  // 1. Doctor Homes (for Meet our Doctors section)
  const doctors = [
    { name: 'Dr. Mohammed Al-Sayed', specialty: 'Emergency & Critical Care Specialist', locale: 'en' },
    { name: 'Dr. Yasmin Abdallah', specialty: 'Pediatric Veterinarian', locale: 'en' },
    { name: 'Dr. Hassan Al-Maktoum', specialty: 'Orthopedic Surgeon', locale: 'en' },
    { name: 'Dr. Rania Khalil', specialty: 'Dermatology & Allergy Specialist', locale: 'en' },
    { name: 'Dr. Tariq Al-Zahra', specialty: 'Cardiology & Internal Medicine', locale: 'en' },
    { name: 'Dr. Nour El-Din', specialty: 'Veterinary Behaviorist', locale: 'en' },
    { name: 'Dr. Khalid Al-Rashid', specialty: 'Veterinary Dentist & Oral Surgery', locale: 'en' }
  ];

  console.log('🩺 Creating doctors for homepage...');
  for (const doctor of doctors) {
    await createEntry('doctor-homes', doctor, `Dr. ${doctor.name.split(' ')[1]}`);
  }

  // 2. Home Services (for What we offer section)
  const services = [
    { title: 'Emergency Care 24/7', iconName: 'fas fa-ambulance' },
    { title: 'Routine Health Checkups', iconName: 'fas fa-heartbeat' },
    { title: 'Vaccinations & Prevention', iconName: 'fas fa-syringe' },
    { title: 'Dental Care Services', iconName: 'fas fa-tooth' },
    { title: 'Surgical Procedures', iconName: 'fas fa-user-md' },
    { title: 'Pet Grooming & Spa', iconName: 'fas fa-cut' },
    { title: 'Laboratory & Diagnostics', iconName: 'fas fa-microscope' },
    { title: 'Pet Boarding Services', iconName: 'fas fa-home' }
  ];

  console.log('\n🏠 Creating home services...');
  for (const service of services) {
    await createEntry('home-services', service, service.title);
  }

  // 3. Team Members (for team page)
  const team = [
    { name: 'Dr. Ahmed Farouk', position: 'Chief Veterinarian & Small Animal Specialist', isActive: true, animationDelay: '0.2s' },
    { name: 'Dr. Fatima Al-Zahra', position: 'Veterinary Surgeon & Emergency Care Specialist', isActive: true, animationDelay: '0.4s' },
    { name: 'Dr. Omar Hassan', position: 'Exotic Pet Specialist & Avian Medicine', isActive: true, animationDelay: '0.6s' },
    { name: 'Dr. Layla Mahmoud', position: 'Pet Nutritionist & Dermatology Specialist', isActive: true, animationDelay: '0.8s' },
    { name: 'Dr. Saeed Al-Mansouri', position: 'Veterinary Cardiologist', isActive: true, animationDelay: '1.0s' },
    { name: 'Dr. Mona Kassem', position: 'Veterinary Ophthalmologist', isActive: true, animationDelay: '1.2s' }
  ];

  console.log('\n👥 Creating team members...');
  for (const member of team) {
    await createEntry('team-members', member, member.name);
  }

  // 4. Authors (for blog articles)
  const authors = [
    { 
      name: 'Dr. Sarah Johnson', 
      bio: 'Dr. Sarah is a renowned veterinarian with over 15 years of experience in small animal medicine and emergency care.', 
      email: 'sarah@elitevet.com', 
      locale: 'en' 
    },
    { 
      name: 'Dr. Michael Chen', 
      bio: 'Dr. Michael is a certified veterinary surgeon specializing in orthopedic surgery and advanced surgical procedures.', 
      email: 'michael@elitevet.com', 
      locale: 'en' 
    },
    { 
      name: 'Dr. Aisha Rahman', 
      bio: 'Dr. Aisha specializes in exotic animal medicine, preventive care, and has extensive experience with birds and reptiles.', 
      email: 'aisha@elitevet.com', 
      locale: 'en' 
    },
    { 
      name: 'Dr. James Wilson', 
      bio: 'Dr. James is a certified animal behaviorist helping pet owners understand and address behavioral issues.', 
      email: 'james@elitevet.com', 
      locale: 'en' 
    }
  ];

  console.log('\n👨‍⚕️ Creating blog authors...');
  const createdAuthors = [];
  for (const author of authors) {
    const created = await createEntry('authors', author, author.name);
    if (created) createdAuthors.push(created);
  }

  // 5. Blog Categories
  const categories = [
    { name: 'Pet Health', description: 'Health and wellness articles for pets', slug: 'pet-health', locale: 'en' },
    { name: 'Pet Nutrition', description: 'Nutrition and diet guides for optimal pet health', slug: 'pet-nutrition', locale: 'en' },
    { name: 'Emergency Care', description: 'Emergency veterinary care information', slug: 'emergency-care', locale: 'en' },
    { name: 'Pet Behavior', description: 'Understanding and training pet behavior', slug: 'pet-behavior', locale: 'en' },
    { name: 'Preventive Care', description: 'Preventive healthcare and wellness tips', slug: 'preventive-care', locale: 'en' }
  ];

  console.log('\n📂 Creating blog categories...');
  const createdCategories = [];
  for (const category of categories) {
    const created = await createEntry('blog-categories', category, category.name);
    if (created) createdCategories.push(created);
  }

  // 6. Blog Tags
  const tags = [
    { name: 'Dogs', slug: 'dogs', locale: 'en' },
    { name: 'Cats', slug: 'cats', locale: 'en' },
    { name: 'Birds', slug: 'birds', locale: 'en' },
    { name: 'Vaccination', slug: 'vaccination', locale: 'en' },
    { name: 'Surgery', slug: 'surgery', locale: 'en' },
    { name: 'Dental Care', slug: 'dental-care', locale: 'en' },
    { name: 'Diet', slug: 'diet', locale: 'en' },
    { name: 'Emergency', slug: 'emergency', locale: 'en' }
  ];

  console.log('\n🏷️ Creating blog tags...');
  const createdTags = [];
  for (const tag of tags) {
    const created = await createEntry('blog-tags', tag, tag.name);
    if (created) createdTags.push(created);
  }

  // 7. Blog Articles
  const articles = [
    {
      title: 'Essential Pet Nutrition: A Complete Guide for Pet Owners',
      slug: 'essential-pet-nutrition-guide',
      excerpt: 'Discover the fundamentals of proper pet nutrition and learn how to choose the right diet for your furry friend\'s optimal health.',
      content: `
# Essential Pet Nutrition Guide

## Introduction
Proper nutrition is the foundation of your pet's health and wellbeing. Understanding what your furry friend needs can make the difference between a thriving, energetic companion and one that struggles with health issues.

## Key Nutritional Components

### Proteins
- Essential for muscle development
- Support immune system function
- Needed for healthy skin and coat

### Carbohydrates
- Provide energy for daily activities
- Support digestive health through fiber
- Help with nutrient absorption

### Fats and Oils
- Essential for brain function
- Promote healthy skin and shiny coat
- Aid in vitamin absorption

## Choosing the Right Food
When selecting pet food, consider your pet's age, size, activity level, and any specific health conditions.

## Conclusion
Investing in proper nutrition is investing in your pet's long-term health and happiness.
      `,
      publishDate: '2024-08-15',
      readTime: '6 min read',
      featured: true,
      locale: 'en'
    },
    {
      title: 'Emergency Pet Care: When Every Second Counts',
      slug: 'emergency-pet-care-guide',
      excerpt: 'Learn to recognize critical warning signs that indicate your pet needs immediate veterinary attention and what to do in emergency situations.',
      content: `
# Emergency Pet Care Guide

## Critical Warning Signs

### Immediate Emergencies
- Difficulty breathing or gasping
- Unconsciousness or collapse
- Severe bleeding
- Suspected poisoning
- Seizures or convulsions

### What to Do
1. Stay calm and assess the situation
2. Call our emergency line immediately: 920-011-626
3. Provide basic first aid if safe to do so
4. Transport your pet safely to our clinic

## Prevention is Key
Regular checkups and pet-proofing your home can prevent many emergencies.

Remember: When in doubt, call us. It's better to be safe than sorry.
      `,
      publishDate: '2024-08-12',
      readTime: '4 min read',
      featured: true,
      locale: 'en'
    },
    {
      title: 'Understanding Your Pet\'s Behavior: Communication Without Words',
      slug: 'understanding-pet-behavior',
      excerpt: 'Decode your pet\'s body language and behavior patterns to better understand their needs, emotions, and overall wellbeing.',
      content: `
# Understanding Pet Behavior

## Reading the Signs

### Dog Behavior
- Tail wagging: Different types mean different things
- Body posture: Confident vs. submissive positions
- Facial expressions: Happy, anxious, or aggressive

### Cat Behavior
- Purring: Usually contentment, sometimes stress
- Tail positions: Mood indicators
- Vocalizations: Different meows have different meanings

## Common Issues
- Separation anxiety
- Aggressive behavior
- House training problems
- Excessive vocalization

## When to Seek Help
Contact our behavior specialists if you notice sudden changes in your pet's behavior.
      `,
      publishDate: '2024-08-08',
      readTime: '7 min read',
      featured: false,
      locale: 'en'
    }
  ];

  console.log('\n📝 Creating blog articles...');
  for (let i = 0; i < articles.length; i++) {
    const article = { ...articles[i] };
    
    // Add relationships
    if (createdCategories.length > 0) {
      article.category = createdCategories[i % createdCategories.length].id;
    }
    if (createdAuthors.length > 0) {
      article.author = createdAuthors[i % createdAuthors.length].id;
    }
    if (createdTags.length > 0) {
      // Add 2-3 tags per article
      const articleTags = [];
      for (let j = 0; j < 3 && j < createdTags.length; j++) {
        articleTags.push(createdTags[(i + j) % createdTags.length].id);
      }
      article.tags = articleTags;
    }
    
    await createEntry('blog-articles', article, article.title);
  }

  // Summary
  console.log('\n🎉 Quick seeding completed successfully!');
  console.log('\n📊 Created Content:');
  console.log(`   🩺 ${doctors.length} Doctors (for homepage)`);
  console.log(`   🏠 ${services.length} Home Services`);
  console.log(`   👥 ${team.length} Team Members`);
  console.log(`   👨‍⚕️ ${authors.length} Blog Authors`);
  console.log(`   📂 ${categories.length} Blog Categories`);
  console.log(`   🏷️ ${tags.length} Blog Tags`);
  console.log(`   📝 ${articles.length} Blog Articles`);
  
  console.log('\n🌐 Your content is now available at:');
  console.log(`   📱 Website: http://134.122.102.182`);
  console.log(`   📋 Doctors API: http://134.122.102.182:8080/api/doctor-homes`);
  console.log(`   🏠 Services API: http://134.122.102.182:8080/api/home-services`);
  console.log(`   📝 Blog API: http://134.122.102.182:8080/api/blog-articles`);
  console.log(`   ⚙️  Strapi Admin: http://134.122.102.182:8080/admin`);
  
  console.log('\n✨ Refresh your website to see the new data!');
}

// Run the seeding
quickSeed().catch((error) => {
  console.error('\n❌ Seeding failed:', error.message);
  process.exit(1);
});
