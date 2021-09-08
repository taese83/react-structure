const { createProxyMiddleware } = require('http-proxy-middleware');
const proxyList = require('libs/network/proxy/proxy-list.json');

module.exports = function (app) {
  proxyList.forEach(({ proxy, origin }) => {
    if (!proxy || !origin) return;
    app.use(
      createProxyMiddleware(proxy, {
        target: origin,
        changeOrigin: true,
        pathRewrite(path) {
          return path.replace(proxy, '');
        },
      }),
    );
  });
};
