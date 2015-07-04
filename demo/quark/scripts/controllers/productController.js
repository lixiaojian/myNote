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
            productService.search({start:($scope.page.curPage-1)*$scope.page.itemsPerPage,length:$scope.page.itemsPerPage},function(data){
                $scope.datas=data.recordList;
                $scope.page.totalItems = data.iTotalRecords;
                $scope.page.itemsPerPage = data.pageSize;
            });
        };
        //全部数据
        productService.search({},function(data){
            $scope.datas=data.recordList;
            $scope.page.totalItems = data.iTotalRecords;
            $scope.page.itemsPerPage = data.pageSize;
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
                $scope.datas=data.recordList;
                $scope.page.totalItems = data.iTotalRecords;
                $scope.page.itemsPerPage = data.pageSize;
            });
        };

        //弹出产品排序层
        $scope.openNew = function(){
            $modal.open({
                animation: true,
                controller: ['$scope','$modalInstance','$timeout','$filter',function(scope, $modalInstance,$timeout,$filter){
                    scope.filterName = 'app';
                    scope.optionsData = [
                        {
                            value:'app',
                            name:'APP'
                        },
                        {
                            value:'wx',
                            name:'微信'
                        },{
                            value:'pc',
                            name:'PC'
                        }

                    ];
                    //获取排序的产品列表
                    if(!scope.productsOrder){
                        productService.getOrders({channelCode:scope.filterName},function(data){
                            if('0000' === data.resCode){
                                scope.productsOrder = data.resInfo;
                                //排序
                                scope.productsOrder.allProducts = $filter('orderBy')(scope.productsOrder.allProducts,'priority');
                                //scope.productsOrder.goodProduct = scope.productsOrder.goodProduct;
                            }

                        })
                    }
                    //重新获取产品列表
                    scope.filterApps = function(){
                        productService.getOrders({channelCode:scope.filterName},function(data){
                            if('0000' === data.resCode){
                                scope.productsOrder = data.resInfo;
                                //排序
                                scope.productsOrder.allProducts = $filter('orderBy')(scope.productsOrder.allProducts,'priority');
                                //scope.productsOrder.goodProduct = scope.productsOrder.goodProduct;
                            }

                        })
                    };
                    //点击确定
                    scope.ok = function () {
                        productService.saveOrder(scope.productsOrder,function(data){
                            if('0000' === data.resCode){
                                $modalInstance.close();
                            }
                        })
                    };
                    //点击取消
                    scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    //当前选中的标签
                    var curLeftElement = null;
                   // var curRightElement = null;
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
                                    setOrder(scope.productsOrder.allProducts,scope.leftCurtId,scope.leftPreId,'priority');
                                }else if('down' === ver){
                                    setOrder(scope.productsOrder.allProducts,scope.leftCurtId,scope.leftNextId,'priority');
                                }
                                //更改顺序后重新排序
                                scope.productsOrder.allProducts = $filter('orderBy')(scope.productsOrder.allProducts,'priority');
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
                                //scope.productsOrder.goodProduct = $filter('orderBy')(scope.productsOrder.goodProduct,'orderNumber2');
                            }
                            $timeout(function(){canClick = true;},200);
                        };
                    //设置选中事件
                    scope.setCurr = scope.setCurr || function(t,cur,po){
                            //当前id
                            var curId = cur.pid;
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
                        var cid = curRightProduct.pid;
                        var gp = scope.productsOrder.goodProduct;
                        for(var i=0;i<gp.length;i++){
                            if(gp[i].pid === cid){
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
                                if(arr[i].pid === id1){
                                    tep1 = arr[i];
                                }
                                if(arr[i].pid === id2){
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

        //弹出产品详情层
        $scope.openDetail = function(type,id){
            $modal.open({
                animation: true,
                controller: ['$scope','$modalInstance',function(scope, $modalInstance){
                    //点击确定
                    scope.ok = function () {
                        //更新产品
                        productService.update(scope.product,function(data){
                            $modalInstance.close();
                        });
                    };
                    //点击取消
                    scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    //获取产品详情
                    productService.findById({pid:id},function(data){
                        scope.product = data.resInfo;
                        //重新处理一下产品渠道
                        var channel = scope.product.channel;
                        var newChannel = [];
                        for(var i=0;i<channel.length;i++){
                            if(channel[i].channelCode == 'app'){
                                newChannel[0] = channel[i];
                            }else if(channel[i].channelCode == 'wx'){
                                newChannel[1] = channel[i];
                            }else if(channel[i].channelCode == 'pc'){
                                newChannel[2] = channel[i];
                            }
                        }
                        scope.product.channel = newChannel;
                    });
                    if('select' === type){
                        scope.disabled = true;
                    }else{
                        scope.disabled = false;
                    }

                }],
                templateUrl: 'views/templates/glkzt/product/productDetail.html',
                size:'lg'
            });
        };

    }]);
}(angular.module('backStage')));