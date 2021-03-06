const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index.js')
const fridgeRouter = require('./routes/fridge');
const shoppingListRouter = require('./routes/shopping-list');
const scanRouter = require('./routes/scanphoto');

require('dotenv').config()
const logger = require('morgan');
const dbconnect = require('./middleware/db-connect')


const app = express();
//Routes
const authRouter = require('./routes/auth');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('../frontend/build/'));

app.get('/', function (req, res) {
  res.send('Hello! fridgy server');
});

//ROUTER
app.use('/', indexRouter)
app.use('/fridge', fridgeRouter);
app.use('/shopping-list', shoppingListRouter);
app.use('/auth', authRouter);
app.use('/upload', scanRouter)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
