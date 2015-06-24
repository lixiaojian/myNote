/**
 * Created by lixj(872458899@qq.com) on 15/6/24.
 */
;(function(app){
    app.controller('jsglCtr',['$scope',function($scope){
        $scope.modileTitle='角色管理';
        $scope.datas = [
            {
                id:1,
                roleName:'管理员',
                roleDesc:'具有最高权限',
                updateTime:'2015-04-21  11:00',
                updater:'dongxiaoli'
            },
            {
                id:2,
                roleName:'运营',
                roleDesc:'XXXXXXXX',
                updateTime:'2015-04-21  11:00',
                updater:'dongxiaoli'
            },
            {
                id:3,
                roleName:'产品',
                roleDesc:'XXXXXXXXXXX',
                updateTime:'2015-04-21  09:00',
                updater:'dongxiaoli'
            },
        ]
    }]);
}(angular.module('backStage')));