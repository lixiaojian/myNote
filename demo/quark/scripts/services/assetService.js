/**
 * Created by 872458899@qq.com on 15-7-18.
 */
;(function (app) {
    app.service('assetService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //资产列表
            search:{
                url:'customerAsset',
                //url:'data/assetList.json',
                method:'get'
            },
            //资产详情列表
            findDetails:{
                url:'customerAssetDetail',
                //url:'data/assetDetails.json',
                method:'get'
            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));