# 🔐 Security & Credentials Guide

## ⚠️ IMPORTANT SECURITY NOTICE

**This repository does NOT contain real passwords or secrets.**

All configuration files use placeholder values that must be replaced with your actual credentials during deployment.

## 🔑 Getting Your Real Credentials

### PostgreSQL Database Password
1. Go to [DigitalOcean Dashboard](https://cloud.digitalocean.com/)
2. Navigate to **Databases** section
3. Click on your **elite-store-db** database
4. Go to **Connection Details** tab
5. Copy the **Password** field

### JWT Secret
Generate a strong JWT secret:
```bash
# Using OpenSSL
openssl rand -hex 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Email Configuration (Optional)
- **Gmail**: Use App Passwords (not your regular password)
- **Other providers**: Check your email provider's SMTP settings

### Stripe Configuration (Optional)
- Get from [Stripe Dashboard](https://dashboard.stripe.com/)
- Use **Test Keys** for development
- Use **Live Keys** for production

## 🛡️ Security Best Practices

1. **Never commit real passwords to Git**
2. **Use environment variables for secrets**
3. **Rotate secrets regularly**
4. **Use different secrets for development/production**
5. **Enable 2FA on all accounts**

## 📋 Deployment Checklist

Before deploying:
- [ ] Replace all `[YOUR_*]` placeholders with real values
- [ ] Generate strong JWT secrets
- [ ] Configure environment variables
- [ ] Test database connection
- [ ] Verify CORS settings
- [ ] Enable SSL certificates

## 🚀 Quick Setup

1. Copy the configuration template:
```bash
cp Elite-store/elite-store-backend/DEPLOYMENT_CONFIG.md .env.template
```

2. Edit with your real credentials:
```bash
nano .env.template
```

3. Deploy with real values:
```bash
# Don't commit this file!
cp .env.template .env
```

## 📞 Support

If you need help securing your deployment, check:
- [DigitalOcean Security Docs](https://docs.digitalocean.com/products/droplets/how-to/secure/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [OWASP Security Guidelines](https://owasp.org/)
