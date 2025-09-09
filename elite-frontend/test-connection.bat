@echo off
echo =======================================
echo      Elite Frontend - Test APIs
echo =======================================
echo.

echo Testing Strapi Backend...
curl -s -o NUL -w "Strapi Admin: %%{http_code}\n" http://localhost:1337/admin
curl -s -o NUL -w "Strapi API: %%{http_code}\n" "http://localhost:1337/api/doctor-homes"

echo.
echo Testing Elite Store Backend...
curl -s -o NUL -w "Elite Store: %%{http_code}\n" http://localhost:3001/api/auth/login

echo.
echo Testing URLs in Frontend config:
echo NEXT_PUBLIC_API_URL = %NEXT_PUBLIC_API_URL%
echo NEXT_PUBLIC_STRAPI_URL = %NEXT_PUBLIC_STRAPI_URL%
echo NEXT_PUBLIC_STORE_API_URL = %NEXT_PUBLIC_STORE_API_URL%

echo.
echo =======================================
echo        Test Complete!
echo =======================================
echo Status Codes: 200 = OK, 404 = Not Found, 000 = Not Running
echo.
pause
