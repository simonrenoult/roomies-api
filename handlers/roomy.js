var Sequelize = require('sequelize');
var util = require('util');

exports.findAll = function(req, res, next){
  req.models.Roomy.findAll().then(function(roomies){
    res.send(200, {error: false, message: roomies});
    return next(roomies);
  });
};

exports.findOne = function(req, res, next){
  req.models.Roomy.find(req.params.id).then(function(roomy){
    if(!roomy) {
      res.send(404);
      return next();
    }

    res.send(200, {error: false, message: roomy});
    return next(roomy);
  });
};

exports.deleteAll = function(req, res, next){
  req.models.Roomy.findAll().then(function(roomies){
    if(!roomies.length) {
      res.send(404);
      return next();
    }

    var chainer = new Sequelize.Utils.QueryChainer();
    roomies.forEach(function(roomy) {
        chainer.add(roomy.destroy());
    });

    chainer.run();
    res.send(200, {error: false, message: 'Roomies removed'});
    return next();
  });
};

exports.deleteOne = function(req, res, next){
  req.models.Roomy.find(req.params.id).then(function(roomy){
    if(!roomy) {
      res.send(404);
      return next();
    }

    roomy.destroy().then(function(err){
      if(err) {
        res.send(500);
        return next();
      }

      res.send(200, {error: false, message: 'Roomy #' + roomy.id + ' deleted.'});
      return next(roomy);
    });
  });
};

exports.createOne = function(req, res, next) {
  req.models.Roomy.create(req.body).then(function(roomy){
    if(!roomy){
      res.send(500);
      return next(roomy);
    }

    res.send(201, {error: false, message: roomy});
    return next(roomy);
  });
};

exports.updateOne = function(req, res, next){
  req.models.Roomy.find(req.params.id).then(function(roomy){
    if(!roomy) {
      res.send(404);
      return next();
    }
    roomy.updateAttributes(req.params).then(function(roomy){
      res.send(200, {error: false, message: roomy});
      return next(roomy);
    });
  });
};
