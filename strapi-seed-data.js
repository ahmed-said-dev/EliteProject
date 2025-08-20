#!/usr/bin/env node

// Strapi Seed Data Script - Elite Veterinary Clinic
// This script creates comprehensive sample data for all content types

const axios = require('axios');

const STRAPI_URL = 'http://134.122.102.182:8080';
const API_URL = `${STRAPI_URL}/api`;

console.log('🚀 Starting Strapi Data Seeding...');
console.log(`🔗 Connecting to: ${STRAPI_URL}`);

// Helper function to make API requests
async function createEntry(endpoint, data) {
  try {
    console.log(`📝 Creating ${endpoint}...`);
    const response = await axios.post(`${API_URL}/${endpoint}`, { data });
    console.log(`✅ Created ${endpoint}: ${response.data.data.id}`);
    return response.data.data;
  } catch (error) {
    console.error(`❌ Failed to create ${endpoint}:`, error.response?.data || error.message);
    return null;
  }
}

// Sample data for different content types
const sampleData = {
  
  // 1. Blog Categories
  blogCategories: [
    {
      name: 'Pet Health',
      description: 'Articles about maintaining your pet\'s health',
      slug: 'pet-health',
      locale: 'en'
    },
    {
      name: 'Pet Nutrition', 
      description: 'Nutrition and diet guides for pets',
      slug: 'pet-nutrition',
      locale: 'en'
    },
    {
      name: 'Pet Behavior',
      description: 'Understanding and training pet behavior',
      slug: 'pet-behavior', 
      locale: 'en'
    },
    {
      name: 'Emergency Care',
      description: 'Emergency veterinary care information',
      slug: 'emergency-care',
      locale: 'en'
    },
    {
      name: 'Preventive Care',
      description: 'Preventive healthcare for pets',
      slug: 'preventive-care',
      locale: 'en'
    }
  ],

  // 2. Blog Tags
  blogTags: [
    { name: 'Dogs', slug: 'dogs', locale: 'en' },
    { name: 'Cats', slug: 'cats', locale: 'en' },
    { name: 'Birds', slug: 'birds', locale: 'en' },
    { name: 'Vaccination', slug: 'vaccination', locale: 'en' },
    { name: 'Surgery', slug: 'surgery', locale: 'en' },
    { name: 'Dental Care', slug: 'dental-care', locale: 'en' },
    { name: 'Grooming', slug: 'grooming', locale: 'en' },
    { name: 'Diet', slug: 'diet', locale: 'en' },
    { name: 'Exercise', slug: 'exercise', locale: 'en' },
    { name: 'Senior Pets', slug: 'senior-pets', locale: 'en' }
  ],

  // 3. Authors
  authors: [
    {
      name: 'Dr. Sarah Johnson',
      bio: 'Dr. Sarah is a renowned veterinarian with over 15 years of experience in small animal medicine. She specializes in internal medicine and emergency care.',
      email: 'sarah.johnson@elitevet.com',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/dr-sarah-johnson',
        twitter: 'https://twitter.com/drsarahvet'
      },
      locale: 'en'
    },
    {
      name: 'Dr. Michael Chen',
      bio: 'Dr. Michael is a certified veterinary surgeon with expertise in orthopedic surgery and advanced surgical procedures. He has performed over 2000 successful surgeries.',
      email: 'michael.chen@elitevet.com',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/dr-michael-chen'
      },
      locale: 'en'
    },
    {
      name: 'Dr. Aisha Rahman',
      bio: 'Dr. Aisha specializes in exotic animal medicine and preventive care. She has extensive experience with birds, reptiles, and small mammals.',
      email: 'aisha.rahman@elitevet.com',
      socialLinks: {
        instagram: 'https://instagram.com/dr.aisha.vet',
        linkedin: 'https://linkedin.com/in/dr-aisha-rahman'
      },
      locale: 'en'
    },
    {
      name: 'Dr. James Wilson',
      bio: 'Dr. James is a certified animal behaviorist and veterinary psychologist. He helps pet owners understand and address behavioral issues in their pets.',
      email: 'james.wilson@elitevet.com',
      locale: 'en'
    },
    {
      name: 'Dr. Emma Thompson',
      bio: 'Dr. Emma is passionate about animal welfare and adoption. She leads our community outreach programs and provides guidance for new pet owners.',
      email: 'emma.thompson@elitevet.com',
      socialLinks: {
        facebook: 'https://facebook.com/dr.emma.vet',
        twitter: 'https://twitter.com/dremmavet'
      },
      locale: 'en'
    }
  ],

  // 4. Team Members
  teamMembers: [
    {
      name: 'Dr. Ahmed Farouk',
      position: 'Chief Veterinarian & Small Animal Specialist',
      isActive: true,
      animationDelay: '0.2s'
    },
    {
      name: 'Dr. Fatima Al-Zahra',
      position: 'Veterinary Surgeon & Emergency Care Specialist',
      isActive: true,
      animationDelay: '0.4s'
    },
    {
      name: 'Dr. Omar Hassan',
      position: 'Exotic Pet Specialist & Avian Medicine',
      isActive: true,
      animationDelay: '0.6s'
    },
    {
      name: 'Dr. Layla Mahmoud',
      position: 'Pet Nutritionist & Dermatology Specialist',
      isActive: true,
      animationDelay: '0.8s'
    },
    {
      name: 'Dr. Khalid Al-Rashid',
      position: 'Veterinary Dentist & Oral Surgery',
      isActive: true,
      animationDelay: '1.0s'
    },
    {
      name: 'Dr. Nour El-Din',
      position: 'Veterinary Behaviorist & Training Specialist',
      isActive: true,
      animationDelay: '1.2s'
    }
  ],

  // 5. More Doctors for doctor-homes (expanding existing)
  doctorHomes: [
    {
      name: 'Dr. Mohammed Al-Sayed',
      specialty: 'Emergency & Critical Care Specialist',
      locale: 'en'
    },
    {
      name: 'Dr. Yasmin Abdallah', 
      specialty: 'Pediatric Veterinarian',
      locale: 'en'
    },
    {
      name: 'Dr. Hassan Al-Maktoum',
      specialty: 'Orthopedic Surgeon',
      locale: 'en'
    },
    {
      name: 'Dr. Rania Khalil',
      specialty: 'Dermatology & Allergy Specialist',
      locale: 'en'
    },
    {
      name: 'Dr. Tariq Al-Zahra',
      specialty: 'Cardiology & Internal Medicine',
      locale: 'en'
    }
  ],

  // 6. Home Services (for homepage)
  homeServices: [
    {
      title: 'Emergency Care 24/7',
      iconName: 'fas fa-ambulance'
    },
    {
      title: 'Routine Health Checkups',
      iconName: 'fas fa-heartbeat'
    },
    {
      title: 'Vaccinations & Prevention',
      iconName: 'fas fa-syringe'
    },
    {
      title: 'Dental Care Services',
      iconName: 'fas fa-tooth'
    },
    {
      title: 'Surgical Procedures',
      iconName: 'fas fa-user-md'
    },
    {
      title: 'Pet Grooming & Spa',
      iconName: 'fas fa-cut'
    },
    {
      title: 'Pet Boarding Services',
      iconName: 'fas fa-home'
    },
    {
      title: 'Laboratory & Diagnostics',
      iconName: 'fas fa-microscope'
    }
  ],

  // 7. Service Pages (detailed services)
  servicePages: [
    {
      title: 'Emergency Veterinary Care',
      description: 'Round-the-clock emergency veterinary services for urgent pet medical needs. Our experienced emergency team is equipped to handle critical situations.',
      badge: 'Emergency',
      isActive: true,
      order: 1,
      locale: 'en'
    },
    {
      title: 'Routine Health Examinations',
      description: 'Comprehensive health checkups to maintain your pet\'s optimal health. Regular examinations help detect health issues early.',
      badge: 'Preventive',
      isActive: true,
      order: 2,
      locale: 'en'
    },
    {
      title: 'Advanced Surgical Procedures',
      description: 'State-of-the-art surgical procedures performed by our certified veterinary surgeons. From routine to complex surgeries.',
      badge: 'Surgery',
      isActive: true,
      order: 3,
      locale: 'en'
    },
    {
      title: 'Dental Care & Oral Health',
      description: 'Complete dental care services including cleaning, extractions, and oral surgery. Maintaining your pet\'s dental health.',
      badge: 'Dental',
      isActive: true,
      order: 4,
      locale: 'en'
    },
    {
      title: 'Pet Vaccination Programs',
      description: 'Comprehensive vaccination schedules to protect your pets from preventable diseases. Customized vaccination plans.',
      badge: 'Prevention',
      isActive: true,
      order: 5,
      locale: 'en'
    },
    {
      title: 'Diagnostic Laboratory Services',
      description: 'Advanced diagnostic testing including blood work, x-rays, ultrasound, and specialized tests for accurate diagnosis.',
      badge: 'Diagnostics',
      isActive: true,
      order: 6,
      locale: 'en'
    }
  ],

  // 8. Membership Plans
  membershipPlans: [
    {
      name: 'Basic Pet Care Plan',
      description: 'Essential healthcare package for your pet with routine checkups and basic services.',
      price: 299,
      duration: 'monthly',
      isPopular: false,
      locale: 'en'
    },
    {
      name: 'Premium Pet Care Plan',
      description: 'Comprehensive healthcare package with premium services and priority access.',
      price: 599,
      duration: 'monthly',
      isPopular: true,
      locale: 'en'
    },
    {
      name: 'Elite Pet Care Plan',
      description: 'Ultimate healthcare package with all services included and VIP treatment.',
      price: 999,
      duration: 'monthly',
      isPopular: false,
      locale: 'en'
    }
  ]
};

