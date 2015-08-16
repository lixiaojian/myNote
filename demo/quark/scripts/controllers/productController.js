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
        //搜索时的参数
        $scope.searchProduct = {
            start:($scope.page.curPage-1)*$scope.page.itemsPerPage,
            length:$scope.page.itemsPerPage,
            raiseState:''
        };
        //翻页
        $scope.changePage = function(){
            $scope.searchProduct.start = ($scope.page.curPage-1)*$scope.page.itemsPerPage;
            $scope.searchProduct.length = $scope.page.itemsPerPage;
            productService.search($scope.searchProduct,function(data){
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

        //搜索产品
        $scope.search = function(){
            if($scope.searchProduct.upTime){
                $scope.searchProduct.upTime = $filter('date')($scope.searchProduct.upTime,'yyyy-MM-dd');
            }
            if($scope.searchProduct.downTime){
                $scope.searchProduct.downTime = $filter('date')($scope.searchProduct.downTime,'yyyy-MM-dd');
            }
            //将日期转成字符串提交
            productService.search($scope.searchProduct,function(data){
                $scope.datas=data.recordList;
                $scope.page.totalItems = data.iTotalRecords;
                $scope.page.itemsPerPage = data.pageSize;
            });
        };
        //导入产品
        $scope.import = function(){
            $scope.isImport = true;
            productService.import({},function(data){
                $scope.isImport = false;
                alert(data.resMsg);
            })
        };
        //弹出产品排序层
        $scope.openNew = function(){
            $modal.open({
                animation: true,
                controller: ['$scope','$modalInstance','$timeout','$filter',function(scope, $modalInstance,$timeout,$filter){
                    scope.filterName = '100001';
                    scope.optionsData = [
                        {
                            value:'100001',
                            name:'APP'
                        },
                        {
                            value:'100002',
                            name:'微信'
                        },{
                            value:'100003',
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
                            }else if('center' === po){
                                //左边添加到右边
                                canClick = true;
                                //先判断是不是已包含
                                for(var i=0;i<scope.productsOrder.goodProducts.length;i++){
                                    if(curLeftProduct.pid == scope.productsOrder.goodProducts[i].pid){
                                        return;
                                    }
                                }
                                scope.productsOrder.goodProducts.push(curLeftProduct);
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
                        //else if(curRightProduct.raiseState == '0'){
                        //    alert('此产品状态为募集中，不能删除');
                        //    return;
                        //}
                        var cid = curRightProduct.pid;
                        var gp = scope.productsOrder.goodProducts;

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
                        var preId = dataset.pre;
                        //后面一个的ID
                        var nextId = dataset.next;
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
                    var now = new Date();
                    scope.time={
                        upTime:now,
                        startTime:now
                    };
                    scope.de={};
                    productService.findAllPro({},function(data){
                        scope.protocols =data;
                    })

                    //日历相关
                    scope.bopen = function($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        scope.de.showB = !scope.de.showB;
                    };
                    scope.eopen = function($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        scope.de.showE = !scope.de.showE;
                    };
                    scope.format = 'yyyy-MM-dd';

                    //点击确定
                    scope.ok = function () {
                        var hasChannel = false;
                        if(scope.product){
                            for(var i=0;i<scope.product.channel.length;i++){
                                var item = scope.product.channel[i];
                                if(item.channelCode){
                                    hasChannel = true;
                                    if('100001' == item.channelCode){
                                        if(!scope.product.channel[0].descnUrl){
                                            alert('发布渠道APP信息不完整！');
                                            return;
                                        }
                                    }else if('100002' == item.channelCode){
                                        if(!scope.product.channel[1].prjDescn || !scope.product.channel[1].guarDescn){
                                            alert('发布渠道微信信息不完整！');
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        if(!hasChannel){
                            alert('发布渠道不能为空');
                            return;
                        }
                        //更新产品
                        if(scope.product.raiseState==1 || scope.product.raiseState==0){
                            var update1 = new Date();
                            if(scope.time.update){
                                update1=new Date(scope.time.update);
                            }
                            scope.time.upTime = new Date(scope.time.upTime);
                            scope.product.upTime = scope.time.upTime.getTime();
                        }
                        if(scope.product.downTime){
                            scope.product.downTime = new Date(scope.product.downTime).getTime();
                        }

                        if(scope.product.raiseState==1){
                            var update2 = new Date();
                            if(scope.time.startDate){
                                update2 = new Date(scope.time.startDate);
                            }
                            scope.time.startTime = new Date(scope.time.startTime);
                            scope.product.raiseStartingTime = update2.getTime();
                        }
                        //下架时间
                        var down = new Date(scope.product.downTime).getTime();
                        //募集开始时间
                        var beg = new Date(scope.product.raiseStartingTime).getTime();
                        //上架时间
                        var up = new Date(scope.product.upTime).getTime();//对应后台募集开始时间
                        //募集完成时间
                        var end = new Date(scope.product.raiseEndingTime).getTime();

                        if(scope.product.productTypeId == null || scope.product.productTypeId=='' || scope.product.productTypeId==-1){
                            alert('请选择产品类型');
                            return;
                        };
                        if(!scope.product.lowestAmt){
                            alert('请输入起投金额');
                            return;
                        };
                        //if(!scope.product.raiseStartingTime){
                        //    alert('请输入募集开始时间');//对应后台的uptime
                        //    return;
                        //};
                        if(!scope.product.accumulateAmt){
                            alert('请输入递增金额');
                            return;
                        };
                        if(scope.product.raiseState == null || scope.product.raiseState==''){
                            alert('请选择产品状态');
                            return;
                        };
                        if(!scope.product.raiseLine){
                            alert('请输入募集完成线');
                            return;
                        };
                        if(!scope.product.contractPath){
                            alert('请输入合同协议路径');
                            return;
                        };
                        if(!scope.product.guarType){
                            alert('请输入风险补偿金');
                            return;
                        };
                        if(!scope.product.boughtWard){
                            alert('请输入出借咨询服务费');
                            return;
                        };
                        if(!scope.product.superviseOrg){
                            alert('请输入资金监管机构');
                            return;
                        };

                        if(!scope.product.intStartType){
                            alert('请输入起息日说明');
                            return;
                        };
                        if(!scope.product.repaymentType){
                            alert('请输入还款方式');
                            return;
                        };
                        if(!scope.product.qiutDescribe){
                            alert('请输入退出方式');
                            return;
                        };
                        if(!scope.product.repatmentDescribe){
                            alert('请输入资金回款');
                            return;
                        };
                        if(scope.product.channel[0].channelCode && !scope.product.channel[0].descnUrl){
                            alert('请输入APP项目描述+资金保障');
                            return;
                        };
                        if(scope.product.channel[1].channelCode){
                            if(!scope.product.channel[1].prjDescn){
                                alert('请输入微信项目描述');
                                return;
                            };
                            if(!scope.product.channel[1].guarDescn){
                                alert('请输入微信资金保障');
                                return;
                            };

                        };
                        scope.product.raiseEndingTime=end;
                        if(scope.product.raiseStartingTime || scope.time.startDate){
                            var t3 = scope.time.startDate || scope.product.raiseStartingTime;
                            var t1 = new Date(t3);
                            t1.setMinutes(scope.time.startTime.getMinutes());
                            t1.setSeconds(0);
                            t1.setHours(scope.time.startTime.getHours());
                            scope.product.raiseStartingTime = t1.getTime();
                        }
                        if(scope.product.upTime || scope.time.update){
                            var t4 = scope.time.update || scope.product.upTime;
                            var t2 = new Date(t4);
                            t2.setHours(scope.time.upTime.getHours());
                            t2.setMinutes(scope.time.upTime.getMinutes());
                            t2.setSeconds(0);
                            scope.product.upTime = t2.getTime();
                        }
                        productService.update(scope.product,function(data){
                            alert(data.resMsg);
                            if('0000' == data.resCode){
                                $modalInstance.close();
                                angular.forEach(scope.product.productTypeList,function(item){
                                    if(scope.product.productTypeId == item.productTypeId){
                                        scope.product.productTypeName = item.productTypeName;    
                                    }
                                });                                
                                //更新页面数据
                                if(scope.product.pid){
                                    for(var i=0;i<$scope.datas.length;i++){
                                        if($scope.datas[i].pid === scope.product.pid){
                                            $scope.datas[i] = scope.product;
                                            return;
                                        }
                                    }
                                }
                            }
                        });
                    };
                    //scope.$watch('product.upTime',function(newVal,oldVal){
                    //    if(newVal!=oldVal && newVal){
                    //        scope.product.upTime = $filter('date')(scope.product.upTime,'yyyy-MM-dd HH:mm:ss');
                    //    }
                    //});
                    //点击取消
                    scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    scope.product={};
                    //获取产品详情
                    productService.findById({pid:id},function(data){
                        scope.product = data.resInfo;
                        scope.product.productTypeId = scope.product.productTypeId?scope.product.productTypeId:'0';
                        if(scope.product){
                            scope.product.upTime = $filter('date')(scope.product.upTime,'yyyy-MM-dd HH:mm:ss');
                            scope.product.downTime = $filter('date')(scope.product.downTime,'yyyy-MM-dd HH:mm:ss');
                            scope.product.raiseStartingTime = $filter('date')(scope.product.raiseStartingTime,'yyyy-MM-dd HH:mm:ss');
                            scope.product.raiseEndingTime = $filter('date')(scope.product.raiseEndingTime,'yyyy-MM-dd HH:mm:ss');
                            scope.product.productProp = scope.product.productProp?scope.product.productProp:0;
                        }
                        //重新处理一下产品渠道
                        var channel = scope.product.channel?scope.product.channel:[];
                        var newChannel = [];
                        for(var i=0;i<channel.length;i++){
                            var c = channel[i];
                            if(channel[i].channelCode == '100001'){
                                newChannel[0] = c;
                            }else if(c.channelCode == '100002'){
                                newChannel[1] = c;
                            }else if(c.channelCode == '100003'){
                                newChannel[2] = c;
                            }
                        }
                        scope.product.channel = newChannel;
                        for(var i=0;i<3;i++){
                            scope.product.channel[i]=scope.product.channel[i] || {};
                            scope.product.channel[i].subsidyRate = scope.product.channel[i].subsidyRate || 0;
                        }
                        var updateTime = $filter('date')(scope.product.upTime,'yyyy-MM-dd HH:mm:ss');
                        if(updateTime){
                            scope.time.update = updateTime.substring(0,10);
                            scope.time.upTime = new Date(updateTime);
                        }
                        var startDateTime = $filter('date')(scope.product.raiseStartingTime,'yyyy-MM-dd HH:mm:ss');
                        if(startDateTime){
                            scope.time.startDate = startDateTime.substring(0,10);
                            scope.time.startTime = new Date(startDateTime);
                        }
                        scope.currraiseState = angular.copy(scope.product.raiseState);
                        scope.time.currUptime = angular.copy(scope.product.upTime);
                        scope.time.currDowntime = angular.copy(scope.product.downTime);
                        scope.time.currRaiseStartingTime = angular.copy(scope.product.raiseStartingTime);
                        scope.time.currRaiseEndingTime = angular.copy(scope.product.raiseEndingTime);

                        scope.product.contractPath = scope.product.contractPath?scope.product.contractPath:'';
                        scope.product.displayParameter1 = scope.product.displayParameter1?scope.product.displayParameter1:'期限短';
                        scope.product.displayParameter3 = scope.product.displayParameter3?scope.product.displayParameter3:'零费用';
                    });
                    if('select' === type){
                        scope.disabled = true;
                    }else{
                        scope.disabled = false;
                    }
                    scope.$watch('product.lowestAmt',function(newVal,oldVale){
                        if(newVal != oldVale){
                            scope.product.displayParameter2 = newVal+'元起投';
                        }
                    });

                    //scope.$watch('time.startDate',function(newVal,oldVale){
                    //    if(newVal){
                    //        scope.product.raiseStartingTime = newVal;
                    //    }
                    //});
                    //scope.$watch('time.update',function(newVal,oldVale){
                    //    if(newVal){
                    //        scope.product.upTime = newVal;
                    //    }
                    //});

                    scope.$watch('product.raiseState',function(newVal,oldVale){
                        if(oldVale != undefined){
                            if(newVal==='0'){
                                //已上架
                                scope.product.upTime = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                                scope.time.upTime = scope.product.upTime;
                                scope.time.update = scope.product.upTime;
                                scope.product.raiseStartingTime = scope.time.currRaiseStartingTime;
                                scope.product.downTime = scope.time.currDowntime;
                                scope.product.raiseEndingTime = scope.time.currRaiseEndingTime;
                            }else if(newVal === '1'){
                                //募集中
                                scope.product.raiseStartingTime = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                                scope.product.upTime = scope.product.raiseStartingTime;
                                scope.time.startTime = scope.product.raiseStartingTime;
                                scope.time.startDate = scope.product.raiseStartingTime;
                                scope.time.upTime = scope.product.raiseStartingTime;
                                scope.time.update = scope.product.raiseStartingTime;
                                scope.product.downTime = scope.time.currDowntime;
                                scope.product.raiseEndingTime = scope.time.currRaiseEndingTime;

                            }else if(newVal ==='2'){
                                //募集完成
                                scope.product.raiseEndingTime = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                                scope.product.raiseStartingTime = scope.time.currRaiseStartingTime;
                                scope.product.upTime = scope.time.currUptime;
                                scope.product.downTime = scope.time.currDowntime;
                            }else if(newVal === '4'){
                                //已下架
                                scope.product.downTime = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                                scope.product.raiseStartingTime = scope.time.currRaiseStartingTime;
                                scope.product.upTime = scope.time.currUptime;
                                scope.product.raiseEndingTime = scope.time.currRaiseEndingTime;
                            }else{
                                //初始化
                                scope.product.raiseEndingTime = scope.time.currRaiseEndingTime;
                                scope.product.raiseStartingTime = scope.time.currRaiseStartingTime;
                                scope.product.upTime = scope.time.currUptime;
                                scope.product.downTime = scope.time.currDowntime;
                            }
                        }
                    });

                }],
                templateUrl: 'views/templates/glkzt/product/productDetail.html',
                size:'lg'
            });
        };

    }]);
}(angular.module('backStage')));