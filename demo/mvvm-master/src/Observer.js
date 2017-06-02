/**
 * Created by xiaojianli on 2017/5/31.
 */
//事件订阅
let uid = 0;
class Dep {
    // static target = null
    constructor() {
        this.id = uid++;
        this.subs = [];
    }

    addSub(watcher) {
        this.subs.push(watcher);
    }

    notify() {
        this.subs.forEach(watcher => {
            watcher.update();
        });
    }
}
Dep.target = null

class Observer {
    constructor(data) {
        this.data = data
        this.walk(data)
    }

    walk(data) {
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key]);
        });
    }

    defineReactive(data, key, value) {
        var dep = new Dep();
        //处理val是对象的情况
        observe(value);
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: () => {
                if (Dep.target) {
                    Dep.target.addDep(dep);
                }
                return value;
            },
            set: newVal => {
                if (newVal === value) {
                    return;
                }
                value = newVal;
                // 新的值是object的话，进行监听
                observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        })
    }
}

function observe(value) {
    if (!value || typeof value !== 'object') {
        return false
    }
    return new Observer(value)
}