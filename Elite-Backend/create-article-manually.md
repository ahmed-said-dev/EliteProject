# إنشاء مقالة يدوياً من Strapi Admin

## خطوات إنشاء المقالة:

### 1. الدخول إلى Admin Panel
- اذهب إلى: http://localhost:1337/admin
- سجل دخول

### 2. إنشاء المقالة
1. من الشريط الجانبي، اختر **Content Manager**
2. تحت **Collection Types**، اختر **Blog Article**
3. اضغط **Create new entry**

### 3. ملء بيانات المقالة
```
Title: Test Article for Development
Slug: test-article-dev

Content: (انسخ والصق هذا المحتوى)
<h1>Test Article for Development</h1>
<p>This is a test article created for testing the blog detail page functionality.</p>

<h2>Article Content</h2>
<p>This article contains various content to test the display of:</p>
<ul>
    <li>Headings and paragraphs</li>
    <li>Lists and formatting</li>
    <li>Images and media</li>
    <li>Links and references</li>
</ul>

<h3>Technical Details</h3>
<p>The article detail page should properly display:</p>
<ol>
    <li>Article title and metadata</li>
    <li>Author information</li>
    <li>Publication date and read time</li>
    <li>Article content with proper formatting</li>
    <li>Tags and categories</li>
</ol>

<blockquote>
    <p>This is a test blockquote to verify proper styling of quoted content.</p>
</blockquote>

<p>The page should work correctly in both Arabic and English locales, with proper RTL support when needed.</p>

Excerpt: A comprehensive test article to verify the functionality of the blog detail page in both Arabic and English locales.

Publish Date: 2025-01-15
Read Time: 3 min read
Featured: false (غير مفعل)
```

### 4. حفظ ونشر المقالة
1. اضغط **Save** 
2. اضغط **Publish** في الأعلى

### 5. اختبار المقالة
بعد النشر، ستحصل على ID المقالة. استخدمه لاختبار:
- Frontend: http://localhost:3000/media/1 (أو ID المقالة)
- Frontend: http://localhost:3000/media/test-article-dev
- API: http://localhost:1337/api/blog-articles/1?populate=*&locale=en
