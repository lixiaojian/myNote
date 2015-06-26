/**
 * Created by lixj(872458899@qq.com) on 15/6/25.
 */
;(function (app) {
    app.service('loginService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //获取菜单
            add:{
                url:'data/login.json',
                method:'post',
                headers:{
                    'content-type':'application/x-www-form-urlencoded;charset=UTF-8'
                }
            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));