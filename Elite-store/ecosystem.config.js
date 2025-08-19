// PM2 Ecosystem Configuration for Elite Project
// Usage: pm2 start ecosystem.config.js

module.exports = {
  apps: [
    {
      name: 'elite-frontend',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/EliteProject/elite-frontend',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/pm2/elite-frontend-error.log',
      out_file: '/var/log/pm2/elite-frontend-out.log',
      log_file: '/var/log/pm2/elite-frontend.log',
      time: true,
      restart_delay: 1000,
      max_restarts: 5,
      min_uptime: '10s'
    },
    {
      name: 'elite-backend',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/EliteProject/elite-backend',
      env: {
        NODE_ENV: 'production',
        PORT: 1337
      },
      error_file: '/var/log/pm2/elite-backend-error.log',
      out_file: '/var/log/pm2/elite-backend-out.log',
      log_file: '/var/log/pm2/elite-backend.log',
      time: true,
      restart_delay: 1000,
      max_restarts: 5,
      min_uptime: '10s'
    },
    {
      name: 'elite-store-backend',
      script: 'npm',
      args: 'run start:prod',
      cwd: '/var/www/EliteProject/Elite-store/elite-store-backend',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: '/var/log/pm2/elite-store-backend-error.log',
      out_file: '/var/log/pm2/elite-store-backend-out.log',
      log_file: '/var/log/pm2/elite-store-backend.log',
      time: true,
      restart_delay: 1000,
      max_restarts: 5,
      min_uptime: '10s'
    },
    {
      name: 'elite-admin-dashboard',
      script: 'serve',
      args: '-s dist -l 5173',
      cwd: '/var/www/EliteProject/Elite-store/elite-admin-dashboard',
      env: {
        NODE_ENV: 'production'
      },
      error_file: '/var/log/pm2/elite-admin-error.log',
      out_file: '/var/log/pm2/elite-admin-out.log',
      log_file: '/var/log/pm2/elite-admin.log',
      time: true,
      restart_delay: 1000,
      max_restarts: 5,
      min_uptime: '10s'
    }
  ]
};
