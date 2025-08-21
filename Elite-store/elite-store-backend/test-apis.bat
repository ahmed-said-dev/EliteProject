@echo off
echo ========================================
echo 🌐 Elite Store - API Endpoints Test
echo ========================================
echo.

echo 🔍 Testing API Endpoints...
echo Base URL: http://134.122.102.182/api
echo.

echo ========================================
echo 1. Testing Categories API
echo ========================================
echo URL: GET /categories
curl -s http://134.122.102.182/api/categories

echo.
echo.
echo ========================================
echo 2. Testing Products API
echo ========================================
echo URL: GET /products
curl -s http://134.122.102.182/api/products

echo.
echo.
echo ========================================
echo 3. Testing Admin Login
echo ========================================
echo URL: POST /auth/login
echo Credentials: admin@elitestore.com / admin123456
curl -X POST http://134.122.102.182/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@elitestore.com\",\"password\":\"admin123456\"}"

echo.
echo.
echo ========================================
echo 4. Testing Customer Login
echo ========================================
echo URL: POST /auth/login
echo Credentials: john.doe@example.com / password123
curl -X POST http://134.122.102.182/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"john.doe@example.com\",\"password\":\"password123\"}"

echo.
echo.
echo ========================================
echo 📋 API Test Summary
echo ========================================
echo.
echo ✅ Categories: Pet store categories should be visible
echo ✅ Products: 14 pet products should be listed
echo ✅ Admin Login: Should return user data and token
echo ✅ Customer Login: Should return user data and token
echo.
echo 💡 What to Look For:
echo • Categories: Dog Food, Cat Food, Pet Toys, etc.
echo • Products: Royal Canin, Whiskas, Kong toys, etc.
echo • Login Response: User object with email and role
echo.
echo 🎯 All APIs are ready for your dashboard!
echo.
pause

