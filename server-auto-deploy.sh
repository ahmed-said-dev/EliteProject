#!/bin/bash

# Elite Project - Server Auto Deploy Script
# This script should be placed on the server at /var/www/EliteProject/

echo "🚀 Elite Project - Server Auto Deploy"
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}📋 $1...${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -d "/var/www/EliteProject" ]; then
    print_error "Project directory not found. Please run this script from /var/www/EliteProject"
    exit 1
fi

cd /var/www/EliteProject

# Step 1: Pull latest changes
print_status "Pulling latest changes from GitHub"
if git pull origin main; then
    print_success "Successfully pulled latest changes"
else
    print_error "Failed to pull changes from GitHub"
    exit 1
fi

# Step 2: Install dependencies and build projects
print_status "Installing dependencies and building projects"

# Frontend
print_status "Building elite-frontend"
cd elite-frontend
npm install --production
npm run build
if [ $? -eq 0 ]; then
    print_success "Frontend built successfully"
else
    print_warning "Frontend build had issues, continuing..."
fi
cd ..

# Backend (Strapi)
print_status "Building Elite-Backend (Strapi)"
cd Elite-Backend
npm install --production
npm run build
if [ $? -eq 0 ]; then
    print_success "Backend built successfully"
else
    print_warning "Backend build had issues, continuing..."
fi
cd ..

# Store Backend
print_status "Building elite-store-backend"
cd Elite-store/elite-store-backend
npm install --production
npm run build
if [ $? -eq 0 ]; then
    print_success "Store backend built successfully"
else
    print_warning "Store backend build had issues, continuing..."
fi
cd ../..

# Admin Dashboard
print_status "Building elite-admin-dashboard"
cd Elite-store/elite-admin-dashboard
npm install --production
npm run build
if [ $? -eq 0 ]; then
    print_success "Admin dashboard built successfully"
else
    print_warning "Admin dashboard build had issues, continuing..."
fi
cd ../..

# Step 3: Restart PM2 processes
print_status "Restarting PM2 processes"
pm2 restart all
if [ $? -eq 0 ]; then
    print_success "PM2 processes restarted successfully"
else
    print_error "Failed to restart PM2 processes"
    exit 1
fi

# Step 4: Show status
print_status "Checking application status"
pm2 list

# Step 5: Test Nginx
print_status "Testing Nginx configuration"
nginx -t
if [ $? -eq 0 ]; then
    print_success "Nginx configuration is valid"
    systemctl reload nginx
    print_success "Nginx reloaded"
else
    print_error "Nginx configuration has errors"
fi

echo ""
print_success "🎉 Auto-deployment completed!"
echo ""
echo -e "${BLUE}🌐 Your applications are live at:${NC}"
echo "   Main Site: http://134.122.102.182"
echo "   Admin Dashboard: http://134.122.102.182/admin/"
echo "   Store API: http://134.122.102.182/api/"
echo "   Strapi CMS: http://134.122.102.182:8080/admin/"
echo ""
echo -e "${YELLOW}📊 Check logs with: pm2 logs${NC}"
echo -e "${YELLOW}📈 Monitor with: pm2 monit${NC}"

# Log deployment
echo "$(date): Auto-deployment completed successfully" >> /var/log/elite-deployment.log
