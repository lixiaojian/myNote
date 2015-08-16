/**
 * Created by lixj(872458899@qq.com) on 15/7/4.
 */
;(function (app) {
    app.service('bankService', ['$resource',function ($resource) {
        var url = '';
        var actions = {
            //搜索产品
            search:{
                url:'bank',
                //url:'data/bankList.json',
                method:'get'
            },
            //获取所有银行列表
            findAllBank:{
                url:'bank/getAll',
                //url:'data/banks.json',
                method:'get',
                isArray:true
            },
            //添加银行
            saveBank:{
                url:'bank/add',
                method:'post'
            },
            //修改银行
            updateBank:{
                url:'bank/update',
                method:'put'
            },
            //通过id查询
            findById:{
                url:'bank/getDetail',
                //url:'data/bankDetail.json',
                method:'get'
            },
            //删除银行
            deleteBank:{
                url:'bank/del',
                method:'put'
            }
        };
        return $resource(url,{},actions);
    }]);
}(angular.module('backStage')));