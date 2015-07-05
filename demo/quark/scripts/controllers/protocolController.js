/**
 * Created by lixj(872458899@qq.com) on 15/7/3.
 */
;(function(app){
    app.controller('protocolCtr',['$scope','$modal','protocolService',function($scope,$modal,protocolService){
        $scope.modileTitle = '协议管理';

        protocolService.findAll({},function(data){
            $scope.protocols = data;
        });

        $scope.addRule = function(){
            $scope.protocols.loopAgreementDocList.push({});
        };
        $scope.removeRule = function(index){
            $scope.protocols.loopAgreementDocList.splice(index,1);
        };

        $scope.save = function(){
            protocolService.save($scope.protocols,function(data){
                if('0000' === data.resCode){
                    alert('保存成功！');
                }
            });
        }
    }]);
}(angular.module('backStage')));