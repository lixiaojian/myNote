/**
 * Created by lixj(872458899@qq.com) on 15/6/28.
 */
;(function(app){
    app.controller('hdglCtr',['$scope','$modal','activityService',function($scope,$modal,activityService){
        $scope.modileTitle = '活动查询';
        //日历相关
        $scope.bopen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.bopened = !$scope.bopened;
        };
        $scope.eopen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.eopened = !$scope.eopened;
        };
        $scope.format = 'yyyy-MM-dd';
        //分页
        $scope.page = {
            //总记录数
            totalItems:120,
            //当前页 default:1
            curPage:1,
            //每页条数 default:10
            itemsPerPage:3,
            //显示页数
            maxSize:10,
            previousText:'上一页',
            nextText:'下一页',
            //是否显示首页和末页
            boundaryLinks:true,
            firstText:'首页',
            lastText:'末页'
        };
        //查询活动
        activityService.search({},function(data){
            $scope.page.totalItems = data.iTotalRecords;
            $scope.page.itemsPerPage = data.pageSize;
            $scope.datas = data.recordList;
        });

    }]);
}(angular.module('backStage')));