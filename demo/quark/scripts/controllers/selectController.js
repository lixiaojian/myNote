/**
 * Created by lixj(872458899@qq.com) on 15/6/30.
 */
;(function(app){
    app.controller('selectCtr',['$scope','$modal',function($scope,$modal){
        $scope.modileTitle='交易信息查询';
        $scope.modileTitle2='意见反馈查询';
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

        //打开弹层
        $scope.openDetail = function(type,id){
            $modal.open({
                animation: true,
                size:'lg',
                templateUrl: 'myModalContent.html',
                controller: ['$scope','$modalInstance',function($scope, $modalInstance){
                    //点击确定
                    $scope.ok = function () {
                        $modalInstance.close();
                    };
                    //点击取消
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });
        };
    }]);
}(angular.module('backStage')));