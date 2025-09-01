@echo off
echo =======================================
echo   Elite Frontend - Switch to Local
echo =======================================
echo.

echo Copying local configuration...
copy local-config.env .env.local

echo.
echo ✅ تم التبديل للتطوير المحلي بنجاح!
echo.
echo الآن الـ Frontend سيتصل بـ:
echo - Strapi Backend: http://localhost:1337
echo - Elite Store API: http://localhost:3001/api
echo - Saleor GraphQL: http://localhost:8000/graphql
echo.
echo تأكد من تشغيل:
echo 1. Strapi Backend: cd elite-backend ^&^& npm run dev
echo 2. Elite Store Backend: cd Elite-store/elite-store-backend ^&^& npm start
echo 3. Frontend: npm run dev
echo.
pause
