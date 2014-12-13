var restify = require('restify'),
    conf    = require('./app.json'),
    db      = require('./models');

// ---------------- SERVER CONF ---------------- //

var app = restify.createServer({
  logging: false,
  name: conf.name,
  version: '1.0.0'
});

app.use(restify.bodyParser());

// ---------------- MONITORING ------------ //

var opbeat = require('opbeat')({
  logging: false,
  organizationId: process.env.OPBEAT_ORGANIZATION_ID,
  appId: process.env.OPBEAT_APP_ID,
  secretToken: process.env.OPBEAT_SECRET_TOKEN
});

// ---------------- HANLDERS ---------------- //

var miscHanlder = require('./handlers/misc');

// ---------------- ROUTES ---------------- //

app.get('/api/docs', miscHanlder.getDocumentation);
app.get('/api/conf', miscHanlder.getConf);

// ---------------- MISC ---------------- //

module.exports = app;
