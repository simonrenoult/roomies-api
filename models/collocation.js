var Sequelize = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('Collocation', {
    uuid: {
      type: Sequelize.UUID,
      unique: true,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING,
      unique: true
    },
    address: Sequelize.STRING
  });
};
