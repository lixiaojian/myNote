/**
 * Created by lixj(872458899@qq.com) on 15/6/24.
 */
;(function(app){
    app.controller('cpglCtr',['$scope','productService','$modal',function($scope,productService,$modal){
        $scope.modileTitle = '产品管理';
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
        //全部数据
        productService.findAll({},function(data){
            $scope.datas=data;
        });

        //弹出层
        $scope.openNew = function(){
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                size:'lg',
                controller: ['$scope','$modalInstance',function(scope, $modalInstance){
                    //获取排序的产品列表
                    if(!scope.productsOrder){
                        productService.getOrders({},function(data){
                            scope.productsOrder = data;
                        })
                    }
                    //点击确定
                    scope.ok = function () {
                        $modalInstance.close();
                    };
                    //点击取消
                    scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    //排序事件
                    scope.moveOrder = scope.moveOrder || function(po,ver){
                            if('left' === po){
                                if('up' === ver){
                                    setOrder(scope.productsOrder.allProducts,scope.leftCurtId,scope.leftPreId,'orderNumber');
                                }else if('down' === ver){
                                    setOrder(scope.productsOrder.allProducts,scope.leftCurtId,scope.leftNextId,'orderNumber');
                                }
                            }else if('right' === po){
                                if('up' === ver){
                                    setOrder(scope.productsOrder.goodProduct,scope.rightCurId,scope.rightPreId,'orderNumber2');
                                }else if('down' === ver){
                                    setOrder(scope.productsOrder.goodProduct,scope.rightCurId,scope.rightNextId,'orderNumber2');
                                }
                            }else if('center' === po){
                                console.log('中间');
                            }
                            console.log(scope.productsOrder.allProducts);
                        };
                    //设置选中事件
                    scope.setCurr = scope.setCurr || function(t,cur,po){
                            var dataset = t.target.dataset;
                            //前面一个的ID
                            var preId = parseInt(dataset.pre);
                            //后面一个的ID
                            var nextId = parseInt(dataset.next);
                            //当前id
                            var curId = cur.id;
                            if('left' === po){
                                scope.leftPreId = preId;
                                scope.leftNextId = nextId;
                                scope.leftCurtId = curId;
                            }else{
                                scope.rightPreId = preId;
                                scope.rightNextId = nextId;
                                scope.rightCurId = curId;
                            }
                    };

                    //交换两个产中的排序数字
                    function setOrder(arr,id1,id2,attrName){
                        if(id1 && id2){
                            var tep1=null;
                            var tep2=null;
                            for(var i=0;i<arr.length;i++){
                                if(arr[i].id === id1){
                                    tep1 = arr[i];
                                }
                                if(arr[i].id === id2){
                                    tep2 = arr[i];
                                }
                            }
                            console.log(tep1);
                            console.log(tep2);
                            if(tep1 && tep2){
                                var temp;
                                temp = tep1[attrName];
                                tep1[attrName] = tep2[attrName];
                                tep2[attrName] = temp;
                                console.log(tep1);
                                console.log(tep2);
                            }
                        }
                    }
                }]
            });
        };

    }]);
}(angular.module('backStage')));