/**
 * Created by xiaojianli@pptv.com on 2016/3/18.
 */
;(function(){
    var readyList = [], isReady;
    var DOC = window.document;
    var W3C = window.dispatchEvent;
    var root = DOC.documentElement;
    var fireReady = function(fn) {
        isReady = true
        while(fn = readyList.shift()){
            fn();
        }
    }

    function doScrollCheck() {
        try { //IE下通过doScrollCheck检测DOM树是否建完
            root.doScroll("left")
            fireReady()
        } catch (e) {
            setTimeout(doScrollCheck)
        }
    }

    if (DOC.readyState === "complete") {
        setTimeout(fireReady) //如果在domReady之外加载
    } else if (W3C) {
        DOC.addEventListener("DOMContentLoaded", fireReady)
    } else {
        DOC.attachEvent("onreadystatechange", function() {
            if (DOC.readyState === "complete") {
                fireReady()
            }
        })
        try {
            var isTop = window.frameElement === null
        } catch (e) {
        }
        if (root.doScroll && isTop && window.external) {//fix IE iframe BUG
            doScrollCheck()
        }
    };
    window.domReady = function(fn) {
        if (!isReady) {
            readyList.push(fn)
        } else {
            fn()
        }
    }
}());
