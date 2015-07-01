/**
 * Created by lixj(872458899@qq.com) on 15/7/1.
 */
;(function(app){
    app.controller('bindCardCtr',['$scope','$modal',function($scope,$modal){
        $scope.modileTitle = '用户绑卡认证查询';
        $scope.modal = function(){
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: ['$scope','$modalInstance',function($scope, $modalInstance){
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