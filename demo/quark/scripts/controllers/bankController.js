/**
 * Created by lixj(872458899@qq.com) on 15/7/1.
 */
;(function(app){
    app.controller('bankCtr',['$scope','$modal','bankService',function($scope,$modal,bankService){
        $scope.modileTitle = '银行信息';

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
        if(!$scope.banks){
            bankService.findAllBank({},function(data){
                $scope.banks = data;
            })
        }
        $scope.searchBank={
            id:''
        };
        //翻页
        $scope.changePage = function(){
            $scope.searchBank.start = ($scope.page.curPage-1)*$scope.page.itemsPerPage;
            $scope.searchBank.length = $scope.page.itemsPerPage;
            bankService.search($scope.searchBank,function(data){
                $scope.bankList=data.recordList;
                $scope.page.totalItems = data.iTotalRecords;
                $scope.page.itemsPerPage = data.pageSize;
            });
        };
        //删除
        $scope.delete = function(bank,index,content){
            $modal.open({
                animation: true,
                templateUrl: 'views/templates/deleteConfirm.html',
                size:'sm',
                controller: ['$scope','$modalInstance',function(scope, $modalInstance){
                    //弹出框内容
                    scope.alertContent = content || '您确定要删除该条记录吗？';
                    //是否是确认框
                    scope.isConfirm = true;
                    //点击确定
                    scope.ok = function (){
                        bankService.deleteBank(bank,function(data){
                            if('0000' === data.resCode){
                                $modalInstance.close();
                                $scope.bankList.splice(index,1);
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
        $scope.changePage();

        $scope.search = function(){
            $scope.page.curPage = 1;
            $scope.changePage();
        };

        $scope.bankDetail = function(id){
            $modal.open({
                animation: true,
                templateUrl: 'addBank.html',
                size:'lg',
                controller: ['$scope','$modalInstance',function($scope, $modalInstance){

                    if(id){
                        bankService.findById({id:id},function(data){
                            $scope.curBank = data.resInfo;
                        })
                    }else{
                        $scope.curBank={
                            payWays:[{}]
                        };
                    }
                    //添加支付
                    $scope.addBpay=function(){
                        $scope.curBank.payWays.push({});
                    };
                    //删除支付
                    $scope.removeBpay = function(index){
                        $scope.curBank.payWays.splice(index,1);
                    };
                    //点击确定
                    $scope.ok = function (valid) {
                        var payWays = $scope.curBank.payWays;
                        var numberReg = /^[0-9]+(.[0-9]{1,6})?$/;
                        if(!$scope.curBank.bankName){
                            alert('请输入银行名称');
                            return;
                        };
                        if(!$scope.curBank.bankSerial){
                            alert('请输入银行编码');
                            return;
                        };
                        if(!$scope.curBank.hotLine){
                            alert('请输入客服热线');
                            return;
                        };
                        for(var i=0;i<payWays.length;i++){
                            var item = payWays[i];
                            if(!item.payWay){
                                alert('请选择支付方式');
                                return;
                            };
                            if(!item.dealsLimitDescribe){
                                alert('请输入单笔限额');
                                return;
                            };
                            if(!numberReg.test(item.dealsLimitDescribe)){
                                alert('单笔限额格式不正确');
                                return;
                            }
                            if(!item.limitDescribe){
                                alert('请输入每日限额');
                                return;
                            };
                            if(!numberReg.test(item.limitDescribe)){
                                alert('每日限额格式不正确');
                                return;
                            }
                            for(var j = i+1; j<payWays.length; j++){
                            	var itemB = payWays[j];
                            	if(item.payWay == itemB.payWay){
                            		 alert('支付方式不能重复');
                                     return;
                            	}
                            }
                        }

                        bankService.updateBank($scope.curBank,function(data){
                            if('0000' === data.resCode){
                                $modalInstance.close();
                                location.reload();
                            }else{
                            	alert(data.resMsg);
                            }
                        })
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