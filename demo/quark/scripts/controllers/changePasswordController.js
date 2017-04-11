/**
 * Created by 872458899@qq.com on 15-7-26.
 */
;(function(app){
    app.controller('passwordCtr',['$scope','passwordService',function($scope,passwordService){
        $scope.modileTitle = '个人密码修改';
        passwordService.getMyInfo({},function(data){
            if('0000' != data.resCode){
                alert('获取个人信息失败');
                return;
            }
            $scope.info = data.resInfo;
        });
        $scope.savePassword = function(){
            var passwordP = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/;
            if(!$scope.info.realName){
                alert('真实姓名不能为空');
                return;
            };
            if(!$scope.info.email){
                alert('邮箱不能为空');
                return;
            };
            if(!$scope.info.password){
                alert('密码不能为空');
                return;
            };
            if(!passwordP.test($scope.info.password)){
                alert('密码不合法');
                return;
            };
            if($scope.info.password != $scope.info.repassword){
                alert('两次输入密码不一致');
                return;
            };
            passwordService.savePassword($scope.info, function (data){
                alert(data.resMsg);
            });
        };

    }]);
}(angular.module('backStage')));