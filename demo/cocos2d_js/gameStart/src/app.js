/**
 * Created by 872458899@qq.com on 15/12/4.
 */
var BgLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        var size = cc.winSize;
        var sWidth = size.width;
        var sHeight = size.height;
        //背景
        var bg = new cc.Sprite(res.backgroung_png);
        bg.x = sWidth/2;
        bg.y = sHeight/2;
        this.addChild(bg);
        //开始精灵
        var bsn = new cc.Sprite(res.beginnormal_png);
        var bss = new cc.Sprite(res.beginselect_png);
        var bmenu = new cc.MenuItemSprite(bsn,bss,function(){
            cc.log('点击了开始按钮');
        },this);
        bmenu.x= sWidth*3/4;
        bmenu.y = sHeight*3/4;
        //this.addChild(bmenu,1);

        //设置精灵
        var ssn = new cc.Sprite(res.settingnormal_png);
        var sss = new cc.Sprite(res.settingselect_png);
        var smenu = new cc.MenuItemSprite(ssn,sss,function(){
            cc.log('点击了设置');
        },this)
        smenu.x = sWidth/2;
        smenu.y = sHeight/2;
        //this.addChild(ssn,1);
        //帮助精灵
        var hsn = new cc.Sprite(res.helpnormal_png);
        var hss = new cc.Sprite(res.helpselect_png);
        var hmenu = new cc.MenuItemSprite(hsn,hss,function(){
            cc.log('点击了帮助')
        },this);
        hmenu.x = sWidth*3/4;
        hmenu.y = sHeight/4;

        var menu = new cc.Menu(bmenu,smenu,hmenu);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu,1);
        return true;
    }
});

var GameStartScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new BgLayer();
        this.addChild(layer);   //把HelloWorldLayer层放到HelloWorldScene场景中
    }
});