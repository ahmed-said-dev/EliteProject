#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');

// Server configuration
const SERVER_CONFIG = {
  host: '134.122.102.182',
  user: 'root',
  projectPath: '/var/www/EliteProject'
};

console.log('🚀 Elite Project - Server Deployment Script');
console.log('==========================================');

// Function to execute SSH commands
function executeSSHCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`\n📋 ${description}...`);
    
    const sshCommand = `ssh ${SERVER_CONFIG.user}@${SERVER_CONFIG.host} "cd ${SERVER_CONFIG.projectPath} && ${command}"`;
    
    exec(sshCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error: ${error.message}`);
        reject(error);
        return;
      }
      
      if (stderr) {
        console.warn(`⚠️ Warning: ${stderr}`);
      }
      
      console.log(`✅ ${description} completed`);
      if (stdout) {
        console.log(stdout);
      }
      
      resolve(stdout);
    });
  });
}

// Main deployment function
async function deployToServer() {
  try {
    console.log(`\n🔗 Connecting to server: ${SERVER_CONFIG.host}`);
    
    // Step 1: Pull latest changes from GitHub
    await executeSSHCommand(
      'git pull origin main',
      'Pulling latest changes from GitHub'
    );
    
    // Step 2: Install dependencies for all projects
    await executeSSHCommand(
      'cd elite-frontend && npm install',
      'Installing frontend dependencies'
    );
    
    await executeSSHCommand(
      'cd Elite-Backend && npm install',
      'Installing backend dependencies'
    );
    
    await executeSSHCommand(
      'cd Elite-store/elite-store-backend && npm install',
      'Installing store backend dependencies'
    );
    
    await executeSSHCommand(
      'cd Elite-store/elite-admin-dashboard && npm install',
      'Installing admin dashboard dependencies'
    );
    
    // Step 3: Build all projects
    await executeSSHCommand(
      'cd elite-frontend && npm run build',
      'Building frontend'
    );
    
    await executeSSHCommand(
      'cd Elite-Backend && npm run build',
      'Building backend'
    );
    
    await executeSSHCommand(
      'cd Elite-store/elite-store-backend && npm run build',
      'Building store backend'
    );
    
    await executeSSHCommand(
      'cd Elite-store/elite-admin-dashboard && npm run build',
      'Building admin dashboard'
    );
    
    // Step 4: Restart PM2 processes
    await executeSSHCommand(
      'pm2 restart all',
      'Restarting all PM2 processes'
    );
    
    // Step 5: Show PM2 status
    await executeSSHCommand(
      'pm2 list',
      'Checking PM2 processes status'
    );
    
    console.log('\n🎉 Deployment completed successfully!');
    console.log('🌐 Your applications should now be live on:');
    console.log(`   Main Site: http://${SERVER_CONFIG.host}`);
    console.log(`   Admin Dashboard: http://${SERVER_CONFIG.host}/admin/`);
    console.log(`   Store API: http://${SERVER_CONFIG.host}/api/`);
    console.log(`   Strapi CMS: http://${SERVER_CONFIG.host}:8080/admin/`);
    
  } catch (error) {
    console.error('\n❌ Deployment failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your SSH connection');
    console.log('2. Verify server is accessible');
    console.log('3. Check PM2 logs: pm2 logs');
    process.exit(1);
  }
}

// Execute deployment
deployToServer();
