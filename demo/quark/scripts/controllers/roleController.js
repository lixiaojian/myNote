/**
 * Created by lixj(872458899@qq.com) on 15/6/24.
 */
;(function(app){
    app.controller('jsglCtr',['$scope','$modal','roleService',function($scope,$modal,roleService){
        $scope.modileTitle='角色管理';
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
        //翻页
        $scope.changePage = function(){
            roleService.getAll({start:($scope.page.curPage-1)*$scope.page.itemsPerPage,length:$scope.page.itemsPerPage},function(data){
                $scope.page.totalItems = data.iTotalRecords;
                $scope.page.itemsPerPage = data.pageSize;
                $scope.datas = data.recordList;
            });
        };
        //获取所有角色
        roleService.getAll({start:($scope.page.curPage-1)*$scope.page.itemsPerPage,length:$scope.page.itemsPerPage},function(data){
            $scope.page.totalItems = data.iTotalRecords;
            $scope.page.itemsPerPage = data.pageSize;
            $scope.datas = data.recordList;
        });

        //打开弹层
        $scope.openNew = function(type,id){
            $modal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: ['$scope','$modalInstance','TreeData',function($scope, $modalInstance,TreeData){

                    $scope.isCheck = false;
                    if('add' === type){
                        $scope.title='新增';
                    }else if('select' === type){
                        $scope.isCheck = true;
                        $scope.title='查看';
                    }else if('edit' === type){
                        $scope.title='编辑';
                    }
                    roleService.findById({id:id},function(data){
                        $scope.role = data;
                        $scope.tree = new TreeData($scope.role.authoritys);
                    });
                    //点击确定
                    $scope.ok = function () {
                        $modalInstance.close();
                        console.log($scope.role);
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