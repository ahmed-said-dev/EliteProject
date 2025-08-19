# 🚀 Elite Project - Complete Deployment Guide

## 🎯 Server Information
- **Server IP**: 134.122.102.182
- **SSH**: `ssh root@134.122.102.182`
- **Plan**: 16GB RAM, 4 vCPUs, 50GB SSD

## 🗄️ Database Information
- **Type**: DigitalOcean Managed PostgreSQL
- **Host**: elite-store-db-do-user-24606323-0.i.db.ondigitalocean.com
- **Port**: 25060
- **Username**: doadmin
- **Password**: AVNS_Sfg3cMWF_zNOSTFufbo
- **Database**: defaultdb

## 📱 Applications Overview

| Application | Port | URL | Description |
|-------------|------|-----|-------------|
| **elite-frontend** | 3000 | http://134.122.102.182:3000 | Next.js Main Website |
| **elite-backend** | 1337 | http://134.122.102.182:1337 | Strapi CMS |
| **elite-store-backend** | 3001 | http://134.122.102.182:3001/api | NestJS Store API |
| **elite-admin-dashboard** | 5173 | http://134.122.102.182:5173 | React Admin Panel |

## 🔧 Deployment Commands

### 1. Server Setup
```bash
# Update system and install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs

# Install global tools
npm install -g pm2
apt install -y nginx git postgresql-client
```

### 2. Clone Repository
```bash
cd /var/www
git clone https://github.com/ahmed-said-dev/EliteProject.git
cd EliteProject
```

### 3. Deploy Each Application

#### elite-store-backend (NestJS + PostgreSQL)
```bash
cd /var/www/EliteProject/Elite-store/elite-store-backend

# Create .env file (see DEPLOYMENT_CONFIG.md)
npm install
npm run build
npm run typeorm:migration:run
npm run seed
pm2 start npm --name "elite-store-backend" -- run start:prod
```

#### elite-backend (Strapi)
```bash
cd /var/www/EliteProject/elite-backend

# Create .env file
cat > .env << 'EOF'
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
APP_KEYS=key1-prod,key2-prod,key3-prod,key4-prod
API_TOKEN_SALT=api-salt-prod
ADMIN_JWT_SECRET=admin-jwt-prod
TRANSFER_TOKEN_SALT=transfer-salt-prod
JWT_SECRET=jwt-secret-prod
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
EOF

npm install
npm run build
pm2 start npm --name "elite-backend" -- start
```

#### elite-frontend (Next.js)
```bash
cd /var/www/EliteProject/elite-frontend

# Create .env.production
cat > .env.production << 'EOF'
NEXT_PUBLIC_API_URL=http://134.122.102.182:1337/api
NEXT_PUBLIC_STRAPI_URL=http://134.122.102.182:1337
NEXT_PUBLIC_STORE_API_URL=http://134.122.102.182:3001/api
EOF

npm install
npm run build
pm2 start npm --name "elite-frontend" -- start
```

#### elite-admin-dashboard (React/Vite)
```bash
cd /var/www/EliteProject/Elite-store/elite-admin-dashboard

# Create .env.production
cat > .env.production << 'EOF'
VITE_API_BASE_URL=http://134.122.102.182:3001/api
VITE_GRAPHQL_URL=http://134.122.102.182:3001/graphql
EOF

npm install
npm run build
npm install -g serve
pm2 start serve --name "elite-admin-dashboard" -- -s dist -l 5173
```

### 4. Configure Nginx
```bash
# Create nginx config
cat > /etc/nginx/sites-available/elite-project << 'EOF'
server {
    listen 80 default_server;
    server_name 134.122.102.182;

    # Main website (Next.js)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Strapi CMS
    location /strapi {
        rewrite ^/strapi(.*) $1 break;
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Store API (NestJS)
    location /api {
        proxy_pass http://localhost:3001/api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # GraphQL
    location /graphql {
        proxy_pass http://localhost:3001/graphql;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Admin Dashboard
    location /admin {
        rewrite ^/admin(.*) $1 break;
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/elite-project /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

### 5. PM2 Management
```bash
# Save PM2 configuration
pm2 save

# Enable PM2 startup
pm2 startup

# View all processes
pm2 list

# View logs
pm2 logs

# Restart all
pm2 restart all
```

## 🧪 Testing URLs

After deployment, test these URLs:

- **Main Website**: http://134.122.102.182:3000
- **Strapi Admin**: http://134.122.102.182:1337/admin
- **Store API Docs**: http://134.122.102.182:3001/api/docs
- **GraphQL Playground**: http://134.122.102.182:3001/graphql
- **Admin Dashboard**: http://134.122.102.182:5173

## 🔒 Security Notes

1. **Firewall**: Configure UFW to allow only necessary ports
2. **SSL**: Add SSL certificates later with Cloudflare or Let's Encrypt
3. **Environment Variables**: Change all default secrets in production
4. **Database**: Use connection pooling and proper indexes

## 📞 Support

If any step fails, check:
1. PM2 logs: `pm2 logs`
2. Nginx status: `systemctl status nginx`
3. Port availability: `netstat -tlnp`
4. Application logs in respective directories
