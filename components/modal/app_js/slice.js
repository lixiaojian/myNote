/**
 * Created by xiaojianli@pptv.com on 2016/3/18.
 */
var slice = [].slice ? function(nodes,start,end){
    //如果支持原生数组的slice方法就直播用
    return [].slice.call(nodes,start,end)
}:function(nodes,start,end){
    //如果不支持原生数组的slice方法就自己去实现一个
    /**
     *  void 0 === undefined (使用void 0 而不使用undefined是为了防止undefined被重写，据说void 0 比直接写undefined要快)
     *  ie9之前undefined可以被重写
     *
     * @type {Array}
     */
    var ret=[];
    var n = nodes.length;
    //end === void 0 是为了防止没有传入end参数
    if(end === void 0 || typeof end === 'number' && isFinite(end)){
        start = parseInt(start,10) || 0;
        end = end === void 0 ? n : parseInt(end,10);
        if(start < 0){
            start += n;
        }
        if(end > n){
            end = n;
        }
        if(end < 0){
            end += n;
        }
        for(var i = start;i<end;++i){
            ret[i - start] = nodes[i];
        }
    }
    return ret;
};

console.log(slice([1, 3, 2, 4, 3], 2,'4'));