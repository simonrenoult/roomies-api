var should    = require('chai').should(),
    supertest = require('supertest');
    app       = require('../app');

module.exports = function(next) {
  describe('/api', function(){

    var api = supertest('http://localhost:1337');

    before(function(done){
      app.listen(1337, done);
    });

    next(api);
  });
};
