# دليل النشر اليدوي للباك اند - Manual Backend Deployment Guide

## الطريقة الأولى: استخدام الـ Scripts الجديدة

### 🚀 النشر السريع (Quick Sync):
```bash
node quick-deployment-sync.js
```

### 🎯 نشر الباك اند فقط (Backend Only):
```bash
node backend-only-deploy.js
# أو
deploy-backend.bat
```

---

## الطريقة الثانية: الخطوات اليدوية

### 1. رفع التغييرات لـ GitHub:
```bash
git add .
git commit -m "Backend updates - $(date)"
git push origin main
```

### 2. الاتصال بالسيرفر:
```bash
ssh root@134.122.102.182
```

### 3. الانتقال لمجلد المشروع:
```bash
cd /var/www/EliteProject
```

### 4. سحب التحديثات الجديدة:
```bash
git pull origin main --force
```

### 5. تحديث الباك اند:
```bash
cd elite-backend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --production
npm run build
```

### 6. إعادة تشغيل الباك اند:
```bash
pm2 stop elite-backend
pm2 start ecosystem.config.js --only elite-backend
# أو
pm2 start npm --name "elite-backend" -- run start
```

### 7. التحقق من حالة التشغيل:
```bash
pm2 show elite-backend
pm2 logs elite-backend --lines 20
```

### 8. اختبار الـ API:
```bash
curl http://localhost:1337/api/service-pages
```

---

## الطريقة الثالثة: استخدام Server Script

### 1. رفع الـ script للسيرفر:
```bash
scp server-backend-updater.sh root@134.122.102.182:/var/www/EliteProject/
```

### 2. إعطاء صلاحيات التشغيل:
```bash
ssh root@134.122.102.182
chmod +x /var/www/EliteProject/server-backend-updater.sh
```

### 3. تشغيل التحديث:
```bash
/var/www/EliteProject/server-backend-updater.sh
```

---

## 🔧 استكشاف الأخطاء (Troubleshooting)

### إذا لم يعمل الـ PM2:
```bash
pm2 kill
pm2 start /var/www/EliteProject/elite-backend/ecosystem.config.js
```

### إذا لم يتم سحب التغييرات:
```bash
git fetch origin main
git reset --hard origin/main
```

### إذا فشل الـ npm install:
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --production --no-optional
```

### فحص حالة الخدمات:
```bash
pm2 list
pm2 monit
systemctl status nginx
```

---

## 📊 URLs للتحقق من النجاح:

- **Strapi Admin**: http://134.122.102.182:1337/admin/
- **API Base**: http://134.122.102.182:1337/api/
- **Service Pages**: http://134.122.102.182:1337/api/service-pages
- **Blog Articles**: http://134.122.102.182:1337/api/blog-articles

---

## ⚡ نصائح سريعة:

1. **دائماً استخدم `--production` مع npm install**
2. **نظف الـ cache قبل التثبيت الجديد**
3. **تأكد من restart الـ PM2 process**
4. **اختبر الـ API endpoints بعد النشر**
5. **راجع الـ logs إذا واجهت مشاكل**

---

## 🆘 في حالة الطوارئ:

```bash
# إعادة تشغيل كامل للباك اند
pm2 restart elite-backend

# فحص سجلات الأخطاء
pm2 logs elite-backend --err

# إعادة بناء كامل
cd /var/www/EliteProject/elite-backend
npm run build
pm2 restart elite-backend
```
