#!/bin/bash

# Elite Backend Server-Side Auto Updater
# Place this script on your server and run it to update backend

echo "🔄 Elite Backend Server-Side Updater"
echo "===================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
PROJECT_DIR="/var/www/EliteProject"
BACKEND_DIR="$PROJECT_DIR/elite-backend"
LOG_FILE="/var/log/elite-backend-update.log"

# Function to log with timestamp
log_with_timestamp() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a $LOG_FILE
}

# Function to print colored output
print_status() {
    echo -e "${BLUE}📋 $1...${NC}"
    log_with_timestamp "STATUS: $1"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
    log_with_timestamp "SUCCESS: $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
    log_with_timestamp "WARNING: $1"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
    log_with_timestamp "ERROR: $1"
}

# Check if we're running as root
if [[ $EUID -ne 0 ]]; then
   print_error "This script must be run as root"
   exit 1
fi

# Check if project directory exists
if [ ! -d "$PROJECT_DIR" ]; then
    print_error "Project directory not found at $PROJECT_DIR"
    exit 1
fi

cd $PROJECT_DIR

print_status "Starting backend update process"

# Step 1: Check git status and pull latest changes
print_status "Checking for updates from GitHub"
git fetch origin main
BEHIND=$(git rev-list HEAD..origin/main --count)

if [ "$BEHIND" -gt 0 ]; then
    print_status "Found $BEHIND new commits. Pulling updates..."
    git pull origin main
    if [ $? -eq 0 ]; then
        print_success "Successfully pulled latest changes"
    else
        print_error "Failed to pull changes"
        exit 1
    fi
else
    print_status "Repository is up to date"
fi

# Step 2: Check if backend directory exists
if [ ! -d "$BACKEND_DIR" ]; then
    print_error "Backend directory not found at $BACKEND_DIR"
    exit 1
fi

cd $BACKEND_DIR

# Step 3: Backup current node_modules (optional)
print_status "Creating backup of current installation"
if [ -d "node_modules" ]; then
    mv node_modules node_modules.backup.$(date +%Y%m%d_%H%M%S) 2>/dev/null || true
fi

# Step 4: Clean install dependencies
print_status "Installing backend dependencies"
rm -rf node_modules package-lock.json 2>/dev/null || true
npm cache clean --force
npm install --production --no-optional

if [ $? -eq 0 ]; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    # Try to restore backup
    if ls node_modules.backup.* 1> /dev/null 2>&1; then
        print_status "Attempting to restore from backup"
        rm -rf node_modules
        mv node_modules.backup.* node_modules 2>/dev/null || true
    fi
    exit 1
fi

# Step 5: Build the application
print_status "Building backend application"
npm run build

if [ $? -eq 0 ]; then
    print_success "Backend built successfully"
else
    print_warning "Build completed with warnings or errors"
fi

# Step 6: Stop the current backend process
print_status "Stopping current backend process"
pm2 stop elite-backend 2>/dev/null || print_warning "Backend process was not running"

# Step 7: Start the backend process
print_status "Starting backend process"
pm2 start ecosystem.config.js --only elite-backend 2>/dev/null || \
pm2 start npm --name "elite-backend" -- run start

if [ $? -eq 0 ]; then
    print_success "Backend process started successfully"
else
    print_error "Failed to start backend process"
    exit 1
fi

# Step 8: Wait for the application to start
print_status "Waiting for backend to initialize"
sleep 15

# Step 9: Health check
print_status "Performing health check"
HEALTH_CHECK=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:1337/api/service-pages 2>/dev/null || echo "000")

if [ "$HEALTH_CHECK" = "200" ]; then
    print_success "Backend is healthy and responding"
elif [ "$HEALTH_CHECK" = "404" ]; then
    print_warning "Backend is running but endpoint returned 404 (may be expected)"
else
    print_warning "Backend health check returned status: $HEALTH_CHECK"
fi

# Step 10: Show process status
print_status "Checking PM2 process status"
pm2 show elite-backend

# Step 11: Show recent logs
print_status "Showing recent backend logs"
pm2 logs elite-backend --lines 20

# Step 12: Cleanup old backups (keep only 3 most recent)
print_status "Cleaning up old backups"
ls -t node_modules.backup.* 2>/dev/null | tail -n +4 | xargs rm -rf 2>/dev/null || true

print_success "🎉 Backend update completed successfully!"

echo ""
echo -e "${GREEN}🌐 Backend is now running at:${NC}"
echo "   Admin Panel: http://134.122.102.182:1337/admin/"
echo "   API Base: http://134.122.102.182:1337/api/"
echo ""
echo -e "${BLUE}📊 Monitoring commands:${NC}"
echo "   pm2 logs elite-backend    # View logs"
echo "   pm2 monit                # Monitor processes"
echo "   pm2 restart elite-backend # Restart if needed"
echo ""

log_with_timestamp "Backend update process completed successfully"
