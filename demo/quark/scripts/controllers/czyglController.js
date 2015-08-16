/**
 * Created by lixj(872458899@qq.com) on 15/6/24.
 */
;(function(app){
    app.controller('czyglCtr',['$scope','$modal','operatorService','$rootScope',function($scope,$modal,operatorService,$rootScope){
        $scope.modileTitle = '操作员管理';
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
        $scope.searchOper = {};
        $scope.search = function(){
            operatorService.search($scope.searchOper,function(data){
                $scope.datas=data.recordList;
                $scope.page.totalItems = data.iTotalRecords;
                $scope.page.itemsPerPage = data.pageSize;
            });
        };
        $scope.doSearch = function(){
            $scope.searchOper.start = 0;
            $scope.searchOper.length = $scope.page.itemsPerPage;
            $scope.search();
        }
        //翻页
        $scope.changePage = function(){
            $scope.searchOper.start = ($scope.page.curPage-1)*$scope.page.itemsPerPage;
            $scope.searchOper.length = $scope.page.itemsPerPage;
            $scope.search();
        };
        $scope.search();

        operatorService.getAllRole({},function(data){
            $rootScope.roleList = data;
        });
        $scope.openNew = function(type,id){
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: ['$scope','$modalInstance',function(scope, $modalInstance){
                    angular.forEach($rootScope.roleList,function(rval){
                        rval.checked = false;
                    });
                    //scope.tempRole={};
                    if('select' === type){
                        scope.isCheck = true;
                    }else{
                        scope.isCheck = false;
                    }
                    if('add' === type){
                        scope.user = {};
                        scope.user.roleList=[];
                    }else{
                        if('select' === type){
                            scope.isCheck = true;
                        }else{
                            scope.isCheck = false;
                        }
                        if('add' === type){
                            scope.user = {};
                            scope.user.roleList=[];
                        }else{
                            operatorService.findById({id:id},function(data){
                                scope.user=data.resInfo;
                                angular.forEach(scope.user.roleList,function(val){
                                    angular.forEach($rootScope.roleList,function(rval){
                                        if(val.id === rval.id){
                                            rval.checked = true;
                                        }
                                    })
                                })
                            });
                        }
                    }


                    //点击确定
                    scope.ok = function (valid) {
                        if(!scope.user.realName){
                            alert('请输入真实姓名！');
                            return;
                        }
                        if(!scope.user.loginName){
                            alert('请输入账户！');
                            return;
                        }
                        if('add' === type){
                            if(!scope.user.password || !scope.user.password){
                                alert('请输入重复密码和确认密码');
                                return;
                            }
                        };
                        var passwordP = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/;
                        if(scope.user.password || scope.user.repassword){
                            if(scope.user.password && !scope.user.repassword){
                                alert('请输入重复密码');
                                return;
                            }else if(!scope.user.password && scope.user.repassword){
                                alert('请输入密码');
                                return;
                            }else if(scope.user.password !== scope.user.repassword){
                                alert('两次密码输入不一致');
                                return;
                            }else if(!(passwordP.test(scope.user.password) && passwordP.test(scope.user.repassword))){
                                alert('密码不合法');
                                return;
                            }

                        }
                        scope.user.roleList =[];
                        angular.forEach($rootScope.roleList,function(rval){
                            if(rval.checked){
                                var rvalc = angular.copy(rval);
                                delete rvalc.authoritys;
                                delete rvalc.items;
                                delete rvalc.checked;
                                scope.user.roleList.push(rvalc);
                                rval.checked=false;
                            }
                        });
                        //angular.forEach(scope.tempRole,function(value,key){
                        //    scope.user.roleList.push({id:key});
                        //});
                        if(scope.user.roleList.length === 0){
                            alert('请选择角色')
                            return;
                        }
                        operatorService.saveOp(scope.user,function(data){
                            if(data.resMsg){
                                alert(data.resMsg);
                            }
                            if('0000' == data.resCode){
                                $modalInstance.close();
                                location.reload();
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

        $scope.deleteOp = function(id,index){
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
                        operatorService.deleteOp({id:id},function(data){
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
    }]);
}(angular.module('backStage')));