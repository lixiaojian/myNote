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
        //翻页
        $scope.changePage = function(){
            console.log($scope.page.curPage);
        };
        //获取所有角色
        roleService.getAll({},function(data){
            $scope.datas = data;
        });



        //打开弹层
        $scope.openNew = function(type,id){
            $modal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: ['$scope','$modalInstance',function($scope, $modalInstance){

                    $scope.isCheck = false;
                    if('add' === type){
                        $scope.title='新增';
                    }else if('select' === type){
                        $scope.isCheck = true;
                        $scope.title='查看';
                    }else if('edit' === type){
                        $scope.title='编辑';
                    }
                    if(id){
                        roleService.findById({id:id},function(data){
                            $scope.role = data;
                        });
                    }else{
                        $scope.role ={
                            id:'',
                            roleName:'',
                            roleDesc:'',
                            //分配权限的树结构
                            authoritys:[
                                {
                                    moduleName:'操作员管理',
                                    subModule:[
                                        {
                                            subName:'操作员管理',
                                            select:{name:'查看',has:false},
                                            add:{name:'新增',has:false},
                                            edit:{name:'编辑',has:false},
                                            delete:{name:'删除',has:false}
                                        },
                                        {
                                            subName:'角色管理',
                                            select:{name:'查看',has:false},
                                            add:{name:'新增',has:false},
                                            edit:{name:'编辑',has:false},
                                            delete:{name:'删除',has:false}
                                        }
                                    ]
                                },
                                {
                                    moduleName:'用户管理',
                                    subModule:[
                                        {
                                            subName:'用户信息',
                                            select:{name:'查看',has:false},
                                            edit:{name:'编辑',has:false},
                                            export:{name:'导出',has:false}
                                        }
                                    ]
                                }
                            ]
                        };
                    }
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