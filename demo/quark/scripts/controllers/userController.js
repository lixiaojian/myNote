/**
 * Created by lixj(872458899@qq.com) on 15/7/1.
 */
;(function(app){
    app.controller('userCtr',['$scope','$modal','userService','bankService','$rootScope','$filter',function($scope,$modal,userService,bankService,$rootScope,$filter){
        $scope.modileTitle1 = '用户信息';
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
        $scope.searchUser = {
        	lockedState:''
        };
        //翻页
        $scope.changePage = function(){
            $scope.searchUser.start = ($scope.page.curPage-1)*$scope.page.itemsPerPage;
            $scope.searchUser.length = $scope.page.itemsPerPage;
            changePage();
        }
        function changePage(){
            $scope.searchUser.registerStartDate = $filter('date')($scope.searchUser.registerStartDate,'yyyy-MM-dd');
            $scope.searchUser.registerEndDate = $filter('date')($scope.searchUser.registerEndDate,'yyyy-MM-dd');
            userService.getAll($scope.searchUser,function(data){
                $scope.userList=data.recordList;
                $scope.page.totalItems = data.iTotalRecords;
                $scope.page.itemsPerPage = data.pageSize;
            })
        }
        changePage();
        $scope.endRegesterTime=null;
        $scope.search = function(){
            $scope.page.curPage=1;
            $scope.searchUser.start=0;
            $scope.searchUser.length=$scope.page.itemsPerPage;
            changePage();
        };
        bankService.findAllBank({},function(data){
            $rootScope.allbanks=data;
        });
        $scope.modal = function(type,id){
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                size:'lg',
                controller: ['$scope','$modalInstance',function($scope, $modalInstance){
                    userService.findById({id:id},function(data){
                        $scope.curUser = data.resInfo;
                    });
                    if('select' === type){
                        $scope.select = true;
                    }else{
                        $scope.select = false;
                    }
                    //点击确定
                    $scope.ok = function () {
                        userService.saveUser($scope.curUser,function(data){
                            if(data.resMsg){
                                alert(data.resMsg);
                            };
                            if('0000' == data.resCode){
                                $modalInstance.close();
                                location.reload();
                            }
                        });
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