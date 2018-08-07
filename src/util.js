

/**
 * Converts string in sinatra notation e.g. /a/:key/b/:id to
 * swagger url notation /a/{key}/b/{id}
 *
 * @param {string} url
 */
function sinatra2SwaggerUrl(url) {
  return url.split('/').map((urlPart) => {
    if (urlPart.indexOf(':') !== -1) {
      return `{${urlPart.replace(':', '')}}`;
    }

    return urlPart;
  }).join('/');
}

/**
 * Returns manadatory path params, e.g.
 * /a/:key/b/:id -> [key, id]
 *
 * @param {string} url
 */
function getPathParams(url) {
  return url.split('/').filter(urlPart =>
    urlPart.indexOf(':') !== -1).map(pathParam => pathParam.replace(':', ''));
}

/**
 * Get path param objects from url
 *
 * e.g: /a/b/:id/c ->
 * {
 *   name: 'id',
 *   in: 'path',
 *   required: 'true',
 *   type: 'string'
 * }
 * @param {string} url
 */
function pathParams2SwaggerParams(url) {
  return getPathParams(url).map(pathParam => ({
    name: pathParam,
    in: 'path',
    required: true,
    type: 'string',
  }));
}

/**
 * Generates documentation header accoring to user's header and default config
 *
 * @param {Object} epilogue - initialized epilogue instance
 * @param {Object} userHeader - header object passed by user
 * @returns {Object} header configuration object
 */
function generateHeader(epilogue, userHeader) {
  if (
    !userHeader ||
    typeof userHeader !== 'object'
  ) {
    throw new Error('Header object is invalid.');
  }

  if (!userHeader.basePath && !epilogue.base) {
    // eslint-disable-next-line
    throw new Error(`Field 'basePath' should be defined in 'epilogue' or in 'userHeader'`);
  }
  return Object.assign(
    {
      swagger: '2.0',
      info: {
        description: 'Api documentation',
        title: 'Epilogue Api',
        version: '1.0.0',
      },
      basePath: `${epilogue.base}`,
      schemes: [
        'http',
      ],
    },
    userHeader,
  );
}

module.exports = {
  sinatra2SwaggerUrl,
  getPathParams,
  pathParams2SwaggerParams,
  generateHeader,
};
