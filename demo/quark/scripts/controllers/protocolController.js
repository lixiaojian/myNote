/**
 * Created by lixj(872458899@qq.com) on 15/7/3.
 */
;(function(app){
    app.controller('protocolCtr',['$scope','$modal',function($scope,$modal){
        $scope.modileTitle = '协议管理';
        $scope.rules=[
            {
                url:'123.txt'
            },
            {
                url:'1234.txt'
            },
            {
                url:'1235.txt'
            }
        ];
        $scope.addRule = function(){
            $scope.rules.push({});
        };
        $scope.removeRule = function(index){
            $scope.rules.splice(index,1);
        }
    }]);
}(angular.module('backStage')));