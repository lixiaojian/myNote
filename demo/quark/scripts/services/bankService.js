/**
 * Created by lixj(872458899@qq.com) on 15/7/4.
 */
;(function (app) {
    app.service('bankService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //搜索产品
            search:{
                url:'data/bankList.json',
                method:'get'
            },
            //获取所有银行列表
            findAllBank:{
                url:'data/banks.json',
                method:'get',
                isArray:true
            },
            //添加银行
            saveBank:{
                url:'data/saveBank.json',
                method:'post'
            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));