// 9. Blog Articles with rich content
const blogArticles = [
  {
    title: 'The Ultimate Guide to Pet Nutrition: What Every Owner Should Know',
    slug: 'ultimate-guide-pet-nutrition',
    excerpt: 'Discover the essential nutrients your pet needs for optimal health and learn how to choose the right diet for their specific requirements.',
    content: `
# The Ultimate Guide to Pet Nutrition

## Introduction
Proper nutrition is the foundation of your pet's health and wellbeing. Understanding what your furry friend needs can make the difference between a thriving, energetic companion and one that struggles with health issues.

## Essential Nutrients

### Proteins
Proteins are the building blocks of your pet's body. They're essential for:
- Muscle development and maintenance
- Healthy skin and coat
- Immune system function
- Enzyme production

### Carbohydrates
While not as critical as proteins, carbohydrates provide:
- Quick energy for active pets
- Fiber for digestive health
- Essential nutrients from whole grains

### Fats and Oils
Healthy fats are crucial for:
- Skin and coat health
- Brain function
- Energy storage
- Absorption of fat-soluble vitamins

## Choosing the Right Food

When selecting pet food, consider:
1. **Age**: Puppies, adult dogs, and senior pets have different nutritional needs
2. **Size**: Small breeds vs. large breeds require different kibble sizes and nutrient ratios
3. **Activity Level**: Working dogs need more calories than sedentary pets
4. **Health Conditions**: Some pets require specialized diets

## Common Nutritional Mistakes

Avoid these common errors:
- Overfeeding treats (should be less than 10% of daily calories)
- Feeding human food that may be toxic
- Sudden diet changes without transition
- Ignoring your pet's individual needs

## Conclusion
Proper nutrition is an investment in your pet's long-term health. Consult with our veterinary team to develop a customized nutrition plan for your beloved companion.
    `,
    publishDate: '2024-08-15',
    readTime: '8 min read',
    featured: true,
    locale: 'en'
  },
  {
    title: 'Emergency Pet Care: Recognizing When Your Pet Needs Immediate Attention',
    slug: 'emergency-pet-care-signs',
    excerpt: 'Learn to recognize the warning signs that indicate your pet requires emergency medical care and what to do in these critical situations.',
    content: `
# Emergency Pet Care: Critical Warning Signs

## When Every Second Counts

As pet owners, we never want to think about emergencies, but being prepared can save your pet's life. Knowing when to seek immediate veterinary care is crucial.

## Immediate Emergency Signs

### Breathing Problems
- Difficulty breathing or gasping
- Blue gums or tongue
- Excessive panting when not hot or excited
- Choking or gagging sounds

### Cardiovascular Issues
- Pale or white gums
- Weak or irregular heartbeat
- Collapse or fainting
- Excessive weakness

### Neurological Symptoms
- Seizures or convulsions
- Loss of consciousness
- Inability to stand or walk
- Severe disorientation

## Trauma and Injuries

### External Injuries
- Severe bleeding that won't stop
- Deep cuts or puncture wounds
- Burns or chemical exposure
- Suspected broken bones

### Internal Issues
- Swollen or hard abdomen
- Vomiting blood
- Bloody diarrhea
- Inability to urinate or defecate

## Toxic Ingestion

Common household toxins include:
- Chocolate and xylitol
- Grapes and raisins
- Onions and garlic
- Cleaning products
- Medications

## What to Do in an Emergency

1. **Stay Calm**: Your pet can sense your stress
2. **Assess the Situation**: Is it truly an emergency?
3. **Call Us Immediately**: (920) 011-626 - 24/7 Emergency Line
4. **Provide First Aid**: Only if you know how and it's safe
5. **Transport Safely**: Use a carrier or blanket stretcher

## Prevention is Key

- Pet-proof your home
- Keep toxic substances secured
- Regular health checkups
- Maintain emergency contact information

Remember: When in doubt, call us. It's better to be safe than sorry when it comes to your pet's health.
    `,
    publishDate: '2024-08-10',
    readTime: '6 min read',
    featured: true,
    locale: 'en'
  },
  {
    title: 'Understanding Pet Behavior: Decoding What Your Pet is Trying to Tell You',
    slug: 'understanding-pet-behavior',
    excerpt: 'Decode your pet\'s behavior patterns and learn how to respond appropriately to their needs and emotions.',
    content: `
# Understanding Pet Behavior

## The Language of Pets

Pets communicate with us constantly through their behavior, body language, and vocalizations. Learning to understand these signals can strengthen your bond and help you provide better care.

## Dog Behavior Signals

### Tail Wagging
- Fast, loose wag: Happy and excited
- Slow, controlled wag: Cautious but friendly
- High, stiff wag: Alert or potentially aggressive
- Tucked tail: Fearful or submissive

### Body Language
- Play bow: Invitation to play
- Exposed belly: Trust and submission
- Raised hackles: Alertness or agitation
- Yawning/lip licking: Stress or anxiety

## Cat Behavior Patterns

### Vocalizations
- Purring: Usually contentment, sometimes pain
- Meowing: Communication with humans
- Hissing: Fear or aggression
- Chirping: Hunting instinct

### Body Language
- Slow blinking: Affection and trust
- Arched back: Fear or aggression
- Kneading: Comfort and contentment
- Tail up: Confident and happy

## Common Behavioral Issues

### Separation Anxiety
Signs include:
- Destructive behavior when alone
- Excessive vocalization
- House soiling
- Escape attempts

### Aggression
May stem from:
- Fear or territorial behavior
- Resource guarding
- Pain or medical issues
- Lack of socialization

## Positive Training Approaches

### For Dogs
- Positive reinforcement
- Consistency in commands
- Regular exercise and mental stimulation
- Early socialization

### For Cats
- Environmental enrichment
- Appropriate scratching surfaces
- Vertical space and hiding spots
- Respect for their independence

## When to Seek Professional Help

Contact our behavioral specialist if you notice:
- Sudden behavioral changes
- Aggressive behavior
- Excessive fearfulness
- Destructive behaviors

Understanding your pet's behavior is key to a harmonious relationship. Our team is here to help you navigate any behavioral challenges.
    `,
    publishDate: '2024-08-05',
    readTime: '10 min read',
    featured: false,
    locale: 'en'
  }
];

