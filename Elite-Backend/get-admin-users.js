const Database = require('better-sqlite3');
const path = require('path');

// فتح قاعدة البيانات
const dbPath = path.join(__dirname, '.tmp', 'data.db');
const db = new Database(dbPath, { readonly: true });

try {
  console.log('🔍 البحث عن حسابات الأدمن في Strapi...\n');
  
  // الحصول على جميع المستخدمين الأدمن
  const adminUsers = db.prepare(`
    SELECT 
      id,
      firstname,
      lastname,
      username,
      email,
      isActive,
      blocked,
      preferedLanguage,
      created_at,
      updated_at
    FROM admin_users 
    ORDER BY created_at ASC
  `).all();

  if (adminUsers.length === 0) {
    console.log('❌ لم يتم العثور على أي حسابات أدمن');
  } else {
    console.log(`✅ تم العثور على ${adminUsers.length} حساب أدمن:\n`);
    
    adminUsers.forEach((user, index) => {
      console.log(`👤 المستخدم ${index + 1}:`);
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

  // الحصول على أدوار المستخدمين
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

  if (userRoles.length > 0) {
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

} catch (error) {
  console.error('❌ خطأ في قراءة قاعدة البيانات:', error.message);
} finally {
  db.close();
}
