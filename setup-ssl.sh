#!/bin/bash

# SSL setup script for elitevetksa.com
echo "Setting up SSL certificate for elitevetksa.com..."

# Variables
DOMAIN="elitevetksa.com"
EMAIL="admin@elitevetksa.com"  # Change this to your email

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "Please run this script as root (use sudo)"
    exit 1
fi

echo "Domain: $DOMAIN"
echo "Email: $EMAIL"

# Check if domain is accessible
echo "Step 1: Checking domain accessibility..."
if curl -s --connect-timeout 10 http://$DOMAIN > /dev/null; then
    echo "✅ Domain is accessible"
else
    echo "❌ Domain is not accessible. Please check:"
    echo "   1. DNS configuration in GoDaddy"
    echo "   2. Domain propagation (may take up to 48 hours)"
    echo "   3. Server firewall settings"
    exit 1
fi

echo "Step 2: Installing SSL certificate..."
certbot --nginx \
    -d $DOMAIN \
    -d www.$DOMAIN \
    -d admin.$DOMAIN \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    --redirect

if [ $? -eq 0 ]; then
    echo "✅ SSL certificate installed successfully!"
    
    echo "Step 3: Setting up automatic renewal..."
    crontab -l | grep -q "certbot renew" || (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -
    
    echo "Step 4: Testing SSL configuration..."
    systemctl reload nginx
    
    echo ""
    echo "🎉 SSL setup completed successfully!"
    echo ""
    echo "Your domains are now secured with HTTPS:"
    echo "✅ https://$DOMAIN"
    echo "✅ https://www.$DOMAIN"
    echo "✅ https://admin.$DOMAIN"
    echo ""
    echo "Certificate will auto-renew every 90 days."
    
else
    echo "❌ SSL certificate installation failed."
    echo "Please check:"
    echo "   1. Domain DNS is properly configured"
    echo "   2. Domain is accessible via HTTP"
    echo "   3. No firewall blocking port 80/443"
    exit 1
fi
