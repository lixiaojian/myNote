/**
 * Created by lixj(872458899@qq.com) on 15/6/28.
 */
;(function (app) {
    app.service('activityService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //搜索活动
            search:{
                url:'activity',
                //url:'data/activitys.json',
                method:'get'
            },
            //活动详情
            findbyId:{
                url:'activity/getDetail',
                //url:'data/activity.json',
                method:'get'
            },
            //修改活动
            updateAct:{
                url:'activity/update',
                //url:'data/ok.json',
                method:'put'
                //method:'post'
            },
            //保存活动
            saveAct:{
                url:'activity/add',
                //url:'data/ok.json',
                method:'post'
            },
            //删除活动
            deleteAct:{
                url:'activity/del',
                method:'get'
            },
            //获取产品类型
            getProductTypes:{
                url:'productInfo/getAllProductType',
                method:'get',
                isArray:true

            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));