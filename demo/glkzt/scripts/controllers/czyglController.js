/**
 * Created by lixj(872458899@qq.com) on 15/6/24.
 */
(function(app){
    app.controller('czyglCtr',['$scope','$modal',function($scope,$modal){
        $scope.datas=[
            {
                id:'1',
                realName:'董小利',
                email:'XiaoliDong@quarkfinance.com',
                role:'产品',
                phoneNumber:'18810693304',
                updatTime:'2015-04-21  11:00'
            },
            {
                id:'2',
                realName:'方方',
                email:'fangfang@quarkfinance.com',
                role:'管理员',
                phoneNumber:'18392039823',
                updatTime:'2015-04-21  10:00'
            }
        ];

        $scope.openNew = function(type){
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: ['$scope','$modalInstance',function($scope, $modalInstance){
                    if('select' === type){
                        $scope.isCheck = true;
                    }else{
                        $scope.isCheck = false;
                    }
                    if('add' === type){
                        $scope.user = {};
                        $scope.title='新增';
                    }else{
                        $scope.user = {
                            id:'1',
                            realName:'董小利',
                            email:'XiaoliDong@quarkfinance.com',
                            role:'产品',
                            password:'18810693304',
                            repassword:'18810693304'
                        };
                    }
                    //点击确定
                    $scope.ok = function () {
                        $modalInstance.close();
                    };
                    //点击取消
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }],
                //size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        };
    }]);
}(angular.module('backStage')));