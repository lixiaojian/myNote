/**
 * Created by lixj(872458899@qq.com) on 15/6/28.
 */
;(function (app) {
    app.service('activityService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //搜索产品
            search:{
                url:'data/activitys.json',
                method:'get'
            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));