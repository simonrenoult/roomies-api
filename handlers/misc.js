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
