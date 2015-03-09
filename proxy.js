var express = require('express');
var proxy = require('proxy-middleware');
var url = require('url');

var app = express();

// http://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8100');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-XSRF-TOKEN');
  res.header('Access-Control-Expose-Headers', 'X-XSRF-TOKEN');
  if (req.method === 'OPTIONS') {
  	// do NOT proxy OPTIONS requests
  	res.end();
  } else {
  	next();
  }
});

var options = url.parse('https://api.gamefly.com/api');
options.route = '/api';
options.cookieRewrite = '127.0.0.1';
app.use(proxy(options));

app.listen(3000);
console.log('Proxy listening on port', 3000);
