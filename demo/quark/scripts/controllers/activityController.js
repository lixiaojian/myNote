/**
 * Created by lixj(872458899@qq.com) on 15/6/28.
 */
;(function(app){
    app.controller('hdglCtr',['$scope','$modal','activityService','$filter','$state',function($scope,$modal,activityService,$filter,$state){
        $scope.modileTitle = '活动查询';
        $scope.modileTitle2 = '新增活动';
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
        $scope.date ={
            now:new Date()
        };
        $scope.date.bopen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.date.bopened = !$scope.date.bopened;
        };
        $scope.date.eopen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.date.eopened = !$scope.date.eopened;
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
        $scope.searchActivity={
            start:0,
            length:$scope.page.itemsPerPage
        }
        function search(){
            if($scope.searchActivity.begDate){
                $scope.searchActivity.begDate = $filter('date')($scope.searchActivity.begDate,'yyyy-MM-dd');
            }
            if($scope.searchActivity.begDate){
                $scope.searchActivity.endDate = $filter('date')($scope.searchActivity.endDate,'yyyy-MM-dd');
            }
            activityService.search($scope.searchActivity,function(data){
                $scope.page.totalItems = data.iTotalRecords;
                $scope.page.itemsPerPage = data.pageSize;
                $scope.datas = data.recordList;
            });
        };
        //查询活动
        if($state.current.url === '/hdcx'){
            search();
        }
        $scope.searchAct = function(){
            $scope.searchActivity.start=0;
            search();
        }
        //翻页
        $scope.changePage = function(){
            $scope.searchActivity.start = ($scope.page.curPage-1)*$scope.page.itemsPerPage;
            search();
        }
        //新增活动领取时间
        $scope.dateTime=[
            "00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00",
            "08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00",
            "16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","23:59"
        ];

        $scope.addCl = function(){
            $scope.cardVolumes.push({});
        };
        $scope.removeCl = function(index,id){
            $scope.cardVolumes.splice(index,1);
        };

        $scope.addClnew = function(item){
            item.push({});
        }
        $scope.removeClnew = function(item,index){
            item.splice(index,1);
        };
        $scope.addNewVol = function(){
            $scope.newActivity.coupons.push({couponsValueList:[{}]});
        }
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

        $scope.date.ybopen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.date.ybopened = !$scope.date.ybopened;
        };
        $scope.date.yeopen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.date.yeopened = !$scope.date.yeopened;
        };

        activityService.getProductTypes({},function(data){
            $scope.productTypes = data;
            //新增活动
            $scope.newActivity={
                mktActivities:{},
                couponsRules:{},
                coupons:[{useCondType:0,reciveCondType:0,couponsType:0,couponsValueList:[{}],productTypes:angular.copy($scope.productTypes)}]
            };
            //新增卡卷属性的重置
            $scope.resetNewCoupon=function(){
                $scope.newActivity.coupons=[{useCondType:0,reciveCondType:-1,couponsType:0,couponsValueList:[{}],productTypes:angular.copy($scope.productTypes)}];
            }
        });
        //计算剩余数量
        $scope.$watch('newActivity.coupons',function(newVal,oldVal){
            if(newVal){
                var changeNum = 0;
                $scope.lastCount  = parseInt($scope.newActivity.couponsRules.totalNum?$scope.newActivity.couponsRules.totalNum:0);
                angular.forEach(newVal,function(item){
                    angular.forEach(item.couponsValueList,function(i){
                        var cnum = i.num?i.num:0;
                        changeNum+=parseInt(cnum);
                        var tempLast = $scope.lastCount;
                        $scope.lastCount -= parseInt(cnum);
                        if($scope.lastCount<0){
                            alert('剩余发行量已不足');
                            i.num = tempLast;
                            return;
                        }
                    });
                });
            }
        },true);
        //新增卡卷规则的重置
        $scope.resetNewActivitie=function(){
            $scope.newActivity.mktActivities={};
        };
        //新增活动的重置
        $scope.resetNewCouponsRule=function(){
            $scope.newActivity.couponsRules={};
        }
        //validateSubmit
        function validateSubmit(activity){
            //活动属性
            var mktActivities = activity.mktActivities;
            //活动名称
            if(!mktActivities.activityName){
                alert('请输入活动名称');
                return false;
            }
            //活动日期
            if(!mktActivities.begDate){
                alert('请输入活动开始日期');
                return false;
            }
            if(!mktActivities.endDate){
                alert('请输入活动结束日期');
                return false;
            }
            //发放渠道
            if(!mktActivities.reciveWays){
                alert('请选择发放渠道');
                return false;
            }
            //卡卷规则
            var couponsRules = activity.couponsRules;
            if(!couponsRules.couponsRuleName){
                alert('请输入卡券名称');
                return false;
            }
            if(!couponsRules.totalNum){
                alert('请输入发行总量');
                return false;
            }
            if(!couponsRules.dailyNum){
                alert('请输入单日最大发行量');
                return false;
            }
            if(!couponsRules.eachNum){
                alert('请输入限领数量');
                return false;
            }
            if(!couponsRules.beginTime || !couponsRules.endTime){
                alert('请选择领取时段');
                return false;
            }

            //卡卷属性
            var coupons = activity.coupons;
            for(var i = 0;i<coupons.length;i++){
                var coupon = coupons[i];
                var couponValueList = coupon.couponsValueList;
                for(var j=0;j<couponValueList.length;j++){
                    if(!couponValueList[j].val || !couponValueList[j].num){
                        alert('卡卷面值信息不完整');
                        return false;
                    }
                }

                if(!coupon.couponsType){
                    alert('请选择卡卷类型');
                    return false;
                }
                if(!coupon.useCondType){
                    alert('请选择使用条件');
                    return false;
                }
                if(coupon.reciveCondType==-1){
                    alert('请选择领取条件');
                    return false;
                }
                if(2==coupon.useCondType){
                    var flag = false;
                    var productTypes = coupon.productTypes;
                    if(productTypes.length == 0){
                        alert('请选择产品类型');
                        return false;
                    }else{
                        for(var j=0;j<productTypes.length;j++){
                            if(productTypes[j].ischecked){
                                flag = true;
                            }
                        }
                    }
                    if(!flag){
                        alert('请选择产品类型');
                        return false;
                    }
                    if(2==coupon.couponsType){
                        if(!coupon.investmentRatio){
                            alert('请输入投资比例');
                            return false;
                        }
                    }
                }
                if(!coupon.onceusing){
                    alert('请选择单次使用量');
                    return false;
                }
                if(!coupon.effectBegDate || !coupon.effectEndDate){
                    alert('请选择卡券有效期');
                    return false;
                }
                if(!coupon.couponsDescription){
                    alert('请输入卡券描述');
                    return false;
                }
            }
            return true;
        }
        //新增活动
        $scope.saveNew=function(){
            var temp = $scope.newActivity.mktActivities.reciveWayArr;
            var tempArr=[];
            angular.forEach(temp,function(val){
                if(val && val.id){
                    tempArr.push(val.id);
                }
            })
            $scope.newActivity.mktActivities.reciveWays = tempArr.join(',');
            if(!validateSubmit($scope.newActivity)){
                return;
            }
            activityService.saveAct($scope.newActivity,function(data){
                if(data.resMsg){
                    alert(data.resMsg);
                }
                if('0000' == data.resCode){
                    $state.go('glkzt.hdcx');
                }
            });
        }

        $scope.deleteAct = function(id,index){
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
                        activityService.deleteAct({activityNo:id},function(data){
                            alert(data.resMsg);
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
        }

        //弹出层
        $scope.modal = function(type,activityNo){
            $modal.open({
                animation: true,
                templateUrl: 'views/templates/glkzt/activity/activityModal.html',
                size:'lg',
                controller: ['$scope','$modalInstance',function(scope, $modalInstance){
                    if('select' === type){
                        scope.isCheck = true;
                    }else{
                        scope.isCheck = false;
                    }
                    var resetData={};
                    var productTypes = [];
                    activityService.findbyId({activityNo:activityNo},function(data){
                        if('0000' === data.resCode){
                            var temp = [];
                            if(data.resInfo.mktActivities.reciveWays){
                                temp = data.resInfo.mktActivities.reciveWays.split(',');
                            }
                            data.resInfo.mktActivities.reciveWays=[];
                            angular.forEach(temp,function(val){
                                if('100001' == val){
                                    data.resInfo.mktActivities.reciveWays[0]={id:'100001'};
                                }else if('100002' == val){
                                    data.resInfo.mktActivities.reciveWays[1]={id:'100002'};
                                }else if('100003' == val){
                                    data.resInfo.mktActivities.reciveWays[2]={id:'100003'};
                                }
                            });
                            scope.curActive = data.resInfo.mktActivities;
                            resetData.curActive = angular.copy(data.resInfo.mktActivities);
                            scope.curCouponsRules = data.resInfo.couponsRules;
                            resetData.curCouponsRules = angular.copy(data.resInfo.couponsRules);
                            scope.curCoupons = data.resInfo.coupons;
                            productTypes = data.resInfo.productTypes;
                            resetData.curCoupons = angular.copy(data.resInfo.coupons);
                            scope.customerCoupons = data.resInfo.customerCoupons;
                        }
                    });

                    //计算剩余数量
                    scope.$watch('curCoupons',function(newVal,oldVal){
                        if(newVal){
                            var changeNum = 0;
                            scope.lastCount  = scope.curCouponsRules.totalNum;
                            angular.forEach(newVal,function(item){
                                angular.forEach(item.couponsValueList,function(i){
                                    var cnum = i.num?i.num:0;
                                    changeNum+=parseInt(cnum);
                                    var tempLast = scope.lastCount;
                                    scope.lastCount -= parseInt(cnum);
                                    if(scope.lastCount<0){
                                        alert('剩余发行量已不足');
                                        i.num = tempLast;
                                        return;
                                    }
                                });
                            });
                        }

                    },true);
                    scope.addCoupons = function(){
                        scope.curCoupons.push({couponsValueList:[{}],productTypes:productTypes});
                        scope.curIndex = scope.curCoupons.length;
                    };
                    scope.curIndex=1;
                    scope.isopen = function(index){
                        return scope.curIndex = index+1;
                    }
                    //点击确定
                    scope.ok = function () {
                        var temp = scope.curActive.reciveWays;
                        var tempArr=[];
                        angular.forEach(temp,function(val){
                            if(val && val.id){
                                tempArr.push(val.id);
                            }
                        })
                        scope.curActive.reciveWays = tempArr.join(',');
                        var da={
                            mktActivities:scope.curActive,
                            couponsRules:scope.curCouponsRules,
                            coupons:scope.curCoupons
                        }
                        if(!validateSubmit(da)){
                            return;
                        }
                        activityService.updateAct(da,function(data){
                            if(data.resMsg){
                                alert(data.resMsg);
                            }
                            if('0000' == data.resCode){
                                $modalInstance.close();
                            }
                        });
                    };
                    //点击取消
                    scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    //重置活动属性
                    scope.resetCurActive = function(){
                        scope.curActive = angular.copy(resetData.curActive);
                    }
                    //重置卡卷规则
                    scope.resetCouponsRule = function(){
                        scope.curCouponsRules = angular.copy(resetData.curCouponsRules);
                    }
                    //重置卡卷属性
                    scope.reset = function(){
                        scope.curCoupons = angular.copy(resetData.curCoupons);
                    }
                    if('select' === type){
                        scope.isCheck = true;
                    }else{
                        scope.isCheck = false;
                    }
                    //选择的时间
                    scope.dateTime=[
                        "00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00",
                        "08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00",
                        "16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","23:59"
                    ];
                    scope.date = {};
                    //日历相关
                    scope.fbopen = function($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        scope.date.fbopened = !scope.date.fbopened;
                    };
                    scope.feopen = function($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        scope.date.feopened = !scope.date.feopened;
                    };
                    scope.format = 'yyyy-MM-dd';
                    //日历相关
                    scope.bopen = function($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        scope.date.bopened = !scope.date.bopened;
                    };
                    scope.eopen = function($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        scope.date.eopened = !scope.date.eopened;
                    };

                    scope.addCl = function(items){
                        items.push({});
                    };
                    scope.removeCl = function(items,index){
                        items.splice(index,1);
                    };
                }]

            });
        }
    }]);
}(angular.module('backStage')));