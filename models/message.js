var Sequelize = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('Message',{
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: Sequelize.TEXT
    }
  });
};
