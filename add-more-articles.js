const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:1337/api';

// Additional articles data with proper slugs including test-222
const additionalArticles = [
  {
    title: "تقنيات حديثة في الطب البيطري",
    slug: "test-222",
    excerpt: "استكشاف أحدث التقنيات والأدوات المستخدمة في الطب البيطري الحديث",
    content: `## تقنيات حديثة في الطب البيطري

الطب البيطري يشهد تطوراً مستمراً مع ظهور تقنيات جديدة تساعد في تشخيص وعلاج الحيوانات بطريقة أكثر دقة وفعالية.

### التصوير بالرنين المغناطيسي
- تشخيص دقيق للأمراض الداخلية
- فحص الدماغ والحبل الشوكي
- تصوير المفاصل والعضلات

### الجراحة بالمنظار
- جراحات أقل تدخلاً
- شفاء أسرع للحيوان
- تقليل المضاعفات

### العلاج بالليزر
- علاج الالتهابات
- تسريع عملية الشفاء
- تقليل الألم

### التحاليل الجينية
- تشخيص الأمراض الوراثية
- اختيار العلاج المناسب
- الوقاية من الأمراض

هذه التقنيات تساعد الأطباء البيطريين في تقديم رعاية أفضل وأكثر تطوراً للحيوانات الأليفة.`,
    publishDate: "2024-02-15",
    readTime: "8 دقائق",
    featured: true,
    locale: "ar",
    categoryName: "تقنية",
    authorName: "د. أحمد محمد"
  },
  {
    title: "العناية بالحيوانات المسنة",
    slug: "elderly-pets-care-ar",
    excerpt: "نصائح خاصة للعناية بالحيوانات الأليفة في سن الشيخوخة وتوفير الراحة لها",
    content: `## العناية بالحيوانات المسنة

الحيوانات المسنة تحتاج لعناية خاصة ومختلفة عن الحيوانات الصغيرة.

### علامات الشيخوخة
- بطء في الحركة
- تغيير في النوم
- فقدان السمع أو البصر
- تغيير في الشهية

### التغذية المناسبة
- طعام سهل الهضم
- مكملات غذائية للمفاصل
- كميات أقل ووجبات أكثر
- ماء نظيف متاح دائماً

### الرعاية الصحية
- فحوصات دورية أكثر تكراراً
- مراقبة الوزن
- عناية بالأسنان
- علاج الألم إذا لزم الأمر

### بيئة مريحة
- فراش ناعم ودافئ
- سهولة الوصول للطعام والماء
- تجنب الدرج العالي
- مكان هادئ للراحة`,
    publishDate: "2024-02-20",
    readTime: "6 دقائق",
    featured: false,
    locale: "ar",
    categoryName: "رعاية",
    authorName: "د. فاطمة علي"
  },
  {
    title: "أمراض الجلد الشائعة في الحيوانات الأليفة",
    slug: "pet-skin-diseases-ar",
    excerpt: "دليل شامل لأمراض الجلد الأكثر شيوعاً في الحيوانات الأليفة وطرق علاجها",
    content: `## أمراض الجلد الشائعة في الحيوانات الأليفة

أمراض الجلد من أكثر المشاكل الصحية شيوعاً في الحيوانات الأليفة.

### الأكزيما والحساسية
- أعراض: حكة، احمرار، تساقط الشعر
- الأسباب: الطعام، البيئة، الطفيليات
- العلاج: مضادات الهيستامين، كريمات موضعية

### الفطريات
- أعراض: بقع دائرية خالية من الشعر
- العدوى: قابلة للانتقال للإنسان
- العلاج: مضادات الفطريات الموضعية والفموية

### البراغيث والقراد
- أعراض: حكة شديدة، نقاط سوداء في الفرو
- الوقاية: استخدام المنتجات المضادة للطفيليات
- العلاج: شامبو خاص، بخاخات، أقراص

### التهاب الجلد التماسي
- الأسباب: مواد كيميائية، نباتات، مواد تنظيف
- الأعراض: احمرار، تورم، بثور
- العلاج: تجنب المسبب، كريمات مهدئة

### نصائح الوقاية
- نظافة منتظمة للحيوان
- فحص الجلد والفرو دورياً
- استخدام منتجات مناسبة للحيوانات
- زيارة الطبيب البيطري عند ظهور أعراض`,
    publishDate: "2024-02-25",
    readTime: "9 دقائق",
    featured: true,
    locale: "ar",
    categoryName: "صحة",
    authorName: "د. أحمد محمد"
  },
  {
    title: "تربية الطيور الأليفة: دليل المبتدئين",
    slug: "pet-birds-guide-ar",
    excerpt: "كل ما تحتاج معرفته عن تربية الطيور الأليفة والعناية بها",
    content: `## تربية الطيور الأليفة: دليل المبتدئين

الطيور حيوانات أليفة رائعة تحتاج لعناية خاصة ومعرفة بطبيعتها.

### اختيار الطائر المناسب
- الكناري: سهل التربية، صوت جميل
- البادجي: ذكي، يمكن تعليمه الكلام
- الكوكاتيل: اجتماعي، يحب التفاعل
- الببغاء: ذكي جداً، يحتاج وقت أكثر

### إعداد القفص
- حجم مناسب للطيران
- قضبان أفقية للتسلق
- أوعية للطعام والماء
- ألعاب وأغصان طبيعية

### التغذية السليمة
- خليط البذور المتوازن
- فواكه وخضروات طازجة
- تجنب الأفوكادو والشوكولاتة
- ماء نظيف يومياً

### الرعاية الصحية
- فحص دوري عند طبيب بيطري متخصص
- مراقبة علامات المرض
- تنظيف القفص بانتظام
- توفير الإضاءة الطبيعية

### التفاعل والتدريب
- قضاء وقت يومي مع الطائر
- التحدث معه بلطف
- تدريبه على الخروج من القفص
- تعليمه حيل بسيطة

### نصائح مهمة
- الصبر في التعامل مع الطائر الجديد
- تجنب الأصوات العالية المفاجئة
- توفير بيئة آمنة للطيران الحر
- الانتباه لتغييرات السلوك`,
    publishDate: "2024-03-01",
    readTime: "11 دقيقة",
    featured: false,
    locale: "ar",
    categoryName: "تربية",
    authorName: "د. فاطمة علي"
  },
  {
    title: "السمنة في الحيوانات الأليفة: الأسباب والحلول",
    slug: "pet-obesity-solutions-ar",
    excerpt: "مشكلة السمنة في الحيوانات الأليفة وكيفية الوقاية منها وعلاجها",
    content: `## السمنة في الحيوانات الأليفة: الأسباب والحلول

السمنة مشكلة صحية خطيرة تؤثر على جودة حياة الحيوانات الأليفة.

### أسباب السمنة
- الإفراط في التغذية
- قلة النشاط والحركة
- العوامل الوراثية
- بعض الأدوية
- التقدم في العمر

### مخاطر السمنة
- أمراض القلب والأوعية الدموية
- مشاكل المفاصل والعظام
- صعوبة في التنفس
- مرض السكري
- تقليل متوسط العمر

### علامات السمنة
- عدم القدرة على الشعور بالضلوع
- فقدان الخصر المحدد
- صعوبة في الحركة
- التعب السريع
- صعوبة في التنفس

### خطة إنقاص الوزن
- استشارة الطبيب البيطري
- حساب السعرات الحرارية المناسبة
- طعام خاص لإنقاص الوزن
- زيادة النشاط تدريجياً
- مراقبة الوزن أسبوعياً

### نصائح الوقاية
- وجبات منتظمة بكميات محددة
- تجنب الإفراط في المكافآت
- ممارسة الرياضة يومياً
- فحص الوزن دورياً
- اختيار طعام عالي الجودة

### أنشطة لإنقاص الوزن
- المشي اليومي للكلاب
- ألعاب تفاعلية للقطط
- السباحة (للكلاب)
- استخدام ألعاب الطعام
- تمارين بسيطة في المنزل`,
    publishDate: "2024-03-05",
    readTime: "10 دقائق",
    featured: true,
    locale: "ar",
    categoryName: "صحة",
    authorName: "د. أحمد محمد"
  }
];

