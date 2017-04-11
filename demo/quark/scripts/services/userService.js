/**
 * Created by 872458899@qq.com on 15-7-11.
 */
;(function (app) {
    app.service('userService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            getAll:{
                url:'customer',
                //url:'data/userList.json',
                method:'get'
                //isArray:true
            },
            findById:{
                url:'customer/getDetail',
                // url:'data/userDetail.json',
                method:'get'
            },
            saveUser:{
                url:'customer/update',
                //url:'data/ok.json',
                method:'put'
                //method:'post'
            },
            //获取当前登录用户信息
            findCurrUser:{
                //url:'user/current',
                url:'data/curUser.json',
                method:'get'
            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));