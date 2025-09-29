@echo off
echo ========================================
echo Testing Blog Article Detail Page Fix
echo ========================================

echo.
echo Step 1: Starting Strapi Backend...
echo Please make sure Strapi is running on http://localhost:1337
echo.

cd /d "d:\copied\Elite\EliteProject\elite-backend"

echo Checking if Strapi is running...
curl -s http://localhost:1337/admin > nul
if %errorlevel% neq 0 (
    echo ❌ Strapi is not running. Starting it now...
    echo Please run: npm run develop
    pause
    exit /b 1
) else (
    echo ✅ Strapi is running!
)

echo.
echo Step 2: Adding sample article...
node add-sample-article.js

echo.
echo Step 3: Testing API directly...
echo Testing: http://localhost:1337/api/blog-articles/pet-health-wellness-guide?populate=*&locale=en
curl -s "http://localhost:1337/api/blog-articles/pet-health-wellness-guide?populate=*&locale=en" > nul
if %errorlevel% neq 0 (
    echo ❌ API test failed
) else (
    echo ✅ API test passed
)

echo.
echo ========================================
echo Fix Applied Successfully!
echo ========================================
echo.
echo Now test these URLs:
echo 1. Frontend: http://localhost:3000/media/pet-health-wellness-guide
echo 2. API Direct: http://localhost:1337/api/blog-articles/pet-health-wellness-guide?populate=*^&locale=en
echo.
echo Check console logs in both browser and Strapi terminal for debugging
echo.
pause
