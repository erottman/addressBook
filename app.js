var createError = require('http-errors');
var express = require('express');
var path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const hbs = require('hbs');
const hbsUtils = require('hbs-utils')(hbs);
var logger = require('morgan');

var indexRouter = require('./routes/index');
var addresses = require('./routes/addresses');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbsUtils.registerPartials(path.join(__dirname, 'views'), {
  match: /\/?.*_.*\.(html|hbs)$/,
  name: (name) => {
    let pathArr = name.split('/')
    let last = pathArr.length - 1
    pathArr[last] = pathArr[last].slice(1)
    let newName = pathArr.join('/')

    return newName
  }
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/contacts', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
