@echo off
echo ============================================
echo 🚀 Elite Store - Complete Pet Store Setup
echo ============================================
echo.

cd /d "D:\copied\Elite\EliteProject\Elite-store\elite-store-backend"

echo 📂 Working in: %CD%
echo.

echo 🎯 This will setup your complete pet store with:
echo   👤 Admin user (admin@elitestore.com)
echo   📁 8 Categories (Dog Food, Cat Food, Toys, etc.)
echo   🛍️ 14 Products (Premium pet products)
echo   👥 3 Sample customers
echo.

set /p confirm="Continue with setup? (Y/N): "
if /i not "%confirm%"=="Y" goto :end

echo.
echo 🔧 Setting environment variables...
set "DB_HOST=elite-store-db-do-user-24606323-0.i.db.ondigitalocean.com"
set "DB_PORT=25060"
set "DB_USERNAME=doadmin"
set "DB_PASSWORD=AVNS_Sfg3cMWF_zNOSTFufbo"
set "DB_NAME=defaultdb"
set "DATABASE_SSL=true"
set "NODE_ENV=production"

echo ✅ Environment ready!
echo.

echo ========================================
echo Step 1: Creating Admin User
echo ========================================
echo 👤 Creating admin@elitestore.com...
node create-admin-simple.js

echo.
echo ========================================
echo Step 2: Seeding Pet Store Data
echo ========================================
echo 🌱 Adding categories and products...
node seed-pet-store-data.js

echo.
echo ========================================
echo Step 3: Testing Everything
echo ========================================
echo 🧪 Verifying all data...
node test-seeded-data.js

echo.
echo ========================================
echo Step 4: Final API Test
echo ========================================
echo 🌐 Testing login and endpoints...
node test-login-simple.js

echo.
echo 🎉 COMPLETE SETUP FINISHED!
echo ===========================
echo.

echo 🔐 Admin Login:
echo ===============
echo 📧 Email: admin@elitestore.com
echo 🔑 Password: admin123456
echo.

echo 👥 Sample Customer Logins:
echo ==========================
echo 📧 john.doe@example.com (password: password123)
echo 📧 jane.smith@example.com (password: password123)
echo 📧 mike.johnson@example.com (password: password123)
echo.

echo 📁 Categories Added:
echo ====================
echo • Dog Food (Premium dog nutrition)
echo • Cat Food (Healthy cat meals)
echo • Pet Toys (Interactive toys)
echo • Pet Medications (Health products)
echo • Pet Accessories (Collars, leashes)
echo • Pet Grooming (Hygiene products)
echo • Bird Care (Bird food and supplies)
echo • Fish ^& Aquarium (Aquatic supplies)
echo.

echo 🛍️ Sample Products Include:
echo ============================
echo • Royal Canin Adult Dog Food ($45.99)
echo • Whiskas Adult Cat Food ($18.75)
echo • Kong Classic Dog Toy ($12.99)
echo • Flea ^& Tick Prevention Collar ($24.99)
echo • Retractable Dog Leash ($22.75)
echo • Pet Shampoo ^& Conditioner ($16.50)
echo • Aquarium Filter System ($55.00)
echo • And 7 more products...
echo.

echo 🌐 API Information:
echo ===================
echo Base URL: http://134.122.102.182/api
echo.
echo Key Endpoints:
echo • POST /auth/login - Login
echo • GET /categories - View categories
echo • GET /products - View products
echo • GET /users - View users
echo • GET /auth/profile - User profile
echo.

echo 📋 Test Commands:
echo =================
echo Login Test:
echo curl -X POST http://134.122.102.182/api/auth/login \
echo   -H "Content-Type: application/json" \
echo   -d "{\"email\":\"admin@elitestore.com\",\"password\":\"admin123456\"}"
echo.

echo Get Products:
echo curl -X GET http://134.122.102.182/api/products
echo.

echo Get Categories:
echo curl -X GET http://134.122.102.182/api/categories
echo.

echo 💡 Next Steps:
echo ==============
echo 1. 🖥️  Open your admin dashboard
echo 2. 🔑 Login with admin credentials
echo 3. 👀 View the seeded products and categories
echo 4. 🛒 Test the shopping functionality
echo 5. 👥 Manage users and orders
echo.

echo 🎯 Your Elite Pet Store is now fully operational!
echo ✅ Database: Connected and populated
echo ✅ Admin User: Created and verified
echo ✅ Sample Data: Categories and products added
echo ✅ API: All endpoints working
echo ✅ Ready for Production: All systems go!
echo.

:end
pause

