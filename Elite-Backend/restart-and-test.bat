@echo off
echo 🔄 Restarting Strapi to apply schema changes...
echo.

echo ⏹️ Stopping any running Strapi processes...
taskkill /F /IM node.exe 2>nul

echo 📁 Current directory: %CD%
echo.

echo 🚀 Starting Strapi...
npm run develop

pause
