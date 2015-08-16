/**
 * Created by lixj(872458899@qq.com) on 15/7/1.
 */
;(function(app){
    app.controller('cardVolumeCtr',['$scope','$modal','cardVolumeService','$stateParams',function($scope,$modal,cardVolumeService,$stateParams){
        $scope.modileTitle = '用户卡券查询';
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
        $scope.searchCV={
            start:0,
            length:$scope.page.itemsPerPage
        }
        function search(){
            cardVolumeService.search($scope.searchCV,function(data){
                $scope.cardVolumes = data.recordList;
                $scope.page.totalItems = data.iTotalRecords;
                $scope.page.itemsPerPage = data.pageSize;
            });
        }
        $scope.search = function(){
            $scope.searchCV.start = 0;
            search();
        }
        $scope.changePage = function(){
            $scope.searchCV.start = ($scope.page.curPage-1)*$scope.page.itemsPerPage;
            search();
        };
        /**
         * 详情
         * @param userNo
         */
            //分页
        $scope.depage = {
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
        $scope.searchde={
            start:0,
            length:$scope.depage.itemsPerPage,
            userNo:$stateParams.id
        }
        function searchDe(){
            cardVolumeService.findDetail($scope.searchde,function(data){
                $scope.cardVolumeDetails = data.recordList;
                $scope.depage.totalItems = data.iTotalRecords;
                $scope.depage.itemsPerPage = data.pageSize;
            });
        }
        if(!$stateParams.id){
            search();
        }else{
            searchDe();
        }
        $scope.changeDePage = function(){
            $scope.searchde.start = ($scope.depage.curPage-1)*$scope.depage.itemsPerPage;
            searchDe();
        };

    }]);
}(angular.module('backStage')));