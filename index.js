const http = require('http');
const url = require('url');
const fs = require('fs');

const configBuffer = fs.readFileSync('./config.json');
const config = JSON.parse(configBuffer.toString());

const server = http.createServer((req, res) => {
  const method = req.method;
  const urlInfo = url.parse(req.url);
  if (method === 'GET' && urlInfo.pathname === '/api/list') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({
      success: true,
      data: config.list,
    }));
  } else {
    res.writeHead(404);
    res.end('Not Found!');
  }
});

server.listen(config.port || 3000);
