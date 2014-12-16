require('./api_context')(function(api, should){
  describe('GET /docs', function(){
    it('Should be redirected to docs.roomies.apiary.io', function(done){
      api
       .get('/api/docs')
       .expect('Location', 'http://docs.roomies.apiary.io/')
       .expect(308, done);
    });
  });
});
