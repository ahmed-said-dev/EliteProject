const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// فتح قاعدة البيانات
const dbPath = path.join(__dirname, '.tmp', 'data.db');
const db = new sqlite3.Database(dbPath);

console.log('🔍 فحص قاعدة بيانات Strapi...\n');

// الحصول على قائمة الجداول
db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
  if (err) {
    console.error('❌ خطأ في قراءة الجداول:', err);
    return;
  }
  
  console.log('📋 الجداول الموجودة:');
  tables.forEach(table => {
    console.log(`   - ${table.name}`);
  });
  console.log('\n');

  // البحث عن جدول المستخدمين الأدمن
  const adminTable = tables.find(t => t.name === 'admin_users');
  if (adminTable) {
    console.log('👤 معلومات المستخدمين الأدمن:\n');
    
    db.all("SELECT * FROM admin_users", (err, users) => {
      if (err) {
        console.error('❌ خطأ في قراءة المستخدمين:', err);
        return;
      }
      
      if (users.length === 0) {
        console.log('❌ لا توجد حسابات أدمن');
      } else {
        users.forEach((user, index) => {
          console.log(`👤 المستخدم ${index + 1}:`);
          console.log(`   📧 البريد الإلكتروني: ${user.email}`);
          console.log(`   👤 الاسم الأول: ${user.firstname || 'غير محدد'}`);
          console.log(`   👤 الاسم الأخير: ${user.lastname || 'غير محدد'}`);
          console.log(`   🔑 اسم المستخدم: ${user.username || 'غير محدد'}`);
          console.log(`   ✅ نشط: ${user.isActive ? 'نعم' : 'لا'}`);
          console.log(`   🚫 محظور: ${user.blocked ? 'نعم' : 'لا'}`);
          console.log(`   🌐 اللغة: ${user.preferedLanguage || 'غير محدد'}`);
          console.log('   ═══════════════════════════════════════\n');
        });
      }
      
      db.close();
    });
  } else {
    console.log('❌ لم يتم العثور على جدول admin_users');
    db.close();
  }
});
