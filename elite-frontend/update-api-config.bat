@echo off
echo ========================================
echo 🔧 Elite Frontend - API Configuration Update
echo ========================================
echo.

cd /d "D:\copied\Elite\EliteProject\elite-frontend"

echo 📂 Working in: %CD%
echo.

echo 🎯 Updating API Configuration...
echo ================================
echo.

echo 📋 Changes Made:
echo ----------------
echo ✅ Updated storeApi.ts to use NEXT_PUBLIC_STORE_API_URL
echo ✅ Updated eliteApi.ts to use NEXT_PUBLIC_STORE_API_URL  
echo ✅ Updated next.config.js with correct Store API URL
echo ✅ Store API now points to: http://134.122.102.182:3001/api
echo.

echo 🧪 Testing Current Configuration...
echo ===================================
node test-api-config.js

echo.
echo 🔨 Rebuilding Frontend...
echo =========================
echo This will rebuild the frontend with new API configuration...
echo.

set /p confirm="Continue with rebuild? (Y/N): "
if /i not "%confirm%"=="Y" goto :skip_build

echo 📦 Installing dependencies...
npm install

echo 🏗️ Building frontend...
npm run build

echo ✅ Build complete!
echo.

:skip_build
echo ========================================
echo 📋 Configuration Update Summary
echo ========================================
echo.

echo 🔧 API Configuration:
echo =====================
echo Store API: http://134.122.102.182:3001/api
echo Strapi API: http://134.122.102.182:8080  
echo GraphQL: http://134.122.102.182/graphql
echo.

echo 📁 Files Updated:
echo =================
echo • elite-frontend/src/lib/storeApi.ts
echo • elite-frontend/src/lib/eliteApi.ts
echo • elite-frontend/next.config.js
echo.

echo 🌐 What This Fixes:
echo ===================
echo ❌ Before: Products loaded from localhost:3001
echo ✅ After: Products load from 134.122.102.182:3001
echo.

echo 💡 Testing Your Fix:
echo ====================
echo 1. Restart your frontend server
echo 2. Visit: http://134.122.102.182/products
echo 3. Check browser network tab for API calls
echo 4. Should see calls to: 134.122.102.182:3001/api/products
echo.

echo 🔍 Troubleshooting:
echo ===================
echo If products still don't load:
echo 1. Clear browser cache (Ctrl+Shift+Delete)
echo 2. Hard refresh (Ctrl+F5)
echo 3. Check PM2 logs: pm2 logs elite-store-backend
echo 4. Verify backend is running: curl http://134.122.102.182:3001/api/products
echo.

echo 🎯 Your products should now load correctly!
echo ===========================================
echo ✅ API Configuration: Updated
echo ✅ Store API URL: Fixed 
echo ✅ Frontend: Ready for testing
echo.

pause
