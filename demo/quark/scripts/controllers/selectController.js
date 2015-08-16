/**
 * Created by lixj(872458899@qq.com) on 15/6/30.
 */
;(function(app){
    app.controller('selectCtr',['$scope','$modal','selectService','$filter',function($scope,$modal,selectService,$filter){
        $scope.modileTitle='交易信息查询';
        $scope.modileTitle2='意见反馈查询';
        //分页
        $scope.suggestionPage = {
            //总记录数
            totalItems:120,
            //当前页 default:1
            curPage:1,
            //每页条数 default:10
            itemsPerPage:10,
            //显示页数
            maxSize:10,
            previousText:'上一页',
            nextText:'下一页',
            //是否显示首页和末页
            boundaryLinks:true,
            firstText:'首页',
            lastText:'末页'
        };
        $scope.searchSuggestion={
            length:$scope.suggestionPage.itemsPerPage,
            start:0
        };
        $scope.searchSuggestions = function(){
            $scope.searchSuggestion.start=0;
            $scope.searchSuggestion.bdate = $filter('date')($scope.searchSuggestion.bdate,'yyyy-MM-dd');
            $scope.searchSuggestion.edate = $filter('date')($scope.searchSuggestion.edate,'yyyy-MM-dd');
            changePage();
        }
        $scope.changePage=function(){
            $scope.searchSuggestion.start=($scope.suggestionPage.curPage-1)*$scope.suggestionPage.itemsPerPage;
            changePage();
        }
        //日历相关
        $scope.sbopen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.sbopened = !$scope.sbopened;
        };
        $scope.seopen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.seopened = !$scope.seopened;
        };

        $scope.format = 'yyyy-MM-dd';

        function changePage(){

            selectService.searchSuggestion($scope.searchSuggestion,function(data){
                $scope.suggestionList = data.recordList;
                $scope.suggestionPage.totalItems = data.iTotalRecords;
                $scope.suggestionPage.itemsPerPage = data.pageSize;
            });
        };

        changePage();


    }]);
}(angular.module('backStage')));