@echo off
echo ========================================
echo 🌐 Elite Store - API Test with CURL
echo ========================================
echo.

echo 📧 Admin Email: admin@elitestore.com
echo 🔑 Admin Password: admin123456
echo 🌐 API Base URL: http://134.122.102.182/api
echo.

echo 🔍 Test 1: Login API
echo =====================
echo Sending login request...
curl -X POST http://134.122.102.182/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@elitestore.com\",\"password\":\"admin123456\"}"

echo.
echo.

echo 🔍 Test 2: Health Check
echo =======================
echo Checking API health...
curl -X GET http://134.122.102.182/api/health

echo.
echo.

echo 🔍 Test 3: Users Endpoint
echo =========================
echo Getting users list...
curl -X GET http://134.122.102.182/api/users

echo.
echo.

echo 🔍 Test 4: Products Endpoint  
echo ============================
echo Getting products list...
curl -X GET http://134.122.102.182/api/products

echo.
echo.

echo 📋 Summary
echo ==========
echo ✅ If you see JSON responses above, the API is working!
echo 🔑 Your admin credentials: admin@elitestore.com / admin123456
echo 🌐 API Base URL: http://134.122.102.182/api
echo 📚 API Documentation: http://134.122.102.182/api/docs
echo.

echo 💡 Next Steps:
echo - Use these credentials in your frontend application
echo - Test other API endpoints as needed
echo - Create additional users if required
echo.

pause

