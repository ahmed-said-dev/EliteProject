@echo off
echo ========================================
echo 🐾 Elite Store - Pet Store Data Seeder
echo ========================================
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

echo ✅ Environment ready!
echo.

echo 🌱 Seeding pet store data...
echo This will add:
echo   📁 8 Categories (Dog Food, Cat Food, Pet Toys, etc.)
echo   🛍️ 14 Products (Premium pet products with prices)
echo   👥 3 Additional Users (Sample customers)
echo.

echo Starting data seeding...
node seed-pet-store-data.js

echo.
echo 🎉 DATA SEEDING COMPLETE!
echo =========================
echo.

echo 📋 What was added:
echo ------------------
echo 📁 Categories:
echo   • Dog Food
echo   • Cat Food  
echo   • Pet Toys
echo   • Pet Medications
echo   • Pet Accessories
echo   • Pet Grooming
echo   • Bird Care
echo   • Fish ^& Aquarium
echo.

echo 🛍️ Sample Products:
echo   • Royal Canin Adult Dog Food ($45.99)
echo   • Whiskas Adult Cat Food ($18.75)
echo   • Kong Classic Dog Toy ($12.99)
echo   • Flea ^& Tick Prevention Collar ($24.99)
echo   • And 10 more products...
echo.

echo 👥 Sample Users:
echo   • john.doe@example.com
echo   • jane.smith@example.com  
echo   • mike.johnson@example.com
echo   (Password: password123 for all)
echo.

echo 🌐 Test Your API:
echo ================
echo Base URL: http://134.122.102.182/api
echo.
echo GET /categories - View all categories
echo GET /products - View all products  
echo GET /users - View all users
echo POST /auth/login - Login with sample users
echo.

echo 💡 Next Steps:
echo - Test the API endpoints
echo - View products in your dashboard
echo - Login with sample user accounts
echo - Add more data as needed
echo.

pause

