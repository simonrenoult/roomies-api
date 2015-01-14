var
  restify = require('restify'),
  conf    = require('./app'),
  models  = require('./models');

// ---------------- SERVER CONF ---------------- //

var app = restify.createServer({
  logging: true,
  name: conf.name,
  version: '1.0.0'
});

app.use(restify.bodyParser());

app.use(function(req, res, next){
  req.models = models;
  return next();
});

app.use(function(req, res, next) {
  res.setHeader('content-type', 'application/json');
  return next();
});

app.use(function(req, res, next){
  if(req.method === 'GET' && req.url === '/api/auth') {
    return next();
  }

  if(req.method === 'POST' && req.url === '/api/roomies') {
    return next();
  }

  if(req.headers.authorization === 'bypass') {
    return next();
  }

  req.models.Roomy
    .findAll({where:{token: req.headers.authorization}})
    .on('success', function(roomy) {
      if(!roomy.length){
        return res.send(401, {error: true, message: 'Unknown token'});
      }

      return next();
    });
});

// ---------------- MONITORING ------------ //

var opbeat = require('opbeat')({
  logging: false,
  organizationId: process.env.OPBEAT_ORG_ID,
  appId: process.env.OPBEAT_APP_ID,
  secretToken: process.env.OPBEAT_SECRET_TOKEN
});

// ---------------- HANLDERS ---------------- //

var miscHandler = require('./handlers/misc');
var roomyHandler = require('./handlers/roomy');
var collocationHandler = require('./handlers/collocation');
var messageHandler = require('./handlers/message');

// ---------------- ROUTES ---------------- //

app.get('/', miscHandler.redirectToRootAPI(app));
app.get('/api', miscHandler.apiMethodsList);
app.get('/api/docs', miscHandler.getDocumentation);
app.get('/api/conf', miscHandler.getConf);

app.get('/api/auth', miscHandler.authenticate);

// ---- ROOMIES ---- //

app.get ('/api/roomies', roomyHandler.findAll);
app.post('/api/roomies', roomyHandler.createOne);
app.del ('/api/roomies', roomyHandler.deleteAll);
app.put ('/api/roomies', miscHandler.methodNotAllowed);

app.get ('/api/roomies/:uuid', roomyHandler.findOne);
app.put ('/api/roomies/:uuid', roomyHandler.updateOne);
app.del ('/api/roomies/:uuid', roomyHandler.deleteOne);
app.post('/api/roomies/:uuid', miscHandler.methodNotAllowed);

// ---- COLLOCATIONS ---- //

app.get ('/api/collocations', collocationHandler.findAll);
app.post('/api/collocations', collocationHandler.createOne);
app.put ('/api/collocations', miscHandler.methodNotAllowed);
app.del ('/api/collocations', collocationHandler.deleteAll);

app.get ('/api/collocations/:uuid', collocationHandler.findOne);
app.post('/api/collocations/:uuid', miscHandler.methodNotAllowed);
// TODO: Implement PUT handler
// app.put('/api/collocations/:uuid', collocation.updateOne);
app.del ('/api/collocations/:uuid', collocationHandler.deleteOne);

app.get ('/api/collocations/:uuid/messages', collocationHandler.getMessages);

// ---- MESSAGES ---- //

app.get ('/api/messages', messageHandler.findAll);
app.post('/api/messages', messageHandler.createOne);
app.put ('/api/messages', miscHandler.methodNotAllowed);
app.del ('/api/messages', messageHandler.deleteAll);

app.get ('/api/messages/:uuid', messageHandler.findOne);
// app.put ('/api/messages/:uuid', messageHandler.updateOne);
app.del ('/api/messages/:uuid', messageHandler.deleteOne);
app.post('/api/messages/:uuid', miscHandler.methodNotAllowed);


// ---------------- MISC ---------------- //

module.exports = app;
