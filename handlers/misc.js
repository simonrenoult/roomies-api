var conf = require('../app.json');

exports.getDocumentation = function(req, res, next){
  res.header('Location', conf.documentation.url);
  res.send(308, 'Redirecting to the Roomies API Documentation');
  return next();
};

exports.getConf = function(req, res, next){
  res.send(conf);
  return next();
};

exports.methodNotAllowed = function(req, res, next) {
  res.send(405, {error: true, message: 'Method not allowed.'});
  return next();
};

exports.redirectToRootAPI = function (app) {
  return function(req, res, next){
    res.header('Location', app.url + '/api');
    res.send(302, 'Redirection to /api');
    return next();
  };
};

exports.apiMethodsList = function(req, res, next) {
  res.json([
    'GET /',
    'GET /api',
    'GET /api/docs',
    'GET /api/roomies',
    'POST /api/roomies',
    'DELETE /api/roomies',
    'GET /api/roomies/:uuid',
    'PUT /api/roomies/:uuid',
    'DELETE /api/roomies/:uuid'
  ]);
  return next();
};
