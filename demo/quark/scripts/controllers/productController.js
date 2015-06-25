/**
 * Created by lixj(872458899@qq.com) on 15/6/24.
 */
;(function(app){
    app.controller('cpglCtr',['$scope','productService',function($scope,productService){
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
    }]);
}(angular.module('backStage')));