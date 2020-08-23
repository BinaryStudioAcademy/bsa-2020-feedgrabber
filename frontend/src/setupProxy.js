const proxy = require('http-proxy-middleware');

const apiProxy = proxy(['/api', '/ws'], {
  target: 'http://localhost:5000',
  logLevel: 'debug',
  changeOrigin: true,
  ws: true
})

const api2Proxy = proxy('/2api', {
  target: 'http://localhost:5001',
  logLevel: 'debug',
  changeOrigin: true
})

module.exports = function (app) {
  app.use(apiProxy);
  app.use(api2Proxy);
};
