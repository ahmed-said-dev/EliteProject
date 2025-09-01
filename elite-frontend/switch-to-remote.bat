@echo off
echo =======================================
echo   Elite Frontend - Switch to Remote
echo =======================================
echo.

echo Removing local configuration...
if exist .env.local del .env.local

echo.
echo ✅ تم التبديل للخوادم البعيدة بنجاح!
echo.
echo الآن الـ Frontend سيتصل بـ:
echo - Strapi Backend: http://134.122.102.182:8080
echo - Elite Store API: http://134.122.102.182:3001/api
echo - Saleor GraphQL: http://134.122.102.182/graphql
echo.
echo تحتاج فقط لتشغيل:
echo - Frontend: npm run dev
echo.
pause
