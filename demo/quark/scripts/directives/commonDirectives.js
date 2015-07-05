/**
 * Created by lixj(872458899@qq.com) on 15/6/27.
 */
;(function(app){
    //文件上传
    app.directive('inputFile', ['$upload', function ($upload) {
        return {
            restrict: 'EA',
            scope: {
                title: '@',
                model: '='
            },
            replace: true,
            template: '\
                <div class="form-group""> \
                    <div ng-show="progressing" class="progress progress-striped active">\
                        <div class="progress-bar progress-bar-info" role="progressbar" style="width: {{progress}}%">\
                            <span>{{progress}}%</span>\
                        </div>\
                    </div>\
                    <div ng-show="!progressing" class="input-group">\
                        <span class="btn btn-default" data-ng-file-change="fileChange($files)" ng-file-select>\
                            <i class="glyphicon glyphicon-upload"></i> 上传{{title}} </span> \
                    </div> \
                </div>',
            link: function linkFun(scope) {
                // 文件上传实现
                scope.fileChange = function ($files) {
                    scope.upload = $upload.upload({
                        //上传地址
                        url: 'data/fileUpload.json',
                        method: 'POST',
                        withCredentials: true,
                        data: {},
                        file: $files
                    }).progress(function(evt) {
                        scope.progressing = true;
                        scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                    }).success(function(data) {
                        scope.progressing = false;
                        if('0000'==data.resCode) {
                            for(var i=0; i<data.resInfo.length; i++) {
                                scope.model = data.resInfo[i].savePath?data.resInfo[i].savePath:'';
                            }
                        } else {
                            console.log('上传失败')
                        }
                    }).error(function () {
                        scope.progressing = false;
                        console.log('上败');
                    });
                };
            }
        }
    }])
}(angular.module('backStage')));