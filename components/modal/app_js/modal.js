/**
 * 自定义插件 该插件依赖jquery
 * @authors ex-lixiaojian002 (EX-LIXIAOJIAN002@pingan.com.cn)
 * @date    2015-01-13 10:16:29
 * @version 0.2.2
 */
(function ($) {
    var MyBase = MyBase || function () {
        };
    /**
     * 弹出层插件 在当前页面弹出
     * @method show
     *         @param {json} [config] [{
     *              id:'要显示的节点ID' 必传,
     *              width : 弹出层的宽度  默认为窗口宽度的一半,
     *              height : 弹出层的高度 默认为窗口高度的一半,
     *              position : 定位方式     默认根据弹层的高度来设置不同的定位，如果设置为fixed 但弹层的高度高于窗口的高度，也会被强制改为absolute
     *              
     *       
     *         }]
     * @param  {json} {config} [description]
     * @return {null}
     */
    MyBase.prototype.modal = {
        mask: $('<div id="modalMask" class="modal_mask"></div>'),
        show: function (config) {
            if (!config) {
                return false;
            }
            ;
            var id = config.id;
            if (!id) {
                return false;
            }
            ;
            var dom = $('#' + id);
            if (!dom) {
                return false;
            }
            ;
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
            ;
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
        hide: function (id) {
            $('#' + id).hide();
            $('#modalMask').hide();
        }
    };
    //设置定位
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
    window.MyBase = MyBase;
})(jQuery);