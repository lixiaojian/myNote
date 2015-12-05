/**
 * Created by 872458899@qq.com on 15/12/5.
 */
var SpriteLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        var size = cc.winSize;
        var background = new cc.Sprite(res.background_png);
        background.x = size.width/2;
        background.y = size.height/2;
        this.addChild(background);

        var texture = cc.textureCache.addImage(res.tree_png);
        var tree1 = new cc.Sprite(texture,cc.rect(604,38,302,295))
        tree1.x = 200;
        tree1.y = 230;
        this.addChild(tree1);

        var tree2 = new cc.Sprite(texture,cc.rect(73,72,182,270));
        tree2.x= 500;
        tree2.y = 200;
        this.addChild(tree2);
        return true;
    }
});

var SpriteScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var spriteLayer = new SpriteLayer();
        this.addChild(spriteLayer);
    }
});