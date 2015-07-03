/**
 * Created by lixj(872458899@qq.com) on 15/7/2.
 */
;(function(){
    'use strict';
    //定义一个模块
    var backStage = angular.module('login',['ngResource','ui.router']);
    //配置提交
    function initAjaxRequestType(httpProvider) {
        httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        var param = function (obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        httpProvider.defaults.transformRequest = [function (data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
    }
    //配置路由
    backStage.config(['$stateProvider','$urlRouterProvider','$httpProvider',function ($stateProvider, $urlRouterProvider,httpProvider) {
        //请求配置
        initAjaxRequestType(httpProvider);
        //console.log($resourceProvider.defaults);
        // 路由配置
        $urlRouterProvider.otherwise("/login");
        //$urlRouterProvider.when("", "/glkzt");
        $stateProvider
        /**
         * 登录
         */
        .state('login', {
            url: '/login',
            templateUrl:'views/login.html'
        })

    }]);

    backStage.service('loginService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //获取菜单
            add:{
                url:'data/login.json',
                method:'post',
                headers:{
                    'content-type':'application/x-www-form-urlencoded;charset=UTF-8'
                }
            }
        };
        return $resource(url,{},actions);
    }]);

    backStage.controller('UserLoginCtrl', ['$scope', '$location', '$http','$state',"loginService", function ($scope, $location, $http, $state,loginService) {
        $scope.login_result = {
            flag: true,
            ecode:'',
            emsg:''
        };
        $scope.user={

        };
        $scope.login = function(){
            loginService.add($scope.user,function(data){
                if(data.resCode=='0000') {
                    window.location.href="index.html";
                    $state.go('glkzt');
                } else {
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
}());