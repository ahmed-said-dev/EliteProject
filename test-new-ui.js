async function testNewArticleUI() {
    const API_URL = 'http://localhost:1337';
    
    try {
        console.log('🎨 Testing New Article UI Design...\n');

        // جلب المقالات للاختبار
        const response = await fetch(`${API_URL}/api/blog-articles?locale=en&populate=*&pagination[pageSize]=5`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const articles = data.data || [];
        
        console.log(`📋 Available articles for UI testing: ${articles.length}\n`);

        if (articles.length === 0) {
            console.log('❌ No articles found. Please add some articles first.');
            return;
        }

        // عرض معلومات المقالات المتاحة
        articles.forEach((article, index) => {
            console.log(`${index + 1}. "${article.title}"`);
            console.log(`   📄 Document ID: ${article.documentId}`);
            console.log(`   🖼️ Featured Image: ${article.featuredImage ? 'Available' : 'Default will be used'}`);
            console.log(`   👤 Author: ${article.author?.name || 'Unknown'}`);
            console.log(`   📂 Category: ${article.category?.name || 'Uncategorized'}`);
            console.log(`   🏷️ Tags: ${article.tags?.length || 0} tag(s)`);
            console.log(`   📝 Excerpt: ${article.excerpt ? 'Available' : 'Not available'}`);
            console.log(`   ⏱️ Read Time: ${article.readTime || 'Not specified'}`);
            console.log('');
        });

        console.log('🚀 Frontend URLs to test the new UI:');
        console.log('');
        
        articles.forEach((article, index) => {
            console.log(`${index + 1}. ${article.title}:`);
            console.log(`   🇺🇸 English: http://localhost:3000/media/${article.documentId}`);
            console.log(`   🇸🇦 Arabic:  http://localhost:3000/ar/media/${article.documentId}`);
            console.log('');
        });

        console.log('🎯 New UI Features to Test:');
        console.log('');
        console.log('✨ Hero Section:');
        console.log('   - Full-screen featured image with gradient overlay');
        console.log('   - Floating back button with blur effect');
        console.log('   - Category badge in top corner');
        console.log('   - Article title and excerpt over hero image');
        console.log('   - Author info with avatar/initial');
        console.log('   - Meta information (date, read time, views)');
        console.log('');
        
        console.log('📖 Content Section:');
        console.log('   - Clean white cards with rounded corners');
        console.log('   - Enhanced typography with proper spacing');
        console.log('   - Improved prose styling for article content');
        console.log('');
        
        console.log('🏷️ Tags Section:');
        console.log('   - Gradient tag badges with hover effects');
        console.log('   - Icon header for visual hierarchy');
        console.log('   - Interactive hover animations');
        console.log('');
        
        console.log('🔗 Call-to-Action:');
        console.log('   - Gradient background section');
        console.log('   - Prominent "Explore All Articles" button');
        console.log('   - Encouraging text for user engagement');
        console.log('');

        console.log('🌍 RTL/LTR Support:');
        console.log('   - All components adapt to Arabic (RTL) layout');
        console.log('   - Icons and spacing adjust automatically');
        console.log('   - Test both English and Arabic versions');
        console.log('');

        console.log('📱 Responsive Design:');
        console.log('   - Hero section adapts from 60vh to 70vh on larger screens');
        console.log('   - Typography scales with screen size');
        console.log('   - Mobile-friendly navigation and spacing');
        console.log('   - Touch-friendly interactive elements');
        console.log('');

        console.log('🎨 Visual Enhancements:');
        console.log('   - Smooth transitions and hover effects');
        console.log('   - Professional shadows and blur effects');
        console.log('   - Color-coded elements (blue theme)');
        console.log('   - High contrast for better readability');
        console.log('');

        console.log('⚡ Performance Features:');
        console.log('   - Optimized image loading');
        console.log('   - CSS modules for better performance');
        console.log('   - SEO-friendly meta tags');
        console.log('   - Accessibility improvements');
        console.log('');

        console.log('🔧 Testing Checklist:');
        console.log('');
        console.log('□ Hero image loads correctly');
        console.log('□ Back button navigates properly');
        console.log('□ Category badge displays when available');
        console.log('□ Author avatar/initial shows correctly');
        console.log('□ Article content renders with proper formatting');
        console.log('□ Tags display with hover effects');
        console.log('□ CTA button links to /media page');
        console.log('□ RTL layout works in Arabic');
        console.log('□ Responsive design works on mobile');
        console.log('□ All interactive elements are clickable');
        console.log('');

        console.log('💡 Next Steps:');
        console.log('1. Start frontend: cd elite-frontend && npm run dev');
        console.log('2. Test the URLs above');
        console.log('3. Check both English and Arabic versions');
        console.log('4. Test on different screen sizes');
        console.log('5. Verify all interactive elements work');
        console.log('');
        
        console.log('✅ New article UI is ready for testing!');

    } catch (error) {
        console.log(`❌ Test failed: ${error.message}`);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('💡 Make sure Strapi is running: cd elite-backend && npm run develop');
        }
    }
}

testNewArticleUI();
