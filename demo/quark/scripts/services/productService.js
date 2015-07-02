/**
 * Created by lixj(872458899@qq.com) on 15/6/24.
 */
;(function (app) {
    app.service('productService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //搜索产品
            search:{
                url:'data/products.json',
                method:'get'
            },
            //更新产品
            update:{
                url:'data/products/update.json',
                method:'post'
            },
            //获取排序的列表
            getOrders:{
                url:'data/product2.json',
                method:'get'
            },
            //通过id获取
            findById:{
                url:'data/product3.json',
                method:'get'
            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));