/**
 * Created by lixj(872458899@qq.com) on 15/6/24.
 */
;(function(app){
    app.controller('cpglCtr',['$scope','productService','$modal','$filter',function($scope,productService,$modal,$filter){
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
        productService.search({},function(data){
            $scope.datas=data;
        });

        //搜索时的参数
        $scope.searchProduct = {
            raiseState:''
        };
        //搜索产品
        $scope.search = function(){
            //将日期转成字符串提交
            $scope.searchProduct.raiseStartingTime = $filter('date')($scope.searchProduct.raiseStartingTime,'yyyy-MM-dd');
            $scope.searchProduct.raiseEndingTime = $filter('date')($scope.searchProduct.raiseEndingTime,'yyyy-MM-dd');
            productService.search($scope.searchProduct,function(data){
                $scope.datas=data;
            });
        };

        //弹出层
        $scope.openNew = function(){
            $modal.open({
                animation: true,
                controller: ['$scope','$modalInstance','$timeout','$filter',function(scope, $modalInstance,$timeout,$filter){
                    //获取排序的产品列表
                    if(!scope.productsOrder){
                        productService.getOrders({},function(data){
                            scope.productsOrder = data;
                            //排序
                            scope.productsOrder.allProducts = $filter('orderBy')(scope.productsOrder.allProducts,'orderNumber');
                            scope.productsOrder.goodProduct = $filter('orderBy')(scope.productsOrder.goodProduct,'orderNumber2');
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
                    //当前选中的标签
                    var curLeftElement = null;
                    var curRightElement = null;
                    //是否可以点击  防止点击过快
                    var canClick=true;
                    //当前选中的产品
                    var curLeftProduct=null;
                    var curRightProduct=null;

                    //排序事件
                    scope.moveOrder = scope.moveOrder || function(po,ver){
                            if(!canClick){
                                return;
                            }
                            canClick = false;
                            if('left' === po){
                                if('up' === ver){
                                    setOrder(scope.productsOrder.allProducts,scope.leftCurtId,scope.leftPreId,'orderNumber');
                                }else if('down' === ver){
                                    setOrder(scope.productsOrder.allProducts,scope.leftCurtId,scope.leftNextId,'orderNumber');
                                }
                                //更改顺序后重新排序
                                scope.productsOrder.allProducts = $filter('orderBy')(scope.productsOrder.allProducts,'orderNumber');
                                $timeout(function(){
                                    curLeftElement = document.getElementById('p_'+scope.leftCurtId);
                                    setAllId(curLeftElement,po);
                                },0);
                            }else if('right' === po){
                                //if('up' === ver){
                                //    setOrder(scope.productsOrder.goodProduct,scope.rightCurId,scope.rightPreId,'orderNumber2');
                                //}else if('down' === ver){
                                //    setOrder(scope.productsOrder.goodProduct,scope.rightCurId,scope.rightNextId,'orderNumber2');
                                //}
                                ////更改顺序后重新排序
                                //scope.productsOrder.goodProduct = $filter('orderBy')(scope.productsOrder.goodProduct,'orderNumber2');
                                //$timeout(function(){
                                //    curRightElement = document.getElementById('g_p_'+scope.rightCurId);
                                //    setAllId(curRightElement,po);
                                //},0);
                            }else if('center' === po){
                                //左边添加到右边
                                canClick = true;
                                //先判断是不是已包含
                                for(var i=0;i<scope.productsOrder.goodProduct.length;i++){
                                    if(curLeftProduct == scope.productsOrder.goodProduct[i]){
                                        return;
                                    }
                                }
                                scope.productsOrder.goodProduct.push(curLeftProduct);
                                scope.productsOrder.goodProduct = $filter('orderBy')(scope.productsOrder.goodProduct,'orderNumber2');
                            }
                            $timeout(function(){canClick = true;},200);
                        };
                    //设置选中事件
                    scope.setCurr = scope.setCurr || function(t,cur,po){
                            //当前id
                            var curId = cur.id;
                            if('left' === po){
                                curLeftProduct = cur;
                                scope.leftCurtId = curId;
                            }else{
                                curRightProduct = cur;
                                scope.rightCurId = curId;
                            }
                            setAllId(t.target,po);
                        };

                    //删除选中的精品
                    scope.deleteGood = function(){
                        if(!curRightProduct){
                            return;
                        }
                        var cid = curRightProduct.id;
                        var gp = scope.productsOrder.goodProduct;
                        for(var i=0;i<gp.length;i++){
                            if(gp[i].id === cid){
                                gp.splice(i,1);
                            }
                        }
                    };
                    //设置所有的id 当前选中的  选中的前一个的  选中的后一个的
                    function setAllId(ele,po){
                        if(!ele){
                            return;
                        }
                        var dataset = ele.dataset;
                        //前面一个的ID
                        var preId = parseInt(dataset.pre);
                        //后面一个的ID
                        var nextId = parseInt(dataset.next);
                        if('left' === po){
                            scope.leftPreId = preId;
                            scope.leftNextId = nextId;
                        }else if('right' === po){
                            scope.rightPreId = preId;
                            scope.rightNextId = nextId;
                        }
                    }
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
                            if(tep1 && tep2){
                                var temp;
                                temp = tep1[attrName];
                                tep1[attrName] = tep2[attrName];
                                tep2[attrName] = temp;
                            }
                        }
                    }
                }],
                templateUrl: 'myModalContent.html',
                size:'lg'
            });
        };

    }]);
}(angular.module('backStage')));