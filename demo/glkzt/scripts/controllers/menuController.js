/**
 * Created by lixj(872458899@qq.com) on 15/6/22.
 */
(function(app){
    app.controller('menuCtr',['$scope','menuService',function($scope,menuService){
        //获取菜单列表
        $scope.options = {
            'data-drag-enabled':false
        };
        $scope.collapsed = true;
        $scope.selectedItem = {};
        $scope.toggle = function(scope) {
            scope.toggle();
        };
        $scope.menuList = [];
        menuService.getMenus({},function(data){
            for(var i=0;i<data.length;i++){
                $scope.menuList.push(data[i]);
            }
        });
    }]);
}(angular.module('backStage')));