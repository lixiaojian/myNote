var showInfo = document.getElementById('showInfo');
var line = document.getElementById('line');
var ppcplayer = new PPCLoudplayer({
    id: 'bgvid',
    // playCode:'0a2dnq6aoKKeoauL4K2eoa2eoydn6qbpqef',
    playCode:'0a2dnq6bpKKlnKmL4K2dnaqa7KGlm6yWp6c',
    errorCall: function(e, obj){},
    reportVideoEvent: function(obj){
        var p = document.createElement('p');
        var type = obj.type;
        var msg = obj.msg;
        var readyState = obj.readyState;
        
        if(!window[type]){
            window[type] = p;
            window[type + '_cnt'] = 0;
            showInfo.appendChild(p);
        }
        
        window[type].innerHTML  = '事件类型: ' + type + ' , 消息为: ' + msg + (++window[type + '_cnt']) + '次, 播放器状态: ' + readyState;
    },
    events: {
        afterPlayerShow: function() {
            console.log('afterPlayerShow');
        },
        onPlay: function(){
            console.log('Not original onPlay');
        },
        onPause: function(){
            console.log('Not original onPause');
        }
    },
    origEvents:{
        onPlay: function(obj){
            console.log('The original onPlay');
        },
        onPause: function(obj){
            console.log('The original onPause');
        },
        onLoadedmetadata: function(obj){
            console.log('The original onLoadedmetadata');
        }
    },
    isDebug: false,
    notResourceTip: function(){
        console.log('==============');
    }
});