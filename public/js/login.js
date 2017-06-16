$(function () {
    $("#loginForm").validate({
        focusCleanup:true,
        rules: {
            userName: {
                required: true,
                minlength: 2
            },
            password: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            nickName: "请输入您的昵称",
            userName: {
                required: "请输入用户名",
                minlength: "用户名必需由两个字母组成"
            },
            password: {
                required: "请输入密码",
                minlength: "密码长度不能小于 5 个字母"
            }
        }
    });
    $('#postBtn').on('click',function (e) {
        var valid=$("#loginForm").valid();
        if(valid){
            var user={
                userName:$("[name='userName']").val(),
                password:$("[name='password']").val()
            };
            $.ajax({
                type:'post',
                url:'/login',
                data:user,
                success:function (res) {
                    if(res.status=='101'){
                        window.location.href="/userInfo";
                    }else {
                        $('.alter-error').html(res.msg);
                    }
                }
            })
        }else {
            $('.alter-error').html("");
        }
    })
})