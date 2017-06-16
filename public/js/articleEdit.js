$(function () {
    var editor;
    $("#userForm").validate({
        errorPlacement: function(error, element) {
            error.appendTo(element.closest('.form-control'));
        },
        rules: {
            userID: "required",
            title: {
                required: true,
                minlength: 2
            },
            content: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            userID: "请输入用户ID",
            title: {
                required: "请输入日记标题",
                minlength: "日记标题最少长度为2"
            },
            content: {
                required: "请输入日记内容",
                minlength: "日记内容长度不能小于 5 个字母"
            }
        }
    });
    $('#postBtn').on('click',function (e) {
        var valid=$("#userForm").valid();
        console.log(valid);
        if(valid){
            var html=editor.html();
            var userID=$("[name='userID']").val();
            var noteID=$("[name='noteID']").val();
            var title=$("[name='title']").val();
            $.ajax({
                type:'post',
                url:'/noteUpdate',
                data:{
                    userID:userID,
                    noteID:noteID,
                    title:title,
                    content:html
                },
                success:function (res) {
                    console.log(res)
                    window.location.href="/nodeDetail/"+noteID;
                }
            })
        }
    })
    KindEditor.ready(function(K) {
        editor = K.create('textarea[name="content"]', {
            allowFileManager : true
        });
    });
})