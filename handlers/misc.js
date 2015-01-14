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

exports.authenticate = function(req, res, next) {
  var credentials;
  try {
    credentials = req.headers.authorization.split(':');
  } catch (e) {
    return res.send(400, {error: true, message: 'Error parsing credentials, recevied "' + req.headers.authorization + '"'});
  }

  var username = credentials[0];  
  var password = credentials[1];

  if(!username) {
    return res.send(400, {error: true, message: 'Error parsing credentials : username missing'});
  }

  if(!password) {
    return res.send(400, {error: true, message: 'Error parsing credentials : password missing'});
  }

  req.models.Roomy
    .find({
      where: {username: username},
      include: [req.models.Collocation]
    })
    .on('success', function(roomy) {
      if(!roomy) {
        return res.send(404, {error: true, message: 'Roomy not found'});
      }

      if(!roomy.checkPassword(password)) {
        return res.send(400, {error: true, message: 'Wrong credentials'});
      }

      // Success
      return res.send(200, {error: false, message: roomy});
    });
};
