

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const Author = sequelize.define('Author', {
    id: {
      field: 'id',
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      field: 'FirstName',
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      field: 'LastName',
      type: Sequelize.STRING,
    },
    birthDate: {
      field: 'BirthDate',
      type: Sequelize.DATE,
    },
  }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'Author',
    }
  );

  Author.associate = (models) => {
    Author.hasMany(models.Book, {
      as: 'books',
      foreignKey: 'authorId',
      targetKey: 'id',
    });
  };

  return Author;
};
