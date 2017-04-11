/**
 * Created by 872458899@qq.com on 15-7-19.
 */
;(function (app) {
    app.service('smsService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //搜索产品
            search:{
               // url:'data/smsList.json',
                url:'smstemplate',
                method:'get'
            },
            //保存短信模板
            saveSms:{
              //  url:'data/ok.json',
                url:'smstemplate/save',
                method:'post'
            },
            //通过ID查询
            findById:{
                url:'smstemplate/getDetail',
                method:'get'
            },
            //删除短信模板
            deleteSms:{
                url:'smstemplate/del',
                method:'put'
            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));