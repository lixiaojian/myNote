/**
 * Created by lixj(872458899@qq.com) on 15/6/24.
 */
;(function (app) {
    app.service('productService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //搜索产品
            search:{
                url:'productInfo',
                 //url:'data/products.json',
                method:'get'
            },
            //更新产品
            update:{
                url:'productInfo/update',
                 //url:'data/ok.json',
                method:'put'
                //method:'post'
            },
            //获取排序的列表
            getOrders:{
                url:'productInfo/getOrderProdcutList',
                method:'get'
            },
            //通过id获取
            findById:{
                url:'productInfo/getDetail',
                //url:'data/product3.json',
                method:'get'
            },
            saveOrder:{
                url:'productInfo/updateOrder',
                method:'put'
            },
            //获取所有协议
            findAllPro:{
                url:'agreementDoc/getAllSellDoc',
                 //url:'data/protocols.json',
                method:'get',
                isArray:true
            },
            //导入
            import:{
                url:'productInfo/importProdcutList',
                // url:'data/ok.json',
                method:'get'
            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));