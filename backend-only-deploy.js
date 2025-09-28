#!/usr/bin/env node

const { exec } = require('child_process');

// Server configuration
const SERVER_CONFIG = {
  host: '134.122.102.182',
  user: 'root',
  projectPath: '/var/www/EliteProject'
};

console.log('🎯 Elite Backend Only - Deployment Script');
console.log('========================================');

// Function to execute SSH commands with better error handling
function executeSSHCommand(command, description, timeout = 300000) {
  return new Promise((resolve, reject) => {
    console.log(`\n📋 ${description}...`);
    
    const sshCommand = `ssh -o ConnectTimeout=10 ${SERVER_CONFIG.user}@${SERVER_CONFIG.host} "cd ${SERVER_CONFIG.projectPath} && ${command}"`;
    
    const process = exec(sshCommand, { timeout }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error: ${error.message}`);
        reject(error);
        return;
      }
      
      if (stderr && !stderr.includes('warning') && !stderr.includes('npm WARN')) {
        console.warn(`⚠️ Warning: ${stderr}`);
      }
      
      console.log(`✅ ${description} completed`);
      if (stdout) {
        console.log(stdout);
      }
      
      resolve(stdout);
    });
    
    // Handle timeout
    setTimeout(() => {
      if (!process.killed) {
        console.log(`⏱️ ${description} is taking longer than expected...`);
      }
    }, 30000);
  });
}

// Test server connectivity
async function testServerConnection() {
  try {
    await executeSSHCommand('echo "Connection test successful"', 'Testing server connection', 10000);
    return true;
  } catch (error) {
    console.error('❌ Cannot connect to server. Please check:');
    console.error('1. SSH key is properly configured');
    console.error('2. Server is accessible');
    console.error('3. Network connection is stable');
    return false;
  }
}

// Main backend deployment function
async function deployBackendOnly() {
  try {
    // Test connection first
    console.log('🔍 Testing server connection...');
    const connected = await testServerConnection();
    if (!connected) {
      process.exit(1);
    }
    
    console.log(`\n🎯 Deploying backend changes to: ${SERVER_CONFIG.host}`);
    
    // Step 1: Show current status
    await executeSSHCommand(
      'pm2 list | grep elite-backend || echo "Backend process not found in PM2"',
      'Checking current backend status'
    );
    
    // Step 2: Pull latest changes
    await executeSSHCommand(
      'git pull origin main --force',
      'Force pulling latest changes from GitHub'
    );
    
    // Step 3: Clear Node modules and reinstall (to ensure clean dependencies)
    await executeSSHCommand(
      'cd elite-backend && rm -rf node_modules package-lock.json && npm cache clean --force',
      'Cleaning backend dependencies cache'
    );
    
    await executeSSHCommand(
      'cd elite-backend && npm install --production --no-optional',
      'Installing fresh backend dependencies'
    );
    
    // Step 4: Build backend
    await executeSSHCommand(
      'cd elite-backend && npm run build',
      'Building backend with fresh dependencies'
    );
    
    // Step 5: Stop backend process
    await executeSSHCommand(
      'pm2 stop elite-backend || echo "Backend was not running"',
      'Stopping backend process'
    );
    
    // Step 6: Start/restart backend process
    await executeSSHCommand(
      'cd elite-backend && pm2 start ecosystem.config.js --only elite-backend || pm2 start npm --name "elite-backend" -- run start',
      'Starting backend process'
    );
    
    // Step 7: Wait for backend to start
    console.log('\n⏳ Waiting for backend to initialize...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Step 8: Check if backend is running
    await executeSSHCommand(
      'pm2 show elite-backend',
      'Checking backend process details'
    );
    
    // Step 9: Test API endpoints
    await executeSSHCommand(
      'curl -s -o /dev/null -w "%{http_code}" http://localhost:1337/api/service-pages || echo "API test completed with status code above"',
      'Testing backend API response'
    );
    
    // Step 10: Show logs for verification
    await executeSSHCommand(
      'pm2 logs elite-backend --lines 10',
      'Showing recent backend logs'
    );
    
    console.log('\n🎉 Backend deployment completed successfully!');
    console.log('🔗 Backend endpoints:');
    console.log(`   Admin Panel: http://${SERVER_CONFIG.host}:1337/admin/`);
    console.log(`   API Base: http://${SERVER_CONFIG.host}:1337/api/`);
    console.log(`   Service Pages: http://${SERVER_CONFIG.host}:1337/api/service-pages`);
    console.log(`   Blog Articles: http://${SERVER_CONFIG.host}:1337/api/blog-articles`);
    
    console.log('\n📊 Monitor your backend:');
    console.log('   pm2 logs elite-backend    # View logs');
    console.log('   pm2 monit                # Monitor all processes');
    console.log('   pm2 restart elite-backend # Restart if needed');
    
  } catch (error) {
    console.error('\n❌ Backend deployment failed:', error.message);
    
    console.log('\n🆘 Emergency troubleshooting commands:');
    console.log(`ssh ${SERVER_CONFIG.user}@${SERVER_CONFIG.host}`);
    console.log('cd /var/www/EliteProject');
    console.log('pm2 logs elite-backend');
    console.log('pm2 restart elite-backend');
    
    process.exit(1);
  }
}

// Execute deployment
deployBackendOnly();
