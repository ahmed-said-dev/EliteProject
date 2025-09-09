// Simple test to check if backend is running and add a test article
const fetch = require('node-fetch');

async function quickTest() {
  try {
    console.log('🔍 Checking backend status...');
    
    // Test basic connection
    const response = await fetch('http://localhost:1337/api/blog-articles');
    
    if (!response.ok) {
      console.log('❌ Backend not running. Please start it with: cd elite-backend && npm run develop');
      return;
    }
    
    console.log('✅ Backend is running!');
    
    // Try to create the test-222 article directly
    const testArticle = {
      data: {
        title: "تقنيات حديثة في الطب البيطري",
        slug: "test-222",
        content: "## تقنيات حديثة في الطب البيطري\n\nالطب البيطري يشهد تطوراً مستمراً مع ظهور تقنيات جديدة تساعد في تشخيص وعلاج الحيوانات بطريقة أكثر دقة وفعالية.\n\n### التصوير بالرنين المغناطيسي\n- تشخيص دقيق للأمراض الداخلية\n- فحص الدماغ والحبل الشوكي\n- تصوير المفاصل والعضلات\n\n### الجراحة بالمنظار\n- جراحات أقل تدخلاً\n- شفاء أسرع للحيوان\n- تقليل المضاعفات\n\n### العلاج بالليزر\n- علاج الالتهابات\n- تسريع عملية الشفاء\n- تقليل الألم\n\nهذه التقنيات تساعد الأطباء البيطريين في تقديم رعاية أفضل وأكثر تطوراً للحيوانات الأليفة.",
        excerpt: "استكشاف أحدث التقنيات والأدوات المستخدمة في الطب البيطري الحديث",
        publishDate: "2024-02-15",
        readTime: "8 دقائق",
        featured: true,
        locale: "ar",
        publishedAt: new Date().toISOString()
      }
    };
    
    const createResponse = await fetch('http://localhost:1337/api/blog-articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testArticle)
    });
    
    if (createResponse.ok) {
      const data = await createResponse.json();
      console.log('✅ Test article created successfully!');
      console.log(`📝 Article ID: ${data.data.id}`);
      console.log(`🔗 You can now access: http://localhost:3000/media/test-222`);
    } else {
      const errorData = await createResponse.json();
      console.log('⚠️ Could not create test article:', errorData);
    }
    
  } catch (error) {
    console.log('❌ Error:', error.message);
    console.log('💡 Make sure to start the backend first: cd elite-backend && npm run develop');
  }
}

quickTest();
