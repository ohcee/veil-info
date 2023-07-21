const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/api', createProxyMiddleware({ 
  target: 'https://explorer-api.veil-project.com', 
  changeOrigin: true,
  timeout: 15000 // set timeout to 15 seconds 
}));

app.use('/probit', createProxyMiddleware({ 
  target: 'https://api.probit.com', 
  changeOrigin: true,
  pathRewrite: {
    '^/probit': '/api/exchange/v1'
  }
}));

app.use('/tradeogre', createProxyMiddleware({ 
  target: 'https://tradeogre.com/api/v1', 
  changeOrigin: true,
  pathRewrite: {
    '^/tradeogre': ''
  }
}));


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

const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds

const restartProxy = () => {
  console.log('Restarting proxy server...');
  server.close(() => {
    server.listen(3001, () => {
      console.log('Proxy server restarted successfully');
      console.log('Proxy is running again')
    });
  });
};

const server = app.listen(3001, () => {
  console.log('Proxy server listening on port 3001');
});

setInterval(restartProxy, thirtyMinutes);
