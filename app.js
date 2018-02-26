const express = require('express');
const path = require('path');
const favicon = require('serve-favicon'); /* eslint-disable-line no-unused-vars */
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const debug = require('debug')('blogfolio:db');

const appRoutes = require('./routes/app');
const { connect } = require('./api');
const { dbMeta, options } = require('./config');
const { cors } = require('./middleware');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Establish database connection
connect(...dbMeta, options)
  .then((db) => {
    debug('Successfully connected to database');
    app.locals.db = db.connection;
  })
  .catch((err) => {
    debug(err);
    process.exit(1);
  });

// Set allowed headers using cors middlware for every request.
app.use(cors);

app.use('/', appRoutes);

// Catch-all router handler that renders index only.
// Renders index in order to transfer control back to Angular
app.use((req, res, next) => res.render('index')); /* eslint-disable-line no-unused-vars */

module.exports = app;
