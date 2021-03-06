"use strict";

/**
 * Module helps to generate default 
 * swagger schema for the REST reource
 *  generated by epilogue
 * 
 * @author Daniel ZHitomirsky
 */
const model2SwaggerDef = require('./src/model-to-swagger-def');
const convertSingular = require('./src/singular');
const convertPlural = require('./src/plural');
const { generateHeader } = require('./src/util');

module.exports = function Episwag({
  epilogue,
  resources,
  header,
}) {
  const docHeader = generateHeader(epilogue, header);

  if (!docHeader.host) {
    throw new Error('Api deployment host is undefined.');
  }

  const restApiDocs = resources.reduce((accum, resource) => {
    return {
      paths: Object.assign(
        accum.paths,
        convertPlural(resource, epilogue),
        convertSingular(resource, epilogue),
      ),
      definitions: Object.assign(accum.definitions, model2SwaggerDef(resource.model)),
    };
  }, { paths: {}, definitions: {} });
  return Object.assign({}, docHeader, restApiDocs);
};
