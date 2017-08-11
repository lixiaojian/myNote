/**
 * Created by 872458899@qq.com on 2017/8/11.
 * 公共方法
 */
;(function () {
    /**
     * 处理页面字体的自适应
     * @type {number}
     */
    //设计图对应的字体大小
    var BASE_FONT_SIZE = 100;
    //设计图的宽度
    var DESIGNS_WIDTH=750;
    var calculate_size = function () {
        var docEl = document.documentElement,
            clientWidth = window.screen.width
        if (!clientWidth){
            return;
        }
        docEl.style.fontSize = parseInt(BASE_FONT_SIZE * (clientWidth / DESIGNS_WIDTH)) + 'px';
    };
    calculate_size();
}());
