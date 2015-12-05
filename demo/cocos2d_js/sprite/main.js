/**
 * Created by 872458899@qq.com on 15/12/5.
 */
cc.game.onStart = function(){
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(1136, 640, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_res, function () {
        cc.director.runScene(new SpriteScene());
    }, this);
};
cc.game.run();