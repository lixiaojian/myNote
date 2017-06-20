/**
 * Created by xiaojianli on 2017/5/31.
 */

class MVVM{
    constructor(config={}){
        this.config = config
        this._data = config.data;
        // 数据代理
        // 实现 vm.xxx -> vm._data.xxx
        Object.keys(this._data).forEach( key => {
            this._proxyData(key);
        });

        observe(this._data);
        this.$compile = new Compile(config.el || document.body, this)
    }
    $watch(key,cb){
        new Watcher(this, key, cb);
    }
    _proxyData(key){
        Object.defineProperty(this, key, {
            configurable: false,
            enumerable: true,
            get: () => {
                return this._data[key];
            },
            set: (newVal) => {
                this._data[key] = newVal;
            }
        });
    }
}