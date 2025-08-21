#!/bin/bash

# Elite Store Admin Dashboard Setup Script
echo "🚀 Elite Store - Admin Dashboard Setup"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Check if we're on the server
if [ ! -d "/var/www/EliteProject" ]; then
    print_error "This script should be run on the server at /var/www/EliteProject"
    exit 1
fi

cd /var/www/EliteProject

print_status "Step 1: Pulling latest changes from GitHub"
git pull origin main
print_success "Code updated"

print_status "Step 2: Setting up Backend Environment"
# Copy environment configuration
cd Elite-store/elite-store-backend
cp env-production-config.txt .env
print_success "Backend environment configured"

print_status "Step 3: Installing Backend Dependencies"
npm install
npm install bcrypt pg
print_success "Backend dependencies installed"

print_status "Step 4: Creating Admin User"
node create-admin-user.js
print_success "Admin user setup completed"

print_status "Step 5: Building Backend"
npm run build
print_success "Backend built"

cd ../../

print_status "Step 6: Setting up Admin Dashboard Environment"
cd Elite-store/elite-admin-dashboard
cp env-config.txt .env
print_success "Admin dashboard environment configured"

print_status "Step 7: Installing Dashboard Dependencies"
npm install
print_success "Dashboard dependencies installed"

print_status "Step 8: Building Admin Dashboard"
npm run build
print_success "Admin dashboard built"

cd ../../

print_status "Step 9: Updating PM2 Configuration"
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'elite-store-backend',
      cwd: '/var/www/EliteProject/Elite-store/elite-store-backend',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        DB_HOST: 'elite-store-db-do-user-24606323-0.i.db.ondigitalocean.com',
        DB_PORT: 25060,
        DB_USERNAME: 'doadmin',
        DB_PASSWORD: 'AVNS_Sfg3cMWF_zNOSTFufbo',
        DB_NAME: 'defaultdb',
        DATABASE_SSL: 'true',
        JWT_SECRET: 'your_super_secure_jwt_secret_key_here_2024',
        ADMIN_EMAIL: 'admin@elitestore.com',
        ADMIN_PASSWORD: 'Admin123!@#'
      }
    },
    {
      name: 'elite-frontend',
      cwd: '/var/www/EliteProject/elite-frontend',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    },
    {
      name: 'elite-backend-strapi',
      cwd: '/var/www/EliteProject/Elite-Backend',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 1337,
        PUBLIC_URL: 'http://134.122.102.182:8080'
      }
    },
    {
      name: 'elite-admin-dashboard',
      cwd: '/var/www/EliteProject/Elite-store/elite-admin-dashboard',
      script: 'serve',
      args: ['-s', 'dist', '-p', '5173'],
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
EOF

print_success "PM2 configuration updated"

print_status "Step 10: Restarting all services"
pm2 restart all
print_success "All services restarted"

print_status "Step 11: Checking service status"
pm2 list

print_status "Step 12: Testing Nginx configuration"
nginx -t && systemctl reload nginx
print_success "Nginx configuration updated"

echo ""
print_success "🎉 Admin Dashboard setup completed successfully!"
echo ""
echo -e "${GREEN}📋 Admin Login Credentials:${NC}"
echo "   📧 Email: admin@elitestore.com"
echo "   🔑 Password: Admin123!@#"
echo ""
echo -e "${GREEN}🌐 Access Points:${NC}"
echo "   🖥️ Admin Dashboard: http://134.122.102.182:5173/login"
echo "   🌐 Main Website: http://134.122.102.182"
echo "   📊 Store API: http://134.122.102.182:3001/api"
echo "   ⚙️ Strapi Admin: http://134.122.102.182:8080/admin"
echo ""
echo -e "${BLUE}📊 Check services with: pm2 list${NC}"
echo -e "${BLUE}📋 View logs with: pm2 logs${NC}"
