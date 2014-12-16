var should = require('chai').should();

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

require('./api_context')(function(api){
  describe('/roomies', function () {

    describe('GET', function () {
      it('Should return an empty list', function(done) {
        api.get('/api/roomies').expect(200,done);
      });
    });

    describe('POST', function() {
      it('Should create a new record', function(done) {
        api.post('/api/roomies').send({last_name: 'foobar'}).expect(201, done);
        api.delete('/api/roomies');
      });
    });

    describe('DELETE', function () {
      it('Should delete all the records', function(done) {
        api.delete('/api/roomies').expect(200, done);
      });
    });
  });

  describe('/roomies/:id', function () {
    describe('POST', function() {
      it('Should create a new record', function(done) {
        api.post('/api/roomies').send({last_name: 'foobar'}).expect(201, done);
        api.delete('/api/roomies');
      });
    });
  });
});
