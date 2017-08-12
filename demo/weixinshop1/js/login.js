/**
 * Created by 872458899@qq.com on 2017/8/11.
 */
//点击验证码
mui('body').on('tap','.get-code-btn',function(){
    alert('获取验证码')
})
//点击登录
mui('body').on('tap','.login-btn',function(){
    var phoneInput = mui('#phone')[0];
    var codeInput = mui('#code')[0];
    //防止提交时弹出键盘
    phoneInput.blur();
    codeInput.blur();
    var phone = phoneInput.value;
    var code = codeInput.value;
    if(!phone || !code){
        mui.toast('手机号码或验证码不能为空',{ duration:'long', type:'div' });
    }else{
        mui.ajax('mock/login.json',{
            data:{
                phone:phone,
                code:code
            },
            dataType:'json',//服务器返回json格式数据
            type:'post',//HTTP请求类型
            timeout:10000,//超时时间设置为10秒；
            headers:{'Content-Type':'application/json'},
            success:function(data){
                if(data.code === 0){
                    mui.toast('登录成功',{ duration:'long', type:'div' });
                }else{
                    mui.toast(data.msg,{ duration:'long', type:'div' });
                }
            },
            error:function(xhr,type,errorThrown){
                mui.toast('服务异常',{ duration:'long', type:'div' });
            }
        });
    }
})