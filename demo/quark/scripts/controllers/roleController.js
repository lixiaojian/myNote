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
        $scope.searchRole = {
            start:0,
            length:$scope.page.itemsPerPage
        }
        $scope.searchRoles = function(){
            $scope.searchRole.start = 0;
            changePage();
        };
        //翻页
        $scope.changePage = function(){
            $scope.searchRole.start = ($scope.page.curPage-1)*$scope.page.itemsPerPage;
            changePage();
        };
        //获取所有角色
        function changePage(){
            roleService.getAll($scope.searchRole,function(data){
                $scope.page.totalItems = data.iTotalRecords;
                $scope.page.itemsPerPage = data.pageSize;
                $scope.datas = data.recordList;
            }, function(data){
            	alert(data);
            });
        };
        changePage();
        //获取最后一页数据
        function getLastPage(){
            var totalPage = Math.ceil(($scope.page.totalItems+1)/$scope.page.itemsPerPage);
            $scope.page.curPage=totalPage;
            $scope.searchRole.start = (totalPage-1)*$scope.page.itemsPerPage;
            changePage();
        }
        //删除角色
        $scope.deleteRole = function(id,index){
            $modal.open({
                animation: true,
                templateUrl: 'views/templates/deleteConfirm.html',
                size:'sm',
                controller: ['$scope','$modalInstance',function(scope, $modalInstance){
                    //弹出框内容
                    scope.alertContent = '您确定要删除该条记录吗？';
                    //是否是确认框
                    scope.isConfirm = true;
                    //点击确定
                    scope.ok = function (){
                        roleService.deleteRole({id:id},function(data){
                            if('0000' === data.resCode){
                                $scope.datas.splice(index,1);
                                $modalInstance.dismiss('cancel');
                            }
                        });
                    };
                    //点击取消
                    scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });
        };
        //打开弹层
        $scope.openNew = function(type,id){
            $modal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: ['$scope','$modalInstance','TreeData',function($scope, $modalInstance,TreeData){

                    $scope.isCheck = false;
                    if('add' === type){
                        $scope.title='新增';
                        $scope.role = {};
                    }else if('select' === type){
                        $scope.isCheck = true;
                        $scope.title='查看';
                    }else if('edit' === type){
                        $scope.title='编辑';
                    }
                    
                    roleService.findById({id:id},function(data){
                        if('add' === type){
                            $scope.role.id= null;
                            $scope.role.roleName= null;
                            $scope.role.roleDesc= null;
                        }else{
                        	$scope.role=data.resInfo;
                        }
                        
                        roleService.findTreeDate(function(data){
                       	 	$scope.role.items = data.items;
                            $scope.tree = new TreeData($scope.role.items);
                            angular.forEach($scope.role.items,function(ra){
                            	angular.forEach(ra.items,function(rb){
                            		angular.forEach(rb.items,function(rc){
                            			angular.forEach($scope.role.authoritys,function(rval){
                                            if(rc.menuCode === rval.menuCode){
                                            	rc.checked = true;
                                                $scope.tree.updateChecked(rc);
                                            }
                                        })
                                	});
                            	});
                            });

                       });
                    });
                    

                    //点击确定
                    $scope.ok = function () {
                        if(!$scope.role.roleName){
                            alert('请输入角色名称');
                            return;
                        }
                        if(!$scope.role.roleDesc){
                            alert('请输入角色描述');
                            return;
                        }
                        var check=false;
                        angular.forEach($scope.role.items,function(item){
                            if(item.checked){
                                check = true;
                                return;
                            }
                        });
                        if(!check){
                            alert('请给角色分配权限');
                            return;
                        }
                        roleService.saveRole($scope.role,function(data){
                            $modalInstance.close();
                            if(!$scope.role.id){
                                getLastPage();
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