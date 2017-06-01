/**
 * Created by xiaojianli on 2017/5/25.
 */

class Observer{
    constructor(obj,onchange){
        if(typeof obj !== 'object'){
            throw new Error(`监听参数的类型必须是对象，但是您传入的 ${obj} 是 ${typeof obj}`)
        }
        this.onchange = onchange
        //如果是数组
        if(Array.isArray(obj)){
            this.watchArray(obj)
        }else{
            var keys = Object.keys(obj);
            keys.map(key => {
                this.watchObj(obj,key,obj[key])
            })
        }
    }

    watchObj(obj,key,value){
        if(typeof value === 'object'){
            new Observer(value,this.onchange)
        }else{
            Object.defineProperty(obj,key,{
                get: () => {
                    console.log(`你要获取 ${key} 的值`);
                    return value;
                },
                set: (newVal) => {
                    console.log(`你给 ${key} 赋值为 ${newVal}`);
                    value = newVal
                    this.onchange();
                }
            })
        }
    }

    watchArray(array){
        const arrayMethod = ['push','pop','shift','unshift','reverse','splice','sort'];
        const tempArr = [];
        arrayMethod.map(method => {
            const oldMethod = Array.prototype[method];
            tempArr[method] = (param) =>{
                console.log('数组的值改变了')
                const newMethod = oldMethod.call(array,param);
                this.onchange();
                return newMethod;
            }
        })
        array.__proto__ = tempArr;
    }
}