// Main seeding function
async function seedData() {
  try {
    console.log('\n🌱 Starting data seeding process...\n');

    // 1. Create Blog Categories
    console.log('📂 Creating blog categories...');
    const categories = [];
    for (const category of sampleData.blogCategories) {
      const created = await createEntry('blog-categories', category);
      if (created) categories.push(created);
    }

    // 2. Create Blog Tags  
    console.log('\n🏷️ Creating blog tags...');
    const tags = [];
    for (const tag of sampleData.blogTags) {
      const created = await createEntry('blog-tags', tag);
      if (created) tags.push(created);
    }

    // 3. Create Authors
    console.log('\n👨‍⚕️ Creating authors...');
    const authors = [];
    for (const author of sampleData.authors) {
      const created = await createEntry('authors', author);
      if (created) authors.push(created);
    }

    // 4. Create Team Members
    console.log('\n👥 Creating team members...');
    for (const member of sampleData.teamMembers) {
      await createEntry('team-members', member);
    }

    // 5. Create Doctor Homes
    console.log('\n🩺 Creating doctor homes...');
    for (const doctor of sampleData.doctorHomes) {
      await createEntry('doctor-homes', doctor);
    }

    // 6. Create Home Services
    console.log('\n🏠 Creating home services...');
    for (const service of sampleData.homeServices) {
      await createEntry('home-services', service);
    }

    // 7. Create Service Pages
    console.log('\n📄 Creating service pages...');
    for (const service of sampleData.servicePages) {
      await createEntry('service-pages', service);
    }

    // 8. Create Membership Plans
    console.log('\n💎 Creating membership plans...');
    for (const plan of sampleData.membershipPlans) {
      await createEntry('membership-plans', plan);
    }

    // 9. Create Blog Articles with relationships
    console.log('\n📝 Creating blog articles...');
    for (let i = 0; i < blogArticles.length; i++) {
      const article = { ...blogArticles[i] };
      
      // Add relationships if available
      if (categories.length > 0) {
        article.category = categories[i % categories.length].id;
      }
      
      if (authors.length > 0) {
        article.author = authors[i % authors.length].id;
      }
      
      if (tags.length > 0) {
        // Add 2-3 random tags to each article
        const articleTags = [];
        for (let j = 0; j < Math.min(3, tags.length); j++) {
          const tagIndex = (i + j) % tags.length;
          articleTags.push(tags[tagIndex].id);
        }
        article.tags = articleTags;
      }

      await createEntry('blog-articles', article);
    }

    console.log('\n🎉 Data seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   ✅ ${sampleData.blogCategories.length} Blog Categories`);
    console.log(`   ✅ ${sampleData.blogTags.length} Blog Tags`);
    console.log(`   ✅ ${sampleData.authors.length} Authors`);
    console.log(`   ✅ ${sampleData.teamMembers.length} Team Members`);
    console.log(`   ✅ ${sampleData.doctorHomes.length} Doctor Homes`);
    console.log(`   ✅ ${sampleData.homeServices.length} Home Services`);
    console.log(`   ✅ ${sampleData.servicePages.length} Service Pages`);
    console.log(`   ✅ ${sampleData.membershipPlans.length} Membership Plans`);
    console.log(`   ✅ ${blogArticles.length} Blog Articles`);
    
    console.log('\n🌐 You can now view your content at:');
    console.log(`   📱 Frontend: http://134.122.102.182`);
    console.log(`   ⚙️  Strapi Admin: http://134.122.102.182:8080/admin`);
    console.log(`   🔗 API Endpoints: http://134.122.102.182:8080/api/`);

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  }
}

// Run the seeding
if (require.main === module) {
  seedData();
}

module.exports = { seedData, sampleData, blogArticles };
