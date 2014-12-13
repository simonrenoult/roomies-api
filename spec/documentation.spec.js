var should    = require('chai').should(),
    supertest = require('supertest');
    app       = require('../app');

describe('/api', function(){

  var api = supertest('http://localhost:1337');

  before(function(done){
    app.listen(1337, done);
  });

  describe('/docs', function(){
    it('Should be redirected to docs.roomies.apiary.io', function(done){
      api
        .get('/api/docs')
        .expect('Location', 'http://docs.roomies.apiary.io/')
        .expect(308, done);
    });
 });
});
