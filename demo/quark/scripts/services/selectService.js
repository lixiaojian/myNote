/**
 * Created by 872458899@qq.com on 15-7-14.
 */
;(function (app) {
    app.service('selectService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //搜索意见反馈
            searchSuggestion:{
                url:'customerFeedback',
                //url:'data/suggestions.json',
                method:'get'
            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));