/**
 * Created by lixj(872458899@qq.com) on 15/6/22.
 */
;(function(){
    'use strict';
    //定义一个模块
    var backStage = angular.module('backStage',['ui.tree','ngResource','ui.router','ui.bootstrap','angularFileUpload','w5c.validator']);
    //定义一个拦截器
    backStage.factory('myInterceptor', ['$rootScope','$timeout',function($rootScope,$timeout) {
        var myInterceptor = {
            request: function(config) {
                if(!$rootScope.isLodding && !config.cache){
                    $rootScope.$emit('loadding');
                }
                return config;
            },
            response: function(response) {
                if($rootScope.isLodding && !response.config.cache){
                    $timeout(function(){
                        $rootScope.$emit('colseModal');
                    },300);
                };
                //if(response.data && response.data.resCode){
                //    if('0000' == response.data.resCode){
                //        console.log('请求成功！');
                //    }else if('1111' == response.data.resCode){
                //        console.log('没有权限！');
                //    }else if('2222' == response.data.resCode){
                //        console.log('没有登录！');
                //    }
                //}
                return response;
            },
            responseError:function(response){
                if($rootScope.isLodding && !response.config.cache){
                    $timeout(function(){
                        $rootScope.$emit('colseModal');
                    },300);
                };
                //没有权限
                if(response.status == 403){
                    alert(response.data);
                    return null;
                }else if(response.status == 401){
                    //没有登录
                   // alert(response.data);
                    $rootScope.$emit('notLogin');
                }else if(response.status==404){
                    alert('请求资源没有找到');
                }else if(response.status==500){
                    alert('服务器内部错误');
                }else{
                    alert('未知错误');
                }
                return response;
            }
        };
        return myInterceptor;
    }]);
    //配置路由
    backStage.config(['$stateProvider','$urlRouterProvider','$httpProvider','w5cValidatorProvider',function ($stateProvider, $urlRouterProvider,httpProvider,w5cValidatorProvider) {
        //添加拦截器
        httpProvider.interceptors.push('myInterceptor');
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
            //导入用户
            .state("glkzt.dryh", {
                url: "/dryh",
                templateUrl: "views/templates/glkzt/activity/dryh.html"
            })
            //导入用户查看页
            .state("glkzt.dryhcky", {
                url: "/dryhcky",
                templateUrl: "views/templates/glkzt/activity/dryhcky.html"
            })
            //交易信息查询
            .state("glkzt.jyxxcx", {
                url: "/jyxxcx",
                templateUrl: "views/templates/glkzt/select/jyxxcx.html"
            })
            //交易信息详情
            .state("glkzt.jyxxcxxq", {
                url: "/jyxxcx/:id",
                templateUrl: "views/templates/glkzt/select/jyxxcxxq.html"
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
            //短信管理
            .state("glkzt.dxgl", {
                url: "/dxgl",
                templateUrl: "views/templates/glkzt/common/dxgl.html"
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
            //资产详情
            .state("yhgl.zcxq", {
                url: "/zcxq/:id",
                templateUrl: "views/templates/yhgl/zcxq.html"
            })
            //用户卡券查询
            .state("yhgl.yhkqcx", {
                url: "/yhkqcx",
                templateUrl: "views/templates/yhgl/yhkqcx.html"
            })
            //用户卡券查询
            .state("yhgl.yhkqcxxq", {
                url: "/yhkqcxxq/:id",
                templateUrl: "views/templates/yhgl/yhkqcxxq.html"
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
            });

        //验证
        // 全局配置
        w5cValidatorProvider.config({
            blurTrig   : true,
            showError  : true,
            removeError: true

        });
        w5cValidatorProvider.setRules({
            email         : {
                required: "输入的邮箱地址不能为空",
                email   : "输入邮箱地址格式不正确"
            },
            username      : {
                required      : "输入的用户名不能为空",
                pattern       : "用户名必须输入字母、数字、下划线,以字母开头",
                w5cuniquecheck: "输入用户名已经存在，请重新输入"
            },
            password      : {
                required : "密码不能为空",
                minlength: "密码长度不能小于{minlength}",
                maxlength: "密码长度不能大于{maxlength}"
            },
            repeatPassword: {
                required: "重复密码不能为空",
                repeat  : "两次密码输入不一致"
            },
            number        : {
                required: "数字不能为空"
            }
        });
    }])
        //这里做事件监听  主要用于提示信息
    .run(['$rootScope','$modal','logOutService','userService',function($rootScope,$modal,logOutService,userService) {
            $rootScope.logout = function(){
                logOutService.logOut({},function(data){
                    if(data.resCode=='0000'){
                        location.href = 'index.html';
                    }
                });
            }
            userService.findCurrUser({},function(data){
                $rootScope.currUser= data.resInfo;
            });
            //没有登录
            $rootScope.$on('notLogin',function(data1){
                location.href='index.html#/login';
            });
            //数据加载中
            $rootScope.$on('loadding',function(data1){
                $rootScope.isLodding = true;
                $rootScope.modal = $modal.open({
                    animation: true,
                    backdrop:'static',
                    template: '<div style="padding: 15px 0;text-align: center;"><img src="img/ajax-loader-big.gif" width="64px" height="64px" alt=""/></div>',
                    size:'sm'
                });
            });
            //关闭提示
            $rootScope.$on('colseModal',function(data1){
                $rootScope.isLodding = false;
                $rootScope.modal && $rootScope.modal.close();
            });
    }]);
    backStage.service('logOutService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //退出登录
            logOut:{
                url:'user/logout',
                method:'get'
            }
        };
        return $resource(url,{},actions);
    }])
}());