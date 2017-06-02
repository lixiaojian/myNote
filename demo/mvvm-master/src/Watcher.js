/**
 * Created by xiaojianli on 2017/5/31.
 */
class Watcher{
    constructor(vm, exp, cb){
        //属性的监听回调
        this.cb = cb;
        this.vm = vm;
        this.depIds = {};
        //触发属性的getter方法
        this.getter = this.parseGetter(exp);
        this.value = this.get();
    }
    update() {
        var value = this.get();
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    }
    addDep(dep) {
        if (!this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        }
    }
    get() {
        Dep.target = this;
        var value = this.getter.call(this.vm, this.vm);
        Dep.target = null;
        return value;
    }
    //如果监听的是对象属性，就触发该对象属性的所有父级属性的getter方法
    parseGetter(exp) {
        if (/[^\w.$]/.test(exp)) return;
        var exps = exp.split('.');
        return function(obj) {
            for (var i = 0, len = exps.length; i < len; i++) {
                if (!obj) return;
                obj = obj[exps[i]];
            }
            return obj;
        }
    }
}