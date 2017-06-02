/**
 * Created by xiaojianli on 2017/5/31.
 */

class MVVM{
    constructor(config={}){
        this.config = config
        this._data = config.data;
        observe(this._data);
        this.$compile = new Compile(config.el || document.body, this)
    }
    $watch(key,cb){
        new Watcher(this, key, cb);
    }
}