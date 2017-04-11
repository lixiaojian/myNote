/**
 * Created by 872458899@qq.com on 15/8/1.
 */
;(function (app) {
    app.service('transactionService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //搜索交易信息
            search:{
                url:'transaction',
                method:'get'
            },
            findDetail:{
                url:'transaction/getDetail',
                method:'get'
            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));