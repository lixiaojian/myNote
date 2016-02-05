/**
 * Created by xiaojianli@pptv.com on 2016/2/3.
 */
var app = require('./baseApp')

var io = app.myIo
//用户列表
var userList=[]
io.on('connection', function (socket) {
    //当有用户连接时把当前用户列表发给当前用户
    socket.emit('userList',userList)
    //用户断开连接
    socket.on('disconnect',function(){
        //获取当前socket的id
        var curId = socket.id.substr(2);
        //获取下线的用户
        for(var i= 0,len = userList.length;i<len;i++){
            if(userList[i].id == curId){
                var user = userList.splice(i,1)[0];
                //把用户返回给所有用户
                io.emit('userList',userList);
                //有人下线发一个下线通知给所有人
                io.emit('offline',{userName:user.userName});
                return;
            }
        }
    })
    //监听用户登录
    socket.on('login',function(user){
        //给用户设置一个id
        user.id = socket.id.substr(2);;
        userList.push(user);
        //有人上线发一个上线通知给所有人
        socket.broadcast.emit('online',{userName:user.userName});
        //把信息返回给当前用户
        socket.emit('userInfo',user);
        //把用户返回给所有用户
        io.emit('userList',userList);
    })
    //接收用户发送的信息
    socket.on('setMsg',function(user,msg){
        var message={
            userName:user.userName,
            userImg:user.img,
            time:Date.now(),
            content:msg.content,
            img:msg.img
        };
        socket.emit('getMsg',message,true);
        socket.broadcast.emit('getMsg',message,false);
    })
});


var routes = require('./routes/index')

app.use('/', routes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500)
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: {}
    })
})


module.exports = app
