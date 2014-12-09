var Sequelize = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('Collocation', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      unique: true
    },
    address: Sequelize.STRING
  });
};
