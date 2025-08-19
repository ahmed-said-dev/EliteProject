@echo off
echo ========================================
echo   Elite Store Backend - Server Test
echo ========================================
echo.

echo Starting Elite Store Backend server...
echo Please wait while the server initializes...
echo.

timeout /t 5 /nobreak > nul

echo Testing server connection...
curl -s http://localhost:3001 > nul
if %errorlevel% equ 0 (
    echo ✅ Server is running successfully!
    echo.
    echo 🌐 API Server: http://localhost:3001
    echo 📚 API Docs:  http://localhost:3001/api/docs
    echo 🎯 GraphQL:   http://localhost:3001/graphql
    echo.
) else (
    echo ❌ Server is not responding yet...
    echo Please make sure the server is running with: npm run start:dev
    echo.
)

echo ========================================
echo   Available Commands:
echo ========================================
echo npm run start:dev     - Start development server
echo npm run dev:setup     - Full setup with sample data
echo npm run build         - Build for production
echo npm run start:prod    - Start production server
echo.
pause
 