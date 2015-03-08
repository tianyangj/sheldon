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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Expose-Headers", "X-Powered-By");
  next();
});

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  console.log('proxyReq');
  var temp = proxyReq.getHeader('Cookie');
  console.log(temp)
  temp += '; flyauth=198A80BEE0FC3A31A8B41A6809F59ADFBDB654A30BC6936A7BCE0CC6C83459013B4510D84D1004A22D05728B5C6FCB22DDCA4570137F7D7D8C2A61C3AD1D67BC888A2FB2B1C57922E3EF353FB4B371D3CAF6B993A5436E001DF06795952414CC3D0438E453CD5EE08480B82A8F4D5E3689B2B449A78E2F2EA920E599BB0E1A4E60BB1404'
  temp += '; XSRF-TOKEN=l9BubR1B5c9d60lTuCuO0bQAwrxU1iJXZYsVgaV1YwH7zHUIejabkb4oN28YNIGUKtL_ZlubQN4VL6azJXTGwqCMgx41MwRXH8-sKdpoRBTitoss3gmGoRFp7YhNb6J4m69jag2:EgRgONKCSPRUvTkSXWwyxe5ZBx54cnFHkChYgguP1-S4ffbEAAw_0JRYt5Hnx527qmsaFLQKocKQspuuZe8cHAIKcaWL9c4LkvfzvIaDfV1sbZt2kuVb-4asP0GFmTntuU-qxb_5JJ2qgRGXV-30SLWiosM1'
  console.log(temp)
  proxyReq.setHeader('Cookie', temp);
  console.log(req.cookies)
});

proxy.on('proxyRes', function(proxyRes, req, res) {
  console.log('proxyRes');
  var cookies = proxyRes.headers['set-cookie'];
  var xsrf = _(cookies).find(function(cookie) {
    return _(cookie).startsWith('XSRF-TOKEN=');
  });
  if (xsrf) {
    xsrf = xsrf.substring('XSRF-TOKEN='.length, xsrf.indexOf(';'));
    proxyRes.headers['X-XSRF-TOKEN'] = xsrf;
  }
  var flyauth = _(cookies).find(function(cookie) {
    return _(cookie).startsWith('flyauth');
  });
  if (flyauth) {
    flyauth = flyauth.substring('flyauth'.length, flyauth.indexOf(';'));
    proxyRes.headers['X-AUTH-TOKEN'] = flyauth;
  }
  res.cookie('another', 'to')
});

app.use('/api', function(req, res) {
  proxy.web(req, res, {
    target: 'https://api.gamefly.com/api',
    changeOrigin: true
  });
});

app.listen(3000);
console.log('Listening on port', 3000)
