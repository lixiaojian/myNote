/**
 * Created by lixj(872458899@qq.com) on 15/7/1.
 */
;(function(app){
    app.controller('bindCardCtr',['$scope','$modal','bindCardService','$filter',function($scope,$modal,bindCardService,$filter){
        $scope.modileTitle = '用户绑卡认证查询';
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
        //日历相关
        $scope.date={};
        $scope.date.ybopen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.date.ybopened = !$scope.date.ybopened;
        };
        $scope.date.yeopen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.date.yeopened = !$scope.date.yeopened;
        };
        $scope.searchBind={
            start:($scope.page.curPage-1)*$scope.page.itemsPerPage,
            length:$scope.page.itemsPerPage
        };
        function getList(){
            if($scope.searchBind.dealStartTime){
                $scope.searchBind.dealStartTime = $filter('date')($scope.searchBind.dealStartTime,'yyyy-MM-dd');
            }
            if($scope.searchBind.dealEndTime){
                $scope.searchBind.dealEndTime = $filter('date')($scope.searchBind.dealEndTime,'yyyy-MM-dd');
            }        	
            bindCardService.search($scope.searchBind,function(data){
                $scope.bindList = data.recordList;
                $scope.page.totalItems = data.iTotalRecords;
                $scope.page.itemsPerPage = data.pageSize;
            })
        };
        $scope.changPage = function(){
            $scope.searchBind.start = ($scope.page.curPage-1)*$scope.page.itemsPerPage;
            getList();
        }
        $scope.search = function(){
            $scope.searchBind.start = 0;
            getList();
        }
        getList();
        $scope.modal = function(){
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: ['$scope','$modalInstance',function(scope, $modalInstance){
                    bindCardService.findConfig({},function(data){
                        scope.bindConfig=data.resInfo;
                    });
                    //点击确定
                    scope.ok = function () {
                        bindCardService.saveConfig(scope.bindConfig,function(data){
                            alert(data.resMsg);
                            $modalInstance.close();
                        });
                    };
                    //点击取消
                    scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });
        };
    }]);
}(angular.module('backStage')));