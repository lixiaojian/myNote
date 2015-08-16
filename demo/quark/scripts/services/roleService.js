/**
 * Created by lixj(872458899@qq.com) on 15/6/22.
 */
;(function (app) {
    app.service('roleService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //获取所有角色
            getAll:{
                //url:'role',
                url:'data/roleList.json',
                method:'get'
                //isArray:true
            },
            findById:{
                //url:'role/detail',
                url:'data/roleDetail.json',
                method:'get'
            },
            findTreeDate:{
                url:'data/role.json',
                method:'get'
            },
            //保存更新角色
            saveRole:{
                url:'role/update',
                method:'put'
            },
            //删除
            deleteRole:{
                url:'role/del',
                method:'put'
            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));


