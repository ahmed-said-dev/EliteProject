@echo off
echo ============================================
echo 🚀 Elite Store - Quick Database Setup
echo ============================================
echo.

cd /d "D:\copied\Elite\EliteProject\Elite-store\elite-store-backend"

echo 📂 Working in: %CD%
echo.

echo 🔧 Setting environment variables...
set "DB_HOST=elite-store-db-do-user-24606323-0.i.db.ondigitalocean.com"
set "DB_PORT=25060"
set "DB_USERNAME=doadmin"
set "DB_PASSWORD=AVNS_Sfg3cMWF_zNOSTFufbo"
set "DB_NAME=defaultdb"
set "DATABASE_SSL=true"
set "NODE_ENV=production"

echo ✅ Environment variables ready!
echo.

echo 📝 Creating .env file...
(
echo # DigitalOcean PostgreSQL Database Configuration
echo DB_HOST=elite-store-db-do-user-24606323-0.i.db.ondigitalocean.com
echo DB_PORT=25060
echo DB_USERNAME=doadmin
echo DB_PASSWORD=AVNS_Sfg3cMWF_zNOSTFufbo
echo DB_NAME=defaultdb
echo DATABASE_SSL=true
echo.
echo # Application Configuration  
echo NODE_ENV=production
echo PORT=3001
echo.
echo # JWT Configuration
echo JWT_SECRET=elite_store_jwt_secret_key_2024
echo JWT_EXPIRES_IN=7d
echo.
echo # Admin User Configuration
echo ADMIN_EMAIL=admin@elitestore.com
echo ADMIN_PASSWORD=admin123456
) > .env

echo ✅ .env file created!
echo.

echo 👤 Creating admin user with your credentials...
echo 📧 Email: admin@elitestore.com  
echo 🔑 Password: admin123456
echo.

node create-admin-elite.js

echo.
echo 🔐 Testing login credentials...
node test-login.js

echo.
echo 🎉 SETUP COMPLETE!
echo ==================
echo 📧 Admin Email: admin@elitestore.com
echo 🔑 Admin Password: admin123456
echo 🌐 API Base URL: http://134.122.102.182/api
echo 🔗 Login Endpoint: http://134.122.102.182/api/auth/login
echo.
echo 💡 You can now:
echo 1. Test login via API using Postman or curl
echo 2. Use these credentials in your frontend
echo 3. Access admin features with this account
echo.
pause

