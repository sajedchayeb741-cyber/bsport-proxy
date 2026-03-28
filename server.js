const http = require('http');
const { URL } = require('url');

const IPTV_HOST = 'mgdata.online';
const IPTV_PORT = 2052;
const PORT = process.env.PORT || 3000;

function makeRequest(options, res, depth) {
  if (depth > 5) {
    res.writeHead(508, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
    res.end('Too many redirects');
    return;
  }

  const req = http.request(options, (proxyRes) => {
    // Suivre les redirections
    if ([301,302,307,308].includes(proxyRes.statusCode) && proxyRes.headers.location) {
      const loc = proxyRes.headers.location;
      console.log(`→ Redirect [${depth}]:`, loc);
      let redirectUrl;
      try {
        redirectUrl = new URL(loc);
      } catch {
        redirectUrl = new URL(loc, `http://${options.hostname}:${options.port}`);
      }
      const newOpts = {
        hostname: redirectUrl.hostname,
        port: redirectUrl.port || 80,
        path: redirectUrl.pathname + redirectUrl.search,
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': '*/*',
        },
        timeout: 15000,
      };
      makeRequest(newOpts, res, depth + 1);
      return;
    }

    const headers = { ...proxyRes.headers };
    headers['access-control-allow-origin'] = '*';
    headers['access-control-allow-methods'] = 'GET, OPTIONS';
    delete headers['content-security-policy'];
    delete headers['x-frame-options'];

    res.writeHead(proxyRes.statusCode, headers);
    proxyRes.pipe(res);
  });

  req.on('error', (e) => {
    console.error('Request error:', e.message);
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
      res.end('Proxy error: ' + e.message);
    }
  });

  req.on('timeout', () => {
    req.destroy();
    if (!res.headersSent) {
      res.writeHead(504, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
      res.end('Proxy timeout');
    }
  });

  req.end();
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/' || req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('BSPORT Proxy OK');
    return;
  }

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

  makeRequest(options, res, 0);
});

server.listen(PORT, () => {
  console.log(`BSPORT Proxy running on port ${PORT}`);
});
