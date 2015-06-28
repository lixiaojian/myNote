/**
 * Created by lixj(872458899@qq.com) on 15/6/22.
 */
;(function(){
    'use strict';
    //定义一个模块
    var backStage = angular.module('backStage',['ui.tree','ngResource','ui.router','ui.bootstrap','angularFileUpload']);
    //配置提交
    function initAjaxRequestType(httpProvider) {
        // Use x-www-form-urlencoded Content-Type
        httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
       // httpProvider.defaults.withCredentials = true;

        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
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
        /**
         * 管理控台
         */
            .state("glkzt", {
                url: "/glkzt",
                templateUrl: "views/glkzt.html"
            })
            //操作员管理
            .state("glkzt.czygl", {
                url: "/czygl",
                templateUrl: "views/templates/glkzt/czygl.html"
            })
            //角色管理
            .state("glkzt.jsgl", {
                url: "/jsgl",
                templateUrl: "views/templates/glkzt/jsgl.html"
            })
            //产品管理
            .state("glkzt.cpgl", {
                url: "/cpgl",
                templateUrl: "views/templates/glkzt/cpgl.html"
            })
            //活动查询
            .state("glkzt.hdcx", {
                url: "/hdcx",
                templateUrl: "views/templates/glkzt/hdcx.html"
            })
            //活动查询
            .state("glkzt.xzhd", {
                url: "/xzhd",
                templateUrl: "views/templates/glkzt/xzhd.html"
            })
            //交易信息查询
            .state("glkzt.jyxxcx", {
                url: "/jyxxcx",
                templateUrl: "views/templates/glkzt/jyxxcx.html"
            })
            //意见反馈查询
            .state("glkzt.yjfkcx", {
                url: "/yjfkcx",
                templateUrl: "views/templates/glkzt/yjfkcx.html"
            })
            //广告管理
            .state("glkzt.gggl", {
                url: "/gggl",
                templateUrl: "views/templates/glkzt/gggl.html"
            })
            //银行信息
            .state("glkzt.yhxx", {
                url: "/yhxx",
                templateUrl: "views/templates/glkzt/yhxx.html"
            })
            //推送通知
            .state("glkzt.tstz", {
                url: "/tstz",
                templateUrl: "views/templates/glkzt/tstz.html"
            })
        /**
         * 用户管理
         */
            .state("yhgl", {
                url: "/yhgl",
                templateUrl: "views/yhgl.html"
            })
            //用户信息
            .state("yhgl.yhxx", {
                url: "/yhxx",
                templateUrl: "views/templates/yhgl/yhxx.html"
            })
            //资产信息
            .state("yhgl.zcxx", {
                url: "/zcxx",
                templateUrl: "views/templates/yhgl/zcxx.html"
            })
            //用户卡券查询
            .state("yhgl.yhkqcx", {
                url: "/yhkqcx",
                templateUrl: "views/templates/yhgl/yhkqcx.html"
            })
            //用户绑卡认证查询
            .state("yhgl.yhbkrzcx", {
                url: "/yhbkrzcx",
                templateUrl: "views/templates/yhgl/yhbkrzcx.html"
            })
        /**
         * 个人密码修改
         */
            .state("grmmxg", {
                url: "/grmmxg",
                templateUrl: "views/grmmxg.html"
            })
    }]);
}());