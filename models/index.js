if(!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize'),
      conf      = require('../app.json');
      sequelize = null;

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
    // the application is executed on the local machine ... use mysql
    sequelize = new Sequelize(conf.db.name, conf.db.username, conf.db.username);
  }

  global.db = {
    Sequelize : Sequelize,
    sequelize : sequelize,
    Roomy     : sequelize.import(__dirname + '/roomy')
  };

  /*
    Associations can be defined here. E.g. like this:
    global.db.User.hasMany(global.db.SomethingElse)
  */
}

module.exports = global.db;
