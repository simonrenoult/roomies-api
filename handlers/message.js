var Sequelize = require('sequelize');

exports.findAll = function(req, res, next) {
  req.models.Message
    .findAll()
    .on('success', function(messages) {
      res.send(200, {error: false, message: messages});
    })
    .on('error', function(err) {
      res.send(err);
    });
};

exports.findOne = function(req, res, next) {
  req.models.Message
    .find({where: {uuid:req.params.uuid}})
    .on('success', function(message) {
      res.send(200, {error: false, message: message});
    })
    .on('error', function(err) {
      res.send(err);
    });
};

exports.createOne = function(req, res, next) {
  var content = req.body.content;
  var roomyId = req.body.roomyId;
  var collocationId = req.body.collocationId;

  var message = req.models.Message.build({
    content: content,
    CollocationId: collocationId,
    RoomyId: roomyId
  });

  message
    .save()
    .on('success', function(message){
      req.models.Message.findAll()
      .then(function(messages) {
        res.send(201, {error: false, message: messages});
      });
    })
    .on('error', function(err) {
      res.send(err);
    });
};

exports.deleteOne = function(req, res, next) {
  req.models.Message
    .find({where: {uuid:req.params.uuid}})
    .on('success', function(message) {
      message
        .destroy()
        .on('success', function() {
          res.send(200, {error: false, message: 'Message remove'});
        });
    })
    .on('error', function(err) {
      res.send(err);
    });
};

exports.deleteAll = function(req, res, next) {
  req.models.Message
    .findAll()
    .on('success', function(messages) {
      var chainer = new Sequelize.Utils.QueryChainer();
      messages.forEach(function(message) {
        chainer.add(message.destroy());
      });

      chainer.run();
      res.send(200, {error:false, message: 'Messages removed'});
    })
    .on('error', function(err) {
      res.send(err);
    });
};
