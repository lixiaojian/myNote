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
        //椭圆中心点x坐标
        this._x=x;
        //椭圆的圆心中心点y坐标
        this._y=y;
        //长轴
        this._a=a;
        //短轴
        this._b=b;
        //移动的小球
        this.items=[];
        //当前的角度参数
        this.dxrad=0.0075;
        //上一次移动的角度参数
        this.oldDxrad = 0.0075;
        //父容器
        this.parent=parent;
        //移动定时器
        this.timmer = null;
        //透明度参数
        this.opacityBase = 50;
        this.currFx = 1;

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
        var type = this.currFx;
        var speed = 0.007;
        if(flag !== undefined){
            type = flag;
            speed = 0.06;
        };
        var me = this;
        var n = me.items.length;
        var step = 2*Math.PI/n;
        for(var i=0;i<n;i++){
            me.setPostion(me.items[i],step*i+me.dxrad);
            me.setAlpha(me.items[i],step*i+me.dxrad);
        }
        me.dxrad=me.dxrad+(speed*type);
        me.timmer = setTimeout(function(){
            me.play(flag);
        },16);
        if(Math.abs(me.dxrad - me.oldDxrad) >= Math.PI && flag !== undefined){
            clearTimeout(me.timmer);
            me.oldDxrad = me.dxrad;
            me.currFx = flag;
        }
    }
    //生成小球
    Bar.prototype.init=function(imgs){
        for(var i= 1,len=imgs.length;i<=len;i++){
            var obj = imgs[i-1];
            var link =document.createElement('a');
            link.href = obj.url;
            link.className = 'object';
            var img = document.createElement('img');
            img.src = obj.img;
            link.appendChild(img);
            this.items[i-1]=link;
            this.setPostion(link,(2*Math.PI*i)/len);
            this.setAlpha(link,2*Math.PI*i/len);
            this.parent.appendChild(link);
        }
        this.play();
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

        bar.play(1);
    });
    addEvent(document.getElementById('next_link'),'click',function(){
        bar.play(-1);
    });
}());