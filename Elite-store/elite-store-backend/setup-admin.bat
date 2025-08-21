@echo off
echo ===================================
echo Elite Store - Database Setup
echo ===================================
echo.

cd /d "D:\copied\Elite\EliteProject\Elite-store\elite-store-backend"

echo 📂 Current directory: %CD%
echo.

echo 🔧 Setting up environment variables...
set "DB_HOST=elite-store-db-do-user-24606323-0.i.db.ondigitalocean.com"
set "DB_PORT=25060"
set "DB_USERNAME=doadmin"
set "DB_PASSWORD=AVNS_Sfg3cMWF_zNOSTFufbo"
set "DB_NAME=defaultdb"
set "DATABASE_SSL=true"
set "NODE_ENV=production"

echo ✅ Environment variables set!
echo.

echo 📋 Available operations:
echo 1. Create .env file
echo 2. Create admin user
echo 3. Test login
echo 4. Run all (recommended)
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto create_env
if "%choice%"=="2" goto create_admin
if "%choice%"=="3" goto test_login
if "%choice%"=="4" goto run_all
goto invalid_choice

:create_env
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
echo ✅ .env file created successfully!
goto end

:create_admin
echo.
echo 👤 Creating admin user...
node create-admin-elite.js
goto end

:test_login
echo.
echo 🔐 Testing login...
node test-login.js
goto end

:run_all
echo.
echo 🚀 Running complete setup...
echo.
echo Step 1: Creating .env file...
call :create_env
echo.
echo Step 2: Creating admin user...
node create-admin-elite.js
echo.
echo Step 3: Testing login...
node test-login.js
echo.
echo 🎉 Setup complete!
goto end

:invalid_choice
echo ❌ Invalid choice. Please run the script again.
goto end

:end
echo.
echo 📋 Setup Summary:
echo ================
echo 📧 Admin Email: admin@elitestore.com
echo 🔑 Admin Password: admin123456
echo 🌐 API URL: http://134.122.102.182/api
echo 📚 API Docs: http://134.122.102.182/api/docs
echo.
pause

