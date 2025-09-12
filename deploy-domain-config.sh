#!/bin/bash

# Deploy domain configuration to server
echo "Deploying domain configuration to server 134.122.102.182..."

SERVER="root@134.122.102.182"
PROJECT_DIR="/var/www/EliteProject"

echo "Step 1: Uploading configuration files..."
scp nginx-domain-config.conf $SERVER:$PROJECT_DIR/
scp setup-domain.sh $SERVER:$PROJECT_DIR/
scp setup-ssl.sh $SERVER:$PROJECT_DIR/

echo "Step 2: Making scripts executable..."
ssh $SERVER "cd $PROJECT_DIR && chmod +x setup-domain.sh setup-ssl.sh"

echo "Step 3: Running domain setup..."
ssh $SERVER "cd $PROJECT_DIR && sudo ./setup-domain.sh"

echo "✅ Domain configuration deployed successfully!"
echo ""
echo "Next steps:"
echo "1. Test HTTP access: http://elitevetksa.com"
echo "2. If working, run SSL setup: ssh $SERVER 'cd $PROJECT_DIR && sudo ./setup-ssl.sh'"
echo "3. Test HTTPS access after SSL setup"
