/**
 * Created by 872458899@qq.com on 15-7-16.
 */
;(function(app){
    app.filter("hideWord", function() {
        var filterfun = function(word, before,after,center) {
            if(!word){
                return null;
            }
            if(word.length<=before){
                return word;
            }
            after = word.length>after?(word.length-after):word.length;
            var b = word.substring(0,before);
            var h = word.substring(before,after);
            var a = word.substring(after);
            var cStr = '';
            if(center){
                for(var i=0;i<center;i++){
                    cStr += '*';
                }
                return b+cStr+a;
            }else{
                h = h.replace(/./g,'*');
                return b+h+a;
            }
        };
        return filterfun;
    });
}(angular.module('backStage')));
