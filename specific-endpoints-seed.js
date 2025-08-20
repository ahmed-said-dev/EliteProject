// Specific Endpoints Data Seeder for Elite Veterinary Clinic
// Creates comprehensive sample data for specific endpoints

console.log('🎯 Elite Vet - Specific Endpoints Data Seeder');
console.log('==============================================\n');

const https = require('https');
const http = require('http');

const STRAPI_URL = 'http://134.122.102.182:8080';
const API_URL = `${STRAPI_URL}/api`;

// HTTP POST function
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
      console.log(`⚠️ Response ${response.status} for ${endpoint}: ${description || ''}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error creating ${endpoint}:`, error.message);
    return null;
  }
}

async function seedSpecificEndpoints() {
  console.log('🔗 Connecting to Strapi for specific endpoints...\n');

  // 1. Categories (لتصنيف الخدمات والمقالات)
  const categories = [
    {
      name: 'Surgical Services',
      description: 'All types of surgical procedures for pets including emergency, routine, and specialized surgeries.',
      slug: 'surgical-services',
      color: '#FF6B6B',
      isActive: true,
      sortOrder: 1
    },
    {
      name: 'Preventive Care',
      description: 'Routine checkups, vaccinations, and preventive treatments to keep pets healthy.',
      slug: 'preventive-care',
      color: '#4ECDC4',
      isActive: true,
      sortOrder: 2
    },
    {
      name: 'Emergency Services',
      description: '24/7 emergency veterinary care for critical situations and urgent medical needs.',
      slug: 'emergency-services',
      color: '#45B7D1',
      isActive: true,
      sortOrder: 3
    },
    {
      name: 'Dental Care',
      description: 'Complete dental services including cleaning, extractions, and oral health maintenance.',
      slug: 'dental-care',
      color: '#F7B831',
      isActive: true,
      sortOrder: 4
    },
    {
      name: 'Diagnostic Services',
      description: 'Advanced diagnostic testing including X-rays, ultrasounds, and laboratory work.',
      slug: 'diagnostic-services',
      color: '#5A67D8',
      isActive: true,
      sortOrder: 5
    },
    {
      name: 'Grooming & Wellness',
      description: 'Professional grooming services and wellness treatments for pet comfort and health.',
      slug: 'grooming-wellness',
      color: '#9F7AEA',
      isActive: true,
      sortOrder: 6
    },
    {
      name: 'Exotic Pet Care',
      description: 'Specialized care for birds, reptiles, and other exotic animals.',
      slug: 'exotic-pet-care',
      color: '#ED8936',
      isActive: true,
      sortOrder: 7
    },
    {
      name: 'Pet Boarding',
      description: 'Safe and comfortable boarding services for when you travel.',
      slug: 'pet-boarding',
      color: '#38B2AC',
      isActive: true,
      sortOrder: 8
    }
  ];

  console.log('📂 Creating Categories...');
  const createdCategories = [];
  for (const category of categories) {
    const created = await createEntry('categories', category, category.name);
    if (created) createdCategories.push(created);
  }

  // 2. Membership Intro (لشرح نظام العضوية)
  const membershipIntros = [
    {
      title: 'Welcome to Elite Vet Premium Membership',
      subtitle: 'Comprehensive Healthcare Plans for Your Beloved Pets',
      description: 'Join our exclusive membership program and give your pets the premium healthcare they deserve. Our membership plans offer significant savings, priority access, and comprehensive coverage for all your pet\'s medical needs.',
      mainImage: '/images/membership/premium-care.jpg',
      benefits: [
        'Priority appointment scheduling',
        'Discounted services and treatments',
        'Free monthly health checkups',
        'Emergency care coverage',
        'Complimentary grooming sessions',
        'Access to exclusive workshops'
      ],
      ctaText: 'Join Now',
      ctaLink: '/memberships',
      isActive: true,
      displayOrder: 1
    },
    {
      title: 'Family Pet Care Plans',
      subtitle: 'Multiple Pets, One Comprehensive Plan',
      description: 'Perfect for families with multiple pets! Our family plans provide excellent value and ensure all your furry family members receive the best possible care under one convenient membership.',
      mainImage: '/images/membership/family-plan.jpg',
      benefits: [
        'Coverage for up to 5 pets',
        'Group discount rates',
        'Coordinated care schedules',
        'Family health records',
        'Shared wellness programs',
        'Emergency contacts system'
      ],
      ctaText: 'Learn More',
      ctaLink: '/memberships/family',
      isActive: true,
      displayOrder: 2
    },
    {
      title: 'Senior Pet Specialized Care',
      subtitle: 'Golden Years Deserve Golden Care',
      description: 'Our senior pet membership is specially designed for pets aged 7 years and older. We understand the unique needs of aging pets and provide specialized care to ensure their comfort and health.',
      mainImage: '/images/membership/senior-care.jpg',
      benefits: [
        'Specialized senior health screenings',
        'Pain management programs',
        'Nutrition counseling',
        'Mobility support services',
        'Comfort care options',
        'End-of-life support'
      ],
      ctaText: 'Senior Care Info',
      ctaLink: '/memberships/senior',
      isActive: true,
      displayOrder: 3
    }
  ];

  console.log('\n💎 Creating Membership Intros...');
  for (const intro of membershipIntros) {
    await createEntry('membership-intros', intro, intro.title);
  }

  // 3. Membership Plans (خطط العضوية التفصيلية)
  const membershipPlans = [
    {
      name: 'Basic Care Plan',
      title: 'Essential Pet Healthcare',
      description: 'Perfect for young, healthy pets who need routine preventive care and basic medical services.',
      price: 199,
      currency: 'SAR',
      billingCycle: 'monthly',
      duration: 12,
      isPopular: false,
      isActive: true,
      features: [
        'Annual wellness exam',
        'Core vaccinations',
        'Parasite screening',
        '10% discount on services',
        'Email health reminders',
        'Basic dental cleaning'
      ],
      limitations: [
        'No emergency coverage',
        'Limited to 2 visits per month',
        'No surgical procedures'
      ],
      targetAudience: 'Young pets (under 3 years)',
      maxPets: 1,
      setupFee: 50,
      cancellationPolicy: '30 days notice required'
    },
    {
      name: 'Premium Care Plan',
      title: 'Comprehensive Pet Healthcare',
      description: 'Our most popular plan offering comprehensive coverage for all your pet\'s healthcare needs with excellent value.',
      price: 399,
      currency: 'SAR',
      billingCycle: 'monthly',
      duration: 12,
      isPopular: true,
      isActive: true,
      features: [
        'Unlimited wellness exams',
        'All vaccinations included',
        'Complete blood work panel',
        '25% discount on all services',
        'Priority appointment booking',
        'Professional dental cleaning',
        'Emergency consultation coverage',
        'Nutritional counseling',
        'Behavioral consultation'
      ],
      limitations: [
        'Major surgery requires co-pay',
        'Exotic procedures not covered'
      ],
      targetAudience: 'All adult pets',
      maxPets: 2,
      setupFee: 0,
      cancellationPolicy: '60 days notice required'
    },
    {
      name: 'Elite Platinum Plan',
      title: 'Ultimate Pet Healthcare Experience',
      description: 'The ultimate in pet healthcare with VIP treatment, unlimited services, and exclusive benefits.',
      price: 699,
      currency: 'SAR',
      billingCycle: 'monthly',
      duration: 12,
      isPopular: false,
      isActive: true,
      features: [
        'Unlimited all services',
        'Concierge health management',
        'Home visit services',
        '40% discount on pharmaceuticals',
        'VIP treatment rooms',
        'Same-day appointment guarantee',
        'Comprehensive surgical coverage',
        'Alternative therapy options',
        'Personal veterinarian assignment',
        'Luxury boarding discounts',
        '24/7 emergency hotline',
        'Complimentary grooming sessions'
      ],
      limitations: [],
      targetAudience: 'All pets, premium service seekers',
      maxPets: 5,
      setupFee: 0,
      cancellationPolicy: '90 days notice required'
    },
    {
      name: 'Senior Pet Care Plan',
      title: 'Specialized Care for Aging Pets',
      description: 'Specialized healthcare plan designed for senior pets with age-related health monitoring and comfort care.',
      price: 299,
      currency: 'SAR',
      billingCycle: 'monthly',
      duration: 12,
      isPopular: false,
      isActive: true,
      features: [
        'Monthly senior health screenings',
        'Arthritis management program',
        'Senior nutrition planning',
        'Comfort care services',
        '20% discount on medications',
        'Pain management consultation',
        'Mobility assistance devices',
        'End-of-life support counseling'
      ],
      limitations: [
        'Available for pets 7+ years only',
        'Pre-existing conditions assessment required'
      ],
      targetAudience: 'Senior pets (7+ years)',
      maxPets: 1,
      setupFee: 25,
      cancellationPolicy: '45 days notice required'
    },
    {
      name: 'Family Multi-Pet Plan',
      title: 'Complete Care for Pet Families',
      description: 'Economical solution for families with multiple pets, offering comprehensive care with family discounts.',
      price: 599,
      currency: 'SAR',
      billingCycle: 'monthly',
      duration: 12,
      isPopular: false,
      isActive: true,
      features: [
        'Coverage for up to 4 pets',
        'Family health record system',
        'Coordinated appointment scheduling',
        '30% group discount',
        'Shared wellness programs',
        'Multi-pet boarding discounts',
        'Emergency care for all pets',
        'Family nutrition planning'
      ],
      limitations: [
        'Maximum 4 pets per plan',
        'All pets must live in same household'
      ],
      targetAudience: 'Multi-pet families',
      maxPets: 4,
      setupFee: 100,
      cancellationPolicy: '60 days notice required'
    }
  ];

  console.log('\n🏆 Creating Membership Plans...');
  for (const plan of membershipPlans) {
    await createEntry('membership-plans', plan, plan.name);
  }

  // 4. Services of Elite Center (خدمات مفصلة للمركز)
  const eliteServices = [
    {
      title: 'Advanced Surgical Suite',
      description: 'State-of-the-art surgical facilities equipped with the latest technology for safe and effective procedures.',
      longDescription: `Our advanced surgical suite is equipped with modern anesthesia monitoring systems, surgical lasers, and advanced imaging technology. We perform everything from routine spay/neuter procedures to complex orthopedic surgeries and emergency operations. Our board-certified surgeons have extensive experience in soft tissue surgery, orthopedic procedures, and minimally invasive techniques.`,
      category: 'Surgery',
      price: 500,
      duration: '2-4 hours',
      preparation: 'Fasting required 12 hours before surgery',
      recovery: '1-2 weeks depending on procedure',
      isActive: true,
      isEmergencyService: true,
      requiresAppointment: true,
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      features: [
        'Pre-surgical health assessment',
        'Advanced anesthesia monitoring',
        'Pain management protocols',
        'Post-operative care instructions',
        'Follow-up examination included'
      ]
    },
    {
      title: 'Comprehensive Wellness Examinations',
      description: 'Thorough health checkups to maintain your pet\'s optimal health and catch issues early.',
      longDescription: `Our comprehensive wellness examinations include a complete physical assessment, nutritional evaluation, and behavioral consultation. We perform thorough examinations of all body systems and provide personalized health recommendations. Regular wellness exams are the foundation of preventive healthcare and help detect health issues before they become serious problems.`,
      category: 'Preventive Care',
      price: 150,
      duration: '45 minutes',
      preparation: 'Bring vaccination records and list of current medications',
      recovery: 'None required',
      isActive: true,
      isEmergencyService: false,
      requiresAppointment: true,
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      features: [
        'Complete physical examination',
        'Nutritional assessment',
        'Behavioral evaluation',
        'Vaccination review',
        'Health recommendation report',
        'Preventive care planning'
      ]
    },
    {
      title: 'Emergency Critical Care',
      description: '24/7 emergency veterinary services for life-threatening situations and urgent medical needs.',
      longDescription: `Our emergency department is staffed 24/7 with experienced emergency veterinarians and technicians. We are equipped to handle all types of emergency situations including trauma, poisoning, respiratory distress, and other critical conditions. Our emergency team works quickly to stabilize patients and provide life-saving treatment.`,
      category: 'Emergency',
      price: 300,
      duration: 'Variable',
      preparation: 'Call ahead if possible, bring any relevant medical records',
      recovery: 'Varies by condition',
      isActive: true,
      isEmergencyService: true,
      requiresAppointment: false,
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      features: [
        '24/7 availability',
        'Rapid triage system',
        'Advanced life support',
        'Emergency surgery capability',
        'Critical care monitoring',
        'Pain management'
      ]
    },
    {
      title: 'Professional Dental Care',
      description: 'Complete dental services including cleaning, extractions, and oral health maintenance.',
      longDescription: `Our dental services include comprehensive oral examinations, professional cleaning under anesthesia, digital dental radiography, and surgical extractions when necessary. We also provide at-home dental care education and products to maintain your pet\'s oral health between professional cleanings.`,
      category: 'Dental',
      price: 400,
      duration: '2-3 hours',
      preparation: 'Fasting required 12 hours before procedure',
      recovery: '2-3 days soft food diet',
      isActive: true,
      isEmergencyService: false,
      requiresAppointment: true,
      availableDays: ['Tuesday', 'Wednesday', 'Thursday'],
      features: [
        'Complete oral examination',
        'Professional scaling and polishing',
        'Digital dental X-rays',
        'Extraction if necessary',
        'Post-care instructions',
        'Home dental care products'
      ]
    },
    {
      title: 'Advanced Diagnostic Imaging',
      description: 'Cutting-edge diagnostic technology including X-rays, ultrasound, and specialized imaging.',
      longDescription: `Our diagnostic imaging department features digital radiography, ultrasound, and specialized imaging equipment. These non-invasive diagnostic tools help us accurately diagnose internal conditions, monitor treatment progress, and plan surgical procedures. Our experienced radiologists interpret all images to ensure accurate diagnosis.`,
      category: 'Diagnostics',
      price: 250,
      duration: '30-60 minutes',
      preparation: 'Varies by procedure',
      recovery: 'None required',
      isActive: true,
      isEmergencyService: false,
      requiresAppointment: true,
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      features: [
        'Digital X-ray imaging',
        'Ultrasound examinations',
        'Radiologist interpretation',
        'Immediate results available',
        'Digital image storage',
        'Referral coordination if needed'
      ]
    },
    {
      title: 'Luxury Pet Grooming Spa',
      description: 'Professional grooming services in a relaxing spa environment for your pet\'s comfort and beauty.',
      longDescription: `Our luxury pet spa offers full-service grooming in a calm, stress-free environment. Our certified groomers provide breed-specific cuts, nail trimming, ear cleaning, and specialized treatments. We use only premium, pet-safe products and maintain the highest standards of cleanliness and safety.`,
      category: 'Grooming',
      price: 80,
      duration: '2-3 hours',
      preparation: 'Up-to-date vaccinations required',
      recovery: 'None required',
      isActive: true,
      isEmergencyService: false,
      requiresAppointment: true,
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      features: [
        'Breed-specific cuts',
        'Premium shampoo and conditioning',
        'Nail trimming and filing',
        'Ear cleaning',
        'Teeth brushing',
        'Aromatherapy options'
      ]
    }
  ];

  console.log('\n🏥 Creating Elite Center Services...');
  for (const service of eliteServices) {
    await createEntry('service-pages', service, service.title);
  }

  // 5. Test Entries (لاختبار النظام)
  const testEntries = [
    {
      title: 'API Connectivity Test',
      description: 'Testing API endpoint connectivity and response times',
      testType: 'API',
      status: 'Active',
      priority: 'High',
      createdBy: 'System Admin',
      notes: 'Regular API health check to ensure all endpoints are responding correctly'
    },
    {
      title: 'Database Performance Test',
      description: 'Testing database query performance and optimization',
      testType: 'Database',
      status: 'Completed',
      priority: 'Medium',
      createdBy: 'Database Admin',
      notes: 'Monthly database performance monitoring and optimization check'
    },
    {
      title: 'User Authentication Test',
      description: 'Testing user login, registration, and security features',
      testType: 'Security',
      status: 'Active',
      priority: 'Critical',
      createdBy: 'Security Team',
      notes: 'Security audit for user authentication and authorization systems'
    },
    {
      title: 'Mobile App Integration Test',
      description: 'Testing mobile application API integration and functionality',
      testType: 'Mobile',
      status: 'Pending',
      priority: 'High',
      createdBy: 'Mobile Dev Team',
      notes: 'Testing mobile app connectivity with backend services'
    },
    {
      title: 'Payment Gateway Test',
      description: 'Testing payment processing and transaction security',
      testType: 'Payment',
      status: 'Active',
      priority: 'Critical',
      createdBy: 'Finance Team',
      notes: 'Regular testing of payment gateway integration and security protocols'
    }
  ];

  console.log('\n🧪 Creating Test Entries...');
  for (const testEntry of testEntries) {
    await createEntry('testones', testEntry, testEntry.title);
  }

  // 6. Sample Users (مستخدمين تجريبيين)
  const sampleUsers = [
    {
      username: 'sarah_johnson',
      email: 'sarah.johnson@email.com',
      provider: 'local',
      confirmed: true,
      blocked: false,
      firstName: 'Sarah',
      lastName: 'Johnson',
      phone: '+966501234567',
      address: 'Riyadh, Saudi Arabia',
      dateOfBirth: '1985-06-15',
      petOwnerSince: '2018-03-10',
      preferredLanguage: 'en',
      communicationPreferences: {
        email: true,
        sms: true,
        phone: false
      },
      emergencyContact: {
        name: 'Ahmed Johnson',
        phone: '+966509876543',
        relationship: 'Husband'
      }
    },
    {
      username: 'ahmed_alfarisi',
      email: 'ahmed.alfarisi@email.com',
      provider: 'local',
      confirmed: true,
      blocked: false,
      firstName: 'Ahmed',
      lastName: 'Al-Farisi',
      phone: '+966502345678',
      address: 'Jeddah, Saudi Arabia',
      dateOfBirth: '1990-12-20',
      petOwnerSince: '2020-01-15',
      preferredLanguage: 'ar',
      communicationPreferences: {
        email: true,
        sms: true,
        phone: true
      },
      emergencyContact: {
        name: 'Fatima Al-Farisi',
        phone: '+966508765432',
        relationship: 'Wife'
      }
    },
    {
      username: 'maria_garcia',
      email: 'maria.garcia@email.com',
      provider: 'local',
      confirmed: true,
      blocked: false,
      firstName: 'Maria',
      lastName: 'Garcia',
      phone: '+966503456789',
      address: 'Dammam, Saudi Arabia',
      dateOfBirth: '1988-04-08',
      petOwnerSince: '2019-07-22',
      preferredLanguage: 'en',
      communicationPreferences: {
        email: true,
        sms: false,
        phone: true
      },
      emergencyContact: {
        name: 'Carlos Garcia',
        phone: '+966507654321',
        relationship: 'Brother'
      }
    },
    {
      username: 'khalid_almansouri',
      email: 'khalid.almansouri@email.com',
      provider: 'local',
      confirmed: true,
      blocked: false,
      firstName: 'Khalid',
      lastName: 'Al-Mansouri',
      phone: '+966504567890',
      address: 'Mecca, Saudi Arabia',
      dateOfBirth: '1992-09-12',
      petOwnerSince: '2021-05-03',
      preferredLanguage: 'ar',
      communicationPreferences: {
        email: false,
        sms: true,
        phone: true
      },
      emergencyContact: {
        name: 'Omar Al-Mansouri',
        phone: '+966506543210',
        relationship: 'Father'
      }
    },
    {
      username: 'lisa_wong',
      email: 'lisa.wong@email.com',
      provider: 'local',
      confirmed: true,
      blocked: false,
      firstName: 'Lisa',
      lastName: 'Wong',
      phone: '+966505678901',
      address: 'Khobar, Saudi Arabia',
      dateOfBirth: '1987-11-25',
      petOwnerSince: '2017-12-18',
      preferredLanguage: 'en',
      communicationPreferences: {
        email: true,
        sms: true,
        phone: false
      },
      emergencyContact: {
        name: 'David Wong',
        phone: '+966505432109',
        relationship: 'Husband'
      }
    }
  ];

  console.log('\n👥 Creating Sample Users...');
  for (const user of sampleUsers) {
    // Note: User creation might need special handling due to authentication
    await createEntry('users', user, user.firstName + ' ' + user.lastName);
  }

  // Summary
  console.log('\n🎉 Specific Endpoints Seeding Completed!');
  console.log('\n📊 Created Content Summary:');
  console.log(`   📂 ${categories.length} Categories`);
  console.log(`   💎 ${membershipIntros.length} Membership Intros`);
  console.log(`   🏆 ${membershipPlans.length} Membership Plans`);
  console.log(`   🏥 ${eliteServices.length} Elite Center Services`);
  console.log(`   🧪 ${testEntries.length} Test Entries`);
  console.log(`   👥 ${sampleUsers.length} Sample Users`);
  
  console.log('\n🌐 Access Your New Content:');
  console.log(`   📂 Categories: ${STRAPI_URL}/api/categories`);
  console.log(`   💎 Membership Intros: ${STRAPI_URL}/api/membership-intros`);
  console.log(`   🏆 Membership Plans: ${STRAPI_URL}/api/membership-plans`);
  console.log(`   🏥 Service Pages: ${STRAPI_URL}/api/service-pages`);
  console.log(`   🧪 Test Ones: ${STRAPI_URL}/api/testones`);
  console.log(`   👥 Users: ${STRAPI_URL}/api/users`);
  console.log(`   ⚙️  Admin Panel: ${STRAPI_URL}/admin`);
  
  console.log('\n✨ All endpoints now have realistic sample data!');
}

// Run the specific seeding
seedSpecificEndpoints().catch((error) => {
  console.error('\n❌ Seeding failed:', error.message);
  process.exit(1);
});
