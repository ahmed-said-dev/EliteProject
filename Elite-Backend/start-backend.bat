@echo off
echo Starting Elite Backend...
echo.
echo Make sure you are in the elite-backend directory
echo.
cd /d "%~dp0"
echo Current directory: %CD%
echo.
echo Installing dependencies...
call npm install
echo.
echo Starting Strapi in development mode...
call npm run develop
pause
