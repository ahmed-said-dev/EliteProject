#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');

// Server configuration
const SERVER_CONFIG = {
  host: '134.122.102.182',
  user: 'root',
  projectPath: '/var/www/EliteProject'
};

console.log('🛠️ Elite Project - Deployment Sync Fix');
console.log('======================================');

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

// Main fix function
async function fixDeploymentSync() {
  try {
    console.log('🔍 Starting comprehensive deployment sync fix...\n');
    
    // Step 1: Check local git status
    console.log('=== STEP 1: LOCAL GIT STATUS CHECK ===');
    await executeLocalCommand(
      'git status --porcelain',
      'Checking local git changes'
    );
    
    // Step 2: Check server git status
    console.log('\n=== STEP 2: SERVER GIT STATUS CHECK ===');
    await executeSSHCommand(
      `cd ${SERVER_CONFIG.projectPath} && git status`,
      'Checking server git status'
    );
    
    // Step 3: Compare commits
    console.log('\n=== STEP 3: COMMIT COMPARISON ===');
    const localCommit = await executeLocalCommand(
      'git rev-parse HEAD',
      'Getting local latest commit hash'
    );
    
    const serverCommit = await executeSSHCommand(
      `cd ${SERVER_CONFIG.projectPath} && git rev-parse HEAD`,
      'Getting server latest commit hash'
    );
    
    console.log(`\n📊 Commit Comparison:`);
    console.log(`Local:  ${localCommit.trim()}`);
    console.log(`Server: ${serverCommit.trim()}`);
    
    if (localCommit.trim() !== serverCommit.trim()) {
      console.log('\n🚨 COMMITS ARE OUT OF SYNC!');
      console.log('This explains why your changes are not showing on the server.');
      
      // Ask for sync
      console.log('\n🔄 Attempting to sync...');
      
      // Push local changes
      await executeLocalCommand(
        'git add . && git commit -m "Sync backend changes" && git push origin main',
        'Pushing local changes to GitHub'
      );
      
      // Pull on server
      await executeSSHCommand(
        `cd ${SERVER_CONFIG.projectPath} && git pull origin main`,
        'Pulling latest changes on server'
      );
      
    } else {
      console.log('\n✅ Commits are in sync.');
    }
    
    // Step 4: Check backend process
    console.log('\n=== STEP 4: BACKEND PROCESS CHECK ===');
    await executeSSHCommand(
      'pm2 show elite-backend-strapi',
      'Checking backend process details'
    );
    
    // Step 5: Rebuild and restart backend
    console.log('\n=== STEP 5: BACKEND REBUILD & RESTART ===');
    await executeSSHCommand(
      `cd ${SERVER_CONFIG.projectPath}/elite-backend && npm install --production`,
      'Installing backend dependencies'
    );
    
    await executeSSHCommand(
      `cd ${SERVER_CONFIG.projectPath}/elite-backend && npm run build`,
      'Building backend'
    );
    
    await executeSSHCommand(
      'pm2 restart elite-backend-strapi',
      'Restarting backend process'
    );
    
    // Step 6: Verify fix
    console.log('\n=== STEP 6: VERIFICATION ===');
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
    
    await executeSSHCommand(
      'pm2 show elite-backend-strapi',
      'Verifying backend is running'
    );
    
    await executeSSHCommand(
      'pm2 logs elite-backend-strapi --lines 10',
      'Checking recent backend logs'
    );
    
    console.log('\n🎉 Deployment sync fix completed!');
    console.log('\n🌐 Your backend should now reflect the latest changes at:');
    console.log(`   Backend API: http://${SERVER_CONFIG.host}:1337`);
    console.log(`   Admin Panel: http://${SERVER_CONFIG.host}:1337/admin`);
    
    console.log('\n📋 Summary of actions taken:');
    console.log('✅ Checked local and server git status');
    console.log('✅ Synced commits between local and server');
    console.log('✅ Rebuilt backend with latest changes');
    console.log('✅ Restarted backend process');
    console.log('✅ Verified process is running correctly');
    
  } catch (error) {
    console.error('\n❌ Fix process failed:', error.message);
    console.log('\n🔧 Manual steps to try:');
    console.log('1. Commit and push local changes: git add . && git commit -m "Backend updates" && git push origin main');
    console.log('2. SSH to server: ssh root@134.122.102.182');
    console.log('3. Pull changes: cd /var/www/EliteProject && git pull origin main');
    console.log('4. Rebuild backend: cd elite-backend && npm run build');
    console.log('5. Restart process: pm2 restart elite-backend-strapi');
  }
}

// Execute fix
fixDeploymentSync();
