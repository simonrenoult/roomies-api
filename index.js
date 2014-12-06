var restify   = require('restify');

// ---------------- SERVER CONF ---------------- //

var port = process.env.PORT || 5000;
var server = restify.createServer({
  name: 'Roomies',
  version: '1.0.0'
});

server.use(restify.bodyParser());

// ---------------- HANLDERS ---------------- //

var sayHello = function(req, res, next){
	res.send(200, 'Hello world!');
};

// ---------------- ROUTES ---------------- //

server.get('/', sayHello);

// ---------------- SERVER START ---------------- //

server.listen(port, function(){
  console.log('%s listening at %s', server.name, server.url);
});
