const axios = require('axios');

// تكوين API
const API_URL = 'http://localhost:1337';

async function addSampleArticle() {
    try {
        console.log('🔄 Adding sample article for testing...');

        // تحقق من الاتصال بـ Strapi
        try {
            await axios.get(`${API_URL}/admin`);
            console.log('✅ Strapi is running');
        } catch (error) {
            console.log('❌ Strapi is not running. Please start it first.');
            return;
        }

        // البحث عن categories موجودة
        let categoryId = null;
        try {
            const categoriesResponse = await axios.get(`${API_URL}/api/blog-categories?locale=en`);
            if (categoriesResponse.data.data && categoriesResponse.data.data.length > 0) {
                categoryId = categoriesResponse.data.data[0].id;
                console.log('✅ Found category:', categoriesResponse.data.data[0].name);
            }
        } catch (error) {
            console.log('⚠️ No categories found');
        }

        // البحث عن authors موجودين
        let authorId = null;
        try {
            const authorsResponse = await axios.get(`${API_URL}/api/authors?locale=en`);
            if (authorsResponse.data.data && authorsResponse.data.data.length > 0) {
                authorId = authorsResponse.data.data[0].id;
                console.log('✅ Found author:', authorsResponse.data.data[0].name);
            }
        } catch (error) {
            console.log('⚠️ No authors found');
        }

        // بيانات المقالة
        const articleData = {
            title: 'Pet Health and Wellness Guide',
            slug: 'pet-health-wellness-guide',
            content: `
                <h1>Complete Guide to Pet Health and Wellness</h1>
                
                <p>Maintaining your pet's health and wellness is one of the most important responsibilities of being a pet owner. This comprehensive guide will help you understand the essential aspects of keeping your furry, feathered, or scaled companions healthy and happy.</p>
                
                <h2>Regular Health Checkups</h2>
                
                <p>Regular veterinary checkups are the foundation of preventive healthcare for pets. Adult pets should visit the veterinarian at least once a year, while senior pets (over 7 years old) should have checkups twice a year.</p>
                
                <h3>What to Expect During a Checkup:</h3>
                <ul>
                    <li>Physical examination from nose to tail</li>
                    <li>Weight and body condition assessment</li>
                    <li>Dental examination</li>
                    <li>Heart and lung function check</li>
                    <li>Discussion of diet and exercise</li>
                    <li>Vaccination updates if needed</li>
                </ul>
                
                <h2>Nutrition and Diet</h2>
                
                <p>Proper nutrition is crucial for your pet's overall health and longevity. The dietary needs of pets vary based on their species, age, size, activity level, and health status.</p>
                
                <h3>Key Nutritional Guidelines:</h3>
                <ul>
                    <li>Choose high-quality pet food appropriate for your pet's life stage</li>
                    <li>Maintain proper portion sizes to prevent obesity</li>
                    <li>Provide fresh water daily</li>
                    <li>Avoid toxic foods (chocolate, grapes, onions for dogs)</li>
                    <li>Consider special diets for pets with health conditions</li>
                </ul>
                
                <h2>Exercise and Mental Stimulation</h2>
                
                <p>Physical exercise and mental stimulation are essential for your pet's physical and psychological well-being. Different pets have different exercise requirements.</p>
                
                <h3>Exercise Guidelines by Pet Type:</h3>
                <ul>
                    <li><strong>Dogs:</strong> Daily walks, playtime, and activities appropriate for their breed</li>
                    <li><strong>Cats:</strong> Interactive toys, climbing structures, and hunting games</li>
                    <li><strong>Birds:</strong> Flight time, foraging activities, and social interaction</li>
                    <li><strong>Small mammals:</strong> Safe exploration time and appropriate toys</li>
                </ul>
                
                <h2>Preventive Care</h2>
                
                <p>Prevention is always better than treatment. Key preventive measures include:</p>
                
                <ul>
                    <li>Up-to-date vaccinations</li>
                    <li>Regular parasite prevention (fleas, ticks, worms)</li>
                    <li>Dental care and regular teeth cleaning</li>
                    <li>Grooming and skin care</li>
                    <li>Spaying or neutering (when appropriate)</li>
                </ul>
                
                <h2>Warning Signs to Watch For</h2>
                
                <p>Being aware of changes in your pet's behavior or appearance can help you catch health issues early:</p>
                
                <ul>
                    <li>Changes in appetite or water consumption</li>
                    <li>Lethargy or decreased activity</li>
                    <li>Vomiting or diarrhea</li>
                    <li>Difficulty breathing</li>
                    <li>Changes in urination or bowel movements</li>
                    <li>Unusual behavioral changes</li>
                    <li>Limping or difficulty moving</li>
                </ul>
                
                <h2>Creating a Pet-Safe Environment</h2>
                
                <p>Your home environment plays a crucial role in your pet's health and safety:</p>
                
                <ul>
                    <li>Remove or secure toxic plants and substances</li>
                    <li>Provide appropriate temperature control</li>
                    <li>Ensure adequate lighting and ventilation</li>
                    <li>Create safe spaces for rest and privacy</li>
                    <li>Use pet-safe cleaning products</li>
                </ul>
                
                <h2>Conclusion</h2>
                
                <p>At Elite Veterinary Clinic, we believe that informed pet owners are the key to happy, healthy pets. Regular veterinary care, combined with proper nutrition, exercise, and a safe environment, will help ensure your pet lives a long and fulfilling life.</p>
                
                <p>Remember, every pet is unique, and what works for one may not work for another. Always consult with your veterinarian to develop a healthcare plan tailored specifically to your pet's needs.</p>
            `,
            excerpt: 'A comprehensive guide covering all aspects of pet health and wellness, including regular checkups, nutrition, exercise, preventive care, and creating a safe environment for your beloved companions.',
            publishDate: new Date().toISOString().split('T')[0],
            readTime: '8 min read',
            featured: true,
            publishedAt: new Date().toISOString(),
            locale: 'en'
        };

        // إضافة category و author إذا توفرا
        if (categoryId) {
            articleData.category = categoryId;
        }
        
        if (authorId) {
            articleData.author = authorId;
        }

        // إنشاء المقالة
        const response = await axios.post(`${API_URL}/api/blog-articles`, {
            data: articleData
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.data) {
            const article = response.data.data;
            console.log('✅ Sample article created successfully!');
            console.log(`📄 Article ID: ${article.id}`);
            console.log(`📄 Article Title: ${article.title}`);
            console.log(`📄 Article Slug: ${article.slug}`);
            console.log(`🌐 Test URLs:`);
            console.log(`   - By ID: http://localhost:3000/media/${article.id}`);
            console.log(`   - By Slug: http://localhost:3000/media/${article.slug}`);
            console.log(`🔍 API Test URLs:`);
            console.log(`   - By ID: ${API_URL}/api/blog-articles/${article.id}?populate=*&locale=en`);
            console.log(`   - By Slug: ${API_URL}/api/blog-articles/${article.slug}?populate=*&locale=en`);
            
            return article;
        }

    } catch (error) {
        console.error('❌ Error adding sample article:', error.message);
        
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', JSON.stringify(error.response.data, null, 2));
        }
        
        throw error;
    }
}

// تشغيل الدالة
if (require.main === module) {
    addSampleArticle()
        .then(() => {
            console.log('🎉 Sample article added successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Failed to add sample article:', error.message);
            process.exit(1);
        });
}

module.exports = { addSampleArticle };
