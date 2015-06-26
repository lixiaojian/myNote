;(function(app){
    app.controller('UserLoginCtrl', ['$scope', '$location', '$http','$state',"loginService", function ($scope, $location, $http, $state,loginService) {
        $scope.login_result = {
            flag: true,
            ecode:'',
            emsg:''
        };
        $scope.user={

        };
        //var url=config.data_serve_base_url
        $scope.login = function(){
            //$scope.$emit(config.events.loading, {
            //    type: 'loaded'
            //});
            loginService.add($scope.user,function(data){
                if(data.resCode=='0000') {
                    //config.currentState.user=data.resInfo;
                    //config.wwwFile=data.resInfo.wwwFile;
                    $state.go('glkzt');
                } else {
                    //$scope.$emit(config.events.loading, {
                    //    type: 'loaded'
                    //});
                    $scope.changeVailCode();
                    $scope.login_result = {
                        ecode:data.resCode,
                        emsg:data.resMsg+"["+data.resInfo+"]"
                    };
                    $scope.login_result.flag = false;
                }
            },function(data,status,headers,config){
                $scope.login_result = {
                    ecode:'9999',
                    emsg:'网络异常，请稍后重试'
                };
                $scope.login_result.flag = false;
            })
        };
        $scope.changeVailCode=function(){
            $scope.imgUrl="vaildCode.jpg?t="+new Date().getTime();
        };
        $scope.changeVailCode();
        $scope.closeErrorDlg = function() {
            $scope.login_result.flag = true;
        }
    }])
}(angular.module('backStage')));