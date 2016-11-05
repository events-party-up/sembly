const express = require('express');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const middleware = require('./middleware');
const routes = require('./routes');

mongoose.Promise = bluebird;

const app = express();
const port = process.env.PORT || 3000;

// connect to mongo database named "sembly"
if (process.env.PRODUCTION == 'true') {
  mongoose.connect(process.env.MONGODB_URI.toString());
} else if (process.argv[2] === 'production') {
  mongoose.connect('mongodb://localhost/sembly');
}

// configure our server with all the middleware and routing
middleware(app, express);
routes(app, express);

// start listening to requests on port 3000
mongoose.connection.on('connected', () => {
  if (process.env.MONGODB_URI) {
    require('../testData.js');
  }
  app.listen(port, () => {
    console.log('App is listening on port 3000');
  });
});

// export our app
module.exports = app;
