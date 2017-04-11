/**
 * Created by 872458899@qq.com on 15-7-19.
 */
;(function(app){
    app.controller('importUserCtr',['$scope','$modal','importUserService','$state','$rootScope',function($scope,$modal,importUserService,$state,$rootScope){
        $scope.modileTitle = '导入用户';
        $scope.modileTitle2 = '导入用户查看页';
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
        $scope.searchImportUer={
            start:0,
            length : $scope.page.itemsPerPage
        };

        $scope.search = function(){
            $scope.searchImportUer.start = 0;
            getInportUserList();
        }
        //翻页
        $scope.changePage = function(){
            $scope.searchImportUer.start = ($scope.page.curPage-1)*$scope.page.itemsPerPage;
            getInportUserList();
        }
        //获取导入用户列表
        function getInportUserList (){
            importUserService.search($scope.searchImportUer,function(data){
                $scope.importList = data.recordList;
                $scope.page.totalItems = data.iTotalRecords;
                $scope.page.itemsPerPage = data.pageSize;
            });
        };
        $scope.currId = null;
        $scope.searchImportedUser={
            start:0,
            length : $scope.page.itemsPerPage,
            activityNo:$rootScope.importActivityNo
        };
        //获取已导入的用户
        function findImportedUsers(){
            if($scope.searchImportedUser.activityNo){
                importUserService.findImportedUsers($scope.searchImportedUser,function(data){
                    $scope.importedList = data.recordList;
                    $scope.page.totalItems = data.iTotalRecords;
                    $scope.page.itemsPerPage = data.pageSize;
                });
            }
        }
        $scope.searchImported = function(){
            $scope.searchImportedUser.start = 0;
            findImportedUsers();
        }
        //翻页
        $scope.changeImportedPage = function(){
            $scope.searchImportedUser.start = ($scope.page.curPage-1)*$scope.page.itemsPerPage;
            findImportedUsers();
        }
        $scope.toDetail = function(id){
            $rootScope.importActivityNo = id;
            $state.go('glkzt.dryhcky');
        };
        getInportUserList();
        findImportedUsers();
        $scope.addImportModal = function(activityNo,isSee){
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'addImport.html',
                size:'lg',
                controller: ['$scope','$modalInstance',function(scope, $modalInstance){
                    if(isSee){
                        scope.disabled = true;
                    }else{
                        scope.disabled = false;
                    }
                    scope.acList=null;
                    scope.importUserNew = {

                    };
                    if(!scope.acList){
                        importUserService.findAllActivity({},function(data){
                            scope.acList = data;
                            if(activityNo){
                                angular.forEach(scope.acList,function(item){
                                    if(item.activityNo === activityNo){
                                        scope.setCurrAct = item;
                                        scope.importUserNew.activityNo = item.activityNo;
                                        scope.importUserNew.improtPath = item.improtPath;
                                        return;
                                    }
                                })
                            }
                        });
                    };

                    scope.$watch('importUserNew.activityNo',function(newVal,oldVal){
                        if(newVal!=oldVal){
                            angular.forEach(scope.acList,function(item){
                                if(item.activityNo === newVal){
                                    scope.setCurrAct = item;
                                    return;
                                }
                            })
                        };
                        if(!newVal){
                            scope.setCurrAct = {};
                        }
                    });

                    //点击确定
                    scope.ok = function () {
                        $scope.$emit('loadding');
                        importUserService.importUsers(scope.importUserNew,function(data){
                            alert(data.resMsg);
                            $scope.$emit('colseModal');
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