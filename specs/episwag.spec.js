const episwag = require('../index');
const { expect } = require('chai');
const Sequelize = require('sequelize');
const { unlink } = require('fs');
const SwaggerParser = require('swagger-parser');

let sequelize;

const mockEpilogueInstance = {
  base: '/api',
};

let mockEpilogueResource;

describe('episwag', () => {
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
    ).sync({ force: true }).then(() => {
      mockEpilogueResource = {
        model: sequelize.models.TestModel,
        endpoints: {
          plural: '/api/test/endpoint',
          singular: '/api/test/endpoint/:id',
        },
      };
    }));
  });

  it('correct usage example', () => {
    const schema = episwag({
      epilogue: mockEpilogueInstance,
      resources: [mockEpilogueResource],
      header: { host: 'localhost:3000' },
    });

    return new SwaggerParser().validate(schema);
  });

  it('correct usage example', () => {
    const schema = episwag({
      epilogue: mockEpilogueInstance,
      resources: [mockEpilogueResource],
      header: { host: 'localhost:3000' },
    });

    return new SwaggerParser().validate(schema);
  });


  it('invalid header', () => {
    expect(() => episwag({
      epilogue: mockEpilogueInstance,
      resources: [mockEpilogueResource],
    })).to.throw('Header object is invalid.');

    expect(() => episwag({
      epilogue: mockEpilogueInstance,
      resources: [mockEpilogueResource],
      header: '123',
    })).to.throw('Header object is invalid.');
  });

  it('no host', () => {
    expect(() => episwag({
      epilogue: {},
      resources: [mockEpilogueResource],
      header: {},
      /* eslint-disable-next-line */
    })).to.throw(`Field 'basePath' should be defined in 'epilogue' or in 'userHeader'`);

    expect(() => episwag({
      epilogue: mockEpilogueInstance,
      resources: [mockEpilogueResource],
      header: {},
    })).to.throw('Api deployment host is undefined.');
  });

  it('no base path', () => {
    expect(() => episwag({
      epilogue: {},
      resources: [mockEpilogueResource],
      header: {},
      /* eslint-disable-next-line */
    })).to.throw(`Field 'basePath' should be defined in 'epilogue' or in 'userHeader'`);
  });

  after((done) => {
    unlink('test.sqlite', done);
  });
});

