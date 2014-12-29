var 
  restify = require('restify'),
  client  =  restify.createJsonClient({url: 'http://localhost:1337'});

describe('#roomy', function() {

  var handler = require('../handlers/roomy.js');

  it('Returns an object', function() {
    handler.should.be.an('object');
  });

  it('Contains a findAll function', function() {
    handler.should.include.keys('findAll');
    handler.findAll.should.be.a('function');
  });

  it('Contains a findOne function', function() {
    handler.should.include.keys('findOne');
    handler.findOne.should.be.a('function');
  });

  it('Contains a deleteAll function', function() {
    handler.should.include.keys('deleteAll');
    handler.deleteAll.should.be.a('function');
  });

  it('Contains a deleteOne function', function() {
    handler.should.include.keys('deleteOne');
    handler.deleteOne.should.be.a('function');
  });

  it('Contains a createOne function', function() {
    handler.should.include.keys('createOne');
    handler.createOne.should.be.a('function');
  });

  it('Contains an updateOne function', function() {
    handler.should.include.keys('updateOne');
    handler.updateOne.should.be.a('function');
  });
});

