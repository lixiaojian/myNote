/**
 * Created by lixj(872458899@qq.com) on 15/6/28.
 */
;(function(app){
    app.controller('hdglCtr',['$scope','$modal','activityService',function($scope,$modal,activityService){
        $scope.modileTitle = '活动查询';
        $scope.modileTitle2 = '新增活动';
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

        //弹出层
        $scope.modal = function(type,id){
            $modal.open({
                animation: true,
                templateUrl: 'views/templates/glkzt/activity/activityModal.html',
                size:'lg',
                controller: ['$scope','$modalInstance',function(scope, $modalInstance){
                    //点击确定
                    scope.ok = function () {
                        $modalInstance.close();
                    };
                    //点击取消
                    scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    if('select' === type){
                        scope.disabled = true;
                    }else{
                        scope.disabled = false;
                    }
                    //选择的时间
                    scope.dateTime=[
                        "00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00",
                        "08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00",
                        "16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"
                    ];
                    //日历相关
                    scope.fbopen = function($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        scope.fbopened = !scope.fbopened;
                    };
                    scope.feopen = function($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        scope.feopened = !scope.feopened;
                    };
                    scope.format = 'yyyy-MM-dd';
                }]

            });
        }
    }]);
}(angular.module('backStage')));