function Observer(data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk: function(data) {
        var me = this;
        Object.keys(data).forEach(function(key) {
            me.defineReactive(me.data,key, data[key]);
        });
    },
    defineReactive: function(data, key, val) {
        var dep = new Dep();
        //处理val是对象的情况
        var childObj = observe(val);

        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });
    }
};

function observe(value) {
    if (!value || typeof value !== 'object') {
        return;
    }

    return new Observer(value);
};


//事件订阅
var uid = 0;
function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(watcher) {
        this.subs.push(watcher);
    },

    depend: function() {
        Dep.target.addDep(this);
    },

    notify: function() {
        this.subs.forEach(function(watcher) {
            watcher.update();
        });
    }
};

Dep.target = null;