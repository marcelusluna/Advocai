const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // API do Supabase
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.VITE_SUPABASE_URL || 'https://sua_url_supabase_aqui',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );

  // Para todas as outras rotas, retorna index.html para suportar o roteamento do lado do cliente
  app.use('/*', (req, res, next) => {
    if (req.method === 'GET' && !req.url.includes('.')) {
      res.sendFile('index.html', { root: './public' });
    } else {
      next();
    }
  });
}; 