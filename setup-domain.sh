#!/bin/bash

# Domain setup script for elitevetksa.com
echo "Setting up domain configuration for elitevetksa.com..."

# Variables
DOMAIN="elitevetksa.com"
SERVER_IP="134.122.102.182"
NGINX_CONFIG="/etc/nginx/sites-available/elitevetksa.com"
NGINX_ENABLED="/etc/nginx/sites-enabled/elitevetksa.com"

echo "Domain: $DOMAIN"
echo "Server IP: $SERVER_IP"

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "Please run this script as root (use sudo)"
    exit 1
fi

echo "Step 1: Installing required packages..."
apt update
apt install -y nginx certbot python3-certbot-nginx

echo "Step 2: Copying Nginx configuration..."
cp nginx-domain-config.conf $NGINX_CONFIG

echo "Step 3: Creating symbolic link to enable site..."
ln -sf $NGINX_CONFIG $NGINX_ENABLED

echo "Step 4: Removing default Nginx site..."
rm -f /etc/nginx/sites-enabled/default

echo "Step 5: Testing Nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx configuration is valid"
    
    echo "Step 6: Reloading Nginx..."
    systemctl reload nginx
    
    echo "Step 7: Setting up SSL certificate with Let's Encrypt..."
    echo "⚠️  Make sure your domain DNS is pointing to $SERVER_IP before running SSL setup"
    echo "Run the following command after DNS propagation:"
    echo "certbot --nginx -d $DOMAIN -d www.$DOMAIN -d admin.$DOMAIN"
    
    echo ""
    echo "🎉 Domain setup completed!"
    echo ""
    echo "Next steps:"
    echo "1. Configure DNS in GoDaddy (see DNS configuration guide)"
    echo "2. Wait for DNS propagation (5-30 minutes)"
    echo "3. Run SSL setup: ./setup-ssl.sh"
    echo "4. Test your domains:"
    echo "   - https://$DOMAIN (Frontend)"
    echo "   - https://$DOMAIN/admin (Admin Dashboard)"
    echo "   - https://$DOMAIN/api (Backend API)"
    echo "   - https://admin.$DOMAIN (Alternative Backend Access)"
    
else
    echo "❌ Nginx configuration has errors. Please check the configuration file."
    exit 1
fi
