const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/api'],
    createProxyMiddleware({
      target: 'https://vast-shore-74260.herokuapp.com/banks',
    })
  );
};
