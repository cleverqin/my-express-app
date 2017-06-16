$(function () {
    $("#registerForm").validate({
        errorPlacement: function(error, element) {
            error.appendTo(element.closest('.form-control'));
        },
        rules: {
            nickName: "required",
            userName: {
                required: true,
                minlength: 2,
                remote:{
                    url: "/userValid",     //后台处理程序
                    type: "post",               //数据发送方式
                    dataType: "json",           //接受数据格式
                    data: {                     //要传递的数据
                        userName: function() {
                            return $("#userName").val();
                        }
                    }
                }
            },
            password: {
                required: true,
                minlength: 5
            },
            password1: {
                required: true,
                minlength: 5,
                equalTo: "#password"
            },
            age: "required",
            sex: "required",
            enjoy: "required",
            job: "required",
        },
        messages: {
            nickName: "请输入您的昵称",
            userName: {
                required: "请输入用户名",
                minlength: "用户名必需由两个字母组成",
                remote:"用户名已存在"
            },
            password: {
                required: "请输入密码",
                minlength: "密码长度不能小于 5 个字母"
            },
            password1: {
                required: "请输入密码",
                minlength: "密码长度不能小于 5 个字母",
                equalTo: "两次密码输入不一致"
            },
            age:'请输入您的年龄',
            sex:'请选择你的性别',
            enjoy:'请选择您的爱好',
            job:"请选择您的工作"
        }
    });
    $('#postBtn').on('click',function (e) {
        var valid=$("#registerForm").valid();
        if(valid){
            var user={
                userName:$("[name='userName']").val(),
                nickName:$("[name='nickName']").val(),
                password:$("[name='password']").val()
            }
            $.ajax({
                url:"/register",
                data:user,
                type:"post",
                success:function (res) {
                    if(res.status=='101'){
                        swal({
                                title: "注册成功!",
                                text: "你现在可以登录，发表文章了!",
                                type: "success",
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "去登录",
                                closeOnConfirm: false
                            },
                            function(){
                                swal.close();
                                window.location.href="/login";
                            });
                    }
                }
            })
        }
    })
})