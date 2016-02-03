/**
 * Created by xiaojianli@pptv.com on 2016/2/3.
 */
var app = require('./baseApp')

var io = app.myIo;

io.on('connection', function (socket) {
    console.log('连接。。。。。');
    socket.on('chat-msg-server', function (data) {
        if(data){
            io.emit('chat-msg-client',data);
        }
    });
});


var routes = require('./routes/index');

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
