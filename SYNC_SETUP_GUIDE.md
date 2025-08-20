# 🔄 Elite Project - Sync Setup Guide

## نظام التزامن بين المشروع المحلي والسيرفر

هذا الدليل يوضح كيفية إعداد نظام تزامن تلقائي بين مشروعك المحلي والسيرفر.

---

## 📋 **المتطلبات الأساسية**

- [x] مشروع محلي متصل بـ GitHub
- [x] سيرفر DigitalOcean مع SSH access
- [x] Node.js مثبت محلياً وعلى السيرفر
- [x] Git مثبت محلياً وعلى السيرفر

---

## 🚀 **الإعداد السريع (خطوتين فقط)**

### 1️⃣ **تحضير الملفات على السيرفر**

```bash
# SSH إلى السيرفر
ssh root@134.122.102.182

# انتقل لمجلد المشروع
cd /var/www/EliteProject

# إنشاء ملف auto-deploy
nano server-auto-deploy.sh
```

**انسخ محتويات `server-auto-deploy.sh` من هذا المجلد إلى الملف**

```bash
# جعل الملف قابل للتنفيذ
chmod +x server-auto-deploy.sh

# تجربة التشغيل
./server-auto-deploy.sh
```

### 2️⃣ **إعداد الـ Scripts المحلية**

```bash
# في مجلد المشروع المحلي
npm install

# تجربة الـ sync
npm run sync

# تجربة الـ deployment
npm run deploy
```

---

## ⚡ **الاستخدام اليومي**

### 📥 **جلب التحديثات من السيرفر**
```bash
npm run sync
```

### 📤 **رفع التعديلات للسيرفر**
```bash
npm run deploy
```

### 🔄 **رفع سريع**
```bash
npm run quick-push
```

---

## 🤖 **التزامن التلقائي (اختياري)**

### إعداد Webhook Server على السيرفر:

```bash
# على السيرفر
cd /var/www/EliteProject
node webhook-server.js &

# أو باستخدام PM2
pm2 start webhook-server.js --name "webhook-server"
```

### إعداد GitHub Webhook:

1. اذهب إلى GitHub repository settings
2. Webhooks → Add webhook
3. Payload URL: `http://134.122.102.182:9000/webhook`
4. Content type: `application/json`
5. Events: Just the push event
6. Active: ✅

---

## 📚 **الأوامر المتاحة**

### 🔧 **أوامر التطوير المحلي:**
```bash
npm run dev:frontend      # تشغيل Frontend محلياً
npm run dev:backend       # تشغيل Backend محلياً  
npm run dev:store-backend # تشغيل Store Backend محلياً
npm run dev:admin         # تشغيل Admin Dashboard محلياً
```

### 🏗️ **أوامر البناء:**
```bash
npm run build:frontend      # بناء Frontend
npm run build:backend       # بناء Backend
npm run build:store-backend # بناء Store Backend
npm run build:admin         # بناء Admin Dashboard
npm run build:all           # بناء كل المشاريع
```

### 🚀 **أوامر النشر:**
```bash
npm run sync          # جلب آخر التحديثات
npm run deploy        # نشر كامل مع commit
npm run quick-push    # رفع سريع
npm run server-deploy # نشر على السيرفر مباشرة
```

---

## 🔍 **فحص حالة السيرفر**

### من المشروع المحلي:
```bash
node server-deploy.js
```

### على السيرفر مباشرة:
```bash
pm2 list              # حالة التطبيقات
pm2 logs              # سجلات التطبيقات
pm2 monit             # مراقبة مباشرة
nginx -t              # فحص Nginx
systemctl status nginx # حالة Nginx
```

---

## 🆘 **استكشاف الأخطاء**

### إذا فشل الـ deployment:

1. **تحقق من SSH:**
   ```bash
   ssh root@134.122.102.182 "cd /var/www/EliteProject && pwd"
   ```

2. **تحقق من Git:**
   ```bash
   ssh root@134.122.102.182 "cd /var/www/EliteProject && git status"
   ```

3. **تحقق من PM2:**
   ```bash
   ssh root@134.122.102.182 "pm2 list"
   ```

### إذا كان هناك تعارض في Git:

```bash
# محلياً
git stash
git pull origin main
git stash pop
# حل التعارضات
git add .
git commit -m "Resolve conflicts"
git push origin main
```

---

## 📱 **روابط المشروع**

- **الموقع الرئيسي:** http://134.122.102.182
- **لوحة إدارة المتجر:** http://134.122.102.182/admin/
- **Store API:** http://134.122.102.182/api/
- **Strapi CMS:** http://134.122.102.182:8080/admin/
- **Webhook Status:** http://134.122.102.182:9000/health

---

## 🔐 **أمان الـ Webhooks**

لزيادة الأمان، يمكنك إضافة secret للـ webhook:

1. في GitHub webhook settings، أضف secret
2. في `webhook-server.js`، أضف تحقق من الـ signature

---

## 📈 **مراقبة الأداء**

```bash
# مراقبة استخدام الموارد
ssh root@134.122.102.182 "htop"

# مراقبة حركة الشبكة
ssh root@134.122.102.182 "netstat -tlnp"

# مراقبة مساحة القرص
ssh root@134.122.102.182 "df -h"
```

---

## 🎯 **الخطوات التالية**

✅ **مكتمل:**
- [x] إعداد المشروع على السيرفر
- [x] تكوين PM2 و Nginx
- [x] إنشاء scripts التزامن

🔄 **التالي:**
- [ ] إعداد Webhook التلقائي
- [ ] إعداد النسخ الاحتياطي
- [ ] إعداد مراقبة الأداء
- [ ] إعداد SSL Certificate

---

## 💡 **نصائح للاستخدام الأمثل**

1. **استخدم `npm run sync` قبل البدء في التطوير**
2. **استخدم `npm run quick-push` للتعديلات الصغيرة**
3. **استخدم `npm run deploy` للتعديلات الكبيرة**
4. **راقب `pm2 logs` بانتظام**
5. **اعمل backup دوري للقاعدة**

---

**🎉 الآن لديك نظام تزامن كامل وتلقائي!**
