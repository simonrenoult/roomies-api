var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

module.exports = function (sequelize) {
  return sequelize.define('Roomy', {
    uuid: {
      type: Sequelize.UUID,
      unique: true,
      defaultValue: Sequelize.UUIDV4
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      },
      set: function(email) {
        this.setDataValue('email', email.toLowerCase());
      }
    },
    token: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      set: function(password) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);

        this.setDataValue('password', hash);
      }
    }
  }, {
    classMethods: {},
    instanceMethods: {
      checkPassword: function(password) {
        // TODO
      }
    }
  });
};
