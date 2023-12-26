const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Proxy configuration for nonkyc-veil-xmr
app.use('/nonkyc-veil-xmr', createProxyMiddleware({
  target: 'https://nonkyc.io',
  changeOrigin: true,
  pathRewrite: {
    '^/nonkyc-veil-xmr': '/api/v2/market/getbysymbol/VEIL_XMR'
  }
}));

// Proxy configuration for /api
app.use('/api', createProxyMiddleware({ 
  target: 'https://explorer-api.veil-project.com', 
  changeOrigin: true,
  timeout: 15000, // set timeout to 15 seconds 
  onProxyRes: (proxyRes, req, res) => {
    // Add CORS headers to the response
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  },
}));

// Proxy configuration for probit
app.use('/probit', createProxyMiddleware({ 
  target: 'https://api.probit.com', 
  changeOrigin: true,
  pathRewrite: {
    '^/probit': '/api/exchange/v1'
  }
}));

// Proxy configuration for tradeogre
app.use('/tradeogre', createProxyMiddleware({ 
  target: 'https://tradeogre.com/api/v1', 
  changeOrigin: true,
  pathRewrite: {
    '^/tradeogre': ''
  }
}));

// Proxy configuration for coingecko
app.use('/coingecko', createProxyMiddleware({ 
  target: 'https://api.coingecko.com/api/v3/simple/price',
  changeOrigin: true,
  pathRewrite: {
    '^/coingecko': ''
  },
  onProxyReq(proxyReq, req, res) {
    proxyReq.path += `?ids=veil&vs_currencies=usd`;
  }
}));

// CORS handling for OPTIONS requests
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.sendStatus(200);
});

// Proxy server restart logic (every 30 minutes)
const thirtyMinutes = 30 * 60 * 1000;
const restartProxy = () => {
  console.log('Restarting proxy server...');
  server.close(() => {
    server.listen(3001, () => {
      console.log('Proxy server restarted successfully');
      console.log('Proxy is running again');
    });
  });
};

// Start the proxy server
const server = app.listen(3001, () => {
  console.log('Proxy server listening on port 3001');
});

// Schedule periodic proxy server restarts
setInterval(restartProxy, thirtyMinutes);