// Function to get or create category
async function getOrCreateCategory(categoryName) {
  try {
    // First, try to find existing category
    const searchResponse = await fetch(`${API_BASE_URL}/blog-categories?filters[name][$eq]=${encodeURIComponent(categoryName)}&locale=ar`);
    const searchData = await searchResponse.json();
    
    if (searchData.data && searchData.data.length > 0) {
      return searchData.data[0];
    }
    
    // If not found, create new category
    const createResponse = await fetch(`${API_BASE_URL}/blog-categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          name: categoryName,
          slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
          locale: 'ar'
        }
      })
    });
    
    const createData = await createResponse.json();
    return createData.data;
  } catch (error) {
    console.error(`Error handling category ${categoryName}:`, error);
    return null;
  }
}

// Function to get or create author
async function getOrCreateAuthor(authorName) {
  try {
    // First, try to find existing author
    const searchResponse = await fetch(`${API_BASE_URL}/blog-authors?filters[name][$eq]=${encodeURIComponent(authorName)}&locale=ar`);
    const searchData = await searchResponse.json();
    
    if (searchData.data && searchData.data.length > 0) {
      return searchData.data[0];
    }
    
    // If not found, create new author
    const email = authorName.includes('أحمد') ? 'ahmed@elitevet.com' : 'fatima@elitevet.com';
    const createResponse = await fetch(`${API_BASE_URL}/blog-authors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          name: authorName,
          email: email,
          bio: `طبيب بيطري متخصص في رعاية الحيوانات الأليفة`,
          locale: 'ar'
        }
      })
    });
    
    const createData = await createResponse.json();
    return createData.data;
  } catch (error) {
    console.error(`Error handling author ${authorName}:`, error);
    return null;
  }
}

