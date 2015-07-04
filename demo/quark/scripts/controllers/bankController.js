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
        if(!$scope.banks){
            bankService.findAllBank({},function(data){
                $scope.banks = data;
            })
        }
        $scope.searchBank={
            start:($scope.page.curPage-1)*$scope.page.itemsPerPage,
            length:$scope.page.itemsPerPage,
            id:''
        };
        //翻页
        $scope.changePage = function(){
            bankService.search($scope.searchBank,function(data){
                $scope.bankList=data.recordList;
                $scope.page.totalItems = data.iTotalRecords;
                $scope.page.itemsPerPage = data.pageSize;
            });
        };

        bankService.search({},function(data){
            $scope.bankList = data.recordList;
            $scope.page.totalItems = data.iTotalRecords;
            $scope.page.itemsPerPage = data.pageSize;
        });

        $scope.search = function(){
            $scope.page.curPage = 1;
            bankService.search($scope.searchBank,function(data){
                $scope.bankList=data.recordList;
                $scope.page.totalItems = data.iTotalRecords;
                $scope.page.itemsPerPage = data.pageSize;
            });
        };

        $scope.bankDetail = function(){
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'addBank.html',
                size:'lg',
                controller: ['$scope','$modalInstance',function($scope, $modalInstance){
                    $scope.bpays=[{}];
                    //添加支付
                    $scope.addBpay=function(){
                        $scope.bpays.push({});
                    };
                    //删除支付
                    $scope.removeBpay = function(index){
                        $scope.bpays.splice(index,1);
                    };
                    //点击确定
                    $scope.ok = function () {
                        $modalInstance.close();
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