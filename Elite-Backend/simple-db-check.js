const fs = require('fs');
const path = require('path');

// التحقق من وجود قاعدة البيانات
const dbPath = path.join(__dirname, '.tmp', 'data.db');

console.log('🔍 فحص قاعدة بيانات Strapi...\n');
console.log(`📍 مسار قاعدة البيانات: ${dbPath}\n`);

if (fs.existsSync(dbPath)) {
  const stats = fs.statSync(dbPath);
  console.log('✅ قاعدة البيانات موجودة');
  console.log(`📊 حجم الملف: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📅 آخر تعديل: ${stats.mtime.toLocaleString('ar-EG')}\n`);
  
  // محاولة استخدام better-sqlite3
  try {
    const Database = require('better-sqlite3');
    const db = new Database(dbPath, { readonly: true });
    
    console.log('🔗 تم الاتصال بقاعدة البيانات بنجاح\n');
    
    // الحصول على قائمة الجداول
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();
    
    console.log('📋 الجداول الموجودة:');
    tables.forEach(table => {
      console.log(`   - ${table.name}`);
    });
    console.log('\n');
    
    // فحص جدول admin_users
    const adminTableExists = tables.some(t => t.name === 'admin_users');
    
    if (adminTableExists) {
      console.log('👤 معلومات المستخدمين الأدمن:\n');
      
      const users = db.prepare("SELECT id, email, firstname, lastname, username, isActive, blocked, preferedLanguage, created_at, updated_at FROM admin_users").all();
      
      if (users.length === 0) {
        console.log('❌ لا توجد حسابات أدمن مسجلة');
      } else {
        console.log(`✅ تم العثور على ${users.length} حساب أدمن:\n`);
        
        users.forEach((user, index) => {
          console.log(`👤 المستخدم ${index + 1}:`);
          console.log(`   🆔 المعرف: ${user.id}`);
          console.log(`   📧 البريد الإلكتروني: ${user.email}`);
          console.log(`   👤 الاسم الأول: ${user.firstname || 'غير محدد'}`);
          console.log(`   👤 الاسم الأخير: ${user.lastname || 'غير محدد'}`);
          console.log(`   🔑 اسم المستخدم: ${user.username || 'غير محدد'}`);
          console.log(`   ✅ نشط: ${user.isActive ? 'نعم' : 'لا'}`);
          console.log(`   🚫 محظور: ${user.blocked ? 'نعم' : 'لا'}`);
          console.log(`   🌐 اللغة المفضلة: ${user.preferedLanguage || 'غير محدد'}`);
          console.log(`   📅 تاريخ الإنشاء: ${new Date(user.created_at).toLocaleString('ar-EG')}`);
          console.log(`   🔄 آخر تحديث: ${new Date(user.updated_at).toLocaleString('ar-EG')}`);
          console.log('   ═══════════════════════════════════════\n');
        });
      }
      
      // فحص الأدوار
      const rolesTableExists = tables.some(t => t.name === 'admin_roles');
      const userRolesTableExists = tables.some(t => t.name === 'admin_users_roles_links');
      
      if (rolesTableExists && userRolesTableExists) {
        console.log('🔐 أدوار المستخدمين:\n');
        
        const userRoles = db.prepare(`
          SELECT 
            au.email,
            au.firstname,
            au.lastname,
            ar.name as role_name,
            ar.description as role_description
          FROM admin_users au
          LEFT JOIN admin_users_roles_links aurl ON au.id = aurl.user_id
          LEFT JOIN admin_roles ar ON aurl.role_id = ar.id
          ORDER BY au.email, ar.name
        `).all();
        
        const groupedRoles = {};
        userRoles.forEach(role => {
          const userKey = role.email;
          if (!groupedRoles[userKey]) {
            groupedRoles[userKey] = {
              email: role.email,
              name: `${role.firstname || ''} ${role.lastname || ''}`.trim(),
              roles: []
            };
          }
          if (role.role_name) {
            groupedRoles[userKey].roles.push({
              name: role.role_name,
              description: role.role_description
            });
          }
        });

        Object.values(groupedRoles).forEach(user => {
          console.log(`👤 ${user.name || user.email}:`);
          if (user.roles.length > 0) {
            user.roles.forEach(role => {
              console.log(`   🎭 الدور: ${role.name}`);
              console.log(`   📝 الوصف: ${role.description || 'غير محدد'}`);
            });
          } else {
            console.log('   ⚠️  لا توجد أدوار مخصصة');
          }
          console.log('   ═══════════════════════════════════════\n');
        });
      }
      
    } else {
      console.log('❌ لم يتم العثور على جدول admin_users');
    }
    
    db.close();
    
  } catch (error) {
    console.error('❌ خطأ في الاتصال بقاعدة البيانات:', error.message);
  }
  
} else {
  console.log('❌ قاعدة البيانات غير موجودة');
  console.log('💡 تأكد من تشغيل Strapi مرة واحدة على الأقل لإنشاء قاعدة البيانات');
}
