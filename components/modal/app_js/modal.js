;(function ($) {
    "use strict";
    var MyBase = MyBase || function () {
        };

    /**
     * 自定义插件对象
     * 该插件依赖jquery
     */
    var myBase = myBase || new MyBase();

    /**
     * 弹出层插件 在当前页面弹出
     * @class myBase.modal
     */
    MyBase.prototype.modal = {
        mask: $('<div id="modalMask" class="modal_mask"></div>'),
        /**
         * 显示弹出层
         * @method show
         * @param {Object} config
         * @param {String} [config.id] 要显示的节点ID（必传）
         * @param {String} [config.width=clientWidth/2] 弹出层的宽度,默认为窗口宽度的一半（可选）
         * @param {String} [config.height=clientHeight/2] 弹出层的高度 默认为窗口高度的一半（可选）
         * @param {String} [config.position=auto] 默认根据弹层的高度来设置不同的定位，如果设置为fixed，但弹层的高度高于窗口的高度，也会被强制改为absolute（可选）
         *
         *
         * 示例：
         *
         *     @example
         *     var config = {
         *          id:'myModal',
         *          width:'600px',
         *          height:'400px',
         *          position:'fixed'
         *     };
         *     myBase.modal.show(config);
         *
         * @return {null}
         */
        show: function (config) {
            if (!config) {
                return false;
            }
            var id = config.id;
            if (!id) {
                return false;
            }
            var dom = $('#' + id);
            if (!dom) {
                return false;
            }
            var mask = $('#modalMask');
            //可视区域的宽度
            var wWidth = $(window).width();
            //可视区域的高度
            var wHeight = $(window).height();
            //判断是不是已有遮罩层
            if (mask[0]) {
                mask.show();
            } else {
                $('body').append(this.mask);
                //页面的宽度 这里用window的宽度防止IE下有横向进度条
                var dwidth = $(window).width();
                //页面的高度
                var dheight = $(document).height();
                this.mask.css({
                    width: dwidth + 'px',
                    height: dheight + 'px'
                });
            }
            //弹出层的宽度
            var width = config.width ? config.width : '50%';
            //弹出层的高度
            var height = config.height ? config.height : '50%';
            dom.width(width);
            dom.height(height);
            //弹出层的定位方式 及自动居中
            var position = config.position;
            var left = (wWidth - dom.width()) / 2;
            var top = 20;
            //设置定位
            setPosition(position, wHeight, dom, top, left);
            dom.show();
        },
        /**
         * 关闭弹出层
         * @method hide
         * @param {string} id 要关闭的弹出层的id
         *
         *     @example
         *     myBase.modal.hide('myModal');
         *
         * @return {null}
         */
        hide: function (id) {
            $('#' + id).hide();
            $('#modalMask').hide();
        }
    };
    /**
     * 设置弹出层的定位方式<br>
     *     (该方法为私有的，内部调用，外部无法调用)
     * @private
     * @param {String} position 传入的定位方式
     * @param {String} wHeight 浏览器的窗口高度
     * @param {String} dom 弹出层的dom节点
     * @param {String} top 弹出层到顶部的距离
     * @param {String} left 弹出层到左右的距离
     */
    function setPosition(position, wHeight, dom, top, left) {
        if (position) {
            var flagTop = wHeight - dom.height();
            //如果弹出层高度高于窗口高度 定位方式强制设置为绝对定位
            if (flagTop < 0) {
                position = 'absolute';
            } else {
                top = (wHeight - dom.height()) / 2;
            }
            dom.css({
                'position': position,
                'left': left + 'px',
                top: top + 'px'
            });
        } else if (dom.height() >= wHeight) {
            //如果弹出层高度高于可视区域就用绝对定位
            dom.css({
                'position': 'absolute',
                'top': top + 'px',
                'left': left + 'px'
            });
        } else {
            //如果弹出层高度低于可视区域就用固定定位
            top = (wHeight - dom.height()) / 2;
            dom.css({
                'position': 'fixed',
                'top': top + 'px',
                'left': left + 'px'
            });
        }
    }

    //将MyBase发布出去
    window.myBase = myBase;
})(jQuery);