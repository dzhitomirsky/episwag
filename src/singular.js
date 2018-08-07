

const {
  sinatra2SwaggerUrl,
  pathParams2SwaggerParams,
} = require('./util');

const { JSON_CONTENT_TYPE } = require('./constants');

module.exports = function convertSingular(resource, epilogue) {
  const read = {
    get: {
      tags: [resource.model.name],
      summary: `Get ${resource.model.name} by id`,
      consumes: [JSON_CONTENT_TYPE],
      produces: [JSON_CONTENT_TYPE],
      operationId: 'Read',
      parameters: pathParams2SwaggerParams(resource.endpoints.singular),
      responses: {
        200: {
          description: 'Successful operation',
          schema: {
            $ref: `#/definitions/${resource.model.name}`,
          },
        },
        400: {
          description: `Invalid ${resource.model.name} identifier.`,
        },
        404: {
          description: `${resource.model.name} was not found.`,
        },
      },
    },
  };

  const update = {
    put: {
      tags: [resource.model.name],
      summary: `Update ${resource.model.name} by id`,
      consumes: [JSON_CONTENT_TYPE],
      produces: [JSON_CONTENT_TYPE],
      operationId: 'update',
      parameters: [
        {
          in: 'body',
          name: 'body',
          description: `Json ${resource.model.name} object definition`,
          required: true,
          schema: {
            $ref: `#/definitions/${resource.model.name}`,
          },
        },
      ].concat(pathParams2SwaggerParams(resource.endpoints.singular)),
      responses: {
        200: {
          description: 'Successful operation',
          schema: {
            $ref: `#/definitions/${resource.model.name}`,
          },
        },
        400: {
          description: `Invalid ${resource.model.name} identifier.`,
        },
        404: {
          description: `${resource.model.name} was not found.`,
        },
      },
    },
  };

  const remove = {
    delete: {
      tags: [resource.model.name],
      summary: `Delete ${resource.model.name} by id`,
      consumes: [JSON_CONTENT_TYPE],
      produces: [JSON_CONTENT_TYPE],
      operationId: 'delete',
      parameters: pathParams2SwaggerParams(resource.endpoints.singular),
      responses: {
        200: {
          description: 'Successful operation',
        },
        400: {
          description: `Invalid ${resource.model.name} identifier.`,
        },
        404: {
          description: `${resource.model.name} was not found.`,
        },
      },
    },
  };

  return {
    [
    sinatra2SwaggerUrl(resource.endpoints.singular.substring(epilogue.base.length))
    ]: Object.assign({}, read, update, remove),
  };
};
