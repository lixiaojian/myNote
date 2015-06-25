/**
 * Created by lixj(872458899@qq.com) on 15/6/24.
 */
;(function (app) {
    app.service('productService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //获取菜单
            findAll:{
                url:'data/products.json',
                method:'get',
                isArray:true
            },
            getOrders:{
                url:'data/product2.json',
                method:'get',
            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));