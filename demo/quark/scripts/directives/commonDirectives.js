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
                model: '=',
                filetype:'@'
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
                            {{title}} </span> \
                    </div> \
                </div>',
            link: function linkFun(scope) {
                // 文件上传实现
                scope.fileChange = function ($files) {
                    //暂时只支持单张图片上传
                    var fileType = $files[0].type;
                    if(scope.filetype){
                        var alowTypes = scope.filetype.split(',');
                        var flag = false;
                        angular.forEach(alowTypes,function(item){
                            if(item.toLowerCase() == 'png'){
                                if(fileType.toLowerCase() == 'image/png'){
                                    flag = true;
                                }
                            }else if(item.toLowerCase() == 'jpg' || item.toLowerCase() == 'jpeg'){
                                if(fileType.toLowerCase() == 'image/jpeg'){
                                    flag = true;
                                }
                            }
                        });
                        if(!flag){
                            alert('文件类型不正确，请重新选择');
                            return;
                        }
                    }
                    scope.upload = $upload.upload({
                        //上传地址
                        url: 'upload',
                        //url: 'data/fileUpload.json',
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
                                scope.model = data.resInfo[i].savePath?data.resInfo[i].savePath+data.resInfo[i].saveName:'';
                            }
                        } else {
                            alert('上传失败');
                        }
                    }).error(function () {
                        scope.progressing = false;
                        alert('上传失败');
                    });
                };
            }
        }
    }])
}(angular.module('backStage')));