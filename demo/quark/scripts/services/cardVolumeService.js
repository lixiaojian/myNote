/**
 * Created by 872458899@qq.com on 15-7-23.
 */
;(function (app) {
    app.service('cardVolumeService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //查询卡卷
            search:{
                url:'customerCounpons',
                //url:'data/cardVolumeList.json',
                method:'get'
            },
            findDetail:{
                url:'customerCounponsDetail',
                //url:'data/cardVolumeDetail.json',
                method:'get'
            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));