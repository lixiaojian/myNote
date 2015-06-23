/**
 * Created by lixj(872458899@qq.com) on 15/6/22.
 */

(function () {
    //根据id获取元素
    var getById = function(id){
        return document.getElementById(id);
    };
    myLayout = {
        activate: function () {
            var _this = this;
            _this.fix();
        },
        fix: function () {
            var neg = getById('main_header').offsetHeight;
            //窗口的高度
            var window_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var sidebar_height = getById('sidebar').offsetHeight;
            if (hasClass(document.body,'fixed')) {
                getById('content_wrapper').style.minHeight = window_height;
            } else {
                if (window_height >= sidebar_height) {
                    getById('content_wrapper').style.minHeight = window_height - neg;
                } else {
                    getById('content_wrapper').style.minHeight = sidebar_height;
                }
            }
        }
    };
    //添加左边栏的展示和隐藏
    getById('sidebar_toggle').onclick=function(e){
        e.preventDefault();
        var body = document.body;
        if(hasClass(body,'sidebar-collapse')){
            removeClass(body,'sidebar-collapse');
        }else{
            addClass(body,'sidebar-collapse');
        }
    };

    var rclass = /[\t\r\n\f]/g;
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    var rnotwhite = (/\S+/g);
    //判断是否有该className
    function hasClass(ele,className) {
        var className = " " + className + " ";
        if ( ele.nodeType === 1 && (" "+ele.className+" ").replace(rclass," ").indexOf(className) >= 0 ) {
            return true;
        }
        return false;
    }
    //添加样式
    function addClass( elem,value ){
        var classes, cur, clazz, j, finalValue;
        classes = ( value || "" ).match(rnotwhite) || [];
        cur = elem.nodeType === 1 && ( elem.className ? ( " " + elem.className + " " ).replace( rclass, " " ):" ");
        if ( cur ) {
            j = 0;
            while ( (clazz = classes[j++]) ) {
                if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
                    cur += clazz + " ";
                }
            }
            // only assign if different to avoid unneeded rendering.
            finalValue = trim( cur );
            if ( elem.className !== finalValue ) {
                elem.className = finalValue;
            }
        }
    }
    //删除样式
    function removeClass(elem, value ) {
        var classes, cur, clazz, j, finalValue;
        classes = ( value || "" ).match( rnotwhite ) || [];
        cur = elem.nodeType === 1 && ( elem.className ?( " " + elem.className + " " ).replace( rclass, " " ) : "");
        if ( cur ) {
            j = 0;
            while ( (clazz = classes[j++]) ) {
                // Remove *all* instances
                while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
                    cur = cur.replace( " " + clazz + " ", " " );
                }
            }
            // only assign if different to avoid unneeded rendering.
            finalValue = value ? trim( cur ) : "";
            if ( elem.className !== finalValue ) {
                elem.className = finalValue;
            }
        }
    }
    //去空格
    function trim( text ) {
        return text == null ? "" : ( text + "" ).replace( rtrim, "" );
    }
    myLayout.activate();
}());




