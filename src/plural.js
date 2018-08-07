

const {
  sinatra2SwaggerUrl,
  pathParams2SwaggerParams,
} = require('./util');

const { JSON_CONTENT_TYPE } = require('./constants');

module.exports = function convertPlural(resource, epilogue) {
  const list = {
    get: {
      tags: [resource.model.name],
      summary: 'list',
      consumes: [JSON_CONTENT_TYPE],
      produces: [JSON_CONTENT_TYPE],
      operationId: `List ${resource.model.name}(s)`,
      parameters: pathParams2SwaggerParams(resource.endpoints.plural),
      responses: {
        400: {
          description: 'Bad request',
        },
        200: {
          description: `List of ${resource.model.name}(s)`,
          schema: {
            type: 'array',
            items: {
              $ref: `#/definitions/${resource.model.name}`,
            },
          },
        },
      },

    },
  };

  const create = {
    post: {
      tags: [resource.model.name],
      summary: `Create new ${resource.model.name}(s)`,
      consumes: [JSON_CONTENT_TYPE],
      produces: [JSON_CONTENT_TYPE],
      operationId: 'Create',
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
      ].concat(pathParams2SwaggerParams(resource.endpoints.plural)),
      responses: {
        400: {
          description: 'Bad request',
        },
        201: {
          description: `Created ${resource.model.name} object`,
          schema: {
            $ref: `#/definitions/${resource.model.name}`,
          },
        },

      },
    },
  };

  return {
    [
    sinatra2SwaggerUrl(resource.endpoints.plural.substring(epilogue.base.length))
    ]: Object.assign({}, list, create),
  };
};
