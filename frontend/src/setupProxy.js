const proxy = require('http-proxy-middleware');

const apiProxy = proxy(['/api', '/ws'], {
  target: 'http://localhost:5000',
  logLevel: 'debug',
  changeOrigin: true,
  ws: true
})

module.exports = function (app) {
  app.use(apiProxy);
};
