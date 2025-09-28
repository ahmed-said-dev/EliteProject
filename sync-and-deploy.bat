@echo off
echo 🚀 Elite Project - Sync and Deploy Script
echo ==========================================

echo.
echo 📋 Step 1: Adding all changes to git...
git add .

echo.
echo 📝 Step 2: Committing changes...
set /p commit_message="Enter commit message (or press Enter for default): "
if "%commit_message%"=="" set commit_message=Backend updates and fixes

git commit -m "%commit_message%"

echo.
echo 📤 Step 3: Pushing to GitHub...
git push origin main

if %errorlevel% neq 0 (
    echo ❌ Failed to push to GitHub. Please check your git configuration.
    pause
    exit /b 1
)

echo.
echo ✅ Successfully pushed to GitHub!
echo.
echo 🚀 Starting deployment to server...
node server-deploy.js

pause
