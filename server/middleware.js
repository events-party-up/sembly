const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

module.exports = (app, express) => {
  app.use(express.static(path.join(__dirname, './../client')));

  // Allow Cors
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  // Parse Post Bodys
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Debugging
  app.use(morgan('dev'));
};