// Function to create article
async function createArticle(articleData) {
  try {
    console.log(`Creating article: ${articleData.title}`);
    
    // Get or create category
    const category = await getOrCreateCategory(articleData.categoryName);
    if (!category) {
      console.error(`Failed to get/create category for article: ${articleData.title}`);
      return false;
    }
    
    // Get or create author
    const author = await getOrCreateAuthor(articleData.authorName);
    if (!author) {
      console.error(`Failed to get/create author for article: ${articleData.title}`);
      return false;
    }
    
    // Create article
    const response = await fetch(`${API_BASE_URL}/blog-articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          title: articleData.title,
          slug: articleData.slug,
          content: articleData.content,
          excerpt: articleData.excerpt,
          publishDate: articleData.publishDate,
          readTime: articleData.readTime,
          featured: articleData.featured,
          locale: articleData.locale,
          category: category.id,
          author: author.id,
          publishedAt: new Date().toISOString()
        }
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Successfully created article: ${articleData.title} (ID: ${data.data.id})`);
      return true;
    } else {
      const errorData = await response.json();
      console.error(`❌ Failed to create article: ${articleData.title}`, errorData);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error creating article ${articleData.title}:`, error);
    return false;
  }
}

// Main function to add all articles
async function addAllArticles() {
  console.log('🚀 Starting to add articles to the backend...\n');
  
  let successCount = 0;
  let failureCount = 0;
  
  for (const article of additionalArticles) {
    const success = await createArticle(article);
    if (success) {
      successCount++;
    } else {
      failureCount++;
    }
    
    // Add a small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n📊 Summary:');
  console.log(`✅ Successfully created: ${successCount} articles`);
  console.log(`❌ Failed to create: ${failureCount} articles`);
  console.log(`📝 Total articles processed: ${additionalArticles.length}`);
  
  if (successCount > 0) {
    console.log('\n🎉 Articles have been successfully added to the backend!');
    console.log('You can now access them at:');
    additionalArticles.forEach(article => {
      console.log(`- http://localhost:3000/media/${article.slug}`);
    });
  }
}

// Run the script
addAllArticles().catch(console.error);
