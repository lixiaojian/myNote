/**
 * Created by 872458899@qq.com on 15-7-26.
 */
;(function (app) {
    app.service('passwordService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //获取所有角色
            getMyInfo:{
                url:'user/current',
                method:'get'
            },
            savePassword:{
                url:'user/current',
                method:'put'
            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));