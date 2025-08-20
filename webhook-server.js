#!/usr/bin/env node

const express = require('express');
const { exec } = require('child_process');
const crypto = require('crypto');

const app = express();
const PORT = 9000;

// Middleware to parse JSON
app.use(express.json());

// Simple logging
function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

// Function to execute deployment
function runDeployment() {
  return new Promise((resolve, reject) => {
    log('🚀 Starting auto-deployment...');
    
    exec('cd /var/www/EliteProject && ./server-auto-deploy.sh', (error, stdout, stderr) => {
      if (error) {
        log(`❌ Deployment error: ${error.message}`);
        reject(error);
        return;
      }
      
      if (stderr) {
        log(`⚠️ Deployment stderr: ${stderr}`);
      }
      
      log('✅ Deployment completed successfully');
      log(`📋 Output: ${stdout}`);
      resolve(stdout);
    });
  });
}

// Webhook endpoint for GitHub
app.post('/webhook', async (req, res) => {
  try {
    log('📥 Received webhook request');
    
    // Check if it's a push event to main branch
    const event = req.headers['x-github-event'];
    const payload = req.body;
    
    if (event === 'push' && payload.ref === 'refs/heads/main') {
      log('✅ Valid push to main branch detected');
      
      // Run deployment in background
      runDeployment()
        .then(() => {
          log('🎉 Auto-deployment completed successfully');
        })
        .catch((error) => {
          log(`❌ Auto-deployment failed: ${error.message}`);
        });
      
      res.status(200).json({ 
        status: 'success', 
        message: 'Deployment triggered',
        timestamp: new Date().toISOString()
      });
    } else {
      log(`ℹ️ Ignoring event: ${event} for ref: ${payload.ref || 'unknown'}`);
      res.status(200).json({ 
        status: 'ignored', 
        message: 'Not a push to main branch',
        event: event,
        ref: payload.ref
      });
    }
  } catch (error) {
    log(`❌ Webhook error: ${error.message}`);
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

// Manual deployment endpoint
app.post('/deploy', async (req, res) => {
  try {
    log('🔧 Manual deployment triggered');
    
    const result = await runDeployment();
    
    res.status(200).json({ 
      status: 'success', 
      message: 'Manual deployment completed',
      output: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    log(`❌ Manual deployment failed: ${error.message}`);
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    service: 'Elite Project Webhook Server',
    timestamp: new Date().toISOString()
  });
});

// Status endpoint
app.get('/status', (req, res) => {
  exec('cd /var/www/EliteProject && pm2 list', (error, stdout, stderr) => {
    res.status(200).json({
      pm2_status: stdout || 'Unable to get PM2 status',
      error: error ? error.message : null,
      timestamp: new Date().toISOString()
    });
  });
});

// Start server
app.listen(PORT, () => {
  log(`🌐 Webhook server started on port ${PORT}`);
  log('📡 Ready to receive GitHub webhooks');
  log('🔗 Endpoints:');
  log('   POST /webhook - GitHub webhook');
  log('   POST /deploy - Manual deployment');
  log('   GET /health - Health check');
  log('   GET /status - PM2 status');
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  log('🛑 Webhook server shutting down...');
  process.exit(0);
});

process.on('SIGINT', () => {
  log('🛑 Webhook server shutting down...');
  process.exit(0);
});
