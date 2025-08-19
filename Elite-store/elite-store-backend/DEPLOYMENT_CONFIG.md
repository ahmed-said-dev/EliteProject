# 🚀 Elite Store Backend - Production Deployment Configuration

## 📋 Environment Variables

⚠️ **IMPORTANT**: Replace placeholder values with your actual credentials!

Create a `.env` file in the root directory with these variables:

```bash
# Elite Store Backend - Production Environment
NODE_ENV=production
PORT=3001

# Database Configuration (DigitalOcean PostgreSQL)
DB_HOST=elite-store-db-do-user-24606323-0.i.db.ondigitalocean.com
DB_PORT=25060
DB_USERNAME=doadmin
DB_PASSWORD=[YOUR_POSTGRES_PASSWORD]
DB_NAME=defaultdb

# JWT Configuration
JWT_SECRET=[YOUR_JWT_SECRET_HERE]
JWT_EXPIRES_IN=7d

# CORS Configuration - Server IP
CORS_ORIGIN=http://134.122.102.182:3000,http://134.122.102.182:5173,http://134.122.102.182

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Stripe Configuration (Optional)
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Upload Configuration
UPLOAD_DESTINATION=./uploads
MAX_FILE_SIZE=5242880

# SSL Configuration for PostgreSQL
DATABASE_SSL=true
```

## 🛠️ Deployment Commands

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Run database migrations
npm run typeorm:migration:run

# Seed database with initial data
npm run seed

# Start production server
npm run start:prod
```

## 🔧 Production Setup

1. **Node.js**: Requires Node.js 18+ or 20+
2. **Database**: Uses DigitalOcean managed PostgreSQL
3. **Process Manager**: Use PM2 for production
4. **Reverse Proxy**: Configure Nginx

## 📝 Notes

- The application is ready for deployment
- All CORS origins are configured for server IP: 134.122.102.182
- Database connection is configured for DigitalOcean PostgreSQL
- SSL is enabled for database connections

## 🔐 Getting Real Credentials

**PostgreSQL Password**: Available in your DigitalOcean Dashboard > Databases > elite-store-db > Connection Details

**JWT Secret**: Generate a strong secret (e.g., using `openssl rand -hex 32`)

**Other Secrets**: Replace all placeholder values with real production secrets
