/**
 * Created by 872458899@qq.com on 15-7-19.
 */
;(function(app){
    app.controller('smsCtr',['$scope','$modal','smsService',function($scope,$modal,smsService){
        $scope.modileTitle = '短信管理';
        //短信类型
        $scope.smsTypeList = [{
                value:'0',
                text:'理财成功划扣'
            },
            {
                value:'1',
                text:'理财期满'
            },{
                value:'2',
                text:'短信验证'
            }];

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
        //搜索
        $scope.searchSms = {
            start:0,
            length:$scope.page.itemsPerPage
        };
        //翻页
        $scope.changePage = function(){
            $scope.searchSms.start = ($scope.page.curPage-1)*$scope.page.itemsPerPage;
            $scope.searchSms.length = $scope.page.itemsPerPage;
            changePage();
        }
        function changePage(){
            smsService.search($scope.searchSms,function(data){
                $scope.smsList=data.recordList;
                $scope.page.totalItems = data.iTotalRecords;
                $scope.page.itemsPerPage = data.pageSize;
            })
        }
        changePage();

        $scope.endRegesterTime=null;
        //搜索
        $scope.search = function(){
            $scope.page.curPage=1;
            $scope.searchSms.start=0;
            $scope.searchSms.length=$scope.page.itemsPerPage;
            changePage();
        };
        //删除
        $scope.deleteSms = function(id,index){
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
                        smsService.deleteSms({smsTemplateId:id},function(data){
                            if('0000' === data.resCode){
                                $scope.smsList.splice(index,1);
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
        $scope.modal = function(type,id){
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'smsDetail.html',
                size:'lg',
                controller: ['$scope','$modalInstance',function(scope, $modalInstance){
                    scope.tags=[['{name}','{product}','{money}','{number}'],
                        ['{year}','{month}','{day}','{hour}','{minute}','{second}']];
                    //短信类型
                    scope.smsTypeList = [{
                        value:'0',
                        text:'理财成功划扣'
                        },{
                            value:'1',
                            text:'理财期满'
                        },{
                            value:'2',
                            text:'短信验证'
                        }];
                    scope.appendContent = function(tag){
                        if(scope.disabled){
                            return;
                        }
                        if(!scope.curSms.smsContent){
                            scope.curSms.smsContent = tag;
                        }else{
                            scope.curSms.smsContent += tag;
                        }
                    };
                    scope.curSms = {};
                    if('add' == type){
                        scope.disabled = false;
                    }else if('select' == type){
                        scope.disabled = true;
                    }else{
                        scope.disabled = false;
                    };
                    if(id){
                        smsService.findById({smsTemplateId:id},function(data){
                            scope.curSms = data.resInfo;
                        })
                    };
                    //点击确定
                    scope.ok = function () {
                        smsService.saveSms(scope.curSms,function(){
                            $modalInstance.close();
                            location.reload();
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