const http = require('http');
const https = require('https');
const { URL } = require('url');

const IPTV_HOST = 'mgdata.online';
const IPTV_PORT = 2052;
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

  // CORS — permet à n'importe quel site d'appeler ce proxy
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Health check
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('BSPORT Proxy OK');
    return;
  }

  // Reconstruction URL cible
  const target = `http://${IPTV_HOST}:${IPTV_PORT}${req.url}`;
  console.log('→ Proxy:', target);

  const options = {
    hostname: IPTV_HOST,
    port: IPTV_PORT,
    path: req.url,
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': '*/*',
      'Connection': 'keep-alive',
    },
    timeout: 15000,
  };

  const proxyReq = http.request(options, (proxyRes) => {
    // Copie des headers de la réponse
    const headers = { ...proxyRes.headers };
    headers['access-control-allow-origin'] = '*';
    delete headers['content-security-policy'];
    delete headers['x-frame-options'];

    res.writeHead(proxyRes.statusCode, headers);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (e) => {
    console.error('Proxy error:', e.message);
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
      res.end('Proxy error: ' + e.message);
    }
  });

  proxyReq.on('timeout', () => {
    proxyReq.destroy();
    if (!res.headersSent) {
      res.writeHead(504, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
      res.end('Proxy timeout');
    }
  });

  proxyReq.end();
});

server.listen(PORT, () => {
  console.log(`BSPORT Proxy running on port ${PORT}`);
});
