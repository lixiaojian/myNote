/**
 * Created by 872458899@qq.com on 15/8/1.
 */
;(function(app){
    app.controller('transActionCtr',['$scope','$modal','transactionService','$stateParams','$filter',function($scope,$modal,transactionService,$stateParams,$filter){
        $scope.modileTitle = '交易信息查询';
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
        //搜索
        $scope.searchTrans = {
            length:$scope.page.itemsPerPage
        };
        //翻页
        $scope.changePage = function(){
            $scope.searchTrans.start = ($scope.page.curPage-1)*$scope.page.itemsPerPage;
            changePage();
        }
        function changePage(){
            if($scope.searchTrans.dealEndTime){
                $scope.searchTrans.dealEndTime = $filter('date')($scope.searchTrans.dealEndTime,'yyyy-MM-dd');
            }
            if($scope.searchTrans.dealStartTime){
                $scope.searchTrans.dealStartTime = $filter('date')($scope.searchTrans.dealStartTime,'yyyy-MM-dd');
            }
            transactionService.search($scope.searchTrans,function(data){
                $scope.traList=data.recordList;
                $scope.page.totalItems = data.iTotalRecords;
                $scope.page.itemsPerPage = data.pageSize;
            })
        }
        $scope.search = function(){
            $scope.page.curPage=1;
            $scope.searchTrans.start=0;
            $scope.searchTrans.length=$scope.page.itemsPerPage;
            changePage();
        };
        /**
         * 详情
         */
        $scope.dePage={
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
        }
        $scope.deTra={
            orderNo:$stateParams.id,
            start:0,
            length:$scope.dePage.itemsPerPage,
        }
        function findDetail(){
            $scope.deTra.start = ($scope.dePage.curPage-1)*$scope.dePage.itemsPerPage;
            transactionService.findDetail($scope.deTra,function(data){
                $scope.traDetList=data.resInfo;
                $scope.dePage.totalItems = data.iTotalRecords;
                $scope.dePage.itemsPerPage = data.pageSize;
            });
        }
        if(!$stateParams.id){
            changePage();
        }else{
            findDetail();
        }
        $scope.dechangePage = function(){
            findDetail();
        }
    }]);
}(angular.module('backStage')));
