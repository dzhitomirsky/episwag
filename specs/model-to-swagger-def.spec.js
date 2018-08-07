const Sequelize = require('sequelize');
const { unlink } = require('fs');
const { expect } = require('chai');
const sequelizeModel2SwaggerDefinition = require('../src/model-to-swagger-def');
/*eslint-disable*/
let sequelize;

describe('model-to-swagger-def', () => {
  before(() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      operatorsAliases: false,
      storage: 'test.sqlite',
    });

    return sequelize.authenticate().then(() => sequelize.define(
      'TestModel',
      {
        int_field: {
          type: Sequelize.BIGINT,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        double_field: {
          type: Sequelize.DOUBLE,
        },
        string_field: {
          type: Sequelize.STRING,
        },
        date_field: {
          type: Sequelize.DATE,
        },
        boolean_field: {
          type: Sequelize.BOOLEAN,
        },
        json_field: {
          type: Sequelize.JSON,
        },
      },
      {
        tableName: 'TestTable',
      },
    ).sync({ force: true }));
  });

  it('type conversion', () => {
    expect(sequelizeModel2SwaggerDefinition(sequelize.models.TestModel)).to.deep.equal({
      "TestModel": {
        "type": "object",
        "properties": {
          "int_field": {
            "type": "integer"
          },
          "double_field": {
            "type": "number"
          },
          "string_field": {
            "type": "string"
          },
          "date_field": {
            "type": "string"
          },
          "boolean_field": {
            "type": "boolean"
          },
          "json_field": {
            "type": "object"
          },
          "createdAt": {
            "type": "string"
          },
          "updatedAt": {
            "type": "string"
          }
        }
      }
    });
  });

  after((done) => {
    unlink('test.sqlite', done);
  });
});
