$(function () {
    function setCommentList() {
        $.ajax({
            url:"/allComment",
            data:{noteID:$("[name='noteID']").val()},
            type:"post",
            success:function (res) {
                var list=$('#commentList')[0];
                list.innerHTML='';
                res.list.forEach(function (item) {
                    list.innerHTML+=getCommentTpl(item)
                })
            }
        })
    }
    setCommentList();
    $("#commentForm").validate({
        rules: {
            content: {
                required: true,
                maxlength: 300,
            }
        },
        messages: {
            content: {
                required: "请输入评论内容",
                maxlength: "评论内容不得超过300个字符"
            }
        }
    });
    var warpBox=document.querySelector('#warpBox');
    var faceWarp=document.querySelector('#faceWarp');
    var face=new Face({
        el:faceWarp,
        callBack:function (face) {
            $("[name='content']")[0].value+=face.value;
        }
    })
    $('#postBtn').on('click',function (e) {
        var valid=$("#commentForm").valid();
        var comment={
            noteID:$("[name='noteID']").val(),
            userID:$("[name='userID']").val(),
            content:face.replaceFace($("[name='content']").val())
        }
        if(comment.userID==''){
            swal({
                    title: "你还没有登录!",
                    text: "登录后才可发表文章评论!",
                    type: "warning",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "去登陆",
                    cancelButtonText: "取消",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },function(){
                    swal.close()
                    window.location.href='/login'
                });
        }else if(valid){
            $.ajax({
                url:"/addComment",
                data:comment,
                type:"post",
                success:function (res) {
                    if(res.status==101){
                        $("[name='content']").val('')
                        setCommentList();
                    }else {
                        swal("评论发表失败!", "评论因未知原因发表失败", "error");
                    }
                }
            })
        }
    })
    function getCommentTpl(comment) {
        return  '<div class="message-item user">' +
            '<div class="user-info-box">' +
            '<img src="/images/user/'+comment.userPic+'" class="user-pic">' +
            '</div>' +
            '<div class="message-content">' +
            '<div class="message-top">'+comment.userNickName+'<span class="message-time">'+$.timeago(comment.commentDate)+'</span></div>' +
            '<div class="message-text">'+comment.commentContent+'</div></div></div>'
    }
    $('#faceBtn').on('click',function (e) {
        warpBox.style.display=warpBox.style.display=='block'?'none':'block';
        e.preventDefault()
        e.stopPropagation();
    })
    document.addEventListener('click',function (e) {
        warpBox.style.display='none';
    })
})