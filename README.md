# Episwag
[Swagger](https://swagger.io/) documentation generator for [Epilogue.js](https://github.com/dchester/epilogue)

## Intro
When you implement a relational database - driven application, using [Express](http://expressjs.com/) & [Sequelize](http://docs.sequelizejs.com/), you might want to 
bootstrap the rest api using the [Epilogue.js](https://github.com/dchester/epilogue) library. In two words it generates CRUD enponts according to your domain and paths
that you want, e.g:

```javascript
 epilogue.initialize({ app, sequelize, base: '/api' }); // app is a initialized express instance

 const authorResource = epilogue.resource({
      model: Author,
      endpoints: ['/author', '/author/:id'],
    });
```

will generate next endpoints:

* GET https://<host:port>/api/author - list/search authors
* GET https://<host:port>/api/author/{id} - get author by id
* DELETE https://<host:port>/api/author/{id} - delete author by id
* POST https://<host:port>/api/author - create new author
* PUT https://<host:port>/api/author/{id} - update new author

You can read more about Epilogue [here](https://github.com/dchester/epilogue).

The idea is that we have a generated api, why we can't generate documentation for it?

## Usage example
(I assume that you are ising express)
Define a Sequelize model:
```javascript
const Author = sequelize.define('Author', {
  // some field definition 
})
```

Unit Epilogue resource:
```javascript
epilogue.initialize({ app, sequelize, base: '/api' });

const authorResource = epilogue.resource({
  model: Author,
  endpoints: ['/author', '/author/:id'],
});
```

We are almost done, now we can generate swagger schema for our endpoints:
```javascript
episwag({
  epilogueInstance: epilogue,
  resources: [
    authorResource,
    bookResource,
  ],
  header: { host: req.get('host') },
}))
```

