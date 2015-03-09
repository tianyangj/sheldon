var express = require('express');
var httpProxy = require('http-proxy');
var cookieParser = require('cookie-parser')
var _ = require('lodash');

var app = express();
var proxy = httpProxy.createServer({});


app.get('/api/test', function(req, res) {
  res.cookie('name', 'tobi');
  res.send({
    hostname: req.hostname,
    origin: req.headers.origin
  });
});

app.use(cookieParser())

// http://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-XSRF-TOKEN, X-AUTH-TOKEN');
  res.header('Access-Control-Expose-Headers', 'X-XSRF-TOKEN, X-AUTH-TOKEN');
  next();
});

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  console.log('proxyReq');
  var auth = proxyReq.getHeader('X-AUTH-TOKEN');
  var xsrf = proxyReq.getHeader('X-XSRF-TOKEN');
  var cookies = 'sessionInit=True;';
  if (auth) {
    cookies += 'flyauth=' + auth + ';';
  }
  if (xsrf) {
    cookies += 'XSRF-TOKEN=' + xsrf + ';';
  }
  proxyReq.setHeader('Cookie', cookies);
  console.log(proxyReq.getHeader('Cookie'))
});

proxy.on('proxyRes', function(proxyRes, req, res) {
  // get response cookies
  var cookies = proxyRes.headers['set-cookie'];
  console.log('response cookies', cookies)
  // find XSRF-TOKEN cookie
  var xsrf = _(cookies).findLast(function(cookie) {
    return _(cookie).startsWith('XSRF-TOKEN=');
  });
  // set header X-XSRF-TOKEN with cookie XSRF-TOKEN value
  if (xsrf) {
    xsrf = xsrf.substring('XSRF-TOKEN='.length, xsrf.indexOf(';'));
    proxyRes.headers['X-XSRF-TOKEN'] = xsrf;
  }
  // find flyauth cookie
  var flyauth = _(cookies).findLast(function(cookie) {
    return _(cookie).startsWith('flyauth=');
  });
  // set header X-AUTH-TOKEN with cookie flyauth value
  if (flyauth) {
    flyauth = flyauth.substring('flyauth='.length, flyauth.indexOf(';'));
    proxyRes.headers['X-AUTH-TOKEN'] = flyauth;
  }
});

app.use('/api', function(req, res) {
  if (req.method === 'OPTIONS') {
    res.end();
  } else {
    proxy.web(req, res, {
      target: 'https://api.gamefly.com/api',
      changeOrigin: true
    });
  }
});

app.listen(3000);
console.log('Proxy listening on port', 3000);
