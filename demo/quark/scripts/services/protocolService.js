/**
 * Created by lixj(872458899@qq.com) on 15/7/5.
 */
;(function (app) {
    //协议
    app.service('protocolService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //获取所有协议
            findAll:{
                url:'data/protocols.json',
                method:'get'
            },
            save:{
                url:'data/ok.json',
                method:'post'
            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));