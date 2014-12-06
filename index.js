var restify = require('restify'),
    fs      = require('fs'),
    conf    = require('./app.json');

// ---------------- SERVER CONF ---------------- //

var port = process.env.PORT || conf.port;
var server = restify.createServer({
  name: conf.name,
  version: '1.0.0'
});

server.use(restify.bodyParser());

// ---------------- MONITORING ------------ //

var opbeat = require('opbeat')({
    organizationId: process.env.OPBEAT_ORGANIZATION_ID,
    appId: process.env.OPBEAT_APP_ID,
    secretToken: process.env.OPBEAT_SECRET_TOKEN
});

// ---------------- HANLDERS ---------------- //

var sayHello = function(req, res, next){
  res.send(200, 'Hello world!');
  return next();
};

var getConf = function(req, res, next){
  res.send(conf);
  return next();
};

var playground = function(req, res, next){
  opbeat.captureError(new Error('Ups, something broke'));
  res.send(404, 'Broken!');
  return next();
};

// ---------------- ROUTES ---------------- //

server.get('/', sayHello);
server.get('/conf', getConf);
server.get('/playground', playground);

// ---------------- SERVER START ---------------- //

server.listen(port, function(){
  console.log('%s listening at %s', server.name, server.url);
});
