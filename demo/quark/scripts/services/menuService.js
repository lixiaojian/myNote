/**
 * Created by lixj(872458899@qq.com) on 15/6/22.
 */
;(function (app) {
    app.service('menuService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //获取菜单
            getMenus:{
                url:'data/menu.json',
                method:'get',
                isArray:true
            },
            getPermissions:{
                //url:'user/permissions',
                url:'data/permissions.json',
                method:'get',
                isArray:true
            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));


