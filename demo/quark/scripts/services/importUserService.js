/**
 * Created by 872458899@qq.com on 15-7-19.
 */
;(function (app) {
    app.service('importUserService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //搜索导入用户
            search:{
                url:'customerImport',
                //url:'data/importUserList.json',
                method:'get'
            },
            //获取所有的活动
            findAllActivity:{
                // url:'data/importUserNew.json',
            	url:'activity/getAllActivityforImport',
                method:'get',
                isArray:true
            },
            //导入用户
            importUsers:{
               url:'customerImport/importUser',
                //url:'data/ok.json',
               method:'post'
            },
            //获取导入用户的详情
            findActivtyById:{
                url:'customerImport/getDetail',
                method:'get'
            },
            //查看已导入的用户
            findImportedUsers:{
                url:'customerDetailImport',
                //url:'data/importUserSee.json',
                method:'get'
            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));