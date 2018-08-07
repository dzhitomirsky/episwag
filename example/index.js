const Sequelize = require('sequelize');
const express = require('express');
const staticResource = require('express').static;
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
const epilogue = require('epilogue');
const path = require('path');
const bodyParser = require('body-parser');
const episwag = require('../index');


const sequelize = new Sequelize({
  dialect: 'sqlite',
  operatorsAliases: false,
  storage: 'author.sqlite',
});

const app = express();
app.use(bodyParser.json());

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
  const Author = require('./Author.model')(sequelize);
  const Book = require('./Book.model')(sequelize);
  Author.associate({ Book });

  Author.sync({ force: true }).then(() => Book.sync({ force: true })).then((_) => {
    epilogue.initialize({ app, sequelize, base: '/api' });

    const authorResource = epilogue.resource({
      model: Author,
      endpoints: ['/author', '/author/:id'],
    });

    const bookResource = epilogue.resource({
      model: Book,
      endpoints: ['/author/:id/books', '/author/:id/books/:bookId'],
    });

    app.use('/swagger', staticResource(pathToSwaggerUi));

    app.get('/shema', (req, res) => res.json(episwag({
      epilogue,
      resources: [
        authorResource,
        bookResource,
      ],
      header: { host: req.get('host') },
    })));

    app.use('/', (req, res) => res.sendFile(path.join(`${__dirname}/index.html`)));

    app.listen(3001, 'localhost');
    console.log('Running on http://localhost:3001');
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
