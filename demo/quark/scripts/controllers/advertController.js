/**
 * Created by lixj(872458899@qq.com) on 15/7/1.
 */
;(function(app){
    app.controller('adCtr',['$scope','$modal','adService','$filter',function($scope,$modal,adService,$filter){
        $scope.modileTitle = '广告管理';

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
        $scope.searchAd={
            channelCode:'',
            adPostion:''
        }
        function search(){
            adService.search($scope.searchAd,function(data){
                $scope.adList=data.recordList;
                $scope.page.totalItems = data.iTotalRecords;
                $scope.page.itemsPerPage = data.pageSize;
            });
        };
        //翻页
        $scope.changePage = function(){
            $scope.searchAd.start = ($scope.page.curPage-1)*$scope.page.itemsPerPage;
            $scope.searchAd.length = $scope.page.itemsPerPage;
            search();
        };
        $scope.changePage();
        //搜索
        $scope.search = function(){
            $scope.searchAd.start = 0;
            search();
        };


        $scope.bannerDetail = function(type,id){

            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'bannerDetail.html',
                size:'lg',
                controller: ['$scope','$modalInstance',function($scope, $modalInstance){
                    $scope.curAd={
                        picList:[{}]
                    };
                    if(id){
                        adService.findById({id:id},function(data){
                            $scope.curAd=data.resInfo;
                            if(!$scope.curAd.picList || $scope.curAd.picList.length===0){
                                $scope.curAd.picList = [{}];
                            }
                            $scope.curAd.picList = $filter('orderBy')($scope.curAd.picList,'adOrder');
                        });
                    };
                    if('select' === type){
                        $scope.disabled = true;
                    }else{
                        $scope.disabled = false;
                    }
                    if('add' === type){
                        $scope.isNew = true;
                    }
                    //点击确定
                    $scope.ok = function () {
                        if(!$scope.curAd.adPostion){
                            alert('请选择广告类型');
                            return;
                        };
                        if(!$scope.curAd.channelCode){
                            alert('请选择发布渠道');
                            return;
                        };
                        if(!$scope.curAd.adVersionCode){
                            alert('请输入版本号');
                            return;
                        };
                        if(!$scope.curAd.adAdvertState){
                            alert('请选择广告状态');
                            return;
                        };

                        for(var i=0;i<$scope.curAd.picList.length;i++){
                            if(!$scope.curAd.picList[i].adContent){
                                alert('请上传广告图片');
                                return;
                            }
                        };
                        adService.saveAd($scope.curAd,function(data){
                            if('0000' === data.resCode){
                                $modalInstance.close();
                                location.reload();
                            }else{
                            	alert(data.resMsg);
                            }
                        });

                    };
                    //点击取消
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    //添加广告图片
                    $scope.addImg = function(){
                        $scope.curAd.picList.push({});
                    };
                    //删除广告图片
                    $scope.removeImg = function(index){
                        $scope.curAd.picList.splice(index,1);
                    };
                    $scope.upOrDown = function(item,self){
                        if(item && self){
                            var temp = item.adOrder;
                            item.adOrder = self.adOrder;
                            self.adOrder = temp;
                            $scope.curAd.picList = $filter('orderBy')($scope.curAd.picList,'adOrder');
                        }
                    };
                }]
            });
        };
        //删除广告
        $scope.deleteAd = function(id,index,state){
            $modal.open({
                animation: true,
                templateUrl: 'views/templates/deleteConfirm.html',
                size:'sm',
                controller: ['$scope','$modalInstance',function(scope, $modalInstance){
                    if(0==state){
                        //弹出框内容
                        scope.alertContent = '此广告不能删除！';
                        //是否是确认框
                        scope.isConfirm = false;
                        //点击确定
                        scope.ok = function (){
                            $modalInstance.dismiss('cancel');
                        };
                    }else{
                        //弹出框内容
                        scope.alertContent = '您确定要删除该条记录吗？';
                        //是否是确认框
                        scope.isConfirm = true;
                        //点击确定
                        scope.ok = function (){
                            adService.deleteAd({id:id},function(data){
                                if('0000' === data.resCode){
                                    $scope.adList.splice(index,1);
                                    $modalInstance.dismiss('cancel');
                                }
                            });
                        };
                    }

                    //点击取消
                    scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });
        };
    }]);
}(angular.module('backStage')));