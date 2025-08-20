#!/usr/bin/env node

const { exec } = require('child_process');

console.log('🚀 Elite Project - Auto Deploy to Server');
console.log('========================================');

// Function to execute commands
function executeCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`\n📋 ${description}...`);
    
    exec(command, (error, stdout, stderr) => {
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

async function deployToServer() {
  try {
    console.log('\n🔗 Triggering server deployment...');
    
    // Execute the server deployment script
    await executeCommand(
      'node server-deploy.js',
      'Running server deployment'
    );
    
    console.log('\n🎉 Auto-deployment completed!');
    console.log('📱 Check your applications:');
    console.log('   http://134.122.102.182 (Main Site)');
    console.log('   http://134.122.102.182/admin/ (Admin Dashboard)');
    console.log('   http://134.122.102.182:8080/admin/ (Strapi CMS)');
    
  } catch (error) {
    console.error('\n❌ Auto-deployment failed:', error.message);
    process.exit(1);
  }
}

// Only run if called directly
if (require.main === module) {
  deployToServer();
}

module.exports = { deployToServer };
