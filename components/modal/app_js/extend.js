/**
 * Created by xiaojianli@pptv.com on 2016/3/18.
 * 对象合并 可以传多个参数 如果最后一个参数是false，则出现同名属性不覆盖
 */
function extend(target,source) {
    var args = [].slice.call(arguments);
    var i =1;
    var key;
    //如果最后一个参数是布尔值，判定是否覆写同名属性
    var ride = typeof args[args.length -1] == 'boolean'?args.pop() : true;
    //处理 $.mix(hash) 的情形
    if(args.length === 1){
        target = !this.window ? this : {};
        i = 0;
    }
    while (source = args[i++]){
        //允许对象糅杂，用户保证都是对象
        for(key in source){
            if(ride || !(key in target)){
                target[key] = source[key];
            }
        }
    }
    return target;
}

console.log(extend({age: 12}, {name: '1234',age:34,student:{name:'22222'}},{class:'333333'}));