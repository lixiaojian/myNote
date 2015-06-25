/**
 * Created by lixj(872458899@qq.com) on 15/6/24.
 */
;(function(app){
    app.controller('cpglCtr',['$scope','productService','$modal',function($scope,productService,$modal){
        $scope.modileTitle = '产品管理';
        //日历相关
        $scope.bopen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.bopened = !$scope.bopened;
        };
        $scope.eopen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.eopened = !$scope.eopened;
        };
        $scope.format = 'yyyy-MM-dd';
        //全部数据
        productService.findAll({},function(data){
            $scope.datas=data;
        });
        //过滤字段
        $scope.filterName='';
        //排序字段
        $scope.orderByName='orderNumber';
        $scope.orderByName2 = 'orderNumber2';

        //弹出层
        $scope.openNew = function(){
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                size:'lg',
                controller: ['$scope','$modalInstance',function($scope, $modalInstance){
                    //获取排序的产品列表
                    if(!$scope.productsOrder){
                        productService.getOrders({},function(data){
                            $scope.productsOrder = data;
                        })
                    }
                    //点击确定
                    $scope.ok = function () {
                        $modalInstance.close();
                    };
                    //点击取消
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });
        };

    }]);
}(angular.module('backStage')));