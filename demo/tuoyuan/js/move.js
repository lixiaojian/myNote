/**
 * Created by 872458899@qq.com on 15/12/20.
 */
;(function(){
    //绑定事件
    function addEvent(el, type, fn){
        if(el.addEventListener){
            el.addEventListener(type, fn, false);
        }else{
            el['e'+fn] = function(){
                fn.call(el,window.event);
            };
            el.attachEvent('on' + type, el['e'+fn]);
        }
    };
    //自定义移动类
    function Bar(parent,x,y,a,b){
        this.uid="move_"+Math.random();
        this.uid = this.uid.replace(".","");
        eval(this.uid+"=this;");
        this._x=x;
        this._y=y;
        this._a=a;
        this._b=b;
        this.items=[];
        this.dxrad=0.0075;
        this.oldDxrad = 0.0075;
        this.parent=parent;
        this.timmer = null;
        this.opacityBase = 50;

    }
    //设置对象位置
    Bar.prototype.setPostion=function(obj,rad){
        obj.style.left=this._a*Math.cos(rad)+this._x+"px";
        obj.style.top=this._b*Math.sin(rad)+this._y+"px";
        if(Math.sin(rad)>0){
            obj.style.zIndex=3;
        }else{
            obj.style.zIndex=2;
        }
    }
    //设定透明度
    Bar.prototype.setAlpha=function(obj,rad){
        var p =(Math.sin(rad) < 0) ? 2*this._a-Math.abs(this._a*Math.cos(rad)) :this._a*Math.abs(Math.cos(rad));
        p =120-this.opacityBase*p/this._a;
        obj.style.filter='alpha(opacity='+p+')';
        obj.style.opacity=p/100;
    }
    //根据轨迹运动
    Bar.prototype.play=function(flag){
        var n = this.items.length;
        var step = 2*Math.PI/n;
        for(var i=0;i<n;i++){
            this.setPostion(this.items[i],step*i+this.dxrad);
            this.setAlpha(this.items[i],step*i+this.dxrad);
        }
        var oldDxrad = this.dxrad;
        this.dxrad=this.dxrad+(0.0075*flag);
        this.timmer = setTimeout(this.uid+".play("+flag+")",30);
        if(Math.abs(this.dxrad - this.oldDxrad) >= step ){
            clearTimeout(this.timmer);
            this.oldDxrad = this.dxrad;
        }
    }
    //生成小球
    Bar.prototype.init=function(imgs){
        for(var i= 1,len=imgs.length;i<=len;i++){
            var obj = imgs[i-1];
            var link =document.createElement('a');
            link.href = obj.url;
            link.className = 'object';
            var img = new Image();
            img.src = obj.img;
            link.appendChild(img);
            this.items[i-1]=link;
            this.setPostion(link,(2*Math.PI*i)/len);
            this.setAlpha(link,2*Math.PI*i/len);
            this.parent.appendChild(link);
        }
        this.play(1)
    };
    var bar = new Bar(document.getElementById('ball_box'),420,350,440,240);
    var imgs=[
        {url:'http://www.baidu.com',img:'images/ball_03.png'},
        {url:'https://www.taobao.com',img:'images/ball_10.png'},
        {url:'http://www.jd.com',img:'images/ball_18.png'},
        {url:'http://www.yixun.com',img:'images/ball_24.png'},
        {url:'http://www.suning.com',img:'images/ball_21.png'},
        {url:'http://www.vip.com',img:'images/ball_14.png'},
        {url:'http://sh.jumei.com',img:'images/ball_06.png'}
    ];
    bar.init(imgs);
    addEvent(document.getElementById('previous_link'),'click',function(){
        bar.play(-1);
    });
    addEvent(document.getElementById('next_link'),'click',function(){
        bar.play(1);
    });
}());