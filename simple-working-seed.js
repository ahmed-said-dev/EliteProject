// Simple Working Seed Script - Focus on Endpoints that Work
// Based on the successful endpoints we identified

console.log('✅ Elite Vet - Simple Working Data Seeder');
console.log('==========================================\n');

const http = require('http');
const STRAPI_URL = 'http://134.122.102.182:8080';
const API_URL = `${STRAPI_URL}/api`;

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
      res.on('data', (chunk) => { responseData += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function createEntry(endpoint, data, description = '') {
  try {
    console.log(`📝 Creating ${description || endpoint}...`);
    const response = await makeRequest(`${API_URL}/${endpoint}`, data);
    
    if (response.status >= 200 && response.status < 300) {
      console.log(`✅ SUCCESS - ${endpoint}: ${response.data.data?.id || 'Created'}`);
      return response.data.data;
    } else {
      console.log(`❌ FAILED - ${endpoint} (${response.status}): ${description}`);
      return null;
    }
  } catch (error) {
    console.error(`💥 ERROR - ${endpoint}:`, error.message);
    return null;
  }
}

async function seedWorkingEndpoints() {
  console.log('🔗 Using endpoints that we know work...\n');

  // 1. MORE DOCTORS (we know this works!)
  const moreDoctors = [
    { name: 'Dr. Amara Al-Qahtani', specialty: 'Feline Medicine Specialist', locale: 'en' },
    { name: 'Dr. Saad Al-Harbi', specialty: 'Canine Behavioral Specialist', locale: 'en' },
    { name: 'Dr. Lina Al-Rashid', specialty: 'Avian & Exotic Medicine', locale: 'en' },
    { name: 'Dr. Majed Al-Otaibi', specialty: 'Emergency & Trauma Surgeon', locale: 'en' },
    { name: 'Dr. Noura Al-Mansouri', specialty: 'Veterinary Anesthesiologist', locale: 'en' },
    { name: 'Dr. Faisal Al-Dosari', specialty: 'Veterinary Radiologist', locale: 'en' },
    { name: 'Dr. Hanan Al-Shehri', specialty: 'Pet Nutrition Consultant', locale: 'en' },
    { name: 'Dr. Turki Al-Ghamdi', specialty: 'Veterinary Pathologist', locale: 'en' },
    { name: 'Dr. Maryam Al-Zahrani', specialty: 'Reproductive Medicine Specialist', locale: 'en' },
    { name: 'Dr. Abdullah Al-Malki', specialty: 'Veterinary Oncologist', locale: 'en' }
  ];

  console.log('🩺 Creating MORE doctors...');
  for (const doctor of moreDoctors) {
    await createEntry('doctor-homes', doctor, doctor.name);
  }

  // 2. MORE TEAM MEMBERS (we know this works!)
  const moreTeam = [
    { name: 'Dr. Reem Al-Saud', position: 'Senior Veterinary Technician', isActive: true, animationDelay: '1.4s' },
    { name: 'Nurse Sarah Al-Farisi', position: 'Head Veterinary Nurse', isActive: true, animationDelay: '1.6s' },
    { name: 'Tech. Ahmed Al-Qasimi', position: 'Laboratory Technician', isActive: true, animationDelay: '1.8s' },
    { name: 'Dr. Huda Al-Thani', position: 'Emergency Response Coordinator', isActive: true, animationDelay: '2.0s' },
    { name: 'Admin. Fatima Al-Kuwari', position: 'Client Relations Manager', isActive: true, animationDelay: '2.2s' },
    { name: 'Tech. Omar Al-Sabah', position: 'Surgical Assistant', isActive: true, animationDelay: '2.4s' },
    { name: 'Dr. Latifa Al-Maktoum', position: 'Preventive Care Specialist', isActive: true, animationDelay: '2.6s' },
    { name: 'Coord. Nasser Al-Rashid', position: 'Patient Care Coordinator', isActive: true, animationDelay: '2.8s' }
  ];

  console.log('\n👥 Creating MORE team members...');
  for (const member of moreTeam) {
    await createEntry('team-members', member, member.name);
  }

  // 3. Let's try some simplified content for endpoints that might work
  console.log('\n🧪 Trying simplified data for other endpoints...');

  // Try simple category structure
  const simpleCategories = [
    { name: 'Surgery', description: 'Surgical procedures' },
    { name: 'Emergency', description: 'Emergency services' },
    { name: 'Dental', description: 'Dental care' },
    { name: 'Grooming', description: 'Pet grooming' }
  ];

  console.log('\n📂 Trying simple categories...');
  for (const category of simpleCategories) {
    await createEntry('categories', category, category.name);
  }

  // Try simple service structure
  const simpleServices = [
    { title: 'Emergency Surgery', description: 'Urgent surgical procedures' },
    { title: 'Wellness Checkup', description: 'Complete health examination' },
    { title: 'Dental Cleaning', description: 'Professional dental care' },
    { title: 'Pet Grooming', description: 'Full grooming service' }
  ];

  console.log('\n🏥 Trying simple services...');
  for (const service of simpleServices) {
    await createEntry('service-pages', service, service.title);
  }

  // Try simple membership plans
  const simplePlans = [
    { name: 'Basic Plan', description: 'Essential pet care', price: 199 },
    { name: 'Premium Plan', description: 'Comprehensive pet care', price: 399 },
    { name: 'Elite Plan', description: 'Ultimate pet care', price: 699 }
  ];

  console.log('\n💎 Trying simple membership plans...');
  for (const plan of simplePlans) {
    await createEntry('membership-plans', plan, plan.name);
  }

  // Try simple test entries
  const simpleTests = [
    { title: 'API Test', description: 'Testing API connectivity' },
    { title: 'DB Test', description: 'Testing database' },
    { title: 'Auth Test', description: 'Testing authentication' }
  ];

  console.log('\n🔧 Trying simple test entries...');
  for (const test of simpleTests) {
    await createEntry('testones', test, test.title);
  }

  console.log('\n🎯 Working Endpoints Summary:');
  console.log('================================');
  console.log('✅ doctor-homes: Always works');
  console.log('✅ team-members: Always works');
  console.log('❓ categories: Testing simple structure');
  console.log('❓ service-pages: Testing simple structure');
  console.log('❓ membership-plans: Testing simple structure');
  console.log('❓ testones: Testing simple structure');
  console.log('❌ users: Needs authentication');

  console.log('\n🌐 Check your updated content:');
  console.log(`📋 Doctors: ${STRAPI_URL}/api/doctor-homes`);
  console.log(`👥 Team: ${STRAPI_URL}/api/team-members`);
  console.log(`📂 Categories: ${STRAPI_URL}/api/categories`);
  console.log(`🏥 Services: ${STRAPI_URL}/api/service-pages`);
  console.log(`💎 Plans: ${STRAPI_URL}/api/membership-plans`);
  console.log(`🔧 Tests: ${STRAPI_URL}/api/testones`);
  console.log(`⚙️ Admin: ${STRAPI_URL}/admin`);
}

seedWorkingEndpoints().catch(console.error);
