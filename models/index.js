var Sequelize = require('sequelize'),
    conf      = require('../app.json'),
    sequelize = null;

module.exports = function(args){
  if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {

    // the application is executed on Heroku ... use the postgres database
    var match = process.env.HEROKU_POSTGRESQL_BRONZE_URL.match(
      /postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);

    sequelize = new Sequelize(match[5], match[1], match[2], {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      logging:  true //false
    });
  } else {
    var env = (args.development) ? 'development' : 'test';

    sequelize = new Sequelize(
      conf.db[env].name,
      conf.db[env].username,
      conf.db[env].username);
  }

  var db = {
    Roomy       : sequelize.import(__dirname + '/roomy'),
    Collocation : sequelize.import(__dirname + '/collocation'),
    Message     : sequelize.import(__dirname + '/message')
  };

  /*
    Associations can be defined here. E.g. like this:
    global.db.User.hasMany(global.db.SomethingElse)
  */

  return db;
};
