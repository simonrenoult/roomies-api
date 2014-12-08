var Sequelize = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('Roomy', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey : true,
      autoIncrement: true
    },
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    token: {
      type: Sequelize.STRING,
      unique: true,
      set: function(newValue){
        this.setDataValue('token', newValue);
      }
    },
    password: Sequelize.STRING
  });
};
