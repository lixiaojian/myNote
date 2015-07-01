/**
 * Created by lixj(872458899@qq.com) on 15/7/1.
 */
;(function(app){
    app.controller('adCtr',['$scope','$modal',function($scope,$modal){
        $scope.modileTitle = '广告管理';
        $scope.addBanner = function(type){
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'addBanner.html',
                size:'lg',
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