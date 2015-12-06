/**
 * Created by 872458899@qq.com on 15/12/5.
 */

var EffectLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        var size = cc.winSize;
        var background = new cc.Sprite(res.background_png);
        background.x = size.width/2;
        background.y = size.height/2;
        this.addChild(background);


        var flipx3d = new cc.LabelBMFont("FlipX3D", res.fnt2_fnt);
        flipx3d.scale = 0.7;
        var flipx3dMenu = new cc.MenuItemLabel(flipx3d, this.menuCallBack, this);
        flipx3dMenu.tag = ActionTypes.FLIPX3D;

        var pagejuin3d = new cc.LabelBMFont("PageJuin3D", res.fnt2_fnt);
        pagejuin3d.scale = 0.7;
        var pagejuin3dMenu = new cc.MenuItemLabel(pagejuin3d, this.menuCallBack, this);
        pagejuin3dMenu.tag = ActionTypes.PAGEJUIN3D;

        var lens3d = new cc.LabelBMFont("Lens3D", res.fnt2_fnt);
        lens3d.scale = 0.7;
        var lens3dMenu = new cc.MenuItemLabel(lens3d, this.menuCallBack, this);
        lens3dMenu.tag = ActionTypes.LENS3D;

        var shaky3d = new cc.LabelBMFont("Shaky3D", res.fnt2_fnt);
        shaky3d.scale = 0.7;
        var shaky3dMenu = new cc.MenuItemLabel(shaky3d, this.menuCallBack, this);
        shaky3dMenu.tag = ActionTypes.SHAKY3D;

        var waves3d = new cc.LabelBMFont("Waves3D", res.fnt2_fnt);
        waves3d.scale = 0.7;
        var waves3dMenu = new cc.MenuItemLabel(waves3d, this.menuCallBack, this);
        waves3dMenu.tag = ActionTypes.WAVES3D;

        var jumpjiles3d = new cc.LabelBMFont("JumpJiles3D", res.fnt2_fnt);
        jumpjiles3d.scale = 0.7;
        var jumpjiles3dMenu = new cc.MenuItemLabel(jumpjiles3d, this.menuCallBack, this);
        jumpjiles3dMenu.tag = ActionTypes.JUMPJILES3D;

        var shakyjiles3d = new cc.LabelBMFont("ShakyJiles3D", res.fnt2_fnt);
        shakyjiles3d.scale = 0.7;
        var shakyjiles3dMenu = new cc.MenuItemLabel(shakyjiles3d, this.menuCallBack, this);
        shakyjiles3dMenu.tag = ActionTypes.SHAKYJILES3D;

        var wavesjiles3d = new cc.LabelBMFont("WavesJiles3D", res.fnt2_fnt);
        wavesjiles3d.scale = 0.7;
        var wavesjiles3dMenu = new cc.MenuItemLabel(wavesjiles3d,this.menuCallBack, this);
        wavesjiles3dMenu.tag = ActionTypes.WAVESJILES3D;

        var mn = new cc.Menu(flipx3dMenu,pagejuin3dMenu,lens3dMenu,shaky3dMenu,waves3dMenu,jumpjiles3dMenu,shakyjiles3dMenu,wavesjiles3dMenu);
        mn.alignItemsVertically();
        this.addChild(mn);
        return true;
    },
    menuCallBack:function(menu){
        var sececn = new ActionScecen();
        var actionLayer = new ActionLayer(menu.tag);
        sececn.addChild(actionLayer);
        cc.director.pushScene(new cc.TransitionSlideInR(1, sececn));
    }
});

var EffectScecen = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var effectLayer = new EffectLayer();
        effectLayer.x = 0;
        effectLayer.y = 0;
        this.addChild(effectLayer);
    }
});

var ActionLayer = cc.Layer.extend({
    ctor:function(tag){
        this._super();
        this.flagTag = tag;
        this.gridNodeTarget = cc.NodeGrid.create();
        this.addChild(this.gridNodeTarget);
        cc.log("MyActionLayer init flagTag " + this.flagTag);

        var size = cc.winSize;

        var bg = new cc.Sprite(res.backdown_png);
        bg.x = size.width / 2;
        bg.y = size.height / 2;
        this.gridNodeTarget.addChild(bg);

        var sprite = new cc.Sprite(res.hero_png);
        sprite.x = size.width / 2;
        sprite.y = size.height / 2;
        this.gridNodeTarget.addChild(sprite, 1, SP_TAG);


        var backMenuItem = new cc.MenuItemImage(res.backup_png, res.backdown_png,
            function () {
                cc.director.popScene();
            }, this);
        backMenuItem.x = 140;
        backMenuItem.y = size.height - 65;


        var goMenuItem = new cc.MenuItemImage(res.goup_png, res.godown_png,
            this.onMenuCallback, this);
        goMenuItem.x = 820;
        goMenuItem.y = size.height - 540;


        var mn = new cc.Menu(backMenuItem, goMenuItem);
        this.gridNodeTarget.addChild(mn, 1);
        mn.x = 0;
        mn.y = 0;
        mn.anchorX = 0.5;
        mn.anchorY = 0.5;
        return true;
    },
    onMenuCallback: function () {
        cc.log("Tag = " + this.flagTag);
        var size = cc.winSize;

        switch (this.flagTag) {
            case ActionTypes.FLIPX3D:
                this.gridNodeTarget.runAction(cc.flipX3D(3.0));
               break;
            case ActionTypes.PAGEJUIN3D:
                this.gridNodeTarget.runAction(cc.pageTurn3D(3.0, cc.size(15, 10)));
               break;
            case ActionTypes.LENS3D:
                this.gridNodeTarget.runAction(cc.lens3D(3.0, cc.size(15, 10),
                    cc.p(size.width / 2, size.height / 2), 240));
               break;
            case ActionTypes.SHAKY3D:
                this.gridNodeTarget.runAction(cc.shaky3D(3.0, cc.size(15, 10), 5, false));
               break;
            case ActionTypes.WAVES3D:
                this.gridNodeTarget.runAction(cc.waves3D(3.0, cc.size(15, 10), 5, 40));
               break;
            case ActionTypes.JUMPJILES3D:
                this.gridNodeTarget.runAction(cc.jumpTiles3D(3.0, cc.size(15, 10), 2, 30));
               break;
            case ActionTypes.SHAKYJILES3D:
                this.gridNodeTarget.runAction(cc.shakyTiles3D(3.0, cc.size(16, 12), 5, false));
               break;
            case ActionTypes.WAVESJILES3D:
                this.gridNodeTarget.runAction(cc.wavesTiles3D(3.0, cc.size(15, 10), 4, 120));
               break;
        }
    }
})
var ActionScecen = cc.Scene.extend({
    onEnter:function(){
        this._super();
        //var layer = new ActionLayer(tag);
        //this.addChild(layer);
    }
})