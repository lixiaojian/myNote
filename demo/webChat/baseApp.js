/**
 * Created by xiaojianli@pptv.com on 2016/2/3.
 */
var express = require('express');
var path = require('path');
var ejs = require('ejs');
//var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.myServer = server;
app.myIo = io;

module.exports = app;
