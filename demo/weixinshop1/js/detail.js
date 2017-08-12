/**
 * Created by 872458899@qq.com on 2017/8/12.
 */
//轮播
mui('.mui-slider').slider({
    interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
});
//点击加载更多
mui('body').on('tap','.get-more-link',function () {
    var btn = this;
    var pagNum = btn.getAttribute('data-page-num');
    mui.ajax('mock/getgroups.json',{
        data:{
            pageNum:pagNum
        },
        dataType:'json',//服务器返回json格式数据
        type:'get',//HTTP请求类型
        timeout:10000,//超时时间设置为10秒；
        headers:{'Content-Type':'application/json'},
        success:function(data){
            if(data.code === 0){
                var gropsHtml = getGroupHtml(data.groups)
                var box = mui('#group_list_box')[0];
                //把新的内容拼到原来的内容后面
                box.innerHTML = box.innerHTML + gropsHtml;
                btn.setAttribute('data-page-num',++pagNum);
            }else{
                mui.toast(data.msg,{ duration:'long', type:'div' });
            }
        },
        error:function(xhr,type,errorThrown){
            mui.toast('服务异常',{ duration:'long', type:'div' });
        }
    });
});
//拼接团的HTML
function getGroupHtml(data) {
    var gropsHtmlArr = [];
    data.map(function (item) {
        var html = '<li class="mui-table-view-cell mui-media">';
        html += '<a href="javascript:;">'
        html += '<img class="mui-media-object mui-pull-left" src="'+item.header+'">';
        html += '<div class="mui-media-body">';
        html += item.owner;
        html += '<div class="group-status-box"><span class="group-status">'+item.status+'</span><span class="group-member-tag">'+item.maxMember+'人团</span></div>';
        html += '</div>';
        if(item.status === '已成团'){
            html +='<img src="images/detail/group-full.png" class="group-full-flag" alt="">';
        }
        html += '</a>';
        html += '</li>';
        gropsHtmlArr.push(html);
    });
    return gropsHtmlArr.join('');
}