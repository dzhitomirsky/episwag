

const dataTypes = require('./data-type-converter');

/**
 * Build swagger definition object from sequelize model
 * example:
 * {
 *  User:
 *    {
 *      type: 'object',
 *      name: {
 *         type: 'string'
 *      }
 *      ...
 *    }
 * }
 * @param {Object} model sequelize model
 */
module.exports = function sequelizeModel2SwaggerDefinition(model) {
  return {
    [model.name]: {
      type: 'object',
      properties: Object.keys(model.attributes).reduce((acc, field) => {
        // double equal (instead of ===) is not a mistake - as far as
        // we want to make comparison independent to type
        /* eslint-disable-next-line */
        const dataTypeConverter = dataTypes.find(type =>
          type.sqTypes.find(sqType => sqType.key === model.attributes[field].type.key));

        return Object.assign(acc, dataTypeConverter.convert(model.attributes[field]));
      }, {}),
    },
  };
};
