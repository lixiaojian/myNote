/**
 * Created by lixj(872458899@qq.com) on 15/6/22.
 */
;(function(){
    'use strict';
    //定义一个模块
    var backStage = angular.module('backStage',['ui.tree','ngResource','ui.router','ui.bootstrap','angularFileUpload']);

    //配置路由
    backStage.config(['$stateProvider','$urlRouterProvider','$httpProvider',function ($stateProvider, $urlRouterProvider,httpProvider) {
        // 路由配置
        $urlRouterProvider.otherwise("/glkzt");
        //$urlRouterProvider.when("", "/glkzt");
        $stateProvider
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
                templateUrl: "views/templates/glkzt/operator/czygl.html"
            })
            //角色管理
            .state("glkzt.jsgl", {
                url: "/jsgl",
                templateUrl: "views/templates/glkzt/operator/jsgl.html"
            })
            //产品管理
            .state("glkzt.cpgl", {
                url: "/cpgl",
                templateUrl: "views/templates/glkzt/product/cpgl.html"
            })
            //活动查询
            .state("glkzt.hdcx", {
                url: "/hdcx",
                templateUrl: "views/templates/glkzt/activity/hdcx.html"
            })
            //新增活动
            .state("glkzt.xzhd", {
                url: "/xzhd",
                templateUrl: "views/templates/glkzt/activity/xzhd.html"
            })
            //交易信息查询
            .state("glkzt.jyxxcx", {
                url: "/jyxxcx",
                templateUrl: "views/templates/glkzt/select/jyxxcx.html"
            })
            //意见反馈查询
            .state("glkzt.yjfkcx", {
                url: "/yjfkcx",
                templateUrl: "views/templates/glkzt/select/yjfkcx.html"
            })
            //广告管理
            .state("glkzt.gggl", {
                url: "/gggl",
                templateUrl: "views/templates/glkzt/common/gggl.html"
            })
            //银行信息
            .state("glkzt.yhxx", {
                url: "/yhxx",
                templateUrl: "views/templates/glkzt/common/yhxx.html"
            })
            //协议管理
            .state("glkzt.xygl", {
                url: "/xygl",
                templateUrl: "views/templates/glkzt/common/xygl.html"
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