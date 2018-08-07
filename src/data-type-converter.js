const { DataTypes } = require('sequelize');

const SWAGGER_STRING_TYPES = [
  DataTypes.STRING,
  DataTypes.CHAR,
  DataTypes.TEXT,
  DataTypes.BLOB,
  DataTypes.DATE,
  DataTypes.DATEONLY,
  DataTypes.TIME,
  DataTypes.NOW,
];

const SWAGGER_INTEGER_TYPES = [
  DataTypes.TINYINT,
  DataTypes.SMALLINT,
  DataTypes.MEDIUMINT,
  DataTypes.BIGINT,
];

const SWAGGER_NUMBER_TYPES = [
  DataTypes.FLOAT,
  DataTypes.DOUBLE,
  DataTypes.DECIMAL,
  DataTypes.REAL,
];

const SWAGGER_BOOLEAN_TYPES = [
  DataTypes.BOOLEAN,
];

const SWAGGER_ARRAY_TYPES = [
  DataTypes.ENUM,
  DataTypes.ARRAY,
];

const SWAGGER_OBJECT_TYPES = [
  DataTypes.JSON,
  DataTypes.JSONB,
  DataTypes.GEOMETRY,
  DataTypes.GEOGRAPHY,
  DataTypes.HSTORE,
];

/**
 * Mapping between Sequelize  & swagger data types
 *
 * @author Daniel ZHitomirsky
*/
function defaultConverter({ fieldName }) {
  // TODO: implement datatype converters that consider domain constraints, etc.
  return {
    [fieldName]: {
      type: this.swType,
    },
  };
}

module.exports = [
  {
    swType: 'string',
    sqTypes: SWAGGER_STRING_TYPES,
    convert: defaultConverter,
  },
  {
    swType: 'integer',
    sqTypes: SWAGGER_INTEGER_TYPES,
    convert: defaultConverter,
  },
  {
    swType: 'number',
    sqTypes: SWAGGER_NUMBER_TYPES,
    convert: defaultConverter,
  },
  {
    swType: 'boolean',
    sqTypes: SWAGGER_BOOLEAN_TYPES,
    convert: defaultConverter,
  },
  {
    swType: 'array',
    sqTypes: SWAGGER_ARRAY_TYPES,
    convert: defaultConverter,
  },
  {
    swType: 'object',
    sqTypes: SWAGGER_OBJECT_TYPES,
    convert: defaultConverter,
  },
];
