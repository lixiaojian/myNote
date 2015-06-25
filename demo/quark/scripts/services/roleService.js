/**
 * Created by lixj(872458899@qq.com) on 15/6/22.
 */
;(function (app) {
    app.service('roleService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //获取所有角色
            getAll:{
                url:'data/roles.json',
                method:'get'
                //isArray:true
            },
            findById:{
                url:'data/role.json?id=:id',
                method:'get'
            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));


