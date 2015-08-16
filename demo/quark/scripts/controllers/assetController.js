/**
 * Created by lixj(872458899@qq.com) on 15/7/1.
 */
;(function(app){
    app.controller('assetCtr',['$scope','$modal','assetService','$stateParams',function($scope,$modal,assetService,$stateParams){
        $scope.modileTitle = '资产信息';
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
        //分页
        $scope.detailPage = {
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
        $scope.searchAsset={
            start:($scope.page.curPage-1)*$scope.page.itemsPerPage,
            length:$scope.page.itemsPerPage
        }
        $scope.detailAsset={
            start:($scope.detailPage.curPage-1)*$scope.detailPage.itemsPerPage,
            length:$scope.detailPage.itemsPerPage
        }
        function getList(){
            $scope.searchAsset.start=($scope.page.curPage-1)*$scope.page.itemsPerPage;
            assetService.search($scope.searchAsset,function(data){
                $scope.assetList = data.recordList;
                $scope.page.totalItems = data.iTotalRecords;
                $scope.page.itemsPerPage = data.pageSize;
            });
        };
        function getDetailList(id){
            $scope.detailAsset.idNo = id;
            $scope.detailAsset.start=($scope.detailPage.curPage-1)*$scope.detailPage.itemsPerPage,
            assetService.findDetails($scope.detailAsset,function(data){
                $scope.details = data.recordList;
                $scope.detailPage.totalItems = data.iTotalRecords;
                $scope.detailPage.itemsPerPage = data.pageSize;
            })
        }
        if(!$stateParams.id){
            getList();
        }else{
            getDetailList($stateParams.id);
        }
        $scope.search = function(){
            $scope.searchAsset.start = 0;
            getList();
        }
        $scope.changePage = function(){
            getList();
        }
        $scope.changeDetailPage = function(){
            getDetailList($stateParams.id);
        }
    }]);
}(angular.module('backStage')));