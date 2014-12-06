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

// ---------------- HANLDERS ---------------- //

var sayHello = function(req, res, next){
  res.send(200, 'Hello world!');
  return next();
};

var getConf = function(req, res, next){
  res.send(conf);
  return next();
};

// ---------------- ROUTES ---------------- //

server.get('/', sayHello);
server.get('/conf', getConf);

// ---------------- SERVER START ---------------- //

server.listen(port, function(){
  console.log('%s listening at %s', server.name, server.url);
});
