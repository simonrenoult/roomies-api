var Sequelize = require('sequelize');

exports.findAll = function(req, res, next) {
  req.models.Collocation
    .findAll()
    .on('success', function(collocations) {
      res.send(200, {error: false, message: collocations});
    })
    .on('error', function(err) {
      res.send(err);
    });
};

exports.findOne = function(req, res, next) {
  req.models.Collocation
    .find(req.params.uuid)
    .on('success', function(collocation) {
      res.send(200, {error: false, message: collocation});
    })
    .on('error', function(err) {
      res.send(err);
    });
};

exports.createOne = function(req, res, next) {
  var name = req.body.name;
  var address = req.body.address;

  var collocation = req.models.Collocation.build({
    name: name,
    address: address
  });

  collocation
    .save()
    .on('success', function(collocation){
      res.send(201, {error: false, message: collocation});
    })
    .on('error', function(err) {
      res.send(err);
    });
};

exports.deleteOne = function(req, res, next) {
  req.models.Collocation
    .find(req.body.uuid)
    .on('success', function(collocation) {
      collocation
        .destroy()
        .on('success', function() {
          res.send(200, {error: false, message: 'Collocation remove'});
        });
    })
    .on('error', function(err) {
      res.send(err);
    });
};

exports.deleteAll = function(req, res, next) {
  req.models.Collocation
    .findAll()
    .on('success', function(collocations) {
      var chainer = new Sequelize.Utils.QueryChainer();
      collocations.forEach(function(collocation) {
        chainer.add(collocation.destroy());
      });

      chainer.run();
      res.send(200, {error:false, message: 'Collocations removed'});
    })
    .on('error', function(err) {
      res.send(err);
    });
};
