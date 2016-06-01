require('dotenv').load(); // for reading .env files
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var swig = require('swig');

var app = express();

//Connect to MongoDB
var dbconnection = 'mongodb://username:' + process.env.DB_SECRET + '@ds011810.mlab.com:11810/bikerepairdb';
//var dbconnection = 'mongodb://127.0.0.1/bikeRepairDb';
mongoose.connect(dbconnection);

//assign the swig view engine to .html files
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

// Statics
app.use('/admin', express.static(path.join(__dirname, 'views_admin')));
app.use(express.static(path.join(__dirname, 'public')));

// Route declaration
var localRouter = require('./routes/localRoutes')();
var authRouter = require('./routes/authRoutes')();
var apiRouter = require('./routes/apiRoutes')();

// Diverse setting
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(require('browser-logger')());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//setting up authentication / authorization
app.use(cookieParser());
app.use(session({
    secret: process.env.JWT_SECRET, //library HASH-md5
    resave: true,
    saveUninitialized: true
}));
require('./config/passport')(app);

// Route initialize
app.use('/', localRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);

// routing for Angular/HTML5(true) > admin folder -> index.html
app.get('/admin/*', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'views_admin') + '/index.html');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;