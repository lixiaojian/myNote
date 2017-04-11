/**
 * Created by 872458899@qq.com on 15-7-7.
 */
;(function (app) {
    app.service('operatorService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //获取操作员��������Ա
            search:{
                //url:'user',
                url:'data/operators.json',
                method:'get'
            },
            //获取所有的角色
            getAllRole:{
                //url:'role/getAll',
                url:'data/roles.json',
                method:'get',
                isArray:true
            },
            //保存
            saveOp:{
                url:'user/update',
                method:'put'
            },
            findById:{
                //url:'user/getDetail',
                url:'data/operator.json',
                method:'get'
            },
            //删除
            deleteOp:{
                url:'user/del?id=:id',
                method:'put'
            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));