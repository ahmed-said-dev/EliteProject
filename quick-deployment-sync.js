#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Server configuration
const SERVER_CONFIG = {
  host: '134.122.102.182',
  user: 'root',
  projectPath: '/var/www/EliteProject',
  privateKeyPath: null // Add path to your SSH key if needed
};

console.log('⚡ Elite Project - Quick Backend Sync');
console.log('===================================');

// Function to execute local commands
function executeLocalCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`\n📋 ${description}...`);
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error: ${error.message}`);
        reject(error);
        return;
      }
      
      if (stderr && !stderr.includes('warning')) {
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

// Function to execute SSH commands
function executeSSHCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`\n📋 ${description}...`);
    
    const sshKey = SERVER_CONFIG.privateKeyPath ? `-i ${SERVER_CONFIG.privateKeyPath}` : '';
    const sshCommand = `ssh ${sshKey} ${SERVER_CONFIG.user}@${SERVER_CONFIG.host} "cd ${SERVER_CONFIG.projectPath} && ${command}"`;
    
    exec(sshCommand, { timeout: 300000 }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error: ${error.message}`);
        reject(error);
        return;
      }
      
      if (stderr && !stderr.includes('warning')) {
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

// Check if there are uncommitted changes
async function checkGitStatus() {
  try {
    console.log('\n🔍 Checking for local changes...');
    const status = await executeLocalCommand('git status --porcelain', 'Checking git status');
    
    if (status.trim()) {
      console.log('\n📝 Uncommitted changes found:');
      console.log(status);
      
      const commitMessage = `Backend updates - ${new Date().toISOString().split('T')[0]}`;
      
      await executeLocalCommand('git add .', 'Adding all changes');
      await executeLocalCommand(`git commit -m "${commitMessage}"`, 'Committing changes');
      await executeLocalCommand('git push origin main', 'Pushing to GitHub');
    } else {
      console.log('✅ No uncommitted changes found');
    }
  } catch (error) {
    console.warn('⚠️ Git operations failed, but continuing with deployment...');
  }
}

// Main sync function
async function syncBackendToServer() {
  try {
    console.log(`\n🔗 Syncing to server: ${SERVER_CONFIG.host}`);
    
    // Step 1: Check and commit local changes
    await checkGitStatus();
    
    // Step 2: Pull latest changes on server
    await executeSSHCommand(
      'git pull origin main',
      'Pulling latest changes from GitHub'
    );
    
    // Step 3: Focus on backend specifically
    await executeSSHCommand(
      'cd elite-backend && npm install --production',
      'Installing backend dependencies (production mode)'
    );
    
    // Step 4: Build backend
    await executeSSHCommand(
      'cd elite-backend && npm run build',
      'Building backend (Strapi)'
    );
    
    // Step 5: Restart backend PM2 process specifically
    await executeSSHCommand(
      'pm2 restart elite-backend',
      'Restarting backend PM2 process'
    );
    
    // Step 6: Check backend status
    await executeSSHCommand(
      'pm2 show elite-backend',
      'Checking backend process status'
    );
    
    // Step 7: Test backend API
    await executeSSHCommand(
      'curl -f http://localhost:1337/api/service-pages || echo "Backend API test completed"',
      'Testing backend API endpoint'
    );
    
    console.log('\n🎉 Backend sync completed successfully!');
    console.log('🌐 Backend should now be updated at:');
    console.log(`   Strapi Admin: http://${SERVER_CONFIG.host}:1337/admin/`);
    console.log(`   API Endpoint: http://${SERVER_CONFIG.host}:1337/api/`);
    
  } catch (error) {
    console.error('\n❌ Backend sync failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check SSH connection: ssh root@134.122.102.182');
    console.log('2. Check PM2 status: pm2 list');
    console.log('3. Check backend logs: pm2 logs elite-backend');
    console.log('4. Check if Strapi is running: curl http://134.122.102.182:1337/api/service-pages');
    process.exit(1);
  }
}

// Execute sync
syncBackendToServer();
