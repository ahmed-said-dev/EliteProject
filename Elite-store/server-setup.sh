#!/bin/bash
# Quick Server Setup Script for Elite Project
# Run: curl -sSL https://raw.githubusercontent.com/ahmed-said-dev/EliteProject/main/Elite-store/server-setup.sh | bash

set -e

echo "🚀 Starting Elite Project Server Setup..."

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Node.js 20
echo "📦 Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs

# Install global tools
echo "📦 Installing global tools..."
npm install -g pm2 serve
apt install -y nginx git postgresql-client curl wget unzip htop

# Create directories
echo "📁 Creating application directories..."
mkdir -p /var/www
mkdir -p /var/log/pm2

# Clone repository
echo "📥 Cloning Elite Project repository..."
cd /var/www
if [ -d "EliteProject" ]; then
    rm -rf EliteProject
fi
git clone https://github.com/ahmed-said-dev/EliteProject.git
cd EliteProject

# Configure firewall
echo "🔒 Configuring firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw allow 80
ufw allow 443
ufw allow 3000
ufw allow 1337
ufw allow 3001
ufw allow 5173
ufw --force enable

echo ""
echo "✅ Server setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Configure environment variables for each application"
echo "2. Install dependencies: npm install in each app directory"
echo "3. Build applications: npm run build in each app directory"
echo "4. Setup database connections and run migrations"
echo "5. Start applications with PM2"
echo "6. Configure Nginx reverse proxy"
echo ""
echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
echo ""
echo "🎯 Quick deployment command:"
echo "   pm2 start /var/www/EliteProject/Elite-store/ecosystem.config.js"
echo ""
echo "Ready for deployment! 🚀"
