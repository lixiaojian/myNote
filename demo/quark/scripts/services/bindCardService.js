/**
 * Created by 872458899@qq.com on 15-7-11.
 */
;(function (app) {
    app.service('bindCardService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            findConfig:{
                url:'config/getParamConfig',
                method:'get'
            },
            saveConfig:{
                url:'config/updateParamConfig',
                method:'put'
            },
            //查询列表
            search:{
                url:'customerBind',
                //url:'data/bindCardList.json',
                method:'get'
            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));