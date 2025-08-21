# 🚀 Elite Store - Database Setup Guide

## 📋 Overview
This guide helps you connect the Elite Store backend to DigitalOcean PostgreSQL database and create an admin user for testing.

## 🎯 Admin Credentials
- **Email:** `admin@elitestore.com`
- **Password:** `admin123456`
- **Role:** `admin`

## 🚀 Quick Setup (Recommended)

### Option 1: Run the quick setup script
```bash
# Windows
quick-setup.bat

# This will:
# 1. Create .env file with database credentials
# 2. Create admin user
# 3. Test login credentials
```

### Option 2: Manual step-by-step

#### Step 1: Create .env file
```bash
# Copy the database configuration
cp db-config.env .env
```

#### Step 2: Create admin user
```bash
node create-admin-elite.js
```

#### Step 3: Test login
```bash
node test-login.js
```

#### Step 4: Test API endpoints
```bash
node test-api.js
```

## 🗄️ Database Configuration

### DigitalOcean PostgreSQL Details:
- **Host:** `elite-store-db-do-user-24606323-0.i.db.ondigitalocean.com`
- **Port:** `25060`
- **Username:** `doadmin`
- **Password:** `AVNS_Sfg3cMWF_zNOSTFufbo`
- **Database:** `defaultdb`
- **SSL:** Required

## 🌐 API Endpoints

### Base URL: `http://134.122.102.182/api`

### Key Endpoints:
- **Login:** `POST /auth/login`
- **Profile:** `GET /auth/profile` (requires authentication)
- **Users:** `GET /users`
- **Products:** `GET /products`

## 🧪 Testing

### 1. Database Connection Test
```bash
node create-admin-elite.js
```
This will test the connection and create/update the admin user.

### 2. Login Test
```bash
node test-login.js
```
This will verify the credentials work in the database.

### 3. API Test
```bash
node test-api.js
```
This will test actual API endpoints.

## 📝 Example API Calls

### Login with cURL:
```bash
curl -X POST http://134.122.102.182/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@elitestore.com","password":"admin123456"}'
```

### Get Profile (with token):
```bash
curl -X GET http://134.122.102.182/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🔧 Troubleshooting

### Connection Issues:
1. **ENOTFOUND:** Check internet connection and database host
2. **ECONNREFUSED:** Verify port (25060) and firewall settings
3. **Authentication failed:** Double-check username/password

### API Issues:
1. **Backend not running:** Check PM2 status: `pm2 list`
2. **Wrong port:** Ensure backend is on port 3001
3. **CORS errors:** Check allowed origins in main.ts

## 📊 Database Schema

The script automatically creates the `user` table with these fields:
- `id` (Primary Key)
- `email` (Unique)
- `password` (Hashed)
- `firstName`
- `lastName`
- `role` ('admin' or 'user')
- `isActive` (Boolean)
- `createdAt`
- `updatedAt`

## 🎉 Success Indicators

### ✅ Setup Successful When:
1. Connection test passes
2. Admin user created/updated
3. Login test returns correct user data
4. API login returns access token

### 🔗 Next Steps:
1. Use these credentials in your frontend
2. Test additional API endpoints
3. Create more users if needed
4. Set up proper authentication flow

## 📞 Support

If you encounter issues:
1. Check the console output for detailed error messages
2. Verify database credentials
3. Ensure DigitalOcean database is running
4. Check network connectivity

---

**Created for Elite Store Backend**  
**Database:** DigitalOcean PostgreSQL  
**Environment:** Production Ready

