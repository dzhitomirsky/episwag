

const Sequelize = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('Book', {
    id: {
      field: 'id',
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    authorId: {
      field: 'authorId',
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    name: {
      field: 'LastName',
      type: Sequelize.STRING,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'Book',
  });
};
