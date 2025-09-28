#!/usr/bin/env node

const { exec } = require('child_process');

// Server configuration
const SERVER_CONFIG = {
  host: '134.122.102.182',
  user: 'root',
  projectPath: '/var/www/EliteProject'
};

console.log('🔍 Elite Project - Server Status Checker');
console.log('========================================');

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

// Main status check function
async function checkServerStatus() {
  try {
    console.log(`\n🔗 Connecting to server: ${SERVER_CONFIG.host}`);
    
    // Check PM2 processes
    await executeSSHCommand(
      'pm2 list',
      'Checking PM2 processes'
    );
    
    // Check specific backend process
    await executeSSHCommand(
      'pm2 show elite-backend-strapi',
      'Checking elite-backend-strapi process details'
    );
    
    // Check project directory
    await executeSSHCommand(
      `cd ${SERVER_CONFIG.projectPath} && ls -la`,
      'Checking project directory contents'
    );
    
    // Check git status
    await executeSSHCommand(
      `cd ${SERVER_CONFIG.projectPath} && git status`,
      'Checking git status on server'
    );
    
    // Check last commit
    await executeSSHCommand(
      `cd ${SERVER_CONFIG.projectPath} && git log --oneline -5`,
      'Checking last 5 commits on server'
    );
    
    // Check backend process logs
    await executeSSHCommand(
      'pm2 logs elite-backend-strapi --lines 20',
      'Checking backend process logs'
    );
    
    console.log('\n✅ Server status check completed!');
    
  } catch (error) {
    console.error('\n❌ Status check failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your SSH connection');
    console.log('2. Verify server is accessible');
    console.log('3. Check if PM2 is running');
  }
}

// Execute status check
checkServerStatus();
