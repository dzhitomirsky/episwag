const { expect } = require('chai');
const {
  sinatra2SwaggerUrl,
  getPathParams,
  pathParams2SwaggerParams,
  generateHeader,
} = require('../src/util');

describe('utils', () => {
  it('sinatra2SwaggerUrl', () => {
    expect(sinatra2SwaggerUrl('/a/b/c')).to.equal('/a/b/c');
    expect(sinatra2SwaggerUrl('/a/b/:id')).to.equal('/a/b/{id}');
    expect(sinatra2SwaggerUrl('/a/:user/:id/:book')).to.equal('/a/{user}/{id}/{book}');
  });

  it('getPathParams', () => {
    // eslint-disable-next-line
    expect(getPathParams('/a/b/c')).to.be.empty;
    expect(getPathParams('/a/b/:id')).to.be.an('array').that.includes.members(['id']);
    expect(getPathParams(':path/a/:user/:id/:book')).to.be.an('array').that.includes.members([
      'path',
      'user',
      'id',
      'book',
    ]);
  });

  it('pathParams2SwaggerParams', () => {
    // eslint-disable-next-line
    expect(pathParams2SwaggerParams('/a/b/c')).to.be.empty;
    expect(pathParams2SwaggerParams('/a/b/:id')).to.be.an('array').that.has.deep.members([
      {
        name: 'id',
        in: 'path',
        required: true,
        type: 'string',
      },
    ]);
    expect(pathParams2SwaggerParams('/a/:user/:id/:book')).to.be.an('array').that.has.deep.members([
      {
        name: 'id',
        in: 'path',
        required: true,
        type: 'string',
      },
      {
        name: 'user',
        in: 'path',
        required: true,
        type: 'string',
      },
      {
        name: 'book',
        in: 'path',
        required: true,
        type: 'string',
      },
    ]);
  });

  it('generateHeader deafult', () => {
    expect(generateHeader(
      { base: 'test_base_path' },
      { host: 'test_host' },
    )).to.deep.equal({
      swagger: '2.0',
      info: {
        version: '1.0.0',
        description: 'Api documentation',
        title: 'Epilogue Api',
      },
      basePath: 'test_base_path',
      schemes: [
        'http',
      ],
      host: 'test_host',
    });
  });

  it('generateHeader overriden', () => {
    expect(generateHeader(
      { base: 'test_base_path' },
      {
        info: {
          version: '1.0.1',
          description: 'Test desc',
          title: 'Test title',
        },
        host: 'test_host',
        schemes: [
          'https',
        ],
        basePath: '/a/b/c',
      },
    )).to.deep.equal({
      swagger: '2.0',
      info: {
        version: '1.0.1',
        description: 'Test desc',
        title: 'Test title',
      },
      host: 'test_host',
      schemes: [
        'https',
      ],
      basePath: '/a/b/c',
    });
  });

  it('generateHeader failing', () => {
    expect(() => generateHeader({})).to.throw('Header object is invalid.');
    expect(() => generateHeader(null)).to.throw('Header object is invalid.');
    expect(() => generateHeader(undefined)).to.throw('Header object is invalid.');
    expect(() => generateHeader(123)).to.throw('Header object is invalid.');
    expect(() => generateHeader('123')).to.throw('Header object is invalid.');
  });
});
