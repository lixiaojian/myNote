/**
 * Created by 872458899@qq.com on 15/12/4.
 */
var HelloWorldLayer = cc.Layer.extend({
    sprite: null,                            //定义一个精灵属性
    ctor: function () {                      //构造方法
        this._super();                  //初始化父类
        var size = cc.winSize;          //获得屏幕大小
        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });


        var menu = new cc.Menu(closeItem);  //通过closeItem菜单项创建菜单对象
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1); //把菜单添加到当前层上


        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38); //创建标签对象
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        this.addChild(helloLabel, 5);
        this.sprite = new cc.Sprite(res.HelloWorld_png); //创建精灵对象
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 180
        });
        this.addChild(this.sprite, 0);


        this.sprite.runAction(
            cc.sequence(
                cc.rotateTo(2, 0),
                cc.scaleTo(2, 1, 1)
            )
        );  //在精灵对象上执行一个动画
        helloLabel.runAction(
            cc.spawn(
                cc.moveBy(2.5, cc.p(0, size.height - 40)),
                cc.tintTo(2.5, 255, 125, 0)
            )
        );  //在标签对象上执行一个动画
        return true;
    }
});


var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);   //把HelloWorldLayer层放到HelloWorldScene场景中
    }
});