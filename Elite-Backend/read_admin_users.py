import sqlite3
import os
from datetime import datetime

# مسار قاعدة البيانات
db_path = os.path.join(os.path.dirname(__file__), '.tmp', 'data.db')

print('🔍 البحث عن حسابات الأدمن في Strapi...\n')
print(f'📍 مسار قاعدة البيانات: {db_path}\n')

if not os.path.exists(db_path):
    print('❌ قاعدة البيانات غير موجودة')
    print('💡 تأكد من تشغيل Strapi مرة واحدة على الأقل لإنشاء قاعدة البيانات')
    exit(1)

try:
    # الاتصال بقاعدة البيانات
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    print('✅ تم الاتصال بقاعدة البيانات بنجاح\n')
    
    # الحصول على قائمة الجداول
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
    tables = cursor.fetchall()
    
    print('📋 الجداول الموجودة:')
    for table in tables:
        print(f'   - {table[0]}')
    print()
    
    # فحص وجود جدول admin_users
    admin_table_exists = any('admin_users' in table[0] for table in tables)
    
    if admin_table_exists:
        print('👤 معلومات المستخدمين الأدمن:\n')
        
        # الحصول على بيانات المستخدمين الأدمن
        cursor.execute("""
            SELECT 
                id, email, firstname, lastname, username, 
                isActive, blocked, preferedLanguage, 
                created_at, updated_at
            FROM admin_users 
            ORDER BY created_at ASC
        """)
        
        users = cursor.fetchall()
        
        if not users:
            print('❌ لا توجد حسابات أدمن مسجلة')
        else:
            print(f'✅ تم العثور على {len(users)} حساب أدمن:\n')
            
            for i, user in enumerate(users, 1):
                id, email, firstname, lastname, username, isActive, blocked, prefLang, created_at, updated_at = user
                
                print(f'👤 المستخدم {i}:')
                print(f'   🆔 المعرف: {id}')
                print(f'   📧 البريد الإلكتروني: {email}')
                print(f'   👤 الاسم الأول: {firstname or "غير محدد"}')
                print(f'   👤 الاسم الأخير: {lastname or "غير محدد"}')
                print(f'   🔑 اسم المستخدم: {username or "غير محدد"}')
                print(f'   ✅ نشط: {"نعم" if isActive else "لا"}')
                print(f'   🚫 محظور: {"نعم" if blocked else "لا"}')
                print(f'   🌐 اللغة المفضلة: {prefLang or "غير محدد"}')
                
                if created_at:
                    try:
                        created_date = datetime.fromisoformat(created_at.replace('Z', '+00:00'))
                        print(f'   📅 تاريخ الإنشاء: {created_date.strftime("%Y-%m-%d %H:%M:%S")}')
                    except:
                        print(f'   📅 تاريخ الإنشاء: {created_at}')
                
                if updated_at:
                    try:
                        updated_date = datetime.fromisoformat(updated_at.replace('Z', '+00:00'))
                        print(f'   🔄 آخر تحديث: {updated_date.strftime("%Y-%m-%d %H:%M:%S")}')
                    except:
                        print(f'   🔄 آخر تحديث: {updated_at}')
                
                print('   ═══════════════════════════════════════\n')
        
        # فحص الأدوار
        roles_table_exists = any('admin_roles' in table[0] for table in tables)
        user_roles_table_exists = any('admin_users_roles_links' in table[0] for table in tables)
        
        if roles_table_exists and user_roles_table_exists:
            print('🔐 أدوار المستخدمين:\n')
            
            cursor.execute("""
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
            """)
            
            user_roles = cursor.fetchall()
            
            # تجميع الأدوار حسب المستخدم
            grouped_roles = {}
            for role in user_roles:
                email, firstname, lastname, role_name, role_desc = role
                user_key = email
                
                if user_key not in grouped_roles:
                    grouped_roles[user_key] = {
                        'email': email,
                        'name': f'{firstname or ""} {lastname or ""}'.strip(),
                        'roles': []
                    }
                
                if role_name:
                    grouped_roles[user_key]['roles'].append({
                        'name': role_name,
                        'description': role_desc
                    })
            
            for user_data in grouped_roles.values():
                print(f'👤 {user_data["name"] or user_data["email"]}:')
                if user_data['roles']:
                    for role in user_data['roles']:
                        print(f'   🎭 الدور: {role["name"]}')
                        print(f'   📝 الوصف: {role["description"] or "غير محدد"}')
                else:
                    print('   ⚠️  لا توجد أدوار مخصصة')
                print('   ═══════════════════════════════════════\n')
        
        # معلومات إضافية عن الأدوار المتاحة
        if roles_table_exists:
            cursor.execute("SELECT name, description FROM admin_roles ORDER BY name")
            all_roles = cursor.fetchall()
            
            if all_roles:
                print('🎭 جميع الأدوار المتاحة في النظام:\n')
                for role_name, role_desc in all_roles:
                    print(f'   • {role_name}: {role_desc or "بدون وصف"}')
                print()
    
    else:
        print('❌ لم يتم العثور على جدول admin_users')
        print('💡 قد تحتاج إلى تشغيل Strapi وإنشاء حساب أدمن أولاً')

except sqlite3.Error as e:
    print(f'❌ خطأ في قاعدة البيانات: {e}')
except Exception as e:
    print(f'❌ خطأ عام: {e}')
finally:
    if 'conn' in locals():
        conn.close()
        print('🔒 تم إغلاق الاتصال بقاعدة البيانات')
