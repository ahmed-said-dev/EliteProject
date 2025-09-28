#!/usr/bin/env node

const { exec } = require('child_process');

// Server configuration
const SERVER_CONFIG = {
  host: '134.122.102.182',
  user: 'root',
  projectPath: '/var/www/EliteProject'
};

console.log('🔄 Elite Project - Backend Restart Script');
console.log('==========================================');

// Function to execute SSH commands
function executeSSHCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`\n📋 ${description}...`);
    
    const sshCommand = `ssh ${SERVER_CONFIG.user}@${SERVER_CONFIG.host} "${command}"`;
    
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

// Main restart function
async function restartBackend() {
  try {
    console.log(`\n🔗 Connecting to server: ${SERVER_CONFIG.host}`);
    
    // Stop backend process
    await executeSSHCommand(
      'pm2 stop elite-backend-strapi',
      'Stopping elite-backend-strapi process'
    );
    
    // Navigate to backend directory and rebuild
    await executeSSHCommand(
      `cd ${SERVER_CONFIG.projectPath}/elite-backend && npm install`,
      'Installing backend dependencies'
    );
    
    await executeSSHCommand(
      `cd ${SERVER_CONFIG.projectPath}/elite-backend && npm run build`,
      'Building backend'
    );
    
    // Start backend process
    await executeSSHCommand(
      'pm2 start elite-backend-strapi',
      'Starting elite-backend-strapi process'
    );
    
    // Wait a bit for process to start
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Check process status
    await executeSSHCommand(
      'pm2 show elite-backend-strapi',
      'Checking backend process status'
    );
    
    // Show recent logs
    await executeSSHCommand(
      'pm2 logs elite-backend-strapi --lines 10',
      'Showing recent backend logs'
    );
    
    console.log('\n🎉 Backend restart completed successfully!');
    console.log(`🌐 Backend should be running at: http://${SERVER_CONFIG.host}:1337`);
    
  } catch (error) {
    console.error('\n❌ Backend restart failed:', error.message);
    console.log('\n🔧 Try manual restart:');
    console.log('1. SSH to server: ssh root@134.122.102.182');
    console.log('2. Check PM2: pm2 list');
    console.log('3. Restart: pm2 restart elite-backend-strapi');
  }
}

// Execute restart
restartBackend();
