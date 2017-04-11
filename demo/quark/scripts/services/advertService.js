/**
 * Created by 872458899@qq.com on 15-7-6.
 */
;(function (app) {
    app.service('adService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //�������
            search:{
                url:'advertise',
                //url:'data/adList.json',
                method:'get'
            },
            saveAd:{
                url:'advertise/update',
                method:'put'
            },
            findById:{
                url:'advertise/getDetail',
                //url:'data/adDetail.json',
                method:'get'
            },
            deleteAd:{
                url:'advertise/del',
                method:'get'
            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));