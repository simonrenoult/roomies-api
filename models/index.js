var Sequelize = require('sequelize'),
    conf      = require('../app.json'),
    sequelize = null;

if (process.env.DATABASE_URL) {
  var match = process.env.DATABASE_URL.match(
    /postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);

  sequelize = new Sequelize(match[5], match[1], match[2], {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     match[4],
    host:     match[3],
    logging:  false
  });
} else {
  var env = process.env.ENVIRONMENT || conf.db.default;

  sequelize = new Sequelize(
    conf.db[env].name,
    conf.db[env].username,
    conf.db[env].password, {
      logging: true
    });
}

var Roomy = sequelize.import(__dirname + '/roomy');
var Collocation = sequelize.import(__dirname + '/collocation');
var Message = sequelize.import(__dirname + '/message');

/*
  Associations can be defined here. E.g. like this:
  global.db.User.hasMany(global.db.SomethingElse)
*/

Collocation.hasMany(Roomy, {as: 'occupants'});
Collocation.hasMany(Message, {as: 'board'});

sequelize.sync();

module.exports = {
  Roomy: Roomy,
  Collocation: Collocation,
  Message: Message
};
